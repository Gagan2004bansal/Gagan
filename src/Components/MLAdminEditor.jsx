import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";

// Optional extra tools - install them if you want the features
import Checklist from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import CodeTool from "@editorjs/code";
import Marker from "@editorjs/marker";
import Table from "@editorjs/table";

const BASE_URL = "https://gagan-backend-k9x1.onrender.com/api";
// const BASE_URL = "http://localhost:3002/api";

function MLAdminEditor() {
  const { slug } = useParams();
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null); // hold actual EditorJS instance

  const [allowed, setAllowed] = useState(false);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [existing, setExisting] = useState(null);

  const [wordCount, setWordCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const AUTOSAVE_KEY = `editorjs-autosave-${slug || "new"}`;

  // Load for edit mode
  useEffect(() => {
    if (slug) {
      axios.get(`${BASE_URL}/ml/${slug}`).then((res) => {
        setExisting(res.data);
        setTitle(res.data.title || "");
        setThumbnail(res.data.thumbnail || "");
        // also seed localStorage autosave if not already
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(res.data.content || {}));
      }).catch(err => {
        console.error("Failed to fetch post:", err);
      });
    } else {
      // if creating new, check localStorage for autosaved content
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) {
        try {
          setExisting({ content: JSON.parse(saved) });
        } catch (e) { /* ignore */ }
      }
    }
  }, [slug]); // eslint-disable-line

  const unlock = () => {
    const pass = prompt("Enter Admin Password:");
    if (pass === "#92070") setAllowed(true);
  };

  // Helper: compute word count from EditorJS data
  const computeWordCount = (data) => {
    if (!data || !data.blocks) return 0;
    let txt = "";
    data.blocks.forEach((b) => {
      if (b.type === "paragraph" || b.type === "header" || b.type === "quote" || b.type === "raw") {
        txt += " " + (typeof b.data.text === "string" ? b.data.text : "");
      } else if (b.type === "list") {
        (b.data.items || []).forEach(i => { txt += " " + (typeof i === "string" ? i : (i.content || "")); });
      } else if (b.type === "code") {
        txt += " " + (b.data.code || "");
      }
    });
    // strip HTML tags if any
    const stripped = txt.replace(/<[^>]*>/g, " ");
    return stripped.trim().split(/\s+/).filter(Boolean).length;
  };

  // Initialize EditorJS
  useEffect(() => {
    if (!allowed) return;

    let isMounted = true;

    (async () => {
      // if an instance is present, destroy it first (safety)
      try {
        if (editorInstanceRef.current) {
          await editorInstanceRef.current.destroy();
          editorInstanceRef.current = null;
        }
      } catch (e) {
        console.warn("Error destroying existing editor instance:", e);
      }

      editorRef.current = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        data: existing?.content || { time: Date.now(), blocks: [] },

        onReady: () => {
          if (!isMounted) return;
          editorInstanceRef.current = editorRef.current;
          // compute initial word count
          editorRef.current
            .save()
            .then((d) => setWordCount(computeWordCount(d)))
            .catch(() => {});
        },

        onChange: async () => {
          try {
            const savedData = await editorRef.current.save();
            setWordCount(computeWordCount(savedData));
            // autosave to localStorage (non-blocking)
            localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(savedData));
          } catch (err) {
            console.error("onChange save err:", err);
          }
        },

        tools: {
          header: Header,
          list: List,
          checklist: Checklist,
          embed: Embed,
          code: CodeTool,
          marker: Marker,
          table: Table,

          // Image tool: both uploader and endpoints fallback
          image: {
            class: ImageTool,
            inlineToolbar: true,
            config: {
              uploader: {
                async uploadByFile(file) {
                  const fd = new FormData();
                  fd.append("image", file); // MUST match backend field name
                  const res = await axios.post(`${BASE_URL}/upload`, fd);
                  console.log("Image upload response:", res.data); // debug
                  return res.data; // EditorJS expects {success:1, file:{url:"..."}}
                }
              }
            }
          }          
        },
      });
    })();

    // cleanup on unmount
    return () => {
      isMounted = false;
      (async () => {
        try {
          if (editorInstanceRef.current) {
            await editorInstanceRef.current.destroy();
            editorInstanceRef.current = null;
          }
        } catch (e) {
          console.warn("Error cleaning editor:", e);
        }
      })();
    };
  }, [allowed, existing]); // eslint-disable-line

  // Save handler
  const savePost = async () => {
    try {
      setIsSaving(true);
      const data = await editorRef.current.save();

      const body = {
        title,
        thumbnail,
        content: data,
      };

      if (slug) {
        await axios.put(`${BASE_URL}/ml/${slug}`, body);
        alert("Updated!");
      } else {
        await axios.post(`${BASE_URL}/ml/create`, body);
        alert("Created!");
      }

      // clear autosave after successful save
      localStorage.removeItem(AUTOSAVE_KEY);
    } catch (e) {
      console.error("Save failed:", e);
      alert("Save failed. Check console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4">
      {!allowed && (
        <button className="bg-black text-white px-4 py-2" onClick={unlock}>
          Unlock Editor
        </button>
      )}

      {allowed && (
        <>
          <div className="mb-3 flex gap-3">
            <input
              className="border p-2 flex-1"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border p-2 w-64"
              placeholder="Thumbnail URL..."
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
          </div>

          <div className="mb-2 text-sm text-gray-400">
            Words: {wordCount} • <button
              className="underline"
              onClick={() => {
                const saved = localStorage.getItem(AUTOSAVE_KEY);
                console.log("Autosave content:", saved);
                alert("Autosave content printed to console.");
              }}
            >
              Inspect Autosave
            </button>
          </div>

          <div id="editorjs" className="border p-4 rounded min-h-[300px]"></div>

          <div className="mt-4 flex gap-3">
            <button
              className="bg-blue-600 text-white p-3 rounded"
              onClick={savePost}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>

            <button
              className="bg-gray-700 text-white p-3 rounded"
              onClick={async () => {
                // quick manual preview of saved content in console
                try {
                  const d = await editorRef.current.save();
                  console.log("Preview content:", d);
                  alert("Preview printed to console.");
                } catch (err) {
                  console.error("Preview error:", err);
                  alert("Preview failed - open console.");
                }
              }}
            >
              Preview (console)
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MLAdminEditor;
