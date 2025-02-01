// This file contains the Supabase client configuration

// Import the Supabase client constructor
// createClient is a function that creates a new Supabase client instance
import { createClient } from '@supabase/supabase-js';

// Environment variables are values that can change depending on the environment
// They are typically stored in a .env file and not committed to version control
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a Supabase client instance
// This client will be used throughout the application to interact with the database
export const supabase = createClient(supabaseUrl, supabaseKey);

// File: /src/lib/types.ts
// TypeScript interfaces define the shape of our data
// They help catch errors during development
export interface User {
  id: string;
  email: string;
  created_at: string;
}
