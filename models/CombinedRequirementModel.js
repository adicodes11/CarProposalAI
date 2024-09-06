import mongoose from 'mongoose';

// Updated CombinedRequirementSchema
const CombinedRequirementSchema = new mongoose.Schema({
  budgetMin: { type: Number, required: true },
  budgetMax: { type: Number, required: true },
  location: { type: String, required: true },
  bodyStyle: { type: [String], default: [] },
  fuelType: { type: String },
  transmissionType: { type: String },
  drivingRange: { type: String },
  seatingCapacity: { type: String },
  primaryUse: { type: String },
  carColor: { type: String },

  // DetailedRequirement1 fields
  enginePower: { type: String },
  batteryCapacity: { type: String },
  driveModes: { type: String },

  // Exterior Design
  exteriorDesign: { type: [String], default: [] },
  groundClearance: { type: String },

  // Fuel Tank & Boot Space
  fuelTankCapacityMin: { type: Number },
  fuelTankCapacityMax: { type: Number },
  bootSpaceMin: { type: Number },
  bootSpaceMax: { type: Number },

  // Exterior Lighting
  exteriorLighting: {
    fogLights: { type: String },
    daytimeRunningLights: { type: String },
    headlights: { type: String },
    automaticHeadlamps: { type: String },
    followMeHomeHeadlamps: { type: String },
    taillights: { type: String },
  },

  // Safety Features
  safetyFeatures: { type: [String], default: [] },

  // Entertainment Features
  entertainmentFeatures: { type: [String], default: [] },

  // Comfort Features
  comfortFeatures: { type: [String], default: [] },

  // Driving Assistance Features
  drivingAssistanceFeatures: { type: [String], default: [] },

  // Driving Experience
  drivingExperience: { type: String },

  // Created By and Taken From Fields
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  takenFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference if taken from another user

}, { timestamps: true });

const CombinedRequirement = mongoose.models.CombinedRequirement || mongoose.model('CombinedRequirement', CombinedRequirementSchema);

export default CombinedRequirement;
