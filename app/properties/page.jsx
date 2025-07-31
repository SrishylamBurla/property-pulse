import PropertyCard from "@/components/PropertyCard";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import Pagination from "@/components/Pagination";

const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 3 } }) => {
  await connectDB();
  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();

  const showPagination = total > pageSize;
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <div>No Properties found</div>
          ) : (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
