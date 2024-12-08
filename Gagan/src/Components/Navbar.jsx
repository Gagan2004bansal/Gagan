import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="bg-zinc-950 sticky top-0 z-50">
        <div className="w-10/12 md:w-6/12 mx-auto py-4">
            <div className="flex flex-row items-center justify-center text-xl text-zinc-200 gap-x-4 font-serif">
                <Link to="/">
                <div className="hover:underline cursor-pointer">Home</div>
                </Link>
                <Link to='/article'>
                <div className="hover:underline cursor-pointer">Article</div>
                </Link>
                <Link to='/contact'>
                <div className="hover:underline cursor-pointer">Contact</div>
                </Link>
            </div>
        </div>
    </div>
  )
}
