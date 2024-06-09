'use client'
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { TypeAnimation } from 'react-type-animation';
import Services from "./components/Services";
import VideoPlayer from "./components/VideoPlayer";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactForm from "./components/ContactForm";



   

export default function Home() {
  return (
    <>
        <Navbar/>
        <div className="relative">
        <div className="fixed top-0 left-0 w-full h-full z-[-1]">
        
      </div>
        <br/>
        
       <div className={'flex flex-col  min-h-screen  ' }>
       <div className="mainPage">
          <div className="video-container z-[-1] min-h-screen">
          <div className="video-overlay z-1 ">
            <video className="video-background " autoPlay loop muted>
              <source src="/main/main1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video></div>
          </div>
          
          <div className={'  content'}>
               <div >
                    <h1 className="sm:mx-auto sm:w-10/12 md:w-2/3 font-semibold text-2xl sm:text-center md:text-center xl:text-center text-center sm:text-4xl md:text-5xl lg:w-auto lg:text-left xl:text-5xl text-white">Don&apos;t Get Your Vacation Ruined <br className="lg:block hidden"/> <span className="  text-teal-400">With Scams</span>.</h1><b>
                    <div className="flex justify-center items-center">
                      <TypeAnimation 
                        sequence={[
                          ' Join Scamsensei Today.',
                          3000,
                          ' We are Here to Help.',
                          3000,
                        ]}
                        wrapper="span"
                        speed={5}
                        repeat={Infinity}
                        className="  text-zinc-200 font-medium text-2xl pl-5"
                      />
                    </div>

                        </b>
               </div>
              
           </div>

        </div>

        <div className="ml-5 mr-5">
           <br/><hr/>
          <Services/>
          <VideoPlayer/>
          <AboutUs/>
        <ContactForm/>
          </div>
       </div>  </div>
       <Footer/>
       
    </>
  );
}




