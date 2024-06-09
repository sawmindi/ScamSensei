'use client'
import React, { useState } from "react";
import UserIcon from "../components/UserIcon";
import { useAuth } from "../context/AuthContext";
import { CiHome } from "react-icons/ci";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineHowToVote } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import Image from "next/image";

const Navigation = () => {
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState(false);
    const auth = useAuth();
    

    return (
        <>
            <div className="w-full  h-full ">
                <div className="flex flex-no-wrap">
                    {/* Sidebar starts */}
                    <div className="  z-30 fixed  sm:w-50 h-screen shadow bg-black lg:block pt-8 hidden  border border-t-0 border-l-0 border-b-0 border-gray-700 ">
                    <span className="self-center ml-10 text-2xl font-semibold whitespace-nowrap dark:text-white">ScamSensei</span><br/><br/><br></br>
                        <div className="h-16 w-full flex items-center px-8  ">
                        
                        <Image src="/logo.png" alt="logo" width={150} height={150} />
                        </div>
                        <ul aria-orientation="vertical" className=" py-6">
                            <li className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal mb-6 pt-5 hover:text-rose-500 focus:text-indigo-700 focus:outline-none">
                                <div className="flex items-center"><CiHome />
                                    <a href="/">
                                        <span className="ml-2">Home</span>
                                    </a>
                                    
                                </div>
                            </li>
                            {auth.isLoggedIn && (
                            <li className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal mb-6 hover:text-rose-500 focus:text-gray-600 focus:outline-none">
                                <div className="flex items-center"><IoChatboxEllipsesOutline />
                                <a href="/Chatbot">
                                       <span className="ml-2">Chatbot</span>
                                    </a>
                                    
                                </div>
                            </li>
                        )}
                            <li className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal mb-6 hover:text-rose-500 focus:text-gray-600 focus:outline-none">
                                <div className="flex items-center"><GrMapLocation />
                                    <a href="/Findscams">
                                        <span className="ml-2">Find Scam by Location</span>
                                    </a>
                                    
                                </div>
                            </li>
                            <li className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal mb-6 hover:text-rose-500 focus:text-gray-600 focus:outline-none">
                                <div className="flex items-center"><MdOutlineHowToVote />
                                    <a href="/PostList">
                                         <span className="ml-2">Find Scam by Voting</span>
                                    </a>
                                   
                                </div>
                            </li>
                            <li className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal mb-6 hover:text-rose-500 focus:text-gray-600 focus:outline-none">
                                <div className="flex items-center"><IoCreateOutline />
                                    <a href="/PostList/new">
                                         <span className="ml-2">Submit Scam</span>
                                    </a>
                                   
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/*Mobile responsive sidebar*/}
                    <div className={show ? "w-full h-full fixed z-40  transform  translate-x-0 " : "   w-full h-full absolute z-40  transform -translate-x-full"} id="mobile-nav">
                        <div className=" opacity-50 absolute h-full w-full lg:hidden" onClick={() => setShow(!show)} />
                        <div className="absolute z-40 sm:relative w-64 md:w-96 pb-4 bg-gray-100 lg:hidden transition duration-150 ease-in-out h-full">
                            <div className="flex flex-col justify-between h-full w-full ">
                                <div>
                                    <div className="flex items-center justify-between px-8 pt-10">
                                    <div className="h-16 w-full flex items-center px-8">
                                        <Image src="/logo.png" alt="logo" width={150} height={150} />
                                    </div>
                                        <div id="closeSideBar" className="flex items-center justify-center h-10 w-10" onClick={() => setShow(!show)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <line x1={18} y1={6} x2={6} y2={18} />
                                                <line x1={6} y1={6} x2={18} y2={18} />
                                            </svg>
                                        </div>
                                    </div>
                                    <ul aria-orientation="vertical" className=" py-6">
                                        <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pb-4 pt-5 focus:text-rose-700 focus:outline-none">
                                            <div className="flex items-center">
                                                
                                                <span className="ml-2 xl:text-base md:text-2xl text-base">Home</span>
                                            </div>
                                        </li>
                                        {auth.isLoggedIn && (
                            <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-4 mb-4 py-2 hover:text-rose-700 focus:text-rose-700 focus:outline-none">
                                <div className="flex items-center">
                                    <span className="ml-2">Chatbot</span>
                                </div>
                            </li>
                        )}
                                        <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-rose-700 focus:rose-indigo-700 focus:outline-none">
                                            <div className="flex items-center">
                                                
                                                <span className="ml-2 xl:text-base md:text-2xl text-base">Scam by location</span>
                                            </div>
                                        </li>
                                        <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-rose-700 focus:text-rose-700 focus:outline-none">
                                            <div className="flex items-center">
                                               
                                                <span className="ml-2 xl:text-base md:text-2xl text-base">scam by voting</span>
                                            </div>
                                        </li>
                                        <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-rose-700 focus:text-indigo-700 focus:outline-none">
                                            <div className="flex items-center">
                                               
                                                <span className="ml-2 xl:text-base md:text-2xl text-base">submit scam</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full">
                                    
                                    <div className="border-t border-gray-300">
                                        <div className="w-full flex   px-6 pt-1">
                                            <UserIcon/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Mobile responsive sidebar*/}
                    {/* Sidebar ends */}
                    <div className="w-full">
                        {/* Navigation starts */}
                        <nav className="h-16  flex items-center lg:items-stretch justify-end lg:justify-between bg-black shadow fixed w-full z-10 pl-10">
                            <div className="hidden lg:flex w-full pr-6 pl-10 border border-t-0 border-gray-700">
                                <div className="w-1/2  h-full hidden lg:flex items-center  pr-24  ">
                                    <div className="relative w-full">
                                        <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <circle cx={10} cy={10} r={7} />
                                                <line x1={21} y1={21} x2={15} y2={15} />
                                            </svg>
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="w-1/2 hidden lg:flex">
                                    <div className="w-full flex items-center pl-8 justify-end">
                                    
                                       
                                        <div className="flex items-center relative cursor-pointer" onClick={() => setProfile(!profile)}>
                                           <UserIcon/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-gray-600 mr-8 visible lg:hidden relative" onClick={() => setShow(!show)}>
                                {show ? (
                                    " "
                                ) : (
                                    <svg aria-label="Main Menu" aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu cursor-pointer" width={30} height={30} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={4} y1={8} x2={20} y2={8} />
                                        <line x1={4} y1={16} x2={20} y2={16} />
                                    </svg>
                                )}
                            </div>
                        </nav>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
export default Navigation;
