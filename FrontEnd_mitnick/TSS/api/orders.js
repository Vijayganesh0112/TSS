// Required Dependencies
const express = require("express");
const multer = require("multer"); // For file uploads
const jwt = require("jsonwebtoken"); // For authentication
const { Order } = require("../../../backend/components/orderdb"); // Corrected path to Order model
const { authenticateUser } = require("../../../backend/middlewares/auth");  //Middleware for JWT validation
//const { uploadFileToCloud } = require("../utils/cloudStorage"); // Utility for cloud uploads

const router = express.Router();

// Middleware for pagination
function paginate(req, res, next) {
  req.page = parseInt(req.query.page) || 1;
  req.limit = parseInt(req.query.limit) || 10;
  next();
}

// Fetch Orders API
router.get("/orders", authenticateUser, paginate, async (req, res) => {
  const { orderType, companyName } = req.query;
  const filter = {};

  if (orderType) filter.status = orderType;
  if (companyName) filter.companyName = { $regex: companyName, $options: "i" }; // Partial match

  try {
    const totalOrders = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .sort({ date: -1 }) // Default sorting by date
      .skip((req.page - 1) * req.limit)
      .limit(req.limit);

    res.status(200).json({
      data: orders,
      pagination: {
        page: req.page,
        limit: req.limit,
        total: totalOrders,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders. Please try again later." });
  }
});

// File Upload Configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only PDF, JPEG, and PNG are allowed."));
    }
    cb(null, true);
  },
});

// File Upload API
router.post("/orders/:id/upload", authenticateUser, upload.single("file"), async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Upload file to cloud storage
    const fileUrl = await uploadFileToCloud(req.file);

    // Update order with the file URL
    await Order.findByIdAndUpdate(id, { transactionCopyUrl: fileUrl });

    res.status(200).json({ message: "File uploaded successfully.", fileUrl });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload file. Please try again later." });
  }
});

// Error Handler for File Uploads
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

module.exports = router;
