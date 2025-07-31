"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const updateProperty = async (propertyId, formData) => {
  await connectDB();

  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId is required");
  }

  const existingProperty = await Property.findById(propertyId);

  if (!existingProperty) {
    throw new Error("Property not found");
  }

  if (existingProperty.owner.toString() !== userId) {
    throw new Error("Current user does not own this property");
  }

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      nightly: formData.get("rates.nightly"),
      Weekly: formData.get("rates.Weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  // await updatedProperty.save()

  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
};

export default updateProperty;
