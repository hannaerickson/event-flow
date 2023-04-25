import React, { useState, useEffect } from "react";

export default function AttendForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [conference, setConference] = useState('');
    const [conferences, setConferences] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleConferenceChange = (e) => {
        setConference(e.target.value);
    }

    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    if (conferences.length > 0) {
        spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
        dropdownClasses = 'form-select';
    }

    let successClass = 'alert alert-success d-none mb-0';
    let notSubmitted = 'not-submitted';
    if (success === true) {
        successClass = 'alert alert-success mb-0';
        notSubmitted = 'not-submitted d-none';
    }

    const fetchData = async () => {
        const url = "http://localhost:8000/api/conferences/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const attendee = {
            name,
            email,
            conference,
        }
        const attendeeUrl = "http://localhost:8001/api/attendees/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(attendee),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok) {
            const newAttendee = await response.json();
            console.log(newAttendee);

            setName('');
            setEmail('');
            setConference('');
            setSuccess(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="my-5 container">
        <div className="row">
        <div className="col col-sm-auto">
            <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg"/>
        </div>
        <div className="col">
            <div className="card shadow">
                <div className="card-body">
                <form onSubmit={handleSubmit} className={notSubmitted} id="create-attendee-form">
                    <h1 className="card-title">It's Conference Time!</h1>
                    <p className="mb-3">
                    Please choose which conference
                    you'd like to attend.
                    </p>
                    <div className={spinnerClasses} id="loading-conference-spinner">
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
                    <div className="mb-3">
                    <select onChange={handleConferenceChange} value={conference} name="conference" id="conference" className={dropdownClasses} required>
                        <option value="">Choose a conference</option>
                        {conferences.map(conference => {
                            return (
                                <option key={conference.href} value={conference.href}>
                                    {conference.name}
                                </option>
                            )
                        })}
                    </select>
                    </div>
                    <p className="mb-3">
                    Now, tell us about yourself.
                    </p>
                    <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handleNameChange} value={name} required placeholder="Your full name" type="text" id="name" name="name" className="form-control"/>
                        <label htmlFor="name">Your full name</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input onChange={handleEmailChange} value={email} required placeholder="Your email address" type="email" id="email" name="email" className="form-control"/>
                        <label htmlFor="email">Your email address</label>
                        </div>
                    </div>
                    </div>
                    <button className="btn btn-lg btn-primary">I'm going!</button>
                </form>
                    <div className={successClass} id="success-message">
                        Congratulations! You're all signed up!
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}
