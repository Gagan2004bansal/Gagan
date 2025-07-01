import Navbar from "./Navbar";
import Medium from "./Medium";

export default function Article() {
  return (
    <div className="bg-zinc-900 font-serif text-zinc-200 h-screen overflow-y-scroll ">

      <Navbar />

      <div className="mt-8">
        <marquee><span className="text-yellow-600">New article soon</span> : A complete beginner guide to RUST programming.</marquee>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">My Medium Articles</h2>
        <Medium username="gaganbansal475" />
      </div>
    

    </div>
  )
}
