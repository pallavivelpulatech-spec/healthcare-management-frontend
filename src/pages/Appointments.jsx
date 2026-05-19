import { useEffect, useState } from 'react'
import axios from 'axios'

function Appointments() {

  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])

  const [appointmentData, setAppointmentData] = useState({
    appointmentDateTime: '',
    reason: '',
    status: 'BOOKED',
    doctorId: '',
    patientId: ''
  })

  useEffect(() => {
    fetchAppointments()
    fetchDoctors()
    fetchPatients()
  }, [])

  const getTokenHeader = () => {

    const token = localStorage.getItem("token")

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }

  const fetchAppointments = async () => {

    const response = await axios.get(
      'http://localhost:8081/api/appointments',
      getTokenHeader()
    )

    setAppointments(response.data)
  }

  const fetchDoctors = async () => {

    const response = await axios.get(
      'http://localhost:8081/api/doctors',
      getTokenHeader()
    )

    setDoctors(response.data)
  }

  const fetchPatients = async () => {

    const response = await axios.get(
      'http://localhost:8081/api/patients',
      getTokenHeader()
    )

    setPatients(response.data)
  }

  const handleChange = (e) => {

    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value
    })
  }

  const bookAppointment = async (e) => {

    e.preventDefault()

    try {

      const requestBody = {
        appointmentDateTime: appointmentData.appointmentDateTime,
        reason: appointmentData.reason,
        status: appointmentData.status,
        doctor: {
          id: appointmentData.doctorId
        },
        patient: {
          id: appointmentData.patientId
        }
      }

      await axios.post(
        'http://localhost:8081/api/appointments',
        requestBody,
        getTokenHeader()
      )

      alert('Appointment Booked Successfully')

      setAppointmentData({
        appointmentDateTime: '',
        reason: '',
        status: 'BOOKED',
        doctorId: '',
        patientId: ''
      })

      fetchAppointments()

    } catch (error) {

      console.log(error)
      alert(error.response?.data || 'Failed to book appointment')
    }
  }

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:8081/api/appointments/${id}/status?status=${status}`,
        {},
        getTokenHeader()
      )

      alert('Appointment Status Updated')

      fetchAppointments()

    } catch (error) {

      console.log(error)
      alert('Failed to update status')
    }
  }

  return (
    <div>

      <h1>Appointments Page</h1>

      <form className="login-form" onSubmit={bookAppointment}>

        <input
          type="datetime-local"
          name="appointmentDateTime"
          value={appointmentData.appointmentDateTime}
          onChange={handleChange}
        />

        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={appointmentData.reason}
          onChange={handleChange}
        />

        <select
          name="doctorId"
          value={appointmentData.doctorId}
          onChange={handleChange}
        >
          <option value="">Select Doctor</option>

          {
            doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))
          }

        </select>

        <select
          name="patientId"
          value={appointmentData.patientId}
          onChange={handleChange}
        >
          <option value="">Select Patient</option>

          {
            patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))
          }

        </select>

        <button type="submit">
          Book Appointment
        </button>

      </form>

      {
        appointments.map((appointment) => (

          <div key={appointment.id} className="doctor-card">

            <h3>{appointment.reason}</h3>

            <p>Status: {appointment.status}</p>

            <p>Doctor: {appointment.doctorName}</p>

            <p>Patient: {appointment.patientName}</p>

            <p>Date: {appointment.appointmentDateTime}</p>

            <button onClick={() => updateStatus(appointment.id, 'COMPLETED')}>
              Complete
            </button>

            <button onClick={() => updateStatus(appointment.id, 'CANCELLED')}>
              Cancel
            </button>

          </div>
        ))
      }

    </div>
  )
}

export default Appointments