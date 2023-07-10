import React from 'react'
import "../styles/home.css"
import axios from "axios"
import { useState, useEffect } from 'react';

function Home() {

    // initial state of the bug/form
    const [bugData, setBugData] = useState({
        name: "",
        status: "Open",
        location: "",
        description: "",
        priority: "Normal"
    })

    // handling the event of input
    const handleChange = (e) => {
        const { name, value } = e.target
        setBugData(prevBugData => {
            return {
                ...prevBugData,
                [name]: value
            }
        })
    }


    // handling the event of submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        addBug()
        console.log(bugData)
        setBugData({
            name: "",
            status: "Open",
            location: "",
            description: "",
            priority: "Normal"
        })
    }




    const [bugs, setBugs] = useState([])

    // fetching all the data from db using the hook
    useEffect(() => {

        // getting all the bugs from db via get request
        const getBugs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/bug")
                setBugs(res.data)
                console.log("data fetched")
            } catch (error) {
                console.log(error)
            }
        }
        getBugs()
    }, [])




    // add the new bug
    const addBug = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/bug",
                {
                    "name": bugData.name,
                    "status": bugData.status,
                    "location": bugData.location,
                    "description": bugData.description,
                    "priority": bugData.priority
                }
            )
            console.log(res)
        } catch (error) {
            console.log("Some error occured")
        }
    }



    // delete the particular bug
    const deleteBug = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/bug/${id}`)
            const newBugList = bugs.filter(bug => bug._id !== id)
            setBugs(newBugList)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='main'>
            <div className='left-section'>
                <h1 className='form-title'>Add New Bug</h1>
                <form
                    className='form'
                    onSubmit={handleSubmit}
                >

                    <h5>Bug</h5>
                    <input
                        required
                        type='text'
                        placeholder='Enter the bug'
                        onChange={handleChange}
                        name='name'
                        value={bugData.name}
                    />

                    <h5>Status</h5>
                    <select
                        onChange={handleChange}
                        name='status'
                        value={bugData.status}
                    >
                        <option value='Open'>
                            Open
                        </option>
                        <option value='Ongoing'>
                            Ongoing
                        </option>
                        <option value='Delayed'>
                            Delayed
                        </option>
                        <option value='Overdue'>
                            Overdue
                        </option>
                        <option value='Completed'>
                            Completed
                        </option>
                    </select>

                    <h5>Location</h5>
                    <input
                        required
                        type='text'
                        placeholder='location of the bug'
                        onChange={handleChange}
                        name='location'
                        value={bugData.location}
                    />

                    <h5>Description of bug</h5>
                    <textarea
                        required
                        placeholder='Describe the bug...'
                        onChange={handleChange}
                        name='description'
                        value={bugData.description}
                        rows='3'
                    />


                    <h5>Priority</h5>
                    <select
                        onChange={handleChange}
                        name='priority'
                        value={bugData.priority}
                    >
                        <option value='High'>
                            High
                        </option>
                        <option value='Normal'>
                            Normal
                        </option>
                        <option value='Low'>
                            Low
                        </option>
                    </select>

                    <div>
                        <button className='add-button'>Add Bug</button>
                    </div>

                </form>
            </div>

            <div className='right-section'>
                <h1 className='all-bugs'>Bugs</h1>
                {
                    bugs.map((bug) => (
                        <div className='my-bug' key={bug._id} >
                            <div className='bug-heading'>
                                <h2>{bug.bugName}</h2>
                                <span 
                                    className={bug.bugPriority == "High" ? "high" : bug.bugPriority == "Normal" ? "normal" : "low"}
                                >
                                    {bug.bugPriority}
                                </span>
                            </div>
                            <div className='bug-details'>
                                <h3>Status : {bug.bugStatus}</h3>
                                <h3>Location : {bug.bugLocation}</h3>
                                <h3>Description : {bug.bugDescription}</h3>
                            </div>
                            <div className='editing-buttons'>
                                <button className='update-button'>
                                    Edit
                                </button>
                                <button className='delete-button'
                                    onClick={() => { deleteBug(bug._id) }}
                                >
                                    Complete
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}

export default Home