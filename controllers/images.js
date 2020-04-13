// import model
const Image = require("../models/Image");
const cloudinary = require("cloudinary");
const Pusher = require("pusher");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// get all image
exports.getImages = async (req, res, next) => {
  // req.query for searches; /image?<key>=<value>
  const image = await Image.find(req.query);

  res.status(200).json({
    success: true,
    count: image.length,
    data: image,
  });
  // .send(html)
  //res.json({ message: "All Categories." });
  // res.status(400).json({})
};

// Create
//app.post("/", (req, res) => {}
exports.createImage = async (req, res, next) => {
  //TEST: console.log(req.body);
  //ADD TO DB: Promise method - image.create(req, res).then()
  // Async/await method
  // Upload image

  console.log(req.files.file.path);

  await cloudinary.v2.uploader.upload(req.files.file.path, {}, function (
    error,
    result
  ) {
    if (error) {
      return res.status(500).send(error);
    }

    const { public_id, url } = result;
    // Save record
    const image = Image.create({ name: public_id, image: url });

    res.status(200).json({
      success: true,
      url,
    });
  });
};

// Get single
