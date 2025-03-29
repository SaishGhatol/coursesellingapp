const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },  // Password should be hashed
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
}, { timestamps: true });

const adminSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
}, { timestamps: true });

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    creatorId: { type: ObjectId, ref: "admin", required: true } // Reference to Admin model
}, { timestamps: true });

const purchaseSchema = new Schema({
    userId: { type: ObjectId, ref: "user", required: true }, // Reference to User model
    courseId: { type: ObjectId, ref: "course", required: true } // Reference to Course model
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};