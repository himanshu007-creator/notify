"use client"
import { NotifyNote } from "@/components/Note";
import { Note, UserData } from "@/components/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAsyncEffect } from "rooks";
import { handleLogout } from "./apiCalls/login";
import { createNote, getAllNotes } from "./apiCalls/notes";
import { getUserData } from "./apiCalls/user";

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [message, setMessage] = useState('');
  const [openUsermenu, setOpenUsermenu] = useState<boolean>(false);
  const [openCreateNoteModal, setOpenCreateNoteModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  useAsyncEffect(async () => {
    const data = await getUserData()
    setUserData(data)
    const notes = await getAllNotes()
    setNotes(notes)
  }, []);

  const handleLogoutHandler = async () => {
    const handleLogoutSuccess = await handleLogout()
    if (handleLogoutSuccess) {
      router.push("/auth");
    }
  }

  const handleCreateNote = async () => {
    if (!noteTitle || !message) return;
    if (noteTitle.length < 6 || message.length < 6) {
      setError('Title and Description should be atleast 6 characters long')
      return;
    }
    const noteCreated = await createNote(noteTitle, message)
    if (noteCreated) {
      const notes = await getAllNotes()
      setNotes(notes)
    }
    setOpenCreateNoteModal(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 3000)
  }, [error]);


  return (
    <div className="h-screen w-full bg-red-200">
      <div className="flex w-full justify-between bg-pink-300 p-2 px-6 fixed top-0 z-10">
        <p className="bg-red-400 p-2">Notify</p>
        <p className="h-10 w-10 rounded-full bg-red-700 text-white text-center text-2xl font-bold pt-1" onClick={() => { setOpenUsermenu(!openUsermenu) }}>
          {!!userData ? userData.name[0].charAt(0).toUpperCase() : '--'}
        </p>
        <div
          className={`fixed top-16 right-4 z-50 ${!!error ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity duration-300 ease-in-out`}
        >
          <div
            className={`p-4 bg-red-500 text-white rounded-md shadow-md`}
          >
            {error}
          </div>
        </div>
        {
          openUsermenu && !!userData ? (
            <div
             className="absolute top-16 right-4 bg-red-400 w-48 h-32 rounded-md p-4 shadow-md">
              <p className="text-white text-center font-bold mb-2 text-sm">Hello, {userData.name}</p>
              <p className="text-white text-center font-bold mb-2 text-sm">{userData.email}</p>
              <button
                className="text-white text-center font-bold py-2 px-4 bg-red-600 rounded-md hover:bg-red-700 transition duration-300 mx-auto block"
                onClick={handleLogoutHandler}
              >
                Logout
              </button>
            </div>) : null
        }
      </div>
      <div className=" p-6 gap-4 w-3/4 lg:w-full overflow-y-scroll scroll-smooth h-full pt-16 mx-auto">
        <div className="w-full h-10 mb-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 large:float-right" onClick={() => { setOpenCreateNoteModal(true) }}>
            Create Note
          </button>
        </div>

        {!!notes ?
          (<div className="flex flex-wrap gap-2">
            {notes.map((note, i) => <NotifyNote note={note} key={i} setError={setError}/>)}
          </div>) : null
        }
      </div>
      {
        openCreateNoteModal ?
          (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/2 h-1/2 rounded-md p-4">
              <div className="flex justify-between">
                <p className="text-2xl font-bold">Create Note</p>
                <p className="text-2xl font-bold" onClick={() => { setOpenCreateNoteModal(false) }}>X</p>
              </div>
              <div className="flex flex-col gap-4">
                <input className="border-2 border-gray-300 rounded-md p-2 text-black text-sm"
                  min={6}
                  maxLength={16}
                  placeholder="Title"
                  value={noteTitle}
                  onChange={(e) => { setNoteTitle(e.target.value) }}
                />
                <textarea
                  className="border-2 border-gray-300 rounded-md p-2 text-black"
                  placeholder="Description"
                  minLength={6}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value) }} />
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 large:float-right text-black" onClick={handleCreateNote}>
                  Create Note
                </button>
              </div>
            </div>
          </div>) : null
      }
    </div>
  )
}
