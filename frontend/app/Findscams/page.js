"use client";
import React, { use } from "react";
import Feed from "../PostList/Feed";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import LocationComponent from "./location";
import Navigation from "./navForFindscam";
import CreatePost from "../PostList/CreatePost";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

import PaginationButtons from "../components/PaginationButtons";
import Footer from "../components/Footer";

function FindScams() {
  const auth = useAuth();

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await auth.pagination(auth.page,auth.limit);
      auth.setUserData(data.posts);

     setIsLoading(false)
    };
    fetchData();
  }, [auth.page,auth.limit]);

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };



  useEffect(() => {
    setSelectedDistrict(auth.district);
  }, [auth.district]);
  const locations = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Galle",
    "Matara",
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Mullaitivu",
    "Vavuniya",
    "Batticaloa",
    "Ampara",
    "Trincomalee",
    "Kurunegala",
    "Puttalam",
    "Anuradhapura",
    "Polonnaruwa",
    "Badulla",
    "Monaragala",
    "Ratnapura",
    "Kegalle",
  ];
  return (
    <>
   
    <div>
    
      <main className='flex flex-col sm:p-20 p-5  mt-[-5%] min-h-screen container  mx-auto'>
      <div
        className={
          "flex flex-col justify-center items-center mt-[1%] min-h-screen"
        }
      >
        <div className={"mt-[5%] text-center text-amber-50"}>
          <h1 className={"text-4xl mb-10 lg:pt-0 pt-10 animate-fade-in"}>
            Community Stories
          </h1>
          <p className={"text-xl"}>Scams That the Community Faced</p>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className={" sm:w-auto button-container flex md:flex-row md:gap-40 py-6 flex-col gap-5"}>
            <div className=" mx-auto ">
              <select
                name="dropdown"
                id="dropdown"
                className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                onChange={handleDistrictChange}
              >
                <option value="">Select Location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={
                "sm:w-auto button-container"
              }
            >
              {/* <MapButton /> */}
              <LocationComponent />
            </div>
          </div>
        </div>
        <div className="mt-4">
        <CreatePost /><br/>

        {isLoading ? ( // Check if loading is true
              <Loading /> // Display the Loading component
            ) : (
              <Feed
              posts={auth.userData.filter((post) =>
                post.district
                  .toLowerCase()
                  .includes(selectedDistrict.toLowerCase())
              )}
            />
            )}
          
        </div>
      </div>
      </main>
      <div className="flex justify-center m-4">
      <PaginationButtons />
      </div>
      <Footer />
      </div>
    </>
  );
}

export default FindScams;
