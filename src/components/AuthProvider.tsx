import { createContext, useContext } from 'react';
import { useSupabase } from '../hooks/useSupabase';

// Create a context to share auth state across components
// Context provides a way to pass data through the component tree
const AuthContext = createContext<ReturnType<typeof useSupabase>>({
  user: null,
  loading: true,
});

// Props interface defines the expected properties for the component
interface AuthProviderProps {
  children: React.ReactNode;
}

// The AuthProvider component wraps our app and provides auth state
export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useSupabase();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
// This makes it easy to access auth state from any component
export function useAuth() {
  return useContext(AuthContext);
}
