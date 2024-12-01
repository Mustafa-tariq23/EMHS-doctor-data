// Script to add doctors (you can run this separately)
import { collection, addDoc } from "firebase/firestore";

const doctorsData = [
  {
    name: "Dr. Fatima Bukharie",
    role: "Consultant Psychiatrist",
    experience: "9+ years in Psychiatry",
    education: "MBBS, FCPS (Psychiatry)",
    availability: {
      Monday: { start: "14:00", end: "20:00" },
      Tuesday: { start: "14:00", end: "20:00" },
      Wednesday: { start: "14:00", end: "20:00" },
      Thursday: { start: "14:00", end: "20:00" },
      Friday: { start: "14:00", end: "20:00" },
      Saturday: { start: "12:00", end: "20:00" },
    },
  },
  {
    name: "Dr Nayab Iftikhar",
    role: "Speech and language pathologist",
    experience: "12 plus years experience",
    education: "PhD. SLP , from Ifugao states university philippine.",
    availability: {
      Monday: { start: "14:00", end: "20:00" },
      Tuesday: { start: "14:00", end: "20:00" },
      Wednesday: { start: "14:00", end: "20:00" },
      Thursday: { start: "14:00", end: "20:00" },
      Friday: { start: "14:00", end: "20:00" },
      Saturday: { start: "12:00", end: "20:00" },
    },
  },
  {
    name: "Dr maahin rizwan",
    role: "Consultant psychiatrist",
    experience: "8+ years in Psychiatry",
    education: "MBBS, FCPS (Psychiatrist)",
    availability: {
      Monday: { start: "14:00", end: "20:00" },
      Tuesday: { start: "14:00", end: "20:00" },
      Wednesday: { start: "14:00", end: "20:00" },
      Thursday: { start: "14:00", end: "20:00" },
      Friday: { start: "14:00", end: "20:00" },
      Saturday: { start: "12:00", end: "20:00" },
    },
  },
  {
    name: "Dr Hira Liaqat",
    role: "Focusing Oriented Therapy (FOT)",
    experience:
      "8+ years of experience as am academic and clinical psychologist",
    education: "BSc Clinical psyche , MS clinical Psyche NUST , PhD scholar",
    availability: {
      Monday: { start: "14:00", end: "20:00" },
      Tuesday: { start: "14:00", end: "20:00" },
      Wednesday: { start: "14:00", end: "20:00" },
      Thursday: { start: "14:00", end: "20:00" },
      Friday: { start: "14:00", end: "20:00" },
      Saturday: { start: "12:00", end: "20:00" },
    },
  },
];

const addDoctors = async () => {
  try {
    for (const doctorData of doctorsData) {
      const docRef = await addDoc(collection(db, "doctors"), doctorData);
      console.log("Doctor added with ID: ", docRef.id);
    }
    console.log("All doctors added successfully!");
  } catch (e) {
    console.error("Error adding doctors: ", e);
  }
};

// To add the doctors, you can run this function:
addDoctors();
