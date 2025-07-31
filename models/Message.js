import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required']
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Recipient is required']
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: [true, 'Property is required']
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    body: String,
    read: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
