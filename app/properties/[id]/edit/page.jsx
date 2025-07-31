'use server'
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import convertToSerializableObject from "@/utils/convertToSerializableObject";

const EditProperty = async ({params}) => {

    await connectDB()
  const propertyDoc = await Property.findById(params.id).lean()
  const property = await convertToSerializableObject(propertyDoc)

  if(!property){
    return (
      <h1 className="text-2xl text-center font-bold">Property not found</h1>
    )
  }
    return ( 
        <section className="bg-blue-50">
        <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/profile"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Profile
        </Link>
      </div>
    </section>
             <div className="container m-auto max-w-2xl pb-24 pt-5">
                 <div className="bg-white px-6 py-8 mb-4 rounded-md shadow-md m-4 md:m-0">
                    <PropertyEditForm property={property} />
                 </div>

             </div>

         </section>
     );
}
 
export default EditProperty;