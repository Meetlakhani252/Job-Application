import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    resumeLink: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: [true, "Opportunity reference is required"],
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications from the same email for the same opportunity
applicationSchema.index({ email: 1, opportunity: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);

export default Application;
