const mongoose = require("mongoose");
const { DOMAINS, OPPORTUNITY_TYPES } = require("../constants/enums");

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: OPPORTUNITY_TYPES,
      required: [true, "Type is required"],
    },
    domain: {
      type: String,
      enum: DOMAINS,
      required: [true, "Domain is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    applicationLink: {
      type: String,
      required: [true, "Application link is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

module.exports = Opportunity;
