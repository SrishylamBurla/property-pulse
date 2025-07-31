import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import Property from "@/models/Property";
import convertToSerializableObject from "@/utils/convertToSerializableObject";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  console.log(location, propertyType);

  const locationPattern = new RegExp(location, "i");
  const query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && !propertyType === "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);

  return (
    <>
    <section className="bg-blue-700 py-4">
      <div className="mx-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
        <PropertySearchForm />
      </div>
    </section>
    <section className="px-4 py-6">
        <div className="container lg:container px-4 py-6 mx-auto">
        <Link href='/properties' className="flex items-center text-blue-500 hover:underline mb-5">
           <FaArrowAltCircleLeft className="mr-2" /> Back to properties
        </Link>
        <h1 className="text-2xl font-bold mb-8">Search results</h1>
            {(properties.length === '0') ?
                <p>No search properties</p> :
                properties.map((property)=>(
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <PropertyCard key={property._id} property={property} />
                </div>
                ))
            }
        </div>

    </section>
    </>
  );
};

export default SearchResultsPage;
