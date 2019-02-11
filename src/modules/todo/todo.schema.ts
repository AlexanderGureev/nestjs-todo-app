import * as mongoose from "mongoose";

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const TodoSchema = new mongoose.Schema(
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
