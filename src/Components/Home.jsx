import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { LinkedinLogo, GithubLogo, Copyright, ReadCvLogo, Heart, Wrench, Lightbulb, Kanban, SketchLogo } from "@phosphor-icons/react"

export default function Home() {
    return (
        <div className="bg-zinc-900 font-serif text-zinc-200">

            <Navbar />

            <div className="flex flex-col-reverse items-center justify-center gap-y-6 md:gap-x-16 md:flex-row w-10/12 md:w-6/12 mx-auto py-4 my-10">
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-4xl">Gagan Bansal</h2>
                    <p className="font-extralight text-zinc-50 opacity-65">Final Year Student at Chitkara University, Chandigarh</p>
                    <div className="flex flex-row items-center justify-start gap-x-4">
                        <Link to="https://www.linkedin.com/in/bansalgagan2004/">
                            <div className="hover:text-yellow-200 cursor-pointer"><LinkedinLogo size={32} /></div>
                        </Link>
                        <Link to="https://github.com/Gagan2004bansal">
                            <div className="hover:text-yellow-200 cursor-pointer"><GithubLogo size={32} /></div>
                        </Link>
                        <Link to="https://leetcode.com/u/Gagan_Bansal/">
                            <div className="text-yellow-500 text-lg cursor-pointer hover:text-white">Leetcode</div>
                        </Link>
                        <a href="/Data/GaganBansalCV.pdf" target="_blank" rel="noopener noreferrer">
                            <div className="hover:text-yellow-200 cursor-pointer"><ReadCvLogo size={32} /></div>
                        </a>
                    </div>
                </div>
                <div>
                    <img className="w-48 h-48 rounded-full object-cover object-center" src="/Data/gagan.jpeg" alt="loading..." />
                </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-y-6 md:gap-x-16 w-10/12 md:w-6/12 mx-auto py-4 my-10">
                <div className="text-xl font-bold"><span className="flex gap-x-2"><Wrench size={32} /> about</span></div>
                <div className="flex flex-col items-center justify-start gap-y-4 opacity-80">
                    <div>Hey there, I’m Gagan — a Computer Science student who loves building things that solve real problems.</div>

                    <div>Right now, I’m exploring Rust and diving deep into System Design (both HLD & LLD), leveling up my skills to build scalable, efficient systems. My toolkit also includes C/C++, MERN stack, UI Design, and solid DSA foundations.</div>

                    <div>But beyond the code — I’m all about understanding the why behind products. Whether it’s designing intuitive user experiences, brainstorming solutions, or bringing ideas to life with a team, I enjoy every step of the process.</div>

                    <div>When I’m not building or learning, you’ll catch me lost in books, writing about tech, jamming on my guitar, or chasing sunsets and late-night sky views.</div>

                    <div>Always learning. Always building. Let’s create something meaning</div>
                </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-y-6 md:gap-x-16 w-10/12 md:w-6/12 mx-auto py-4 my-10">
            <div className="text-xl font-bold"><span className="flex gap-x-2"><Lightbulb size={32} /> skills</span></div>
                <div className="opacity-80 gap-y-4">
                    <div>
                        <span className="text-yellow-500 text-lg">Languages</span> : C/C++, Rust, Java
                    </div>
                    <div>
                        <span className="text-yellow-500 text-lg">Web Expertise</span> : HTML, CSS, Tailwind CSS, JavaScript, React.Js, Node.Js, Express.Js, RESTful API, MongoDB, SQL, Socket
                    </div>
                    <div>
                        <span className="text-yellow-500 text-lg">Dev Tools</span> : Linux, AWS EC2, Git, Github, Jupyter Notebook, Figma, Canva
                    </div>
                    <div>
                        <span className="text-yellow-500 text-lg">Behavioral Skills</span> : Leadership, Active listening, Initiative, Adaptability
                    </div>
                    <div>
                        <span className="text-yellow-500 text-lg">Courses</span> : Data Structures and Algorithms, Operating System, Computer Networks, Database Management System, Object Oriented Programming, System Design, SDLC
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-y-6 md:gap-x-16 w-10/12 md:w-6/12 mx-auto py-4 mt-10">
            <div className="text-xl font-bold"><span className="flex gap-x-2"><Kanban size={32} /> project's</span></div>
                <div>

                    <div className="flex flex-col gap-y-4">
                        <div className="flex items-center justify-center gap-x-4">
                            <img className="w-28 h-28 object-cover rounded-full" src="https://res.cloudinary.com/dz5ezyudo/image/upload/v1733649439/CDS_1_prjkrt.png" alt="loading..." />
                            <div>
                                <Link to="https://github.com/Gagan2004bansal/SANGAM">
                                    <div className="text-red-500 underline">Taskify</div>
                                </Link>
                                <div><span className="text-yellow-500">Features</span> : Sangam is a real-time collaborative note-taking app designed for seamless teamwork, allowing users to edit and share notes instantly. With powerful sorting features, users can easily organize and filter notes using tags, priorities, and custom views for efficient information management.</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-x-4">
                            <img className="w-28 h-28 object-cover rounded-full" src="https://res.cloudinary.com/dz5ezyudo/image/upload/v1733644765/Screenshot_2024-12-08_at_1.29.04_PM_ztj4bb.png" alt="loading..." />
                            <div>
                                <Link to="https://github.com/Gagan2004bansal/CDS">
                                    <div className="text-red-500 underline">CDS Library</div>
                                </Link>
                                <div><span className="text-yellow-500">Features</span> : A custom C library featuring data structures like linked lists, stacks, queues, hash tables, trees, and graphs, along with sorting algorithms and a dynamic string utility. It aims to offer efficient and flexible tools for C projects.</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-x-4">
                            <img className="w-28 h-28 object-cover rounded-full" src="https://res.cloudinary.com/dz5ezyudo/image/upload/v1733645065/CDS_unocpc.png" alt="loading..." />
                            <div>
                                <div className="text-red-500 underline">PingMe</div>
                                <div><span className="text-yellow-500">Features</span> : Enhanced user engagement by implementing features like real-time typing indicators, online/offline status updates,
                                    and media sharing, resulting in a smooth and responsive chat experience.</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-x-4">
                            <img className="w-28 h-28 object-cover" src="https://res.cloudinary.com/dz5ezyudo/image/upload/v1733644460/favicon_1_fq1wf0.png" alt="loading..." />
                            <div>
                                <Link to="https://intellisync-hack.onrender.com/"><div className="text-red-500 underline">IntelliSync</div></Link>
                                <div><span className="text-yellow-500">Features</span> : IntelliSync is a one-stop platform for computer science students, featuring an online compiler, subject roadmaps, quizzes, a helpful chatbot, and a vast library of downloadable books to support learning and development.</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-y-6 md:gap-x-16 w-10/12 md:w-6/12 mx-auto py-4 my-10">
            <div className="text-xl font-bold"><span className="flex gap-x-2"><SketchLogo size={32} /> achievement</span></div>
                <div className="opacity-80">
                    <div>
                        <span className="text-yellow-500 text-lg">Finalists</span> : Smart Cataloging Hackathon by Shopclues
                        and selected in the Top 5 among 70+ teams.
                    </div>
                    <div>
                        <span className="text-yellow-500 text-lg">Specialization</span> : Ranked in the top 80 students among 2500+ students in the department and selected for UCA Batch in University
                    </div>
                    <div>
                        <span className="text-yellow-500 text-lg">Grade</span> : I have consistently maintained a CGPA of 9.33 till today.
                    </div>
                    <div>
                        <span className="text-yellow-500 text-lg">Mastered</span> : I have solved over 1200+ questions across various platforms to strengthen my problem-solving skills.
                    </div>
                </div>
            </div>

            <div className="w-10/12 md:w-6/12 mx-auto h-[0.5px] bg-zinc-600 mt-10"></div>
            <div className="flex gap-x-2 items-center justify-center py-4">
                Developed with <span className="text-red-600"><Heart size={32} /></span> by Gagan Bansal <Copyright size={20} />2025
            </div>

        </div>
    )
}
