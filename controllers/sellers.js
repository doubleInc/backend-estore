// import model
const Seller = require("../models/Seller");
const geocoder = require("../geocoder");
const cloud = require("../cloudinary");

// get all Sellers
exports.getSellers = async (req, res, next) => {
  // req.query for searches; /Sellers?<key>=<value>
  const sellers = await Seller.find(req.query);

  res.status(200).json({
    success: true,
    count: sellers.length,
    data: sellers,
  });
};

// Create
//app.post("/", (req, res) => {}
exports.createSeller = async (req, res, next) => {
  //TEST: console.log(req.body);
  //ADD TO DB: Promise method - Seller.create(req, res).then()
  // Async/await method
  const seller = await Seller.create(req.body);

  res.status(201).json({
    success: true,
    data: seller,
  });
};

// Get single
exports.getSeller = async (req, res, next) => {
  // Async/await method
  const seller = await Seller.findById(req.params.id);

  //handle incorrect id format with if -> (!Seller) return res.status(400).json({success: false})

  res.status(200).json({
    success: true,
    data: seller,
  });
};

//Update PUT
//app.put("/:id", (req, res) => {...res.params.id...}
exports.updateSeller = async (req, res, next) => {
  // Async/await method
  // findByIdAndUpdate takes search by param and object to replace/update, finally options obj
  const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // if no Seller found
  if (!seller) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
    data: seller,
  });
};

//delete
//app.put("/:id", (req, res) => {...res.params.id...}
exports.deleteSeller = async (req, res, next) => {
  // Async/await method
  // findByIdAndUpdate takes search by param and object to replace/update, finally options obj
  const seller = await Seller.findByIdAndDelete(req.params.id);

  if (!seller) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
  });
};

//get by location
// GET /local/:postcode/:distance
exports.getSellerInLocale = async (req, res, next) => {
  const { postcode, distance } = req.params;

  //get latitude and longitude, verizon maps(mapquest) needs the country name or will not know what to do with the postcode
  const loc = await geocoder.geocode({
    country: "Australia",
    zipcode: postcode,
  });

  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calc radius
  // divide distance by radius of earth 6376km
  const radius = distance / 6378;

  // search sellers for lng and lat in radius(kms)
  const sellers = await Seller.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });

  // respond with result of sellers
  res.status(200).json({
    success: true,
    distance: radius,
    count: sellers.length,
    data: sellers,
  });
};

// Cloudinary
exports.sellerCloudinary = (req, res) => {
    try{
        const imageDetails = {
            imageName: req.body.imageName,
        }

        Seller.find({imageName: imageDetails.imageName}, (err, callback) => {
            if (err) {
                console.log(err)
                res.json({
                    err: err,
                    message: 'there was a problem uploading image'
                })
            } else if(callback.length >= 1 ) {
                res.json({
                    message: 'file already exist'
                })
            }else {
                const imageDetails = {
                    imageName: req.body.imageName,
                    cloudImage: req.files[0].path,
                    imageId: ''
                }
               console.log('i got here')
                console.log(imageDetails.cloudImage)
                cloud.uploads(imageDetails.cloudImage).then((result) => {
                    console.log(result)
                    const imageDetails = {
                        imageName: req.body.imageName,
                        cloudImage: result.url,
                        imageId: result.id
                    }

                        console.log('i reached here too')
                        console.log(imageDetails.cloudImage)

                        Seller.create(imageDetails, (err, created)=> {
                        if(err){
                            res.json({
                                err: err,
                                message: 'could not upload image, try again'
                            })
                        }else {
                            res.json({
                                created: created,
                                message: "image uploaded successfully!!"
                            })
                        }
                    })


                })

            }
        });
    }catch(execptions){
        console.log(execptions)
    }

}
