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
        // Using RSS2JSON to convert Medium's RSS feed to JSON
        const response = await axios.get(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
        );

        if (response.data.status === 'ok') {
          setArticles(response.data.items);
        } else {
          throw new Error('Failed to fetch articles');
        }
      } catch (err) {
        setError('Error fetching Medium articles. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [username]);

  // Extract first image from article content
  const extractImage = (content) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const matches = content.match(imgRegex);
    return matches ? matches[1] : '/placeholder-image.jpg';
  };

  // Extract text preview without HTML tags
  const extractPreview = (content, length = 150) => {
    const strippedContent = content.replace(/<[^>]*>/g, '');
    return strippedContent.substring(0, length) + (strippedContent.length > length ? '...' : '');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 rounded-lg bg-red-50 border border-red-100">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.guid}
            className="bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={extractImage(article.content)}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.src = '/placeholder-image.jpg' }}
              />
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-xl text-white font-semibold mb-2 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {article.title}
              </h3>
              <p className="text-white opacity-50 mb-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                {extractPreview(article.content)}
              </p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-sm text-yellow-600">
                  {new Date(article.pubDate).toLocaleDateString()}
                </span>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Read on Medium
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </>
  );
};

export default Medium;