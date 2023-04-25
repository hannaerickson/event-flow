import React, { useState, useEffect } from 'react';

export default function LocationForm() {
    const [name, setName] = useState('');
    const [room_count, setRoomCount] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [states, setStates] = useState([]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleRoomCountChange = e => {
        setRoomCount(e.target.value);
    }
    const handleCityChange = (e) => {
        setCity(e.target.value);
    }
    const handleStateChange = (e) => {
        setState(e.target.value)
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/states/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setStates(data.states);
          }
        }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const location = {
            name,
            room_count,
            city,
            state,
        }
        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(location),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation)

            setName('');
            setRoomCount('');
            setCity('');
            setState('');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new location</h1>
                <form onSubmit={handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleRoomCountChange} value={room_count} placeholder="Room count" required type="number" name="room_count" id="room_count" className="form-control"/>
                    <label htmlFor="room_count">Room count</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input onChange={handleCityChange} value={city} placeholder="City" required type="text" name="city" id="city" className="form-control"/>
                    <label htmlFor="city">City</label>
                    </div>
                    <div className="mb-3">
                    <select onChange={handleStateChange} value={state} required name="state" id="state" className="form-select">
                        <option value="">Choose a state</option>
                        {states.map(state => {
                            return (
                            <option key={state.abbreviation} value={state.abbreviation}>
                                {state.name}
                            </option>
                            );
                        })}
                    </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}
