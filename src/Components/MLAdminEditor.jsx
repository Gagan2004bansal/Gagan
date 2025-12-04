import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";

const BASE_URL = "https://gagan-backend-k9x1.onrender.com/api";


function MLAdminEditor() {
  const { slug } = useParams();
  const editorRef = useRef(null);

  const [allowed, setAllowed] = useState(false);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [existing, setExisting] = useState(null);

  // Load for edit mode
  useEffect(() => {
    if (slug) {
      axios.get(`${BASE_URL}/ml/${slug}`).then((res) => {
        setExisting(res.data);
        setTitle(res.data.title);
        setThumbnail(res.data.thumbnail);
      });
    }
  }, [slug]);

  const unlock = () => {
    const pass = prompt("Enter Admin Password:");
    if (pass === "#92070") setAllowed(true);
  };

  // Initialize EditorJS
  useEffect(() => {
    if (!allowed) return;

    editorRef.current = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      data: existing?.content || {},

      tools: {
        header: Header,
        list: List,

        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                const fd = new FormData();
                fd.append("image", file);

                return axios
                  .post(`${BASE_URL}/upload`, fd)
                  .then((res) => res.data);
              },
            },
          },
        },
      },
    });
  }, [allowed, existing]);

  const savePost = async () => {
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
          <input
            className="border p-2 w-full mb-3"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-2 w-full mb-3"
            placeholder="Thumbnail URL..."
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />

          <div id="editorjs" className="border p-4 rounded"></div>

          <button
            className="bg-blue-600 text-white p-3 mt-5 rounded"
            onClick={savePost}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}

export default MLAdminEditor;
