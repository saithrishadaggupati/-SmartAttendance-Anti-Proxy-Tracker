import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

// Branded 20-Student Database Registry Pool mapped directly to Bubu University handles
export const globalStudentMockRegistry: StudentRecord[] = [
  { uid: 's01', name: "Aman Deshmukh", rollNumber: '22CS001', email: 'aman.d@bubu.edu.in', status: 'Present', timestamp: '12:04 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's02', name: "Divya Kulkarni", rollNumber: '22CS002', email: 'divya.k@bubu.edu.in', status: 'Present', timestamp: '12:08 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's03', name: "Srinivas Rao", rollNumber: '22CS003', email: 'srinivas.r@bubu.edu.in', status: 'Present', timestamp: '12:01 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's04', name: "Ananya Iyer", rollNumber: '22CS004', email: 'ananya.i@bubu.edu.in', status: 'Flagged', timestamp: '12:11 PM', verifiedBy: 'Spoof Detector' },
  { uid: 's05', name: "Pranav Joshi", rollNumber: '22CS005', email: 'pranav.j@bubu.edu.in', status: 'Present', timestamp: '12:03 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's06', name: "Meghana Reddy", rollNumber: '22CS006', email: 'meghana.r@bubu.edu.in', status: 'Present', timestamp: '12:02 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's07', name: "Manish Nair", rollNumber: '22CS007', email: 'manish.n@bubu.edu.in', status: 'Present', timestamp: '12:05 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's08', name: "Sneha Hegde", rollNumber: '22CS008', email: 'sneha.h@bubu.edu.in', status: 'Absent', timestamp: '--', verifiedBy: 'None' },
  { uid: 's09', name: "Vikram Singhania", rollNumber: '22CS009', email: 'vikram.s@bubu.edu.in', status: 'Flagged', timestamp: '12:14 PM', verifiedBy: 'Spoof Detector' },
  { uid: 's10', name: "Pooja Pillai", rollNumber: '22CS010', email: 'pooja.p@bubu.edu.in', status: 'Present', timestamp: '12:07 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's11', name: "Abhishek Saxena", rollNumber: '22CS011', email: 'abhishek.s@bubu.edu.in', status: 'Present', timestamp: '12:06 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's12', name: "Sanjana Choudhury", rollNumber: '22CS012', email: 'sanjana.c@bubu.edu.in', status: 'Present', timestamp: '12:01 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's13', name: "Tejas Malhotra", rollNumber: '22CS013', email: 'tejas.m@bubu.edu.in', status: 'Present', timestamp: '12:05 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's14', name: "Varun Bhatia", rollNumber: '22CS014', email: 'varun.b@bubu.edu.in', status: 'Present', timestamp: '12:07 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's15', name: "Kriti Shenoy", rollNumber: '22CS015', email: 'kriti.s@bubu.edu.in', status: 'Absent', timestamp: '--', verifiedBy: 'None' },
  { uid: 's16', name: "Harish Venkat", rollNumber: '22CS016', email: 'harish.v@bubu.edu.in', status: 'Present', timestamp: '12:02 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's17', name: "Riya Banerjee", rollNumber: '22CS017', email: 'riya.b@bubu.edu.in', status: 'Present', timestamp: '12:09 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's18', name: "Nitin Gavaskar", rollNumber: '22CS018', email: 'nitin.g@bubu.edu.in', status: 'Present', timestamp: '12:01 PM', verifiedBy: 'GPS-Sat Core' },
  { uid: 's19', name: "Akash Mishra", rollNumber: '22CS019', email: 'akash.m@bubu.edu.in', status: 'Flagged', timestamp: '12:12 PM', verifiedBy: 'Spoof Detector' },
  { uid: 's20', name: "Kiran Kapoor", rollNumber: '22CS020', email: 'kiran.k@bubu.edu.in', status: 'Present', timestamp: '12:04 PM', verifiedBy: 'GPS-Sat Core' }
];

// Master Administration Node Core
export const globalProfessorRegistry = [
  { email: 'director.bubu@bubu.edu.in', name: 'Director BUBU', uid: 'p01' },
  { email: 'bubu@bubu.edu.in', name: 'Director BUBU', uid: 'p02' },
  { email: 'dudu@bubu.edu.in', name: 'Counselor DUDU', uid: 'p03' },
  { email: 'budu@bubu.edu.in', name: 'Head BUDU', uid: 'p04' }
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
            uid: foundStudent?.uid || 's16',
            name: foundStudent?.name || 'Harish Venkat',
            email: cleanedEmail || 'harish.v@bubu.edu.in',
            role: 'student',
          });
        } else {
          const foundProf = globalProfessorRegistry.find(p => p.email === cleanedEmail);
          setUser({
            uid: foundProf?.uid || 'p01',
            name: foundProf?.name || 'Director BUBU',
            email: cleanedEmail || 'director.bubu@bubu.edu.in',
            role: 'professor',
          });
        }
        setIsLoading(false);
        resolve(true);
      }, 300);
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
  if (context === undefined) {
    return { user: null, login: async () => true, logout: () => {}, isLoading: false };
  }
  return context;
}
