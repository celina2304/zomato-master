import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String},
    address: [{detail: {type: String}, for:{type: String}}],
    phoneNumber: [{type: Number}]
},
{
    timestamps: true,
  });

UserSchema.statics.findByEmailAndPhone = async (email, phoneNumber) => {
    // check whether email exist
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User Already Exist...!");
    }

    return false;
};

export const UserModel = mongoose.model("Users", UserSchema);