'use client';
import React, { useState, useEffect } from "react";
import UserInput from "./UserInput";
import Message from "./Message";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


function Searchbot() {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");
const auth = useAuth();
  
  useEffect(() => {
    // setMessages([...messages, { text: "What can you do for me?", isUser: true }]);
    sendMessage("What can you do for me?");
  }, []);

  useEffect(() => {

    if (response) {
      let newMessages = [...messages];
      console.log(newMessages);
      newMessages[newMessages.length - 1] = { text: response, isUser: false };
      console.log(newMessages);
      setMessages(newMessages);
      setResponse("");
    }
  }, [response]);

  const sendMessage = async (text) => {
    const newMessage = { text, isUser: true };
    setMessages([
      ...messages,
      newMessage,
      { text: "Generating response...", isUser: false },
    ]);
  
    try {
    
      const result = await auth.sendChatReq2(text);
      
      setResponse(result.content);
    } catch (error) {
      toast.error("Unable to send message")
      console.log("error > ",error)
      setResponse(error.message ? "I can't connect to internet now, please try again later" : "Something went wrong...")
    }
  };

  const clearMessage = () => {
    setMessages([])
    setResponse('')
  }

  

  return (
    <div className=" m-0 p-0  min-h-screen">
      
      <div className="max-w-[80vw] justify-center mx-auto ">
      
      <div className="p-10 h-[74vh] overflow-y-auto bg-gray-700 border-8 mt-[10vh]">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      
      <UserInput onSendMessage={sendMessage} clearMessage={clearMessage} />
     
      </div>
     
      
    </div>
  );
}

export default Searchbot;
