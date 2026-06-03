import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  uid: string;
  name: string;
  role: 'student' | 'professor';
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'student' | 'professor') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // SDE Skill: Simulating client-side role assignment and validation
  const login = async (email: string, role: 'student' | 'professor'): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Human engineering choice: Set realistic mock user data based on role choice
        if (role === 'student') {
          setUser({
            uid: 'std_9921',
            name: 'Sai Thrisha',
            email: email,
            role: 'student',
          });
        } else {
          setUser({
            uid: 'prof_4402',
            name: 'Dr. K. Srinivasan',
            email: email,
            role: 'professor',
          });
        }
        setIsLoading(false);
        resolve(true);
      }, 800); // Realistic network handshake delay
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
