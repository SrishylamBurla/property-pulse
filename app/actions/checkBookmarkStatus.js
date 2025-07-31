'use server'
 import connectDB from "@/config/database"
 import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"

export const checkBookmarkStatus = async (propertyId)=>{
    await connectDB()

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId){
        throw new Error('UserId is required')
    }
    const {userId} = sessionUser

    const user = await User.findById(userId)

    let isBookmarked = user.bookmarks.includes(propertyId)

    return {isBookmarked}
}