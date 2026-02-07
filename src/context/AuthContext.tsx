import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import axios from 'axios';

const API_URL = '/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('paradox_auth') === 'true';
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      if (response.data.success) {
        localStorage.setItem('paradox_auth', 'true');
        localStorage.setItem('paradox_token', response.data.token);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('paradox_auth');
    localStorage.removeItem('paradox_token');
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
