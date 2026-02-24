import React, { useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import { BeatLoader } from "react-spinners";
import Markdown from 'react-markdown'
import { RiComputerFill } from "react-icons/ri";
import { GiOpenBook, GiWhiteBook } from 'react-icons/gi';
import { FaBloggerB } from 'react-icons/fa';


const App = () => {
  const [screen, setScreen] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  
  let messages = [];

  const [data, setData] = useState(messages);
 
 async function getResponse() {
  if (prompt === "") {
    alert("Please enter a prompt!");
    return;
  }

  setData(prevData => [...prevData, { role: "user", content: prompt }]);
  setScreen(2);
  setLoading(true);

  try {
    const response = await fetch("https://project-3-helix-ai-ai-powered-chat-bot.onrender.com/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: prompt }),
    });

    const data = await response.json();

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    setData(prevData => [...prevData, { role: "ai", content: aiText }]);
  } catch (error) {
    console.error(error);
    setData(prevData => [
      ...prevData,
      { role: "ai", content: "Something went wrong!" },
    ]);
  }

  setPrompt("");
  setLoading(false);
}
  return (
  <div className="min-h-screen flex flex-col">
    <Navbar />

    <div className="screens flex-1">
      {
        screen === 1 ?
          <div className="screen-1 px-4 sm:px-8 lg:px-20 py-10 flex items-center justify-center flex-col text-center">
            <h3 className='text-3xl sm:text-4xl font-bold'>
              HELIX <span className='text-purple-500'>AI</span>
            </h3>

            <div className="flex flex-wrap justify-center mt-8 gap-6">
              <div className="card w-full sm:w-[45%] lg:w-[22%] cursor-pointer border border-purple-500 transition-all hover:bg-purple-500 rounded-lg p-4">
                <i className='text-3xl'><RiComputerFill /></i>
                <p className='mt-3'>Create a website using html css and js.</p>
              </div>

              <div className="card w-full sm:w-[45%] lg:w-[22%] cursor-pointer border border-purple-500 transition-all hover:bg-purple-500 rounded-lg p-4">
                <i className='text-3xl'><GiWhiteBook /></i>
                <p className='mt-3'>Write a book for me. topic is coding.</p>
              </div>

              <div className="card w-full sm:w-[45%] lg:w-[22%] cursor-pointer border border-purple-500 transition-all hover:bg-purple-500 rounded-lg p-4">
                <i className='text-3xl'><GiOpenBook /></i>
                <p className='mt-3'>Tell me a commedy story.</p>
              </div>

              <div className="card w-full sm:w-[45%] lg:w-[22%] cursor-pointer border border-purple-500 transition-all hover:bg-purple-500 rounded-lg p-4">
                <i className='text-3xl'><FaBloggerB /></i>
                <p className='mt-3'>Create a blog for me topic is web dev.</p>
              </div>
            </div>
          </div>
          :
          <>
            <div className="screen-2 overflow-y-auto px-4 sm:px-8 lg:px-20 py-6 h-[60vh]">
              {
                data.length > 0 ? data.map((item, index) => (
                  <div key={index}>
                    {
                      item.role === "user" ?
                        <div className="user rounded-xl border border-purple-800 w-fit max-w-[85%] sm:max-w-[60%] lg:max-w-[40%] mb-5 ml-auto p-4 wrap-break-words">
                          <p className='text-sm text-gray-400'>User</p>
                          <p>{item.content}</p>
                        </div>
                        :
                        <div className="ai rounded-xl border border-purple-800 w-fit max-w-[85%] sm:max-w-[60%] lg:max-w-[40%] mb-5 mr-auto p-4 wrap-break-words">
                          <p className='text-sm text-gray-400'>HELIX AI</p>
                          <Markdown>
                            {item.content}
                          </Markdown>
                        </div>
                    }
                  </div>
                )) : "No Messages Yet!"
              }

              {
                loading &&
                <div className="ai rounded-xl border border-purple-800 w-fit max-w-[85%] sm:max-w-[60%] lg:max-w-[40%] mb-5 mr-auto p-4">
                  <p className='text-sm text-gray-400'>HELIX AI</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-300">Analyzing</span>
                    <BeatLoader
                      color="#a855f7"
                      size={5}
                      margin={2}
                    />
                  </div>
                </div>
              }
            </div>
          </>
      }
    </div>

    <div className="inputBox px-4 sm:px-8 lg:px-20 py-4">
  <div className="input w-full lg:w-[70%] mx-auto flex items-center gap-3 border-2 border-purple-800 bg-zinc-700 rounded-full px-2">

    <input
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          getResponse();
        }
      }}
      onChange={(e) => setPrompt(e.target.value)}
      value={prompt}
      type="text"
      placeholder="Enter your prompt!"
      className="flex-1 bg-transparent p-4 outline-none text-base sm:text-lg font-medium text-white"
    />

    <button
      onClick={getResponse}
      className="bg-purple-600 hover:bg-purple-700 transition-all text-white px-5 py-2 rounded-full font-medium"
    >
      Send
    </button>

  </div>

  <p className="text-gray-400 text-center mt-3 text-sm">
    HELIX AI can make mistakes! cross check it.
  </p>
</div>
  </div>
)}
export default App