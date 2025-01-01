import { useRef } from "react";

// Receiving the function that was passed
 const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {

    const inputRef = useRef();

    const handleFormSubmit = (e) => {

        //prevent form submission
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return;
        //clearing the message input after getting the value
        inputRef.current.value = "";
       
        //Update chat history with the user's message

        setChatHistory(history =>[...history, { role: "user", text: userMessage}]);


        
      //Delay 600 ms before showing  "thinking ..." and generating response
        setTimeout(()=>{
          //Add a "thinking ..." placeholder for the bots response
          setChatHistory(history =>[...history, { role: "model", text: "Thinking..."}]);

      //call the function to generate the bot's response
        generateBotResponse([...chatHistory, { role: "user", text: ` using the details provided address this query : ${userMessage}`}]);
    }, 600);




  }
  return (
    <>
     <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required/>

            <button className="material-symbols-rounded">arrow_upward</button>

          </form>
    </>
  )
}

export default ChatForm