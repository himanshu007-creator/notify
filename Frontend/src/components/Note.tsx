import { deleteNote, updateNote } from "@/app/apiCalls/notes";
import Image from "next/image";
import { useState } from "react";
import saveIcon from "../../public/images/checkIcon.png";
import editIcon from "../../public/images/pencilIcon.png";
import trashIcon from "../../public/images/trashIcon.png";
import { Note } from "./types";

type NotifyNoteProps = {
    note?: Note
    setError: (error: string) => void
  }

  export const NotifyNote = (props: NotifyNoteProps) => {
    const { note, setError } = props;
    const [visible, setVisible] = useState<boolean>(true);
    const { _id: id, title, description } = note || { _id: '', title: '', description: '' };
    const [editEnabled, setEditEnabled] = useState(false);
    const [noteTitle, setNoteTitle] = useState<string>(title);
    const [message, setMessage] = useState(description);
  
    const handleMouseLeave = () => {
      setEditEnabled(false);
    };
  
    const handleUpdateNote = async () => {
      if(!noteTitle || !message) return;
      if(noteTitle.length < 6 || message.length < 6) {
        setError('Title and Description should be atleast 6 characters long')
        return;
      }
      await updateNote(id, noteTitle, message)
      setEditEnabled(false);
    }
  
    const handleDeleteNote = async (id: string) => {
      const isDeleted = await deleteNote(id)
      if (!!isDeleted.Success) {
        setVisible(false)
      }
    }
  
    return (
      <div
        className={`float-left h-96 w-64 rounded-2xl bg-black p-4 group overflow-hidden  shadow-xl ${editEnabled ? 'bg-gray-900 shadow-2xl' : 'shadow-2xl'} hover:transform hover:scale-105 transition-all duration-500 ease-in-out ${visible ? '' : 'hidden'}`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex-col">
          <input
            min={6}
            maxLength={16}
            disabled={!editEnabled}
            className="text-white font-bold float-left w-3/4 bg-transparent text-sm"
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => { setNoteTitle(e.target.value) }}
          />
          <div className={`invisible group-hover:visible h-4 mb-4 w-1/4 flex justify-end ${editEnabled ? 'visible' : ''} float-right gap-4`} >
            <p onClick={() => { setEditEnabled(true) }}>
              {
                editEnabled ? (
                  <p onClick={handleUpdateNote}>
                    <Image
                      src={saveIcon.src}
                      alt="Logo"
                      width={20}
                      height={20}
                    />
                  </p>
                ) : (
                  <Image
                    src={editIcon.src}
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                )
              }
  
            </p>
            <p onClick={() => { handleDeleteNote(id) }}>
              <Image
                src={trashIcon.src}
                className="rounded-full"
                alt="Logo"
                width={20}
                height={20}
              />
            </p>
          </div>
        </div>
        <textarea
          disabled={!editEnabled}
          value={message}
          minLength={6}
          placeholder="Start writing ..."
          onChange={(e) => { setMessage(e.target.value) }}
          className="bg-transparent w-full h-full text-white outline-none w-full overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
          style={{ resize: 'none' }}
        />
      </div>
    );
  };