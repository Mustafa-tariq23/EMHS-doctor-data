import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../App";


const DoctorDetails = () => {
  let allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    education: "",
    experience: "",
    availability: {
      Monday: { start: "14:00", end: "20:00" },
      Tuesday: { start: "14:00", end: "20:00" },
      Wednesday: { start: "14:00", end: "20:00" },
      Thursday: { start: "14:00", end: "20:00" },
      Friday: { start: "14:00", end: "20:00" },
      Saturday: { start: "12:00", end: "20:00" },
    },
  });
  const [loading, setLoading] = useState(true);

  // Utility: Convert 24-hour time to 12-hour with AM/PM
  const convertTo12Hour = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for midnight
    return `${String(adjustedHour).padStart(2, "0")}:${minute} ${ampm}`;
  };

  // Utility: Convert 12-hour time to 24-hour
  const convertTo24Hour = (time) => {
    const [hourMinute, period] = time.split(" ");
    let [hour, minute] = hourMinute.split(":").map(Number);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${minute}`;
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const docRef = doc(db, "doctors", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDoctor(data);

          const formattedAvailability = Object.entries(
            data.availability || {}
          ).reduce((acc, [day, times]) => {
            const pascalCaseDay = day.charAt(0).toUpperCase() + day.slice(1);
            acc[pascalCaseDay] = {
              start: times?.start || "14:00",
              end: times?.end || "20:00",
            };
            return acc;
          }, {});

          setFormData({
            ...data,
            availability: formattedAvailability,
          });
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "doctors", id), formData);
      alert("Doctor information updated successfully!");
      setDoctor(formData);
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Error updating doctor information");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    const convertedValue = convertTo12Hour(value); // Convert to AM/PM before saving
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: convertedValue,
        },
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {doctor && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">{doctor.name}</h1>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Role:</span> {doctor.role}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Experience:</span>{" "}
              {doctor.experience}
            </p>
            <div className="text-gray-600">
              <span className="font-semibold">Education:</span>
              <p className="whitespace-pre-wrap">{doctor.education}</p>
            </div>
            <div>
              {allDays.map((day) => (
                <div
                  className="text-gray-600 flex gap-8 justify-between w-96"
                  key={day}
                >
                  <span className="font-semibold">{day} Availability:</span>
                  <p>
                    {doctor.availability?.[day]?.start || "Not Available"} -{" "}
                    {doctor.availability?.[day]?.end || "Not Available"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Update Information</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <h3 className="text-xl font-semibold mb-4">Availability</h3>
        <div className="mb-4 flex flex-col gap-4">
          {allDays.map((singleDay) => (
            <div className="flex gap-4" key={singleDay}>
              <span className="capitalize font-semibold self-center">
                {singleDay}:
              </span>
              <input
                type="time"
                value={
                  formData.availability[singleDay]?.start
                    ? convertTo24Hour(formData.availability[singleDay].start)
                    : ""
                }
                onChange={(e) =>
                  handleAvailabilityChange(singleDay, "start", e.target.value)
                }
                className="p-2 border rounded"
              />
              <span className="self-center">to</span>
              <input
                type="time"
                value={
                  formData.availability[singleDay]?.end
                    ? convertTo24Hour(formData.availability[singleDay].end)
                    : ""
                }
                onChange={(e) =>
                  handleAvailabilityChange(singleDay, "end", e.target.value)
                }
                className="p-2 border rounded"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Update Information
        </button>
      </form>
    </div>
  );
};

export default DoctorDetails;
