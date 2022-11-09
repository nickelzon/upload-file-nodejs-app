const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 4000;

//multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "img");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
//middleware
app.use("/pricksprak", express.static("img"));

//get request
app.get("/send", (req, res) => {
  res.sendFile("img/images", { root: __dirname });
});

app.get("/", (req, res) => {
  const home = fs.readFileSync("index.html");
  res.write(home);
  res.end();
});
//post request
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ status: "uploaded a file" });
});

//listen
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
