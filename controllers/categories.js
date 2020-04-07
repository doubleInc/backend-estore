// import model
const Category = require("../models/Category")

// get all categories
exports.getCategories = async (req, res, next) => {
    const categories = await Category.find()

    res.status(200).json({
        success: true,
        data: categories
    })
  // .send(html)
  //res.json({ message: "All Categories." });
  // res.status(400).json({})
};

// Create
//app.post("/", (req, res) => {}
exports.createCategory = async (req, res, next) => {
  //TEST: console.log(req.body);
  //ADD TO DB: Promise method - Category.create(req, res).then()
  // Async/await method
    const category = await Category.create(req.body) 

    res.status(201).json({
        success: true,
        data: category
    })

  // .send(html)
  //res.json({ message: "Created Categories." });
  //res.status(200).json({ message: "Created Categories." })
};

// Get single
exports.getCategory = async (req, res, next) => {
  // Async/await method
    const category = await Category.findById(req.params.id)

    //handle incorrect id format with if -> (!category) return res.status(400).json({success: false})

    res.status(200).json({
        success: true,
        data: category
    })

  // .send(html)
  //res.json({ message: "Created Categories." });
  //res.status(200).json({ message: "Created Categories." })
};


//Update PUT
//app.put("/:id", (req, res) => {...res.params.id...}
exports.updateCategory = async (req, res, next) => {
  // Async/await method
    // findByIdAndUpdate takes search by param and object to replace/update, finally options obj
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!category) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({
        success: true,
        data: category
    })

  // .send(html)
  //res.json({ message: "Created Categories." });
  //res.status(200).json({ message: "Created Categories." })
};

//delete
//app.put("/:id", (req, res) => {...res.params.id...}
exports.deleteCategory = async (req, res, next) => {
  // Async/await method
    // findByIdAndUpdate takes search by param and object to replace/update, finally options obj
    const category = await Category.findByIdAndDelete(req.params.id)

    if (!category) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({
        success: true
    })

  // .send(html)
  //res.json({ message: "Created Categories." });
  //res.status(200).json({ message: "Created Categories." })
};
