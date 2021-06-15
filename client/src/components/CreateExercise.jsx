import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const CreateExercise = () => {
    const [username, setUsername] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())

    const [users, setUsers] = useState([])

    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handleDescriptionChange = (e) => setDescription(e.target.value)
    const handleDurationChange = (e) => setDuration(e.target.value)
    const handleDateChange = (e) => setDate(e)

    const didMount = () => {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username))
                    setUsername(response.data[0].username)
                }
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))

        window.location = "/"

    }

    useEffect(() => {
        didMount()
    }, [])

    return (
        <div>
            <h3>Create New Exercise LOG</h3>
            <form onSubmit={handleSubmit} >

                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={handleUsernameChange}
                    >
                        {
                            users.map((user) => {
                                return (
                                    <option key={user} value={user}>{user}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" className="form-control" value={description} onChange={handleDescriptionChange} required />
                </div>

                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text" className="form-control" value={duration} onChange={handleDurationChange} />
                </div>

                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker selected={date} onChange={handleDateChange} />
                    </div>
                </div>

                <div className="form-group" >
                    <input type="submit" value="Create Exercise Log" className="btn btn-info" />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise
