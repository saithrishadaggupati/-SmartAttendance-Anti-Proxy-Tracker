import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface StudentRecord {
  uid: string;
  name: string;
  rollNumber: string;
  email: string;
  status: 'Present' | 'Absent' | 'Drifting' | 'Flagged';
  timestamp: string;
  verifiedBy: string;
}

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

// 15 Custom Profiles - Clean, natural and human-made data directory structure
export const globalStudentMockRegistry: StudentRecord[] = [
  { uid: 's01', name: 'Aarav Sharma', rollNumber: '22CS001', email: 'aarav@nitk.edu.in', status: 'Present', timestamp: '12:04 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's02', name: 'Ananya Iyer', rollNumber: '22CS002', email: 'ananya@nitk.edu.in', status: 'Drifting', timestamp: '12:08 PM', verifiedBy: 'Fallback Node' },
  { uid: 's03', name: 'Vikram Malhotra', rollNumber: '22CS003', email: 'vikram@nitk.edu.in', status: 'Absent', timestamp: '--', verifiedBy: 'None' },
  { uid: 's04', name: 'Diya Nair', rollNumber: '22CS004', email: 'diya@nitk.edu.in', status: 'Present', timestamp: '12:01 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's05', name: 'Rohan Deshmukh', rollNumber: '22CS005', email: 'rohan@nitk.edu.in', status: 'Flagged', timestamp: '12:11 PM', verifiedBy: 'Spoof Detector' },
  { uid: 's06', name: 'Kavya Pillai', rollNumber: '22CS006', email: 'kavya@nitk.edu.in', status: 'Present', timestamp: '12:03 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's07', name: 'Aditya Joshi', rollNumber: '22CS007', email: 'aditya@nitk.edu.in', status: 'Present', timestamp: '12:02 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's08', name: 'Meera Reddy', rollNumber: '22CS008', email: 'meera@nitk.edu.in', status: 'Absent', timestamp: '--', verifiedBy: 'None' },
  { uid: 's09', name: 'Arjun Verma', rollNumber: '22CS009', email: 'arjun@nitk.edu.in', status: 'Present', timestamp: '12:05 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's10', name: 'Sneha Rao', rollNumber: '22CS010', email: 'sneha@nitk.edu.in', status: 'Drifting', timestamp: '12:09 PM', verifiedBy: 'Fallback Node' },
  { uid: 's11', name: 'Vivek Banerjee', rollNumber: '22CS011', email: 'vivek@nitk.edu.in', status: 'Present', timestamp: '12:06 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's12', name: 'Isha Gupta', rollNumber: '22CS012', email: 'isha@nitk.edu.in', status: 'Present', timestamp: '12:01 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's13', name: 'Pranav Saxena', rollNumber: '22CS013', email: 'pranav@nitk.edu.in', status: 'Flagged', timestamp: '12:14 PM', verifiedBy: 'Spoof Detector' },
  { uid: 's14', name: 'Riya Kapoor', rollNumber: '22CS014', email: 'riya@nitk.edu.in', status: 'Present', timestamp: '12:07 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's15', name: 'Yash Choudhury', rollNumber: '22CS015', email: 'yash@nitk.edu.in', status: 'Absent', timestamp: '--', verifiedBy: 'None' }
];

// Professors Registry
export const globalProfessorRegistry = [
  { email: 'bubu@nitk.edu.in', name: 'Prof. BUBU', uid: 'p01' },
  { email: 'dudu@nitk.edu.in', name: 'Prof. DUDU', uid: 'p02' },
  { email: 'budu@nitk.edu.in', name: 'Prof. BUDU', uid: 'p03' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, role: 'student' | 'professor'): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanedEmail = email.toLowerCase().trim();
        
        if (role === 'student') {
          const foundStudent = globalStudentMockRegistry.find(s => s.email === cleanedEmail);
          setUser({
            uid: foundStudent?.uid || 'std_fallback',
            name: foundStudent?.name || 'Guest Student',
            email: cleanedEmail,
            role: 'student',
          });
        } else {
          const foundProf = globalProfessorRegistry.find(p => p.email === cleanedEmail);
          setUser({
            uid: foundProf?.uid || 'prof_fallback',
            name: foundProf?.name || 'Prof. Administrator',
            email: cleanedEmail,
            role: 'professor',
          });
        }
        setIsLoading(false);
        resolve(true);
      }, 600);
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
