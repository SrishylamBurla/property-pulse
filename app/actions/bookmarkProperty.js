'use server'
 import connectDB from "@/config/database"
 import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"
 import { revalidatePath } from "next/cache"

 export const BookmarkProperty = async(propertyId) =>{
    await connectDB()

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId){
        throw new Error('UserId is required')
    }
    const {userId} = sessionUser

    const user = await User.findById(userId)

    let isBookmarked = user.bookmarks.includes(propertyId)

    let message;
    if(isBookmarked){
        // if already bookmarked
        user.bookmarks.pull(propertyId)
        message = 'Bookmark Removed'
        isBookmarked= false
    }else{
        // if not, add bookmark
        user.bookmarks.push(propertyId)
        message = 'Bookmark Added'
        isBookmarked = true
    }
    await user.save()
    revalidatePath("/properties/saved", "page")
    
    return{
        message,
        isBookmarked
    }

 }