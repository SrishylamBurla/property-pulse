import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        street: String,
        city: String,
        state: String,
        zipcode: String
    }
    ,
    beds: {
        type: Number,
        required: true
    },
    baths: {
        type: Number,
        required: true
    },
    amenities: [{
        type: String
    }],
    rates:{
        monthly: Number,
        weekly: Number,
        nightly: Number
    },
    seller_info:{
        name: String,
        email: String,
        phone: String
    },
    images:[
        {
            type: String
        }
    ],
    is_featured: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const Property = models.Property || model('Property', PropertySchema)

export default Property