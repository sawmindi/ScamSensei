'use client'
import React, { useState, useEffect, useRef } from "react";
import logos from "../../public/logos.png";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

const UserIcon = () => {
  const auth = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) 
           
          ) {
            setIsDropdownOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

      return(
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative " ref={dropdownRef}>
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <Image src="/UserDetails/anonymous_avatars_grey_circles.jpg" width={50} height={50} className="w-8 h-8 rounded-full" alt="user photo" />
            </button>
            <div
              className={`absolute top-full right-0 z-50 ${isDropdownOpen ? 'block' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              {auth.isLoggedIn ? (
                 <div className="px-4 py-3">
                 <span className="block text-sm text-gray-900 dark:text-white">{auth.user?.name}</span>
                 <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{auth.user?.email}</span>
               </div>
              ) : (<>
              
              </>)
              
                    }
             
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="/UserDetailPage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Details</a>
                </li>
                {auth.isLoggedIn ? (
                <li>
                <a onClick={auth.logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</a>
              </li>
                ) : (<li>
                  <a href="Signin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log in</a>
                </li>)}
              </ul>
            </div>
          </div>

      );

};
export default UserIcon;
