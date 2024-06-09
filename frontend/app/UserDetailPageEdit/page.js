"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";



function UserDetail() {
const auth = useAuth();
  const [userData, setUserData] = useState({});
  const [name, setname] = useState("");
  const [postImage, setPostImage] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = auth.user.email;
        
        const data = await auth.getUserDetails(email);
        setUserData(data.userData);
        
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    fetchUserData();
  }, [auth]);


  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      
      setPostImage(base64);
    }
  };

  
  const handleFileRemove =  (e) => {
    
    const imageUrl = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

        setPostImage(imageUrl) 
        toast.success("Image deleted successfully");
        
  };




  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if(password){
      if (!confirmPassword) {
        setError1("Enter confirm password");
        return;
      }  
    }
    setError1("") 
    
    if(password !== confirmPassword) {
      setError1("Passwords do not match");
      return;
    }
    setError1("")  
    
    if(email == auth.user.email) {
      if (!isValidEmail(email)) {
        setError2('Invalid email format'); 
        return;
      }else{
        try {

          auth.updateUserDetails(name,email,password,firstName,lastName,postImage)
          toast.success('User updated successfully')
        } catch (error) {
          toast.error('Unable to update user')
          console.log(error)
        }
      }
    }else{
      setError2("Enter current email to update details")
      return;
    }
    setError2("")  
    

  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      <div
        className={"flex flex-col justify-center  mt-[2%] mb-20 min-h-screen"}
      >
        
        <div className={" text-center text-amber-50 mt-[20%] md:mt-[0%]"}>
            <h1 className={"text-3xl ml-[3%] md:ml-[10%] mb-15 text-teal-400 font-semibold "}>Edit Your Details Here</h1>
        </div>
        
        <form
          className=" md:flex no-wrap md:-mx-auto p-8 rounded grid grid-cols-1 md:grid-cols-2 "
          onSubmit={handleSubmit}
        >

            <div className={"grid-cols-2 ml-[35%] mt-[2%] md:grid-cols-2 md:-ml-[0%] max-w-md "}>
                            
              {/* Image edit part              */}
              

              <div className="grid grid-cols items-center space-y-5 sm:space-y-0 content-center">
                <img
                  className="object-cover sm:mb-[15%] w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  src={postImage ? postImage : userData.myFile}
                  alt="Bordered avatar"
                  width={250}
                  height={300}
                />
                <div className="grid grid-cols space-y-5 md:space-y-10 sm:ml-[1%] ">
                  <label
                    htmlFor="file-upload"
                    className="grid-cols  w-40 py-3 px-5 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    accept=".jpeg, .png, .jpg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-delete"
                    className="grid-cols mt-0 w-40 py-3 px-5 text-base font-medium text-indigo-100 focus:outline-none bg-red-600 rounded-lg border border-indigo-200 hover:bg-red-500 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer"
                  >
                    Delete Image
                  </label>
                  <input
                    type="button"
                    id="file-delete"
                    accept=".jpeg, .png, .jpg"
                    onClick={handleFileRemove}
                    className="hidden"
                  />

                 
                </div>
              </div>

            </div>
            
            <div className={" grid-cols-2 text-3xl mt-[2%] mr-4 "}>
             
              <div className="w-full mx-5 md:mx-7 h-64">
                <div className="p-3 shadow-sm rounded-sm bg-slate-100 md:ml-[15%] lg:ml-[2%] pb-10 border dark:bg-gray-600 rounded-xl">
                  
                  <div className="text-gray-700 text-xl mt-[2%] ">
                    <div className="grid lg:grid-cols-2 text-white text-lg lg:text-xl">
                      <div className="grid grid-cols-2 m-5 ">
                        <p >User name : </p>
                        <input
                        
                          type="text"
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                          className={"border p-1 text-black rounded-lg"}
                          placeholder="User name"
                        />
                      </div>
                      <div className="grid grid-cols-2 m-5">
                        <p >Current Email : </p>
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={"border p-1 text-black rounded-lg"}
                          placeholder="Confirm Email"
                          
                        />
                                                
                      </div>
                      <div className="ml-[61%]" >            
                        {error1 && (
                          <div className='bg-red-500 text-white p-2 rounded-lg w-fit text-sm mt-2'>
                            {error1}
                            </div>
                        )}     
                      </div>
                      <div className="ml-[44%]">
                        {error2 && (
                            <div className='bg-red-500 text-white p-2 rounded-lg w-fit text-sm mt-2'>
                              {error2}
                              </div>
                          )}
                        </div>
                      <div className="grid grid-cols-2 m-5">
                        <p>Password : </p>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={"border p-1 text-black rounded-lg"}
                          placeholder="Password"
                        />
                      </div>
                      <div className="grid grid-cols-2 m-5">
                        <p>Confirm Password : </p>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={"border p-1 text-black rounded-lg"}
                          placeholder="Password"
                        />
                        
                      </div>
                      <div className="grid grid-cols-2 m-5">
                        <p>First Name : </p>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setfirstName(e.target.value)}
                          className={"border p-1 text-black rounded-lg"}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="grid grid-cols-2 m-5">
                        <p>Last Name : </p>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setlastName(e.target.value)}
                          className={"border p-1 text-black rounded-lg"}
                          placeholder="Enter last name"
                        />
                      </div>

                              
                    </div>
                    <div className="flex items-center font-semibold ml-[85%] mt-6 "> 
                        <button type="submit" className={"bg-teal-400  text-white p-2 rounded-md px-[15%] hover:bg-teal-500  focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer"}>
                          Save
                        </button>
                    </div> 
                  </div>
                  
                </div>                
              </div>

              
            </div>
          
        </form>
      </div>
    </>
  );
}

export default UserDetail;

