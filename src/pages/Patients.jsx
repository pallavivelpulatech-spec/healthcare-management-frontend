import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../api";

function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/patients`
      );

      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Patients</h2>

      {patients.map((patient) => (
        <div key={patient.id}>
          <p>{patient.name}</p>
          <p>{patient.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Patients;