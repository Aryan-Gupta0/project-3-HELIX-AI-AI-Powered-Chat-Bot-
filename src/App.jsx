import React, { useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import { GoogleGenAI } from "@google/genai";
import { BeatLoader } from "react-spinners";
import Markdown from 'react-markdown'
import { RiComputerFill } from "react-icons/ri";
import { GiOpenBook, GiWhiteBook } from 'react-icons/gi';
import { FaBloggerB } from 'react-icons/fa';
import { URL } from './constants';

const App = () => {
  const [screen, setScreen] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const ai = new GoogleGenAI({ apiKey: URL });
  let messages = [];

  const [data, setData] = useState(messages);
  async function getResponse() {

    if (prompt === "") {
      alert("Please enter a prompt!");
      return;
    }

    setData(prevData => [...prevData, { role: "user", content: prompt }])

    setScreen(2);

    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    setData(prevData => [...prevData, { role: "ai", content: response.text }])

    setPrompt("");
    console.log(messages)
    setLoading(false);
  }

  return (
    <div>
      <Navbar />

      <div className="screens">
        {
          screen === 1 ?
            <div className="screen-1 w-screen h-[52vh] px-37.5 flex items-center justify-center flex-col">
              <h3 className='text-[40px] font-bold'>HELIX <span className='text-purple-500'>AI</span></h3>
              <div className="flex mt-5 items-center gap-3.75">
                <div className="card w-50 h-[fit] cursor-pointer border border-purple-500 transition-all hover:bg-purple-500 rounded-lg p-3.75">
                  <i className='text-[30px]'><RiComputerFill /></i>
                  <p className='mt-3'>Create a website using html css and js.</p>
                </div>
                <div className="card w-50 h-[fit] cursor-pointer border border-purple-500 transition-all hover:bg-purple-500 rounded-lg p-3.75">
                  <i className='text-[30px]'><GiWhiteBook /></i>
                  <p className='mt-3'>Write a book for me. topic is coding.</p>
                </div>
                <div className="card w-50 h-[fit] cursor-pointer border border-purple-500 transition-all hover:bg-purple-500 rounded-lg p-3.75">
                  <i className='text-[30px]'><GiOpenBook /></i>
                  <p className='mt-3'>Tell me a commedy story.</p>
                </div>
                <div className="card w-50 h-[fit] cursor-pointer border border-purple-500 transition-all hover:bg-purple-500 rounded-lg p-3.75">
                  <i className='text-[30px]'><FaBloggerB /></i>
                  <p className='mt-3'>Create a blog for me topic is web dev.</p>
                </div>
              </div>
            </div> : <>
              <div className="screen-2 overflow-y-auto w-screen h-[60vh] p-20">
                {
                  data ? data.map((item, index) => {
                    return (
                      <>
                        {
                          item.role === "user" ?
                            <div className="user  rounded-xl border border-purple-800 w-fit max-w-[40vw] mb-5 ml-auto p-3.75">
                              <p className='text-[14px] text-[gray]'>User</p>
                              <p>{item.content}</p>
                            </div> :
                            <div className="ai  rounded-xl border border-purple-800 w-fit max-w-[40vw] mb-5 mr-auto p-3.75">
                              <p className='text-[14px] text-[gray]'>HELIX AI</p>
                              <Markdown>
                                {item.content}
                              </Markdown>
                            </div>
                        }
                      </>
                    )
                  }) : "No Messages Yet!"
                }
                {
                  loading &&
                  <div className="ai rounded-xl border border-purple-800 w-fit max-w-[40vw] mb-5 mr-auto p-3.75">
                    <p className='text-[14px] text-gray-400'>HELIX AI</p>

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

      <div className="inputBox px-37.5 h-[15vh] pt-5 pb-0">
        <div className="input w-[70%] mx-auto flex items-center gap-2.5 border-2 border-purple-800 bg-zinc-700 rounded-4xl ">
          <input onKeyDown={(e) => {
            if (e.key === "Enter") {
              getResponse();
            }
          }} onChange={(e) => { setPrompt(e.target.value) }} value={prompt} type="text" placeholder='Enter your prompt!' className='flex-1 bg-transparent rounded-lg p-3.75 outline-none text-[18px] font-medium' />
        </div>
        <p className='text-[gray] text-center mt-3'>HELIX AI can make mistakes! cross check it.</p>
      </div>
    </div>
  )
}

export default App