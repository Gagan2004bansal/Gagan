import Navbar from "./Navbar";
import { Certificate } from "@phosphor-icons/react";

export default function Notes() {
    return (
        <div className="bg-zinc-900 font-serif h-screen overflow-y-scroll ">

            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold mb-6 text-white">Certifications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-white p-2 rounded-md">
                        <div className="">
                            <img className="object-contain w-full h-64" src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~FPVVPJ2ZC7F9/CERTIFICATE_LANDING_PAGE~FPVVPJ2ZC7F9.jpeg" alt="" />
                        </div>
                        <div className="p-2 text-center">
                            <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>AI Foundations for Everyone</h3>
                            <a href="https://coursera.org/share/cef8734df2b492650b47b5accbc9d10b" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
                        </div>
                    </div>

                    <div className="bg-white p-2 rounded-md">
                        <div className="">
                            <img className="object-contain w-full h-64" src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~TN6SBLCR47US/CERTIFICATE_LANDING_PAGE~TN6SBLCR47US.jpeg" alt="" />
                        </div>
                        <div className="p-2 text-center">
                            <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>Leading People and Teams</h3>
                            <a href="https://coursera.org/share/746e14424326f3efa99961ffb7554fc5" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
                        </div>
                    </div>

                    {/* 2 */}
                    <div className="bg-white p-2 rounded-md">
                        <div className="">
                            <img className="object-contain w-full h-64" src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~IFAR02UMDD0O/CERTIFICATE_LANDING_PAGE~IFAR02UMDD0O.jpeg" alt="" />
                        </div>
                        <div className="p-2 text-center">
                            <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>The Art of the Job Interview</h3>
                            <a href="https://coursera.org/share/aa1f8d46d97d6cfb646dc218c8cd1f13" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
                        </div>
                    </div>

                    {/* 3 */}
                    <div className="bg-white p-2 rounded-md">
                        <div>
                            <img className="object-contain w-full h-64" src="https://udemy-certificate.s3.amazonaws.com/image/UC-a39312cc-317c-45e7-bbda-033ffa8a85dd.jpg?v=1703609071000" alt="" />
                        </div>
                        <div className="p-2 text-center">
                            <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>Figma Design Course</h3>
                            <a href="https://www.udemy.com/certificate/UC-a39312cc-317c-45e7-bbda-033ffa8a85dd/" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
                        </div>
                    </div>

                    {/* 4 */}
                    <div className="bg-white p-2 rounded-md">
                        <div>
                            <img className="object-contain w-full h-64" src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~D5SLG3BE5WLR/CERTIFICATE_LANDING_PAGE~D5SLG3BE5WLR.jpeg" alt="" />
                        </div>
                        <div className="p-2 text-center">
                            <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>C for Everyone: Programming</h3>
                            <a href="https://coursera.org/share/c17aea30211de99ee27b74a68a79b836" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
                        </div>
                    </div>

                    {/* 5 */}
                    <div className="bg-white p-2 rounded-md">
                        <div>
                            <img className="object-contain w-full h-64" src="https://cc.sj-cdn.net/instructor/3d8458f2k85sh-postman/courses/1a8b8cdxvqjxq/promo-image.1676069333.png" alt="" />
                        </div>
                        <div className="p-2 text-center">
                            <h3 className="text-yellow-600 font-extrabold text-lg mb-4 flex justify-center"><span className="text-black mr-2"><Certificate size={32} /></span>Postman API Student Expert</h3>
                            <a href="https://badgr.com/public/assertions/ocdy-CL-SA6QQB5NnvdsyQ?identity__email=gaganbansal475%40gmail.com" target="_blank" rel="noopener noreferrer" className="font-bold px-6 py-2 rounded-sm bg-yellow-400 hover:bg-yellow-500 cursor-pointer">Open</a>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}
