"use client";
import React, { useState } from "react";
import { RxUpload } from "react-icons/rx";
import { HiOutlineArrowSmUp } from "react-icons/hi";
import Empty from "./Empty";
import Chat from "./Chat";

type Tmessage = {
  sender: string;
  text: string;
};

function Main() {
  const [empty, setRemoveEmpty] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Tmessage[]>([]); // Type the state
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (prompt.trim().length === 0) return;

    setRemoveEmpty(false);
    setLoading(true);

    // Add the human message to the chat
    setMessages((prev) => [...prev, { text: prompt, sender: "human" }]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        // Add the AI response to the chat
        setMessages((prev) => [...prev, { text: data.text, sender: "ai" }]);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <main className="flex flex-col w-full flex-1 h-full items-start">
      <nav className="flex w-full justify-between py-4 items-center px-4">
        <div>
          <p className="font-semibold text-lg">YGPT</p>
        </div>
        <div className="flex gap-2">
          <div className="h-[40px] w-[40px] rounded-md bg-none hover:bg-gray-600 flex-center">
            <RxUpload className="text-gray-200" size={25} />
          </div>
          <div className="flex-center h-[40px] w-[40px] rounded-full bg-orange-500"></div>
        </div>
      </nav>
      <main className="flex w-full h-full flex-1 items-center overflow-x-hidden justify-center">
        {empty ? (
          <Empty empty={empty} setRemoveEmpty={setRemoveEmpty} />
        ) : (
          <Chat messages={messages} loading={loading} />
        )}
      </main>
      <footer className="flex-center h-[100px] w-full">
        <div className="w-[80%] bg-neutral-700 px-2 flex-center h-[50px] rounded-full">
          <input
            type="text"
            className="!bg-transparent px-4 placeholder:text-gray-200 text-white border-none flex-1 outline-none"
            name="prompt"
            placeholder="Message YGPT"
            value={prompt}
            autoComplete="off"
            onChange={(e) => setPrompt(e.target.value)}
            style={{ backgroundColor: "transparent !important" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className={`h-[30px] w-[30px] flex-center transition-all rounded-full ${
              prompt.length === 0 ? "bg-gray-200" : "bg-white hover:bg-gray-200"
            }`}
          >
            <HiOutlineArrowSmUp size={25} />
          </button>
        </div>
      </footer>
    </main>
  );
}

export default Main;
