import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  budget: { type: Number, required: true },
  travelers: { type: Number, required: true },
  tripType: { type: String, required: true },
  foods: [{ type: String }],
  hotels: [{
    name: String,
    price: String,
    rating: String,
    hotelType: String,
    link: String
  }],
  itinerary: [{
    day: Number,
    title: String,
    expense: String,
    morning: { activity: String, description: String },
    afternoon: { activity: String, description: String },
    evening: { activity: String, description: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

export const getTripModel = (username) => {
  if (!username) return mongoose.models.Trip || mongoose.model('Trip', TripSchema);
  const cleanUsername = String(username).toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const modelName = `Trip_${cleanUsername}`;
  return mongoose.models[modelName] || mongoose.model(modelName, TripSchema, `trips_${cleanUsername}`);
};

export default mongoose.models.Trip || mongoose.model('Trip', TripSchema);
