import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/appointments`
      );

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Appointments</h2>

      {appointments.map((appointment) => (
        <div key={appointment.id}>
          <p>{appointment.patientName}</p>
          <p>{appointment.doctorName}</p>
        </div>
      ))}
    </div>
  );
}

export default Appointments;