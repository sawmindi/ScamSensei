"use client";import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { CiSearch } from "react-icons/ci";
import CreatePost from "./CreatePost";
import PaginationButtons from "../components/PaginationButtons";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Feed from "./Feed";

const style = {
  main: "mx-auto flex w-full max-w-7xl space-x-6 py-5 px-6",
  content: "w-full space-y-4 lg:w-full mx-auto mt-[10vh] justify-center items-center flex flex-col min-h-screen",
  searchContainer: "sm:w-1/3 w-full flex flex-col mx-6 sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2",
  searchInput:
    "flex-grow block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500",
  button:
    "bg-slate-50 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
};

const PostList = () => {
  const auth = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await auth.pagination(auth.page, auth.limit);
      auth.setUserData(data.posts);
      setIsLoading(false);
    };
    fetchData();
  }, [auth.page, auth.limit]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <main className={style.main}>
        <div className={style.content}>
          <div className={style.searchContainer}>
            <form className="max-w-md mx-auto flex-grow justify-start">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
              <div className="relative flex w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <CiSearch className="text-2xl text-slate-50" />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearch}
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for a specific post"
                  required
                />
              </div>
            </form>
            <div className="mx-6 gap-4 flex">
            <button className={style.button} onClick={() => auth.setLimit(8)}>
              8 posts
            </button>
            <button className={style.button} onClick={() => auth.setLimit(4)}>
              4 posts
            </button>
            </div>
          </div>
          <div className="mt-4">
            <CreatePost />
            {isLoading ? (
              <Loading />
            ) : (
              <Feed posts={auth.userData.filter((post) => post.scam.toLowerCase().includes(searchQuery.toLowerCase()))} />
            )}
          </div>
        </div>
      </main>
      <div className="flex justify-center m-4">
        <PaginationButtons />
      </div>
      <Footer />
    </div>
  );
};

export default PostList;
