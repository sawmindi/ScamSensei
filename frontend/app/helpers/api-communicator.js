import axios from "axios"
import toast from "react-hot-toast"
const axiosInstance = axios.create({
    baseURL: "https://scamsensei.el.r.appspot.com/api/v1",
    withCredentials: true
});
export const loginUser = async (email, password) => {
    
    const res = await axiosInstance.post('/users/login', {email,password})
    if (res.status !== 201) {
        
        toast.error('Login failed')
    }
    const data = await res.data
    return data;
}

export const signupUser = async (name,email, password) => {
    
    const res = await axiosInstance.post('/users/signup', {name,email,password})
    if (res.status !== 201) {
        
        toast.error('Unable to signup user')
    }
    const data = await res.data
    return data;
}

export const checkAuthStatus = async () => {
  try {
    const res = await axiosInstance.get('/users/auth-status')
    if (res.status !== 200) {
        throw new Error('Auth status check failed')
    }
    const data = await res.data
    return data;
  } catch (error) {
    console.error(error)
  }

}

//changed from here

export  const sendChatRequest =  async(message)=>{
    try {
        const response = await axiosInstance.post('/chat/new',{message})
        if (response.status != 200) {
            toast.error("Unable to send data")
            
        }
        const data = await response.data;
        return data;
    } catch (error) {
        toast.error("Unable to send data")
        console.error(error)
    }
}

export  const getUserChats =  async()=>{
    const response = await axiosInstance.get('/chat/all-chats')
    if (response.status != 200) {
        throw new Error("Unable to send chat");
        
        
    }
    const data = await response.data;
    return data;
}

export  const deleteUserChats =  async()=>{
    const response = await axiosInstance.delete('/chat/delete')
    if (response.status != 200) {
        throw new Error("Unable to delete chats");
        
        
    }
    const data = await response.data;
    return data;
}

export  const logoutUser =  async()=>{
    const response = await axiosInstance.get('/users/logout')
    if (response.status != 200) {
        throw new Error("Unable to logout user");
        
        
    }
    const data = await response.data;
    return data;
}

export  const scamSubmit =  async(name,district,scam,title,myFile)=>{
    const response = await axiosInstance.post('/scam',{name,district,scam,title,myFile})
    if (response.status != 200) {
        throw new Error("Unable to post scam");
        
    }
    const data = await response.data;
    return data;
}

export  const getuserPost =  async()=>{
    const response = await axiosInstance.get('/scam')
    if (response.status != 200) {
        throw new Error("Unable to get scam");
        
    }
    const data = await response.data;
    return data;
}

export  const upvotecall =  async(id)=>{
    const response = await axiosInstance.put('/scam/upvote',{id})
    if (response.status != 200) {
        throw new Error("Unable to get scam");
        
    }
    const data = await response.data;
    return data;
}

export  const downvotecall =  async(id)=>{
    const response = await axiosInstance.put('/scam/downvote',{id})
    if (response.status != 200) {
        throw new Error("Unable to get scam");
        
    }
    const data = await response.data;
    return data;
}


//user detail page parts
export const getUser = async (email) => {
    
    const res = await axiosInstance.post('/users/user', {email})
    if (res.status !== 200) {
        
        console.error('Error getting user data')
    }
    const data = await res.data
    
    return data;
}

export const updateUser = async (name,email,password,firstName,lastName,postImage) => {
    
    const res = await axiosInstance.put('/users/update', {name,email,password,firstName,lastName,postImage})
    if (res.status !== 200) {
        
        console.error('Error getting user data')
    }
    const data = await res.data
    
    return data;
}

export const getScamCount =  async()=>{

   
        const response = await axiosInstance.get('/scam/count')
        if (response.status != 200) {
            throw new Error("Unable to get scam");
            
        }
        const data = await response.data;
        return data;
   
  
}

export const paginationResult =  async(page,limit)=>{
    const  response = await axiosInstance.get(`/scam/pagination?page=${page}&limit=${limit}`);
    
    const data = await response.data;
    return data;
}


export const sendChatRequest2 = async (text) => {
    let result;
    try {
      const response = await axiosInstance.post('/chat2', { prompt: text });
      console.log("response ", response);
      
       result = response.data;
      return result;
    } catch (error) {
      console.error('Error in sendChatRequest:', error);
      result.content = "Having a connection issue";
      return result;
    }
  };
