'use server'
import connectDB from "@/config/database";
import User from "@/models/User";
import PropertyCard from "@/components/PropertyCard";
import { getSessionUser } from "@/utils/getSessionUser";


const SavedPropertiesPage = async () => {
    await connectDB()
    const {userId} = await getSessionUser()

    const {bookmarks} = await User.findById(userId).populate('bookmarks')

    return <section className="px-4 py-6">
            <div className="container md:container px-4 py-6 mx-auto">
                <h1 className="text-2xl font-bold mb-6">Saved Properties</h1>
                   { bookmarks.length === 0 ? ( <h1 className="text-2xl">No Saved Properties</h1> ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {bookmarks.map((property)=>(
                            <PropertyCard key={property._id} property={property} />
                        ))}

                        </div>
                   )}
            </div>

        </section>
     
}
 
export default SavedPropertiesPage;