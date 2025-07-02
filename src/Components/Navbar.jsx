import { Link } from "react-router-dom";
import { HouseLine, UserCirclePlus, ArticleMedium, NotePencil } from "@phosphor-icons/react"


export default function Navbar() {
  return (
    <div className="bg-zinc-950 sticky top-0 z-50">
        <div className="w-10/12 md:w-6/12 mx-auto py-4">
            <div className="flex flex-row items-center justify-center text-xl text-zinc-200 font-extrabold gap-x-4">
                <Link to="/">
                <div className="hover:text-yellow-200 cursor-pointer">
                  <HouseLine size={32} />  
                </div> 
                </Link>
                <Link to='/article'>
                <div className="hover:text-yellow-200 cursor-pointer">
                  <ArticleMedium size={32} />
                </div>
                </Link>
                <Link to='/notes'>
                <div className="hover:text-yellow-200 cursor-pointer">
                  <NotePencil size={32} />
                </div>
                </Link>
                <Link to='/contact'>
                <div className="hover:text-yellow-200 cursor-pointer">
                  <UserCirclePlus size={32} />
                </div>
                </Link>
            </div>
        </div>
    </div>
  )
}
