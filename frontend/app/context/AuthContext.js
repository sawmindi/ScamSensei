'use client'

import { createContext, use, useState, useEffect,useContext } from "react";
import { loginUser,checkAuthStatus, logoutUser, signupUser, scamSubmit ,getuserPost, downvotecall,
  upvotecall,getUser, updateUser,getScamCount,paginationResult,sendChatRequest2} from "../helpers/api-communicator";
import toast from "react-hot-toast";
const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [district, setDistrict] = useState('');

  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  

  
  useEffect(() => {
    //fetch if the user cookies are valid
    async function checkAuth(){
        const data = await checkAuthStatus()
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
          }
    }
    checkAuth()
  }, []);

  const login = async (email, password) => {
const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }

  };
  const signup = async (name, email, password) => {
    const data = await signupUser(name, email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };
  
  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };
  const scamPost = async (name,district,scam,title,myFile) => {
    await scamSubmit(name,district,scam,title,myFile);
    
  };

  const getScamPosts = async () => {
    const data = await getuserPost()
    return data;
  };

  const upvote = async (id) => {
    const data = await upvotecall(id)
    return data;
  };

  const downvote = async (id) => {
    const data = await downvotecall(id)
    return data;
  };


  const getUserDetails = async (email) => {
    const data = await getUser(email)
    return data;
  };

  const updateUserDetails = async (name,email,password,firstName,lastName,postImage) => {
    const data = await updateUser(name,email,password,firstName,lastName,postImage)
    return data;
  };

const pagination = async (page,limit) => {
  const data = await paginationResult(page,limit)
  return data;
}

const sendChatReq2 = async (text) => {
  const data = await sendChatRequest2(text)
  return data;
}
 
  const value = { user,isLoggedIn,
     login, signup, logout,scamPost,
     getScamPosts,upvote,downvote,getUserDetails,updateUserDetails,
      district, setDistrict,userData, setUserData,page, setPage,limit, setLimit,
      pagination,sendChatReq2,
     };

   
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



export const useAuth = () => {
   return useContext(AuthContext);
}
