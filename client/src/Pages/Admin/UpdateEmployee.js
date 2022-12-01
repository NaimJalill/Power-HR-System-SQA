import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import EditEmployee from '../../Components/Admin/Form/EditEmployee';
import AddEmployee from '../../Components/Admin/Form/AddEmployee';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function UpdateEmployee(){
    const{ id } = useParams();
    // const { username, password, name, email, contact, position, executiveRole } = employee;

    // const handleAdd = async e => {
    //     // const form = e.currentTarget;
    //     // if (form.checkValidity() === false) {
    //     //     e.preventDefault();
    //     //     e.stopPropagation();
    //     // }
    //     // setValidated(true);
    //     try {
    //         console.log(employee);
    //         axios.post('http://localhost:5000/employees/register/', employee, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('authToken')}`
    //             }
    //         })
    //         .then(res => {
    //             console.log(res);
    //             setIsSuccess(true);
    //         }
    //         )
    //         .catch(err => {
    //             console.log(err);
    //         }
    //         )

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <>
        <Navbar/>
        <Container >
            <Row>
                <Col className='m-auto' md={6}>
                    {
                        id ? 
                        <>
                        <h1>Update Employee</h1>
                        <EditEmployee id={id}/>
                        </> : 
                        <>
                        <h1>Add Employee</h1>
                        <AddEmployee />
                        </>
                    }
                </Col>
            </Row>
        </Container>
        </>
    )           

}

export default UpdateEmployee;