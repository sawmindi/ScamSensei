import ChatUser from "../models/Chat-user.js";
import OpenAI from "openai";
import { config } from "dotenv";
config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
});
export const generateChatCompletion = async (req, res, next) => {
  const { message } = req.body;
  try {
    const user = await ChatUser.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ error: "User does not exist or token is invalid" });
    }

    const chats = [
      {
        role: "system",
        content:
          "You are ScamSensei, a chatbot that only focuses on educating tourists about Sri Lankan scams. If a user asks an unrelated question, respond with 'I'm sorry, I can only help with educating tourists about scams.'",
      },
      ...user.chats.map(({ role, content }) => ({ role, content })),
      { role: "user", content: message },
    ];

    const chatResponse = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0613:personal::8w80tEmr",
      messages: chats,
    });

    const responseMessage = chatResponse.choices[0].message.content;

    // Check if the chatbot's response indicates that the message is not related to scams
    if (responseMessage.includes("I'm sorry, I can only help with educating tourists about scams.")) {
      // If so, add the chatbot's response to the user's chats
      user.chats.push({ role: "assistant", content: responseMessage });
    } else {
      // If the message is related to scams, add both the user's message and the chatbot's response to the user's chats
      user.chats.push({ role: "user", content: message });
      user.chats.push(chatResponse.choices[0].message);
    }

    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Internal Server Error cannot complete chat",
        message: error,
      });
  }
};


export const sendChatsToUser = async (req, res, next) => {
  try {
    const existingUser = await ChatUser.findById(res.locals.jwtData.id);
    if (!existingUser) {
      return res
        .status(401)
        .json({ error: "User does not exist or token is invalid" });
    }
    if (existingUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ error: "Permission didn't match" });
    }

    return res
      .status(200)
      .json({ message: "User located", chats: existingUser.chats });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Internal Server Error cannot find user",
        message: error,
      });
  }
};

export const deleteChats = async (req, res, next) => {
  try {
    const existingUser = await ChatUser.findById(res.locals.jwtData.id);
    if (!existingUser) {
      return res
        .status(401)
        .json({ error: "User does not exist or token is invalid" });
    }
    if (existingUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ error: "Permission didn't match" });
    }
    existingUser.chats = [];
    await existingUser.save();
    return res.status(200).json({ message: "Chats deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Internal Server Error cannot delete chats",
        message: error,
      });
  }
};
