import cloudinaryPackage from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
import { CloudinaryStorage } from 'multer-storage-cloudinary'

//configure cloudinary
const cloudinary = cloudinaryPackage.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});


const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png", "jpeg"],
    params: {
        folder: "Ecommerce-api",
    },
});

// Init Multer with the storage engine
const categoryFileUploader = multer({ storage: storage });

export default categoryFileUploader;