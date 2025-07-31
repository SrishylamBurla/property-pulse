"use client";
import { FaBookmark } from "react-icons/fa";
import { BookmarkProperty } from "@/app/actions/bookmarkProperty";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { checkBookmarkStatus } from "@/app/actions/checkBookmarkStatus";

const BookmarkButton = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession();
  const userId = session?.user?.id;
  useEffect(()=>{
    if(!userId){
      setIsLoading(false)
      return
    }
    checkBookmarkStatus(property._id).then((res)=>{
      if(res.error) return toast.error(res.error)
      if(res.isBookmarked) setIsBookmarked(res.isBookmarked)
      setIsLoading(false)
    })
  },[property._id, userId, checkBookmarkStatus])
  
  const handleClick = () => {
    if (!userId) {
      toast.error("You need to be signed in to bookmark a listing");
      return;
    }
    BookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmarked(res.isBookmarked)
      toast.success(res.message);
    });
  };

  { isLoading && <h1 className="text-center">Loading... </h1> }

  return  isBookmarked ? (
      <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
    ) : (
      <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
    )
  
};

export default BookmarkButton;
