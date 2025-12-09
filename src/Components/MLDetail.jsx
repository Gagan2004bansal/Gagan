import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EditorJSRenderer from "editorjs-react-renderer";
import Navbar from "./Navbar";
import { ArrowLeft } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const BASE_URL = "https://gagan-backend-k9x1.onrender.com/api"
// const BASE_URL = "http://localhost:3002/api";

function MLDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/ml/${slug}`).then((res) => setPost(res.data));
  }, [slug]);

  console.log(post);

  if (!post) {
    return <CoolLoadingTemplate message="Fetching article..." fullscreen={true} />;
  }

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
    code: ({ data }) => (
      <pre className="bg-black/40 text-white p-4 rounded-lg overflow-x-auto my-4 text-sm">
        <code>{data.code}</code>
      </pre>
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


function SkeletonCard() {
  return (
    <div className="p-3 rounded-xl border border-white/6 shadow-sm bg-zinc-900 dark:bg-zinc-900/50">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg skeleton" />
        <div className="flex-1">
          <div className="h-3 rounded-md skeleton w-3/4 mb-2" />
          <div className="h-2 rounded-md skeleton w-1/2" />
        </div>
      </div>
    </div>
  );
}

function CoolLoadingTemplate({ message = "Loading...", fullscreen = true }) {
  return (
    <div
      className={`${fullscreen ? "fixed inset-0 z-50 flex items-center justify-center bg-zinc-800 backdrop-blur-sm" : "relative"
        }`}
      aria-busy="true"
      aria-live="polite"
    >
      {/* Container */}
      <div className="max-w-3xl w-[92%] md:w-3/4 lg:w-1/2 mx-auto p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-white/80 to-zinc-50/80 dark:from-zinc-900/70 dark:to-zinc-800/60 border border-white/10">
        <div className="flex items-center gap-6">
          {/* Animated logo / spinner */}
          <motion.div
            className="w-20 h-20 rounded-2xl p-2 grid place-items-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 64 64" className="w-12 h-12 text-white opacity-95">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.65)" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="12" fill="url(#g)" />
              <path d="M32 8 L40 24 L56 24 L42 36 L48 52 L32 42 L16 52 L22 36 L8 24 L24 24 Z" fill="rgba(255,255,255,0.12)" />
            </svg>
          </motion.div>

          {/* Text + subtle progress bar + skeletons */}
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
              {message}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300/80">
              Preparing things for you — this usually takes a moment.
            </p>

            {/* progress bar */}
            <div className="mt-4 relative h-3 bg-zinc-200/70 dark:bg-zinc-700/40 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                initial={{ width: "8%" }}
                animate={{ width: ["8%", "48%", "34%", "78%", "62%", "96%"] }}
                transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <span className="sr-only">Loading progress</span>
            </div>

            {/* skeleton cards */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </div>

        {/* Optional footer - subtle microcopy */}
        <div className="mt-6 text-xs text-zinc-500 dark:text-zinc-400/80 flex items-center gap-3">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 16v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.9 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Tip: Good loading states make apps feel faster.</span>
        </div>
      </div>

      {/* Inline styles for shimmer / skeleton */}
      <style>{`
        .skeleton {
          position: relative;
          overflow: hidden;
          background-color: rgba(0,0,0,0.04);
        }

        .skeleton::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          height: 100%;
          width: 150%;
          transform: skewX(-12deg);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
          animation: shimmer 1.6s infinite;
        }

        @keyframes shimmer {
          0% { left: -150%; }
          100% { left: 150%; }
        }
      `}</style>
    </div>
  );
}

