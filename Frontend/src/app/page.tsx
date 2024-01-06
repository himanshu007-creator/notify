"use client"
import { useRef, useState } from "react";

const Card = () => {
  const [editEnabled, setEditEnabled] = useState(false);
  const [message, setMessage] = useState("Start writing ...");
  const cardRef = useRef(null);

  const handleMouseLeave = () => {
    setEditEnabled(false);
  };

  return (
    <div
      ref={cardRef}
      className={`float-left h-96 w-64 rounded-2xl bg-black p-4 group overflow-hidden  shadow-xl ${editEnabled ? 'bg-gray-800 shadow-2xl' : 'shadow-2xl'} hover:transform hover:scale-105 transition-all duration-500 ease-in-out`}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`invisible group-hover:visible h-4 mb-4 w-full flex justify-end ${editEnabled ? 'visible' : ''}`} onClick={() => { setEditEnabled(true) }}> Edit</div>
      <textarea
        disabled={!editEnabled}
        value={message}
        onChange={(e) => { setMessage(e.target.value) }}
        className="bg-transparent w-full h-full text-white outline-none w-full overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
        style={{ resize: 'none' }}
      />
    </div>
  );
};

export default function Home() {
  return (
    <div className="h-screen w-full bg-red-200">
      <div className="flex w-full justify-between bg-pink-300 p-2 px-6 fixed top-0 z-10">
        <p className="bg-red-400 p-2">Notify</p>
        <p className="h-10 w-10 rounded-full bg-red-700"></p>
      </div>
      <div className="flex flex-wrap p-6 gap-4 w-3/4 lg:w-full overflow-y-scroll scroll-smooth h-full pt-16 mx-auto">
        {
          Array(7).fill(0).map((_, i) => <Card key={i} />)
        }
      </div>
    </div>
  )
}
