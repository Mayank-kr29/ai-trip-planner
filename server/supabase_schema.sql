-- ==========================================
-- AI Trip Planner: Supabase SQL Schema
-- Run this script in your Supabase SQL Editor
-- ==========================================

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  dob TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Trips Table
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  budget NUMERIC NOT NULL DEFAULT 10000,
  travelers INTEGER NOT NULL DEFAULT 1,
  trip_type TEXT NOT NULL DEFAULT 'leisure',
  foods JSONB DEFAULT '[]'::jsonb,
  hotels JSONB DEFAULT '[]'::jsonb,
  itinerary JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create index for fast user trip lookups
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON public.trips(user_id);
CREATE INDEX IF NOT EXISTS idx_trips_username ON public.trips(username);

-- 4. Enable Row Level Security (RLS) policies or leave public for backend API access
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Allow backend server access via service role / anon key
CREATE POLICY "Allow all operations for service role and public API" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for service role and public API" ON public.trips FOR ALL USING (true) WITH CHECK (true);
