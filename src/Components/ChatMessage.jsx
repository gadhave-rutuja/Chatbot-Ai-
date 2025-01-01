import React from 'react'
import ChatbotIcon from './ChatbotIcon'
 const ChatMessage = ({chat}) => {
  return (
    !chat.hideInChat && (
    <>
    
    {/* updating class name based on the chat's role */}
    
     <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message ${chat.isError ? "error" : ""}`}>

        {/* adding the chatbot icon only if the chats role is "model" */}
    {chat.role === "model"  &&  <ChatbotIcon />}

            <p className="message-text">
            {chat.text}
            </p>
            </div>

    </>
        )
  )
}

export default ChatMessage