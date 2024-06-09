import React from 'react';
import { CiFacebook } from "react-icons/ci";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";
import Image from "next/image";
import logos from "../../public/logos.png";

function Footer() {
  return (
    <footer>
     <footer className="p-4 md:p-8 lg:p-10 bg-[#2a302e] ">
  <div className="mx-auto max-w-screen-xl text-center">
      <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
      <Image src={logos} alt="logo" width={60} height={60} className="h-15" />
          ScamSensei   
      </a>
      <p className="my-6 text-gray-500 dark:text-gray-400">ScamSensei is a platform designed to help you navigate through common scams and share your experiences. Our goal is to create a 
            community where locals and foreigners can come together to learn and stay informed about various fraudulent activities.
             Join us in our mission to make our communities safer and more secure.</p>
      <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
              <a href="/" className="mr-4 hover:underline md:mr-6 ">Home</a>
          </li>
          
          <li>
              <a href="/Chatbot" className="mr-4 hover:underline md:mr-6 ">Chatbot</a>
          </li>
          <li>
              <a href="/Findscams" className="mr-4 hover:underline md:mr-6">Posts</a>
          </li>
          <li>

              <a href="/Privacy" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>

          </li>
          
      </ul>
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">ScamSensei™</a><br/> All Rights Reserved.</span>
  </div>
</footer>
    </footer>
  )
}

export default Footer