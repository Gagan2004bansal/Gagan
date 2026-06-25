// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MachineLearning from './MachineLearning';

// const Medium = ({ username = 'gaganbansal475' }) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         setLoading(true);
  
//         const url =
//           `https://api.rss2json.com/v1/api.json?rss_url=` +
//           encodeURIComponent(`https://medium.com/feed/@${username}`) +
//           `&_=${Date.now()}`;
  
//         const { data } = await axios.get(url, {
//           headers: {
//             "Cache-Control": "no-cache",
//           },
//         });
  
//         console.log("Fetched:", data.items);
  
//         const sorted = [...data.items].sort(
//           (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
//         );
  
//         setArticles(sorted);
//       } catch (err) {
//         console.log(err);
//         setError("Error fetching Medium articles");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchArticles();
//   }, [username]);

//   // Extract first image from article content
//   const extractImage = (content) => {
//     const imgRegex = /<img[^>]+src="([^">]+)"/;
//     const matches = content.match(imgRegex);
//     return matches ? matches[1] : '/placeholder-image.jpg';
//   };

//   // Extract text preview without HTML tags
//   const extractPreview = (content, length = 150) => {
//     const strippedContent = content.replace(/<[^>]*>/g, '');
//     return strippedContent.substring(0, length) + (strippedContent.length > length ? '...' : '');
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 p-4 rounded-lg bg-red-50 border border-red-100">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {articles.map((article) => (
//           <div
//             key={article.guid}
//             className="bg-zinc-900 border-emerald-700 border-2 rounded-md overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
//           >
//             <div className="h-48 overflow-hidden">
//               <img
//                 src={extractImage(article.content)}
//                 alt={article.title}
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                 onError={(e) => { e.target.src = '/placeholder-image.jpg' }}
//               />
//             </div>
//             <div className="p-4 flex-grow flex flex-col">
//               <h3 className="text-xl text-white font-semibold mb-2 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
//                 {article.title}
//               </h3>
//               <p className="text-white opacity-50 mb-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
//                 {extractPreview(article.content)}
//               </p>
//               <div className="mt-auto flex justify-between items-center">
//                 <span className="text-sm text-emerald-600">
//                   {new Date(article.pubDate).toLocaleDateString()}
//                 </span>
//                 <a
//                   href={article.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
//                 >
//                   Read on Medium
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

     
//     </>
//   );
// };

// export default Medium;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MachineLearning from './MachineLearning';

const Medium = ({ username = 'gaganbansal475' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const url =
          `https://api.rss2json.com/v1/api.json?rss_url=` +
          encodeURIComponent(`https://medium.com/feed/@${username}`) +
          `&_=${Date.now()}`;
        const { data } = await axios.get(url, { headers: { 'Cache-Control': 'no-cache' } });
        const sorted = [...data.items].sort(
          (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
        );
        setArticles(sorted);
      } catch (err) {
        setError('Error fetching Medium articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [username]);

  const extractImage = (content) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const matches = content.match(imgRegex);
    return matches ? matches[1] : null;
  };

  const extractPreview = (content, length = 150) => {
    const stripped = content.replace(/<[^>]*>/g, '');
    return stripped.substring(0, length) + (stripped.length > length ? '…' : '');
  };

  if (loading) {
    return (
      <div style={styles.stateWrap}>
        <div style={styles.spinner} />
        <p style={styles.stateText}>Fetching articles…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorWrap}>
        <span style={styles.errorDot} />
        <p style={styles.errorText}>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div style={styles.grid}>
        {articles.map((article) => {
          const img = extractImage(article.content);
          const preview = extractPreview(article.content);
          const date = new Date(article.pubDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
          });

          return (
            <ArticleCard
              key={article.guid}
              title={article.title}
              preview={preview}
              img={img}
              date={date}
              link={article.link}
            />
          );
        })}
      </div>
      <MachineLearning />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
      `}</style>
    </>
  );
};

/* ── Article card with hover state in JS ── */
function ArticleCard({ title, preview, img, date, link }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        borderColor: hovered ? '#16a34a' : '#1f2937',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={styles.imgWrap}>
        {img && !imgError ? (
          <img
            src={img}
            alt={title}
            style={{
              ...styles.img,
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={styles.imgPlaceholder}>
            <span style={styles.placeholderIcon}>✦</span>
          </div>
        )}
        {/* Overlay gradient */}
        <div style={styles.imgOverlay} />
      </div>

      {/* Body */}
      <div style={styles.body}>
        <h3
          style={{
            ...styles.title,
            color: hovered ? '#d1fae5' : '#f1f5f9',
          }}
        >
          {title}
        </h3>
        <p style={styles.preview}>{preview}</p>

        <div style={styles.footer}>
          <span style={styles.date}>{date}</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.readBtn,
              background: hovered ? '#15803d' : '#16a34a',
            }}
          >
            Read →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Styles ── */
const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '12px',
  },

  /* Card */
  card: {
    background: '#161616',
    border: '1px solid #1f2937',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-color 0.2s',
    cursor: 'pointer',
  },

  /* Image */
  imgWrap: {
    position: 'relative',
    height: '180px',
    overflow: 'hidden',
    background: '#0f0f0f',
    flexShrink: 0,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.38s ease',
  },
  imgOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '60px',
    background: 'linear-gradient(to top, #161616, transparent)',
    pointerEvents: 'none',
  },
  imgPlaceholder: {
    width: '100%',
    height: '100%',
    background: '#111',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: '28px',
    color: '#1f2937',
  },

  /* Body */
  body: {
    padding: '18px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: '8px',
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: 1.35,
    letterSpacing: '-0.02em',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    transition: 'color 0.2s',
  },
  preview: {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: '12.5px',
    color: '#4b5563',
    lineHeight: 1.65,
    fontWeight: 300,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flexGrow: 1,
  },

  /* Footer */
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    marginTop: '4px',
  },
  date: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: '#374151',
  },
  readBtn: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    fontWeight: 500,
    color: '#fff',
    padding: '6px 14px',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'background 0.18s',
    flexShrink: 0,
  },

  /* Loading */
  stateWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
    padding: '60px 0',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '2px solid #1f2937',
    borderTop: '2px solid #16a34a',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  stateText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: '#374151',
  },

  /* Error */
  errorWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 20px',
    background: '#161616',
    border: '1px solid #1f2937',
    borderRadius: '8px',
  },
  errorDot: {
    display: 'inline-block',
    width: '6px', height: '6px',
    borderRadius: '50%',
    background: '#ef4444',
    flexShrink: 0,
  },
  errorText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    color: '#6b7280',
  },
};

export default Medium;