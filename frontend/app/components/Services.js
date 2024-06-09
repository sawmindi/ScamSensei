import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Services() {
  return (
    <div className="  w-full pb-20 pt-12"><br/><br/><br/>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <motion.div
          className="flex-auto w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] p-4  rounded-lg relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="custom-h1 ">What can you do with us </h1>
        </motion.div>
      </div>
  <div className="grid gap-14 md:grid-cols-3 md:gap-5">
  <motion.div
          
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4}}
        >
    <div className="rounded-xl border border-zinc-600 p-6 text-center shadow-xl">
      
      <div
        className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
        <Image src="/chatbot.svg" alt="AI" width={30} height={30}  />
      </div>
      <h1 className="text-darken mb-3 text-xl font-medium lg:px-14 text-white">Ask your Questions</h1>
      <p className="px-4 text-gray-400">Got scam questions? Our chatbot's got answers! Stay informed and scam-smart about recent scams and trends in Sri Lanka. Start chatting now!</p>
    </div></motion.div>
    <motion.div
          
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4}}
        >
    <div className="rounded-xl border border-zinc-600  p-6 text-center shadow-xl">
      
      <div
        className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
        <Image src="/search-square-svgrepo-com.svg" alt="AI" width={30} height={30} />
      </div>
      <h1 className="text-darken mb-3 text-xl font-medium lg:px-14 text-white">Finding Scams</h1>
      <p className="px-4 text-gray-400">Explore user experiences from Sri Lanka! Filter by location or check out all posts for insights on reported scams. Vote to prioritize important info. Let's build a vigilant community together!</p>
    </div></motion.div>
    <motion.div
          
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4}}
        >
    <div className="rounded-xl border border-zinc-600 p-6 text-center shadow-xl">
      
      <div
        className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
         <Image src="/share-svgrepo-com.svg" alt="AI" width={30} height={30} />
      </div>
      <h1 className="text-darken mb-3 text-xl font-medium lg:px-14 text-white">Share your Experiences.</h1>
      <p className="px-4 text-gray-400"> Create a post about a scam! Share the location and your experience. Describe the scam and help others stay safe. Join us in empowering everyone to recognize and avoid scams!</p>
    </div></motion.div>
  </div>

</div>
  );
};