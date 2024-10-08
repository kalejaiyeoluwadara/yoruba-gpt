import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { TbSquareRoundedLetterYFilled } from "react-icons/tb";

export type Tmessage = {
  sender: string;
  text?: string;
  imageUrl?: string; // Optional image URL
};

interface Ichat {
  messages: Tmessage[];
  loading: boolean;
}

function VisionChat({ messages, loading }: Ichat) {
  const mlength = messages.length - 1;
  return (
    <div className="h-[300px] w-full flex flex-1 items-start flex-col gap-4 sm:gap-8 sm:p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-3 relative rounded-lg ${
            message.sender === "human"
              ? "bg-zinc-700 text-white self-end"
              : "group p-3 rounded-xl self-start"
          }`}
        >
          {message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="Uploaded by user"
              className="mb-2 max-w-[200px] sm:max-w-[400px] rounded-lg"
            />
          )}
          {message.sender === "ai" && (
            <section className="flex gap-2 items-center justify-center">
              <div className="h-[30px] w-[30px] flex-center text-gray-200 flex-shrink-0 border border-gray-300 rounded-full">
                <TbSquareRoundedLetterYFilled size={25} />
              </div>
              <p>{message.text}</p>
            </section>
          )}
          {message.sender === "ai" && (
            <section
              className={`w-[80px] cursor-pointer text-gray-200 p-2 items-center justify-start absolute -bottom-8 translate-x-[45px] rounded-[10px] border ${
                index === mlength ? "flex" : "hidden group-hover:flex"
              } border-zinc-700 h-[37px]`}
            >
              <div className="p-2 rounded-md hover:bg-zinc-700 transition-all flex-center">
                <IoCopyOutline size={15} />
              </div>
              <div className="p-2 rounded-md hover:bg-zinc-700 transition-all flex-center">
                <SlLike size={15} />
              </div>
            </section>
          )}
        </div>
      ))}
      {loading && (
        <div className="p-3 rounded-lg self-start bg-gray-600 text-white">
          Generating response...
        </div>
      )}
    </div>
  );
}

export default VisionChat;
