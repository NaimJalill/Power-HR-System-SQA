import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';

function AdminDashboard() {
    const [users, setUsers] = useState([]);

    // take the token from local storage
    const token = localStorage.getItem('authToken');
    // get the username from the token
    const username = JSON.parse(atob(token.split('.')[1])).username;

    return (
        <>
        <div>admin dashboard</div>
        <div>username: {username}</div>
        <Button variant="primary" onClick={() => window.location = '/admin/manage-employee'}>Manage Employee</Button>
        </>
    )
    }

export default AdminDashboard