import React, { useState, useEffect } from 'react';

export default function PresentationForm () {
    const [presenter_name, setName] = useState('');
    const [presenter_email, setEmail] = useState('');
    const [company_name, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [conference, setConference] = useState('');
    const [conferences, setConferences] = useState([]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = e => {
        setEmail(e.target.value);
    }
    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleSynopsisChange = (e) => {
        setSynopsis(e.target.value);
    }
    const handleConferenceChange = e => {
        setConference(e.target.value);
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
        const presentation = {
            presenter_name,
            presenter_email,
            company_name,
            title,
            synopsis,
            conference,
        }
        const presentationUrl = `http://localhost:8000${conference}presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(presentation),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json();
            console.log(newPresentation)

            setName('');
            setEmail('');
            setCompany('');
            setTitle('');
            setSynopsis('');
            setConference('');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new presentation</h1>
              <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="form-floating mb-3">
                  <input onChange={handleNameChange} value={presenter_name}
                    placeholder="Presenter name"
                    required
                    type="text"
                    name="presenter_name"
                    id="presenter_name"
                    className="form-control"
                  />
                  <label htmlFor="presenter_name">Presenter name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleEmailChange} value={presenter_email}
                    placeholder="Presenter email"
                    required
                    type="email"
                    name="presenter_email"
                    id="presenter_email"
                    className="form-control"
                  />
                  <label htmlFor="presenter_email">Presenter email</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleCompanyChange} value={company_name}
                    placeholder="Company name"
                    required
                    type="test"
                    name="company_name"
                    id="company_name"
                    className="form-control"
                  />
                  <label htmlFor="company_name">Company name</label>
                </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleTitleChange} value={title}
                      placeholder="Title"
                      type="test"
                      name="title"
                      id="title"
                      className="form-control"
                    />
                    <label htmlFor="title">Title</label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="synopsis">Synopsis</label>
                    <textarea onChange={handleSynopsisChange} value={synopsis}
                      required
                      type="textarea"
                      name="synopsis"
                      id="synopsis"
                      className="form-control"
                      rows="3"
                    ></textarea>
                  </div>
                <div className="mb-3">
                  <select onChange={handleConferenceChange} value={conference} required id="conference" className="form-select" name="conference">
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
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    )
}
