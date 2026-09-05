import { GoogleGenerativeAI } from '@google/generative-ai';
import supabase from '../supabaseClient.js';
import { getCuratedItinerary } from '../data/destinationPlaces.js';

// Format Supabase Postgres row to match frontend expected fields
const formatTripResponse = (trip) => {
  if (!trip) return null;
  return {
    _id: trip.id,
    id: trip.id,
    userId: trip.user_id,
    username: trip.username,
    state: trip.state,
    city: trip.city,
    startDate: trip.start_date,
    endDate: trip.end_date,
    budget: Number(trip.budget),
    travelers: Number(trip.travelers),
    tripType: trip.trip_type,
    foods: trip.foods || [],
    hotels: trip.hotels || [],
    itinerary: trip.itinerary || [],
    createdAt: trip.created_at
  };
};

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

  // Get curated day-by-day itinerary with exact tourist places, landmarks, timings, and map links
  const itinerary = getCuratedItinerary(city, state, numDays, dailyBudget);

  return { foods, hotels, itinerary };
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

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 15) {
      const prompt = `
You are an expert AI travel planner for Indian tourism.
Plan a highly detailed ${diffDays}-day ${tripType || 'leisure'} trip to ${city}, ${state} for ${travelers || 2} travelers.
Total trip budget: ₹${budget || 15000}.

CRITICAL REQUIREMENT: For every morning, afternoon, and evening session, you MUST provide the EXACT real-world tourist attraction, monument, landmark, beach, or heritage site in the "placeName" field (e.g., "Victoria Memorial", "Amber Fort", "Gateway of India", "Calangute Beach", "Dakshineswar Temple"). DO NOT use generic placeholders or general terms.

Respond STRICTLY in valid JSON format with no markdown formatting or backticks. The JSON must exactly match the following structure:
{
  "foods": ["famous food 1", "famous food 2", "famous food 3", "famous food 4"],
  "hotels": [
    { "name": "Realistic Hotel Name 1", "price": "₹2000/night", "rating": "4.5", "hotelType": "luxury", "link": "https://www.google.com/travel/hotels?q=Hotel+Name+City" },
    { "name": "Realistic Hotel Name 2", "price": "₹1000/night", "rating": "4.0", "hotelType": "standard", "link": "https://www.google.com/travel/hotels?q=Hotel+Name+City" }
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Iconic Heritage & Scenic Riverfront",
      "expense": "₹1500",
      "morning": {
        "placeName": "Exact Famous Attraction Name",
        "activity": "Activity / What to do at this place",
        "description": "Engaging details of highlights, history, and photography tips",
        "time": "09:00 AM - 12:00 PM",
        "ticketPrice": "₹50 entry",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Attraction+Name+City"
      },
      "afternoon": {
        "placeName": "Exact Famous Attraction Name",
        "activity": "Activity / What to do at this place",
        "description": "Engaging details of highlights, history, and photography tips",
        "time": "01:00 PM - 04:30 PM",
        "ticketPrice": "Free entry",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Attraction+Name+City"
      },
      "evening": {
        "placeName": "Exact Famous Attraction Name",
        "activity": "Activity / What to do at this place",
        "description": "Engaging details of highlights, history, and photography tips",
        "time": "05:00 PM - 08:00 PM",
        "ticketPrice": "Free entry",
        "mapUrl": "https://www.google.com/maps/search/?api=1&query=Attraction+Name+City"
      }
    }
  ]
}
Make sure the itinerary array has exactly ${diffDays} items inside it. Ensure realistic daily expenses fitting within the total budget.
`;

      const candidateModels = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro", "gemini-flash-latest"];
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());

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
            // Ensure map URLs exist for any AI returned places
            generatedData.itinerary.forEach((day) => {
              ['morning', 'afternoon', 'evening'].forEach((slot) => {
                if (day[slot]) {
                  if (!day[slot].mapUrl) {
                    const q = (day[slot].placeName || day[slot].activity || city) + ' ' + city;
                    day[slot].mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
                  }
                }
              });
            });
            break;
          }
        } catch (mErr) {
          console.warn(`Attempt with ${modelName} did not succeed:`, mErr.message);
          if (mErr.message.includes('401') || mErr.message.includes('API key') || mErr.message.includes('authentication')) {
            break;
          }
        }
      }
    }

    if (!generatedData || !Array.isArray(generatedData.itinerary) || generatedData.itinerary.length === 0) {
      console.log(`Generating curated comprehensive itinerary for ${city}, ${state} (${diffDays} days)...`);
      generatedData = generateFallbackItinerary(city, state, diffDays, budget, travelers, tripType);
    }

    const previewTrip = {
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
    };

    // Return the generated trip object (not saved to Supabase yet until user confirms)
    res.status(201).json(previewTrip);

  } catch (error) {
    console.error('Error generating trip:', error.message);
    res.status(500).json({ message: 'Server failed to process trip plan: ' + error.message });
  }
};

export const saveTripPlan = async (req, res) => {
  try {
    const { _id, id, ...tripData } = req.body;

    const { data: savedTrip, error } = await supabase
      .from('trips')
      .insert([{
        user_id: req.userId,
        username: req.username,
        state: tripData.state || '',
        city: tripData.city || '',
        start_date: tripData.startDate || '',
        end_date: tripData.endDate || '',
        budget: Number(tripData.budget) || 0,
        travelers: Number(tripData.travelers) || 1,
        trip_type: tripData.tripType || 'leisure',
        foods: tripData.foods || [],
        hotels: tripData.hotels || [],
        itinerary: tripData.itinerary || []
      }])
      .select()
      .single();

    if (error || !savedTrip) {
      console.error('Supabase Save Trip Error:', error);
      return res.status(500).json({ message: 'Failed to save trip to database: ' + (error?.message || '') });
    }

    res.status(201).json(formatTripResponse(savedTrip));
  } catch (error) {
    console.error('Error saving trip:', error.message);
    res.status(500).json({ message: 'Server error while saving trip: ' + error.message });
  }
};

export const updateTripPlan = async (req, res) => {
  try {
    const tripId = req.params.id;
    const { _id, id, ...tripData } = req.body;

    const updateFields = {};
    if (tripData.state !== undefined) updateFields.state = tripData.state;
    if (tripData.city !== undefined) updateFields.city = tripData.city;
    if (tripData.startDate !== undefined) updateFields.start_date = tripData.startDate;
    if (tripData.endDate !== undefined) updateFields.end_date = tripData.endDate;
    if (tripData.budget !== undefined) updateFields.budget = Number(tripData.budget);
    if (tripData.travelers !== undefined) updateFields.travelers = Number(tripData.travelers);
    if (tripData.tripType !== undefined) updateFields.trip_type = tripData.tripType;
    if (tripData.foods !== undefined) updateFields.foods = tripData.foods;
    if (tripData.hotels !== undefined) updateFields.hotels = tripData.hotels;
    if (tripData.itinerary !== undefined) updateFields.itinerary = tripData.itinerary;

    const { data: updatedTrip, error } = await supabase
      .from('trips')
      .update(updateFields)
      .eq('id', tripId)
      .eq('user_id', req.userId)
      .select()
      .single();

    if (error || !updatedTrip) {
      console.error('Supabase Update Trip Error:', error);
      return res.status(404).json({ message: 'Trip not found or update failed' });
    }

    res.status(200).json(formatTripResponse(updatedTrip));
  } catch (error) {
    console.error('Error updating trip:', error.message);
    res.status(500).json({ message: 'Server error while updating trip: ' + error.message });
  }
};

export const deleteTripPlan = async (req, res) => {
  try {
    const tripId = req.params.id;

    const { data, error } = await supabase
      .from('trips')
      .delete()
      .eq('id', tripId)
      .eq('user_id', req.userId)
      .select();

    if (error) {
      console.error('Supabase Delete Trip Error:', error);
      return res.status(500).json({ message: 'Failed to delete trip from database' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error.message);
    res.status(500).json({ message: 'Server error while deleting trip: ' + error.message });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const { data: trips, error } = await supabase
      .from('trips')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Get All Trips Error:', error);
      return res.status(500).json({ message: 'Failed to fetch trips from database' });
    }

    res.status(200).json((trips || []).map(formatTripResponse));
  } catch (error) {
    console.error('Error fetching trips:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const getTrip = async (req, res) => {
  try {
    const tripId = req.params.id;

    const { data: trip, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', tripId)
      .eq('user_id', req.userId)
      .maybeSingle();

    if (error || !trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(formatTripResponse(trip));
  } catch (error) {
    console.error('Error fetching trip:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
