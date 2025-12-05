import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://gagan-backend-k9x1.onrender.com/api"
// const BASE_URL = "http://localhost:3002/api";

function MachineLearning() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/ml`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <div className="text-2xl mb-6">MACHINE LEARNING</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice().reverse().map((post) => (
            <div key={post._id} className="bg-zinc-800 rounded-md p-4">
              <img className="rounded-md" src={post.thumbnail} />

              <div className="text-xl text-yellow-400 mt-3">{post.title}</div>

              <Link to={`/ml/${post.slug}`}>
                <p className="underline hover:cursor-pointer">Read</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MachineLearning;
