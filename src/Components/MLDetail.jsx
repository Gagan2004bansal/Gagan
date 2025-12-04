import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EditorJSRenderer from "editorjs-react-renderer";
import Navbar from "./Navbar";
import { ArrowLeft } from "@phosphor-icons/react";

const BASE_URL = "https://gagan-backend-k9x1.onrender.com/api"

function MLDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/ml/${slug}`).then((res) => setPost(res.data));
  }, [slug]);

  console.log(post);

  if (!post) return <div>Loading...</div>;

  const safeContent = post.content
    ? {
        ...post.content,
        blocks: post.content.blocks?.map((block) => {
          if (["paragraph", "header", "quote", "raw", "delimiter"].includes(block.type)) {
            return {
              ...block,
              data: {
                ...block.data,
                text: block.data?.text || "",
              },
            };
          }
          
          // Handle list blocks
          if (block.type === "list") {
            return {
              ...block,
              data: {
                ...block.data,
                items: block.data?.items?.map(item => 
                  typeof item === "string" ? item : item.content || ""
                ) || [],
              },
            };
          }
          
          return block;
        }) || [],
      }
    : { time: Date.now(), blocks: [] };

  // Custom renderers for better styling
  const renderers = {
    paragraph: ({ data }) => (
      <p
        className="text-gray-300 mb-4 leading-relaxed text-lg"
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    ),
    header: ({ data }) => {
      const Tag = `h${data.level}`;
      const sizes = {
        1: "text-4xl font-bold text-yellow-400 mb-6 mt-8",
        2: "text-3xl font-bold text-yellow-400 mb-5 mt-7",
        3: "text-2xl font-semibold text-yellow-400 mb-4 mt-6",
        4: "text-xl font-semibold text-yellow-400 mb-3 mt-5",
      };
      return (
        <Tag
          className={sizes[data.level] || sizes[4]}
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      );      
    },
    list: ({ data }) => {
      const ListTag = data.style === "ordered" ? "ol" : "ul";
      const listClass = data.style === "ordered" 
        ? "list-decimal list-inside space-y-3 mb-6 text-gray-300 text-lg ml-4"
        : "list-disc list-inside space-y-3 mb-6 text-gray-300 text-lg ml-4";
      
      return (
        <ListTag className={listClass}>
          {data.items.map((item, index) => (
            <li key={index} className="leading-relaxed pl-2">
              {item}
            </li>
          ))}
        </ListTag>
      );
    },
    quote: ({ data }) => (
      <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-400 my-6 text-lg">
        {data.text}
      </blockquote>
    ),
  };

  return (
    <>
      <Navbar />
      <div className="bg-zinc-900 text-white min-h-screen p-4">
        <Link to="/article">
          <div className="flex text-lg items-center justify-start gap-x-2 hover:text-yellow-500 transition-colors">
            <ArrowLeft /> Back
          </div>
        </Link>

        <div className="flex justify-center px-2 md:px-6 lg:px-0">
          <div className="w-full max-w-4xl flex flex-col items-center py-8">
            <h1 className="text-3xl sm:text-5xl mb-4 text-yellow-500 font-bold text-center">
              {post.title}
            </h1>
            <div className="h-1 bg-zinc-800 w-full mb-8"></div>
            <div className="w-full prose prose-invert max-w-none">
              {safeContent.blocks.length > 0 && (
                <EditorJSRenderer data={safeContent} renderers={renderers} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MLDetail;