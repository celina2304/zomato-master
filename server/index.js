// Importing env variables
require("dotenv").config();

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";

// Microservices routes
import Auth from "./API/Auth/index";

// Database connection
import ConnectDB from "./database/connection";

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());

// Application routes
zomato.use("/auth", Auth);

zomato.get("/", (req, res) => res.json({message: "setup successful"}));

zomato.listen(4000, () => ConnectDB().then(() => console.log("server is running")).catch(() => console.log("server is running, but database connection failed")));
