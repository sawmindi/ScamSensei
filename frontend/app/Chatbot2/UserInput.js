'use client';
import React, { useState } from "react";


const UserInput = ({ onSendMessage, clearMessage }) => {
  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onSendMessage(text);
      setText("");
    }
  };


 
  return (
    <form onSubmit={handleSendMessage}>
      <div className="flex gap-4 items-center mt-2  bottom-10 w-full  my-0 justify-center md:flex-row flex-col">
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={handleInputChange}
          className="w-9/10 p-2.5 border-2 border-gray-300 rounded-md"
        />
        <div className="flex gap-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Send</button>
        <button type="button" onClick={clearMessage} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >Clear</button>
        </div>
      </div>
    </form>
  );
};

export default UserInput;
