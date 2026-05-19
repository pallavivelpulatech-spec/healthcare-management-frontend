import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/doctors`
      );

      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Doctors</h2>

      {doctors.map((doctor) => (
        <div key={doctor.id}>
          <p>{doctor.name}</p>
          <p>{doctor.specialization}</p>
        </div>
      ))}
    </div>
  );
}

export default Doctors;