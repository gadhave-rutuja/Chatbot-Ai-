import React, { useEffect, useState, useRef } from "react";
import ChatbotIcon from "./Components/ChatbotIcon";
import ChatForm from "./Components/ChatForm";
import ChatMessage from "./Components/ChatMessage";
import { companyInfo } from "./companyInfo";
const App = () => {

  const [chatHistory, setChatHistory]= useState([
    {
    //hideInChat property is used to prevent the data from being displayed in the chat history
    hideInChat: true,
    role: "model",
    text: companyInfo,
  }
]);
// show messagge button 
const [showChatbot, setshowChatbot] = useState([false]);
  const chatBodyref = useRef();

const generateBotResponse = async (history) => {
//hepler function to update the chat history
  const updateHistory = (text, isError = false) => {
    setChatHistory(prev =>[...prev.filter(msg => msg.text !== "Thinking..."),{role: "model", text, isError}]);
  };
  //format chat history for API requests
  history = history.map(({role, text}) => ({role, parts: [{text}]}));
  const requestOptions ={
    method : "POST",
    headers : {  "Content-Type" : "application/json" },
    body : JSON.stringify({ contents : history })
    }

    try{

      //make the API call to get the bot's response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);

      console.log("API URL:", import.meta.env.VITE_API_URL);

      const data = await response.json();

      if(!response.ok) throw new Error(data.error.message || "Something went wrong!");

      //clean and update the chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();

      updateHistory(apiResponseText);
      
    }catch(error){
      //if error occurs, update the last "thinking..." text with the error message
      updateHistory(error.message,true);
    }
};

useEffect(() =>{
  //auto scroll whenvever chat history updates
  chatBodyref.current.scrollTo({top: chatBodyref.current.scrollHeight, behavior: "smooth"});
}, [chatHistory]);


  return (
    <>
      <div className={`container ${showChatbot ? 'show-chatbot' : ""}`}>
    <button onClick={() => setshowChatbot(prev => !prev)} id="chatbot-toogler">
      <span className="material-symbols-rounded">Mode_comment</span>
      <span className="material-symbols-rounded">Close</span>
    </button>

        <div className="chatbot-popup">
          {/*chatbot header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">Chatbot</h2>
            </div>
            <button onClick={() => setshowChatbot(prev => !prev)}
            className="material-symbols-rounded">keyboard_arrow_down</button>
          </div>

          {/* chatbot body */}

          <div ref={chatBodyref} className="chat-body">
            <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
            hey there  👏  <br /> How can I help you today?
            </p>
            </div>

            {/* Render the chat history dynamically */}
            {chatHistory.map((chat, index) => (
              //passing a chat object with role and text properties as a prop
              <ChatMessage  key={index} chat={chat}/>
            ))}
          </div>

          {/* Chatbot footer */}
          <div className="chat-footer">

            {/* passing the setchatHistory function as a prop */}
         <ChatForm chatHistory={chatHistory}  setChatHistory={setChatHistory}  generateBotResponse={generateBotResponse}/>

          </div>
        </div>
      </div>
    </>
  );
};
export default App;
