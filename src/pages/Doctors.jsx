import { useEffect, useState } from 'react'
import axios from 'axios'

function Doctors() {

  const [doctors, setDoctors] = useState([])

  const [doctorData, setDoctorData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: ''
  })

  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.get(
        'http://localhost:8081/api/doctors',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setDoctors(response.data)

    } catch (error) {
      console.log(error)
      alert('Failed to fetch doctors')
    }
  }

  const handleChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value
    })
  }

  const addDoctor = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")

      if (editingId) {
        await axios.put(
          `http://localhost:8081/api/doctors/${editingId}`,
          doctorData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        alert('Doctor Updated Successfully')
        setEditingId(null)

      } else {
        await axios.post(
          'http://localhost:8081/api/doctors',
          doctorData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        alert('Doctor Added Successfully')
      }

      setDoctorData({
        name: '',
        specialization: '',
        email: '',
        phone: ''
      })

      fetchDoctors()

    } catch (error) {
      console.log(error)
      alert('Operation Failed')
    }
  }

  const editDoctor = (doctor) => {
    setDoctorData({
      name: doctor.name,
      specialization: doctor.specialization,
      email: doctor.email,
      phone: doctor.phone
    })

    setEditingId(doctor.id)
  }

  const deleteDoctor = async (id) => {
    try {
      const token = localStorage.getItem("token")

      await axios.delete(
        `http://localhost:8081/api/doctors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Doctor Deleted Successfully')
      fetchDoctors()

    } catch (error) {
      console.log(error)
      alert('Failed to delete doctor')
    }
  }

  return (
    <div>

      <h1>Doctors Page</h1>

      <form className="login-form" onSubmit={addDoctor}>

        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={doctorData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={doctorData.specialization}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={doctorData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={doctorData.phone}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? 'Update Doctor' : 'Add Doctor'}
        </button>

      </form>

      {
        doctors.map((doctor) => (

          <div key={doctor.id} className="doctor-card">

            <h3>{doctor.name}</h3>

            <p>Specialization: {doctor.specialization}</p>

            <p>Email: {doctor.email}</p>

            <p>Phone: {doctor.phone}</p>

            <button onClick={() => editDoctor(doctor)}>
              Edit
            </button>

            <button onClick={() => deleteDoctor(doctor.id)}>
              Delete
            </button>

          </div>
        ))
      }

    </div>
  )
}

export default Doctors