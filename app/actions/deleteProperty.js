'use server'

import cloudinary from "@/config/cloudinary"
import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser"
import Property from "@/models/Property"
import { revalidatePath } from "next/cache"


export const deleteProperty = async (propertyId) => {

    await connectDB()
    const sessionUser = await getSessionUser()
    
    const {userId} = sessionUser

    if(!sessionUser || !sessionUser.userId){
        throw new Error('UserId is required')
    }

    const property = await Property.findById(propertyId)

    if(!property){
        throw new Error('Property not found!')
    }

    if(property.owner.toString() !== userId){
        throw new Error('Unauthorized!')
    }

    // extract from cloudinary

    const publicIds = property.images.map((imageUrl)=>{
        const parts = imageUrl.split('/')
        return parts.at(-1).split('.').at(0)
    })

    if(publicIds.length > 0){
        for(let publicId of publicIds){
            await cloudinary.uploader.destroy('property-pulse/'+ publicId)
        }
    }
    await property.deleteOne()

    revalidatePath('/', 'layout')

}