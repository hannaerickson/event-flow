import React, { useState, useEffect } from 'react';

export default function ConferenceForm () {
    const [name, setName] = useState('');
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [description, setDescription] = useState('');
    const [max_presentations, setPresentations] = useState('');
    const [max_attendees, setAttendees] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleStartsChange = e => {
        setStarts(e.target.value);
    }
    const handleEndsChange = (e) => {
        setEnds(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handlePresentationChange = (e) => {
        setPresentations(e.target.value);
    }
    const handleAttendeesChange = e => {
        setAttendees(e.target.value);
    }
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }

    const fetchData = async () => {
        const url = "http://localhost:8000/api/locations/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const conference = {
            name,
            starts,
            ends,
            description,
            max_presentations,
            max_attendees,
            location,
        }
        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(conference),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference)

            setName('');
            setStarts('');
            setEnds('');
            setDescription('');
            setPresentations('');
            setAttendees('');
            setLocation('');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new conference</h1>
              <form onSubmit={handleSubmit} id="create-conference-form">
                <div className="form-floating mb-3">
                  <input onChange={handleNameChange} value={name}
                    placeholder="Name"
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleStartsChange} value={starts}
                    placeholder="Start Date"
                    required
                    type="date"
                    name="starts"
                    id="starts"
                    className="form-control"
                  />
                  <label htmlFor="starts">Start Date</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleEndsChange} value={ends}
                    placeholder="End Date"
                    required
                    type="date"
                    name="ends"
                    id="ends"
                    className="form-control"
                  />
                  <label htmlFor="ends">End Date</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={handleDescriptionChange} value={description}
                      required
                      type="textarea"
                      name="description"
                      id="description"
                      className="form-control"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handlePresentationChange} value={max_presentations}
                      placeholder="Max Presentations"
                      required
                      type="number"
                      name="max_presentations"
                      id="max_presentations"
                      className="form-control"
                    />
                    <label htmlFor="max_presentations">Max Presentations</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleAttendeesChange} value={max_attendees}
                      placeholder="Max Attendees"
                      required
                      type="number"
                      name="max_attendees"
                      id="max_attendees"
                      className="form-control"
                    />
                    <label htmlFor="max_attendees">Max Attendees</label>
                  </div>
                <div className="mb-3">
                  <select onChange={handleLocationChange} value={location} required id="location" className="form-select" name="location">
                    <option value="">Choose a location</option>
                    {locations.map(location => {
                        return (
                            <option key={location.id} value={location.id}>
                                {location.name}
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
