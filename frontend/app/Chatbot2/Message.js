'use client';
import React, { useEffect, useState } from "react";
import Typewriter from "./Typewritter";



const Message = ({ message }) => {
  const lines = message.text?.split("\n");
  return (
    <div
      className={`px-4 py-4 m-8 max-w-[80%] break-words rounded-xl ${message.isUser ? "bg-[#007bff] text-[#fff] float-right clear-both" : "bg-[#75a1cf] text-[#020202] float-left clear-both"}`}
    >
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {!message.isUser ? (
            line === "Generating response..." ? (
              line
            ) : (
              <Typewriter text={line} delay={20} />
            )
          ) : (
            line
          )}
          {index !== lines.length - 1 && <br />}
        </React.Fragment>
      ))}
      
    </div>
  );
};

export default Message;
