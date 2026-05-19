import { useEffect, useState } from 'react'
import axios from 'axios'

function Patients() {

  const [patients, setPatients] = useState([])

  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: ''
  })

  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await axios.get(
        'http://localhost:8081/api/patients',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setPatients(response.data)

    } catch (error) {

      console.log(error)
      alert('Failed to fetch patients')
    }
  }

  const handleChange = (e) => {

    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value
    })
  }

  const addPatient = async (e) => {

    e.preventDefault()

    try {

      const token = localStorage.getItem("token")

      if (editingId) {

        await axios.put(
          `http://localhost:8081/api/patients/${editingId}`,
          patientData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        alert('Patient Updated Successfully')

        setEditingId(null)

      } else {

        await axios.post(
          'http://localhost:8081/api/patients',
          patientData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        alert('Patient Added Successfully')
      }

      setPatientData({
        name: '',
        age: '',
        gender: '',
        email: '',
        phone: ''
      })

      fetchPatients()

    } catch (error) {

      console.log(error)
      alert('Operation Failed')
    }
  }

  const editPatient = (patient) => {

    setPatientData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      email: patient.email,
      phone: patient.phone
    })

    setEditingId(patient.id)
  }

  const deletePatient = async (id) => {

    try {

      const token = localStorage.getItem("token")

      await axios.delete(
        `http://localhost:8081/api/patients/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Patient Deleted Successfully')

      fetchPatients()

    } catch (error) {

      console.log(error)
      alert('Failed to delete patient')
    }
  }

  return (
    <div>

      <h1>Patients Page</h1>

      <form className="login-form" onSubmit={addPatient}>

        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={patientData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={patientData.age}
          onChange={handleChange}
        />

        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={patientData.gender}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={patientData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={patientData.phone}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? 'Update Patient' : 'Add Patient'}
        </button>

      </form>

      {
        patients.map((patient) => (

          <div key={patient.id} className="doctor-card">

            <h3>{patient.name}</h3>

            <p>Age: {patient.age}</p>

            <p>Gender: {patient.gender}</p>

            <p>Email: {patient.email}</p>

            <p>Phone: {patient.phone}</p>

            <button onClick={() => editPatient(patient)}>
              Edit
            </button>

            <button onClick={() => deletePatient(patient.id)}>
              Delete
            </button>

          </div>
        ))
      }

    </div>
  )
}

export default Patients