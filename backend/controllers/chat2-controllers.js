import OpenAI from "openai";
import { LoginUser } from "../models/Scam-user.js";
import { config } from "dotenv";
config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY2,
  });


  async function getScam(name) {
    const scam = await LoginUser.findOne({ name: name });
    return JSON.stringify(`Post: ${scamResponse.title}\nDistrict: ${scamResponse.district}
    \nScam: ${scamResponse.scam} \nUpvotes: ${scamResponse.upvotes} \nDownvotes: ${scamResponse.downvotes}`);
  }
  
  async function getByTitle(title) {
    console.log(title);
    const  scamResponse = await LoginUser.findOne({
      title: title,
      });
    
    console.log(scamResponse);
    return JSON.stringify(`Post: ${scamResponse.title}\nDistrict: ${scamResponse.district}
    \nScam: ${scamResponse.scam} \nUpvotes: ${scamResponse.upvotes} \nDownvotes: ${scamResponse.downvotes}`);
  }
  
  async function getByDistrict(dis) {
      console.log(dis);
      const  scamResponse = await LoginUser.findOne({
          district: dis,
        }).limit(1);
      
      console.log(scamResponse);
      return JSON.stringify(`Post: ${scamResponse.title}\nDistrict: ${scamResponse.district}
      \nScam: ${scamResponse.scam} \nUpvotes: ${scamResponse.upvotes} \nDownvotes: ${scamResponse.downvotes}`);
    }
  
    async function getByUpvotes(up) {
      console.log(up);
      const  scamResponse = await LoginUser.findOne({
          upvotes: up,
        });
      
      console.log(scamResponse);
      return JSON.stringify(`Post: ${scamResponse.title}\nDistrict: ${scamResponse.district}
      \nScam: ${scamResponse.scam} \nUpvotes: ${scamResponse.upvotes} \nDownvotes: ${scamResponse.downvotes}`);
    }
  
    async function getByDownvotes(down) {
      console.log(down);
      const  scamResponse = await LoginUser.findOne({
          downvotes: down,
        });
      
      console.log(scamResponse);
      return JSON.stringify(`Post: ${scamResponse.title}\nDistrict: ${scamResponse.district}
      \nScam: ${scamResponse.scam} \nUpvotes: ${scamResponse.upvotes} \nDownvotes: ${scamResponse.downvotes}`);
    }
  
  async function getTotalPostsNumber() {
    const complaint = await LoginUser.find().count();
    return JSON.stringify(complaint);
  }
  
  

  async function runConversation(prompt) {
    // Step 1: send the conversation and available functions to GPT
    const messages = [{ role: "user", content: prompt }];
  
    const functions = [
      {
        name: "get_scam",
        description:
          "This function retrieves a scam they experienced.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description:
                "The body of the scam.",
            },
          },
          required: ["name"],
        },
      },
      {
        name: "get_by_title",
        description: "Retrieve scam posts based on more data.",
        parameters: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of scam.",
            },
            
          },
          required: ["title"],
        },
      },
      {
          name: "get_by_district",
          description: "Retrieve scam posts based on more data.",
          parameters: {
            type: "object",
            properties: {
              dis: {
                type: "string",
                description: "The district of where the scam happened.",
              },
              
            },
            required: ["dis"],
          },
        },
        {
          name: "get_by_upvotes",
          description: "Retrieve scam posts based on more data.",
          parameters: {
            type: "object",
            properties: {
              dis: {
                type: "integer",
                description: "The number of upvotes the scampost has.",
              },
              
            },
            required: ["up"],
          },
        },
        {
          name: "get_by_downvotes",
          description: "Retrieve scam posts based on more data.",
          parameters: {
            type: "object",
            properties: {
              dis: {
                type: "integer",
                description: "The number of downvotes the scampost has.",
              },
              
            },
            required: ["down"],
          },
        },
      {
        name: "get_Total_scams_number",
        description: "Retrieve total numbers of scams.",
        parameters: {
          type: "object",
          properties: {},
        },
      },
    
     
    ];
  
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      functions: functions,
      function_call:"auto"
     
    });
  
    const responseMessage = response.choices[0].message;
    console.log(responseMessage);
    if (responseMessage.content) return responseMessage;
   
  
    if (responseMessage.function_call) {
    
      const availableFunctions = {
          get_scam: getScam,
          get_by_title: getByTitle,
          get_by_district: getByDistrict,
          get_by_upvotes: getByUpvotes,
          get_by_downvotes: getByDownvotes,
          get_Total_scams_number: getTotalPostsNumber,
     
      }; 
      const functionName = responseMessage.function_call.name;
      const functionToCall = availableFunctions[functionName];
      const functionArgs = JSON.parse(responseMessage.function_call.arguments);
      let functionResponse = await functionToCall(...Object.values(functionArgs));
     
      console.log(functionResponse);
      
      messages.push(responseMessage); // extend conversation with assistant's reply
      messages.push({
        role: "function",
        name: functionName,
        content: `${functionResponse}`,
      }); 
      const secondResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      }); 
      // get a new response from GPT where it can see the function response
      return secondResponse.choices[0].message;
      
    }
  }
  
  export default runConversation;