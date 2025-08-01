'use server'
 import connectDB from "@/config/database"
import Message from "@/models/Message"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

export const markMessageAsRead = async (messageId)=>{
    connectDB()

    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId){
        throw new Error('UserId is required')
    }
    const {userId} = sessionUser

    const message = await Message.findById(messageId)

    if(!message){
        throw new Error('Message not found')
    }
    // verify ownership
    if(message.recipient.toString() !== userId){
        throw new Error('Unauthorized')
    }

    message.read = !message.read
    await message.save()

    revalidatePath('/messages', 'page')


    return message.read
}