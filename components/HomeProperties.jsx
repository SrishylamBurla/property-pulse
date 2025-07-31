import PropertyCard from '@/components/PropertyCard';
import Property from '@/models/Property';
import connectDB from '@/config/database';
import Link from 'next/link';

const HomeProperties = async () => {
    await connectDB()
    const  recentProperties = await Property.find({})
            .sort({createdAt: -1})
            .limit(3)
            .lean()

    return ( 
        <>
        <section className='px-4 py-4'>
            <h1 className='text-3xl font-bold text-blue-500 my-5 text-center'>Recent Properties</h1>
            <div className='container-xl lg:container m-auto px-4 py-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {recentProperties.length === 0 ? (
                        <div>No Properties found</div>
                    ) : (
                        recentProperties.map((property)=>(
                            <PropertyCard key={property._id} property={property} />
                        ))
                    )}

                </div>
            </div>
        </section>
        <section className='my-6 px-6 flex justify-center'>
            <Link href='/properties' className='block bg-black text-white text-center py-3 px-4 w-[400px] rounded-xl hover:bg-gray-700'>
                View All Properties
            </Link>

        </section>
        </>
     );
}
 
export default HomeProperties;