'use client'
import { useState } from "react";
import Link from "next/link";
import { deleteProperty } from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";

const ProfileProperties = ({properties:initialProperties}) => {
    const [properties, setProperties] = useState(initialProperties)
    
    const deleteHandler = async (propertyId) =>{
      const confirmed = window.confirm('Are you sure, you want to delete the property?')

      if(!confirmed) return;
      await deleteProperty(propertyId)

      const updateProperties = properties.filter((property)=>(
        property._id !== propertyId
      ))

      setProperties(updateProperties)
      toast.success('Property deleted successfully.')
    }

    return properties.map((property)=>(
        <div key={property._id} className="mb-10">
                <Link href={`/properties/${property._id}`}>
                  <img
                    className="h-32 w-full rounded-md object-cover"
                    src={property.images[0]}
                    alt="Property 1"
                  />
                </Link>
                <div className="mt-2">
                  <p className="text-lg font-semibold">{property.name}</p>
                  <p className="text-gray-600">Address: {property.location.street}</p>
                </div>
                <div className="mt-2">
                  <Link
                    href={`/properties/${property._id}/edit`}
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"

                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                    onClick={()=> deleteHandler(property._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
    ))} 

 
export default ProfileProperties;