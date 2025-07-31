'use server'
 import connectDB from "@/config/database"
import Message from "@/models/Message"
import { getSessionUser } from "@/utils/getSessionUser"


export const getUnreadMessagesCount = async (messageId)=>{
    connectDB()

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId){
        throw new Error('UserId is required')
    }
    const {userId} = sessionUser

    const count = await Message.countDocuments({
        recipient: userId,
        read: false
    })

    return {count}
}