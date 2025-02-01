// File: /src/lib/types.ts
// TypeScript interfaces define the shape of our data
// They help catch errors during development
export interface User {
  id: string;
  email?: string;
  created_at: string;
}
