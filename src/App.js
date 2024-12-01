import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Home from './components/Home';
import DoctorDetails from './components/DoctorDetails';

const firebaseConfig = {
  apiKey: "AIzaSyCBvm6U_zMepXwJUIglBi1d59Crfz_lPT8",
  authDomain: "essentialmhs-101.firebaseapp.com",
  projectId: "essentialmhs-101",
  storageBucket: "essentialmhs-101.firebasestorage.app",
  messagingSenderId: "1043780553635",
  appId: "1:1043780553635:web:311b669188121d151fa816",
  measurementId: "G-HLQSL0621M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor/:id" element={<DoctorDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
