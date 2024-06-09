'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logos from "../../public/logos.png";
import { useAuth } from "../context/AuthContext";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserIcon, CogIcon } from "@heroicons/react/24/outline";
import avatarany from "../../public/UserDetails/anonymous_avatars_grey_circles.jpg";

const Navbar = () => {
  const auth = useAuth();
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Chatbot", href: "/Chatbot", current: false, authRequired: true },
    {
      name: "FindScams",
      submenu: [
        { name: "by Location", href: "/Findscams", current: false },
        { name: "by Upvotes", href: "/PostList", current: false },
        { name: "by Searchbot", href: "/Chatbot2", current: false },
      ],
    },
    { name: "Submit Scam", href: "/New", current: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <Disclosure as="nav" className={`fixed top-0 w-full z-30  bg-black ${visible ? "" : "-translate-y-full"} transition-transform duration-300`}>
      {({ open }) => (
        <>
          <div className=" mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <Image src={logos} alt="logo" width={60} height={60} className="h-15" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ScamSensei</span>
                </a>
              </div>
              <div className="hidden md:block">
                <div className="flex space-x-4">
                  {navigation.map((item) =>
                    !item.submenu ? (
                      !item.authRequired || auth.isLoggedIn ? (
                        <a key={item.name} href={item.href} className={`px-3 py-2 rounded-md text-md font-medium ${item.current ? "bg-black text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}>
                          {item.name}
                        </a>
                      ) : null
                    ) : (
                      <Menu as="div" className="relative inline-block text-left" key={item.name}>
                        <div>
                          <Menu.Button className="inline-flex justify-center w-full px-3 py-2 rounded-md text-md font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            {item.name}
                            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </Menu.Button>
                        </div>
                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {item.submenu.map((subitem) => (
                                <Menu.Item key={subitem.name}>
                                  {({ active }) => (
                                    <a href={subitem.href} className={`block px-4 py-2 text-md text-gray-700 ${active ? "bg-gray-100" : ""}`}>
                                      {subitem.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )
                  )}
                </div>
              </div>
              <div className="md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              <div className="hidden md:flex md:items-center md:ml-6">
                {auth.isLoggedIn ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="flex text-md rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <Image width={30} height={30} className="h-8 w-8 rounded-full" src={"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1710406375~exp=1710406975~hmac=3c2f68d6d389e36f571b7253e4c02038875a943e5eec2e66eacb3f94ee5b359e"} alt="" />
                      </Menu.Button>
                    </div>
                    <Transition
                      
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-50 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="flex flex-row py-2">
                      <div >
                      <Image width={30} height={30} className="h-10 w-10 rounded-full" src={"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1710406375~exp=1710406975~hmac=3c2f68d6d389e36f571b7253e4c02038875a943e5eec2e66eacb3f94ee5b359e"} alt="avatar" />
                    </div>
                    <div className="flex flex-col gap-2 px-2 ">
                      <div className="text-md font-medium leading-none text-gray-400">{auth.user.name}</div>
                      <div className="text-md font-medium leading-none text-gray-400">{auth.user.email}</div>
                    </div>
                    </div>
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/UserDetailPage" className={`block px-4 py-2 text-md text-gray-700 ${active ? "bg-gray-100" : ""}`}>
                              <UserIcon className="mr-2 h-5 w-5 inline" /> Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a onClick={auth.logout} className={`block px-4 py-2 text-md text-gray-700 ${active ? "bg-gray-100" : ""}`}>
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <a href="/Signin" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium">Sign in</a>
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) =>
                !item.submenu ? (
                  !item.authRequired || auth.isLoggedIn ? (
                    <Disclosure.Button key={item.name} as="a" href={item.href} className={`block px-3 py-2 rounded-md text-base font-medium ${item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}>
                      {item.name}
                    </Disclosure.Button>
                  ) : null
                ) : (
                  <Disclosure.Button key={item.name} as="div" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    {item.name}
                    <div className="mt-1 space-y-1">
                      {item.submenu.map((subitem) => (
                        <a key={subitem.name} href={subitem.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  </Disclosure.Button>
                )
              )}
              {auth.isLoggedIn ? (
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Image width={30} height={30} className="h-10 w-10 rounded-full" src={"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1710406375~exp=1710406975~hmac=3c2f68d6d389e36f571b7253e4c02038875a943e5eec2e66eacb3f94ee5b359e"} alt="avatar" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{auth.user.name}</div>
                      <div className="text-md font-medium leading-none text-gray-400">{auth.user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button as="a" href="/UserDetailPage" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                      Profile
                    </Disclosure.Button>
                    <Disclosure.Button as="a" onClick={auth.logout} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                      Sign out
                    </Disclosure.Button>
                      
                  </div>
                </div>
              ) : (
                <Disclosure.Button as="a" href="/Signin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                  Sign in
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
