"use client";
import { markMessageAsRead } from "@/app/actions/markMessageAsRead";
import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs"
import { deleteMessage } from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false)
  const {setUnreadCount} = useGlobalContext()

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);

    setIsRead(read);
    setUnreadCount((prevCount)=> read ? prevCount - 1 : prevCount + 1)
    toast.success(`Marked As ${read ? "Read" : "New"}`);
  };

  const handleDeleteClick = async() =>{
    await deleteMessage(message._id)
    setIsDeleted(true)
    setUnreadCount((prevCount)=> isRead ? prevCount : prevCount + 1)
    toast.success('Message deleted successfully')
  }

  if(isDeleted){
    return <p className="text-green-500">Deleted message</p>
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h1 className="font-xl mb-4">
        <span className="font-bold">Property enquiry:</span>{" "}
        {message.property.name}
      </h1>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          <span>{dayjs(message.createdAt).format("DD MMM YYYY, hh:mm A")}</span>
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="bg-blue-500 mt-4 px-3 py-1 mr-2 text-white rounded-md cursor-pointer"
      >
        {isRead ? "Mark as new" : "Mark as read"}
      </button>
      <button onClick={handleDeleteClick} className="bg-red-500 mt-4 px-3 py-1 text-white rounded-md cursor-pointer">
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
