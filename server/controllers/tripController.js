import Trip, { getTripModel } from '../models/Trip.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mongoose from 'mongoose';

const getDestinationFoods = (city, state) => {
  const c = (city || '').toLowerCase();
  const s = (state || '').toLowerCase();

  if (c.includes('goa') || s.includes('goa')) return ['Goan Fish Curry', 'Prawn Balchão', 'Bebinca', 'Pork Vindaloo', 'Feni & Sol Kadhi'];
  if (c.includes('jaipur') || c.includes('udaipur') || c.includes('jodhpur') || s.includes('rajasthan')) return ['Dal Baati Churma', 'Laal Maas', 'Ghevar', 'Pyaz Kachori', 'Ker Sangri'];
  if (c.includes('munnar') || c.includes('kochi') || c.includes('alleppey') || s.includes('kerala')) return ['Appam with Ishtu', 'Kerala Sadya', 'Malabar Prawn Curry', 'Puttu & Kadala', 'Banana Chips'];
  if (c.includes('delhi')) return ['Chole Bhature', 'Old Delhi Butter Chicken', 'Parathas at Chandni Chowk', 'Nihari', 'Daulat Ki Chaat'];
  if (c.includes('mumbai') || c.includes('pune') || s.includes('maharashtra')) return ['Vada Pav', 'Misal Pav', 'Pav Bhaji', 'Puran Poli', 'Bombil Fry'];
  if (c.includes('varanasi') || c.includes('lucknow') || c.includes('agra') || s.includes('uttar pradesh')) return ['Banarasi Paan', 'Kachori Sabzi & Jalebi', 'Galouti Kebab', 'Agra Petha', 'Malaiyo'];
  if (c.includes('shimla') || c.includes('manali') || s.includes('himachal')) return ['Siddu', 'Himachali Dham', 'Kullu Trout Fish', 'Chana Madra', 'Babru'];
  if (c.includes('rishikesh') || c.includes('nainital') || s.includes('uttarakhand')) return ['Kafuli', 'Aloo ke Gutke', 'Kumaoni Raita', 'Bal Mithai', 'Garhwal Fannah'];
  if (c.includes('bengaluru') || c.includes('mysuru') || s.includes('karnataka')) return ['Mysore Masala Dosa', 'Bisi Bele Bath', 'Mysore Pak', 'Filter Coffee', 'Mangalorean Ghee Roast'];
  if (c.includes('chennai') || c.includes('ooty') || s.includes('tamil nadu')) return ['Chettinad Chicken', 'Idli Sambar', 'Pongal', 'Jigarthanda', 'Filter Kaapi'];
  if (c.includes('kolkata') || c.includes('darjeeling') || s.includes('west bengal')) return ['Kolkata Biryani', 'Macher Jhol', 'Rasgulla & Sandesh', 'Darjeeling Momos', 'Kathi Rolls'];
  if (c.includes('amritsar') || s.includes('punjab')) return ['Amritsari Kulcha', 'Makki di Roti & Sarson da Saag', 'Butter Chicken', 'Lassi', 'Pinni'];
  if (c.includes('ahmedabad') || s.includes('gujarat')) return ['Dhokla & Khandvi', 'Gujarati Thali', 'Undhiyu', 'Fafda Jalebi', 'Thepla'];

  return [
    `Authentic ${city} Traditional Thali`,
    `Local ${city} Street Delicacies`,
    `Fresh Regional Sweets & Desserts`,
    `Famous ${state} Spiced Curry & Flatbreads`
  ];
};

const generateFallbackItinerary = (city, state, diffDays, budget, travelers, tripType) => {
  const numDays = Math.min(Math.max(Number(diffDays) || 3, 1), 14);
  const totalBudget = Number(budget) || 15000;
  const numTravelers = Number(travelers) || 2;
  const dailyBudget = Math.max(Math.round(totalBudget / numDays), 800);

  const foods = getDestinationFoods(city, state);

  const hotels = [
    {
      name: `Grand ${city} Palace & Resort`,
      price: `₹${Math.round(dailyBudget * 0.45)}/night`,
      rating: "4.8",
      hotelType: "luxury",
      link: `https://www.google.com/travel/hotels?q=Hotels+in+${encodeURIComponent(city + ' ' + state)}`
    },
    {
      name: `${city} Heritage Boutique Stay`,
      price: `₹${Math.round(dailyBudget * 0.3)}/night`,
      rating: "4.4",
      hotelType: "standard",
      link: `https://www.google.com/travel/hotels?q=Hotels+in+${encodeURIComponent(city + ' ' + state)}`
    },
    {
      name: `${city} Travellers Comfort Inn`,
      price: `₹${Math.round(dailyBudget * 0.18)}/night`,
      rating: "4.1",
      hotelType: "budget",
      link: `https://www.google.com/travel/hotels?q=Hotels+in+${encodeURIComponent(city + ' ' + state)}`
    }
  ];

  const dayThemes = [
    { title: "Arrival, Check-in & Scenic Welcome", activityType: "Orientation" },
    { title: "Iconic Landmarks & Historical Exploration", activityType: "Heritage" },
    { title: "Cultural Immersion & Vibrant Bazaars", activityType: "Culture" },
    { title: "Nature Trails & Panoramic Sunset Views", activityType: "Nature" },
    { title: "Gastronomy, Street Food & Art Exploration", activityType: "Culinary" },
    { title: "Hidden Gems & Leisure Excursion", activityType: "Exploration" },
    { title: "Adventure & Thrilling Outdoor Activities", activityType: "Adventure" },
    { title: "Relaxation & Riverside / Lake Promenade", activityType: "Relaxation" },
    { title: "Local Craft Villages & Artisan Workshops", activityType: "Craft" },
    { title: "Sacred Shrines & Architectural Wonders", activityType: "Architecture" },
    { title: "Scenic Countryside Day Excursion", activityType: "Getaway" },
    { title: "Photography Walk & Twilight Viewpoints", activityType: "Sightseeing" },
    { title: "Souvenir Shopping & Farewell Feast", activityType: "Shopping" },
    { title: "Last-Minute Exploring & Joyful Departure", activityType: "Departure" }
  ];

  const itinerary = [];
  for (let i = 0; i < numDays; i++) {
    const dayNum = i + 1;
    const theme = dayThemes[i % dayThemes.length];
    const dayEstExpense = Math.round(dailyBudget * 0.8);

    itinerary.push({
      day: dayNum,
      title: theme.title,
      expense: `₹${dayEstExpense}`,
      morning: {
        activity: `Morning ${theme.activityType} in ${city}`,
        description: `Begin your morning with breakfast featuring local favorites, followed by exploring premier sights in ${city}.`
      },
      afternoon: {
        activity: `Afternoon ${tripType} Highlights in ${city}`,
        description: `Delve into the vibrant atmosphere of ${city}, visit key cultural spots, and taste authentic ${state} specialties.`
      },
      evening: {
        activity: `Sunset & Nightlife Experience in ${city}`,
        description: `Conclude Day ${dayNum} with a relaxing sunset stroll, local shopping, and an exquisite dinner for ${numTravelers} travelers.`
      }
    });
  }

  return {
    foods,
    hotels,
    itinerary
  };
};

export const generateTripPlan = async (req, res) => {
  try {
    const { state, city, startDate, endDate, budget, travelers, tripType } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    let diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    if (isNaN(diffDays) || diffDays <= 0) diffDays = 3; 
    if (diffDays > 14) diffDays = 14; 

    let generatedData = null;

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.startsWith('AIzaSy')) {
      const prompt = `
You are an expert AI travel planner for Indian tourism.
Plan a highly detailed ${diffDays}-day ${tripType || 'leisure'} trip to ${city}, ${state} for ${travelers || 2} travelers.
Total trip budget: ₹${budget || 15000}.

Respond STRICTLY in valid JSON format with no markdown formatting or backticks. The JSON must exactly match the following structure:
{
  "foods": ["famous food 1", "famous food 2", "famous food 3", "famous food 4"],
  "hotels": [
    { "name": "Realistic Hotel Name 1", "price": "₹e.g., 2000/night", "rating": "4.5", "hotelType": "luxury", "link": "https://www.google.com/travel/hotels?q=Hotel+Name+City" },
    { "name": "Realistic Hotel Name 2", "price": "₹e.g., 1000/night", "rating": "4.0", "hotelType": "standard", "link": "https://www.google.com/travel/hotels?q=Hotel+Name+City" }
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & Exploration",
      "expense": "₹1500",
      "morning": { "activity": "Activity Name", "description": "Details" },
      "afternoon": { "activity": "Activity Name", "description": "Details" },
      "evening": { "activity": "Activity Name", "description": "Details" }
    }
  ]
}
Make sure the itinerary array has exactly ${diffDays} items inside it. Offer realistic daily expenses fitting within the total budget.
`;

      const candidateModels = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro", "gemini-flash-latest"];
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      for (const modelName of candidateModels) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(prompt);
          const response = await result.response;
          let text = response.text();

          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            generatedData = JSON.parse(jsonMatch[0]);
          } else {
            text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
            generatedData = JSON.parse(text);
          }

          if (generatedData && Array.isArray(generatedData.itinerary) && generatedData.itinerary.length > 0) {
            break;
          }
        } catch (mErr) {
          console.warn(`Attempt with ${modelName} did not succeed:`, mErr.message);
        }
      }
    }

    if (!generatedData || !Array.isArray(generatedData.itinerary)) {
      console.log(`Generating curated comprehensive itinerary for ${city}, ${state} (${diffDays} days)...`);
      generatedData = generateFallbackItinerary(city, state, diffDays, budget, travelers, tripType);
    }

    const UserTrip = getTripModel(req.username);
    const newTrip = new UserTrip({
      userId: req.userId,
      state: state || 'India',
      city: city || 'City',
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date().toISOString().split('T')[0],
      budget: Number(budget) || 10000,
      travelers: Number(travelers) || 2,
      tripType: tripType || 'leisure',
      foods: generatedData.foods || [],
      hotels: generatedData.hotels || [],
      itinerary: generatedData.itinerary || []
    });

    // Return the generated trip object (not saved until user confirms)
    res.status(201).json(newTrip);

  } catch (error) {
    console.error('Error generating trip:', error.message);
    res.status(500).json({ message: 'Server failed to process trip plan', error: error.message });
  }
};

export const saveTripPlan = async (req, res) => {
  try {
    const UserTrip = getTripModel(req.username);
    // Strip out _id if it exists to avoid MongoDB duplicate key errors
    const { _id, ...tripData } = req.body;
    const newTrip = new UserTrip({
      ...tripData,
      userId: req.userId
    });

    if (mongoose.connection.readyState === 1) {
      const savedTrip = await newTrip.save();
      res.status(201).json(savedTrip);
    } else {
      res.status(500).json({ message: "MongoDB is not connected to save the trip." });
    }
  } catch (error) {
    console.error('Error saving trip:', error.message);
    res.status(500).json({ message: 'Server error while saving trip', error: error.message });
  }
};

export const updateTripPlan = async (req, res) => {
  try {
    const UserTrip = getTripModel(req.username);
    const tripId = req.params.id;
    const { _id, ...tripData } = req.body;
    
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "MongoDB is not connected to update the trip." });
    }

    const updatedTrip = await UserTrip.findOneAndUpdate(
      { _id: tripId, userId: req.userId },
      { $set: tripData },
      { new: true }
    );
    
    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found." });
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error('Error updating trip:', error.message);
    res.status(500).json({ message: 'Server error while updating trip', error: error.message });
  }
};

export const deleteTripPlan = async (req, res) => {
  try {
    const UserTrip = getTripModel(req.username);
    const tripId = req.params.id;
    
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: "MongoDB is not connected to delete the trip." });
    }

    const deletedTrip = await UserTrip.findOneAndDelete({ _id: tripId, userId: req.userId });
    
    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found." });
    }

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error('Error deleting trip:', error.message);
    res.status(500).json({ message: 'Server error while deleting trip', error: error.message });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
       return res.status(500).json({ message: "MongoDB is not connected to fetch history." });
    }
    const UserTrip = getTripModel(req.username);
    const trips = await UserTrip.find({ userId: req.userId }).sort({ createdAt: -1 }); // newest first
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    if (mongoose.connection.readyState !== 1) {
       return res.status(500).json({ message: "MongoDB is not connected to fetch the trip." });
    }
    const UserTrip = getTripModel(req.username);
    const trip = await UserTrip.findOne({ _id: tripId, userId: req.userId });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
