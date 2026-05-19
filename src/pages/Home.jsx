import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaCheckCircle
} from 'react-icons/fa'

function Home() {

  const [doctorCount, setDoctorCount] = useState(0)
  const [patientCount, setPatientCount] = useState(0)
  const [appointmentCount, setAppointmentCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {

    fetchDashboardData()

  }, [])

  const getTokenHeader = () => {

    const token = localStorage.getItem("token")

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }

  const fetchDashboardData = async () => {

    try {

      const doctorsResponse = await axios.get(
        'http://localhost:8081/api/doctors',
        getTokenHeader()
      )

      const patientsResponse = await axios.get(
        'http://localhost:8081/api/patients',
        getTokenHeader()
      )

      const appointmentsResponse = await axios.get(
        'http://localhost:8081/api/appointments',
        getTokenHeader()
      )

      setDoctorCount(doctorsResponse.data.length)

      setPatientCount(patientsResponse.data.length)

      setAppointmentCount(appointmentsResponse.data.length)

      const completedAppointments =
        appointmentsResponse.data.filter(
          appointment => appointment.status === 'COMPLETED'
        )

      setCompletedCount(completedAppointments.length)

    } catch (error) {

      console.log(error)
    }
  }

  return (
    <div>

      <h1 className="dashboard-title">
        Healthcare Dashboard
      </h1>

      <div className="dashboard-container">

        <div className="dashboard-card doctors-card">

          <FaUserMd className="dashboard-icon" />

          <h2>{doctorCount}</h2>

          <p>Total Doctors</p>

        </div>

        <div className="dashboard-card patients-card">

          <FaUsers className="dashboard-icon" />

          <h2>{patientCount}</h2>

          <p>Total Patients</p>

        </div>

        <div className="dashboard-card appointments-card">

          <FaCalendarCheck className="dashboard-icon" />

          <h2>{appointmentCount}</h2>

          <p>Total Appointments</p>

        </div>

        <div className="dashboard-card completed-card">

          <FaCheckCircle className="dashboard-icon" />

          <h2>{completedCount}</h2>

          <p>Completed Appointments</p>

        </div>

      </div>

    </div>
  )
}

export default Home