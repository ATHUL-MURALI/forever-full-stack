import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import multer from 'multer';
import { exec } from 'child_process';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Create __filename and __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
// const multer = require("multer");
// const path = require("path");
// const { exec } = require("child_process");
// const fs = require("fs");

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

// Middleware to serve static files from the results folder
app.use("/VITON-HD/results", express.static(path.join(__dirname, "VITON-HD/results")));

// Function to ensure directories exist
const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Ensure necessary directories exist
createDirectory(path.join(__dirname, "VITON-HD/datasets/test/image"));
createDirectory(path.join(__dirname, "VITON-HD/datasets/test/cloth"));
createDirectory(path.join(__dirname, "VITON-HD/results"));

// Multer configuration for file uploads
const storagevto = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "personImage") {
      cb(null, "./VITON-HD/datasets/test/image");
    } else if (file.fieldname === "clothImage") {
      cb(null, "./VITON-HD/datasets/test/cloth");
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadvto = multer({ storage: storagevto });

// Endpoint to process VITON-HD
app.post(
  "/process-vitons",
  uploadvto.fields([
    { name: "personImage" },
    { name: "clothImage" },
  ]),
  async (req, res) => {
    try {
      console.log('Uploaded files:', req.files);

      // Ensure both images are uploaded
      if (!req.files || !req.files.personImage || !req.files.clothImage) {
        return res.status(400).send({ message: "Both person and cloth images are required." });
      }

      const personImage = req.files.personImage[0].originalname;
      const clothImage = req.files.clothImage[0].originalname;

      // Clear and update test_pairs.txt with person and cloth image names
      const testPairsPath = path.join(__dirname, "VITON-HD/datasets/test_pairs.txt");
      fs.writeFileSync(testPairsPath, `${personImage} ${clothImage}\n`);

      // Generate a unique name for this test run
      const uniqueName = `${Date.now()}`;

      // Run the VITON-HD processing script
      exec(
        `python ./VITON-HD/test.py --name ${uniqueName} --checkpoint_dir ./VITON-HD/checkpoints --dataset_dir ./VITON-HD/datasets`,
        (error, stdout, stderr) => {
          if (error) {
            console.error("Error running VITON-HD script:", error);
            return res.status(500).send({ message: "Error processing VITON-HD." });
          }

          console.log("VITON-HD Output:", stdout);

          // Construct the result image path
          const resultImageName = `${personImage.split('_')[0]}_${clothImage.split('_')[0]}_${clothImage.split('_')[1]}`;
          const resultImagePath = path.join(__dirname, "VITON-HD/results", uniqueName, resultImageName);

          // Check if the result image exists
          if (!fs.existsSync(resultImagePath)) {
            return res.status(500).send({ message: "Result image not found." });
          }

          const resultImageUrl = `/VITON-HD/results/${uniqueName}/${resultImageName}`;

          // Send response with result URL
          res.status(200).send({
            message: "Processing complete.",
            result: resultImageUrl,
          });
        }
      );
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send({ message: "Server error during processing." });
    }
  }
);


app.listen(port, ()=> console.log('Server started on PORT : '+ port))