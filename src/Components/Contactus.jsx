import Navbar from "./Navbar";
import { useState } from 'react';
import { Copyright } from "@phosphor-icons/react";
import emailjs from '@emailjs/browser';

const REACT_APP_SERVICE_ID = "service_76y714d";
const REACT_APP_TEMPLATE_ID_USER = "template_ysqctsh"; 
const REACT_APP_PUBLIC_KEY = "ly4aRz7UP1-E0knMA";

export default function Contactus() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);

    const sendEmail = (e) => {
        e.preventDefault(); 
        setIsSubmitting(true); 
        setStateMessage(null); 
        
        const formData = new FormData(e.target); 
        const userName = formData.get("user_name");
        const userEmail = formData.get("user_email");
        const userMessage = formData.get("message");

        const templateParamsForOwner = {
            user_name: userName,
            user_email: userEmail, 
            message: userMessage
        };

        emailjs
            .send(
                REACT_APP_SERVICE_ID,
                REACT_APP_TEMPLATE_ID_USER,
                templateParamsForOwner,
                REACT_APP_PUBLIC_KEY
            )
            .then(
                (result) => {
                    console.log("Message sent to owner:", result.text);
                    setTimeout(() => {
                        setStateMessage("Your message has been sent successfully!");
                    }, 5000);
                    setIsSubmitting(false);
                },
                (error) => {
                    console.error("Error sending to owner:", error.text);
                    setTimeout(() => {
                        setStateMessage("Failed to send the message. Please try again later.");
                    }, 5000);
                    setIsSubmitting(false);
                }
            );

        e.target.reset();
    };

    return (
        <>
            <div className="bg-zinc-900 font-serif text-zinc-200 h-screen overflow-y-scroll">
                <Navbar />
                <div className="flex items-center justify-center mt-10">
                    <form onSubmit={sendEmail} className="flex flex-col gap-y-4 w-10/12 md:w-6/12 py-4">
                        <label htmlFor="user_name">Name</label>
                        <input
                            type="text"
                            name="user_name"
                            id="user_name"
                            placeholder="Enter name"
                            required
                            className="bg-transparent pl-4 w-full py-2 rounded-md border-b-[0.5px] border-opacity-30"
                        />
                        <label htmlFor="user_email">Email</label>
                        <input
                            type="email"
                            name="user_email"
                            id="user_email"
                            placeholder="Enter email"
                            required
                            className="bg-transparent pl-4 w-full py-2 rounded-md border-b-[0.5px] border-opacity-30"
                        />
                        <label htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Enter message"
                            required
                            className="bg-transparent w-full pl-4 py-2 rounded-md border-b-[0.5px] border-opacity-30"
                        />
                        <input
                            type="submit"
                            value="Send"
                            disabled={isSubmitting}
                            className="cursor-pointer mt-4 px-10 py-2 bg-yellow-400 hover:bg-yellow-500 w-fit text-black rounded-sm"
                        />
                        {stateMessage && <p className="mt-2 text-center text-yellow-400">{stateMessage}</p>}
                    </form>
                </div>
                <div className="w-10/12 md:w-6/12 mx-auto h-[0.5px] bg-zinc-600 my-10"></div>
                <div className="flex gap-x-2 items-center justify-center">
                    Gagan Bansal <Copyright size={20} />2025
                </div>
            </div>
        </>
    );
}
