import React, { useState, useEffect } from "react";

export default function AttendeesList() {
    const [attendees, setAttendees] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8001/api/attendees/');
        if (response.ok) {
            const data = await response.json();
            setAttendees(data.attendees)
            }
        }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Conference</th>
            </tr>
            </thead>
            <tbody>
            {attendees.map(attendee => {
                return (
                <tr key={attendee.href}>
                    <td>{attendee.name}</td>
                    <td>{attendee.conference}</td>
                </tr>
                );
            })}
            </tbody>
        </table>
    );
}
