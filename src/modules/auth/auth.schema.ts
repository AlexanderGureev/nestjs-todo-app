import * as bcrypt from "bcrypt";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
        return { ...ret, id: doc._id };
      },
    },
  },
);

UserSchema.methods.hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
UserSchema.methods.comparePassword = async (hash, password) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};

export { UserSchema };
