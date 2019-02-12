import { Schema } from "mongoose";
const TodoSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret._id;
        return { ...ret, id: doc._id };
      },
    },
  },
);

export { TodoSchema };
