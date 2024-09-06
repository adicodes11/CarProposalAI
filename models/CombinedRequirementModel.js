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

  enginePower: { type: String },
  batteryCapacity: { type: String },
  driveModes: { type: String },

  exteriorDesign: { type: [String], default: [] },
  groundClearance: { type: String },

  fuelTankCapacityMin: { type: Number },
  fuelTankCapacityMax: { type: Number },
  bootSpaceMin: { type: Number },
  bootSpaceMax: { type: Number },

  exteriorLighting: {
    fogLights: { type: String },
    daytimeRunningLights: { type: String },
    headlights: { type: String },
    automaticHeadlamps: { type: String },
    followMeHomeHeadlamps: { type: String },
    taillights: { type: String },
  },

  safetyFeatures: { type: [String], default: [] },
  entertainmentFeatures: { type: [String], default: [] },
  comfortFeatures: { type: [String], default: [] },
  drivingAssistanceFeatures: { type: [String], default: [] },

  drivingExperience: { type: String },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  takenFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { timestamps: true });

const CombinedRequirement = mongoose.models.CombinedRequirement || mongoose.model('CombinedRequirement', CombinedRequirementSchema);

export default CombinedRequirement;
