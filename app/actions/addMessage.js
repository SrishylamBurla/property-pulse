'use server'
import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser"
import Message from "@/models/Message"

async function addMessage(previousState, formData){
    await connectDB()
    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId){
        throw new Error('UserId is required')
    }
    const { userId } = sessionUser

    const recipient = formData.get('recipient')
    if(userId === recipient){
        return {error: 'You can not send a message to yourself'}
    }

    const newMessage = new Message({
        sender: userId,
        recipient,
        property: formData.get('property'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('body')
    })
    await newMessage.save()
    return {
        submitted: true
    }
    
}
export default addMessage