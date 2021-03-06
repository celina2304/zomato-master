// Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models
import { UserModel } from "../../database/user";

const Router = express.Router();

/*
Route     /signup
Des       Register new user
Params    none
Access    Public
Method    POST  
*/
Router.post("/signup", async(req, res) => {
  try {
    const { email, password, fullname, phoneNumber } = req.body.credentials; 
    await UserModel.findByEmailAndPhone(email, phoneNumber);
    const bcryptSalt = await bcrypt.genSalt(8);

    const hashedPassword = await bcrypt.hash(password, bcryptSalt);
    await UserModel.create({...req.body.credentials, password: hashedPassword});

    const token = jwt.sign({user: {fullname, email}}, "ZomatoAPP");
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;