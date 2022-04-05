import React, { Component } from 'react'
import { Navbar, Nav,  Container, Button } from 'react-bootstrap'
import {
    Link
} from "react-router-dom";

export default class NavbarComp extends Component {
    render() {
        return (
                <div>
                    <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
                        <Container>
                            <Navbar.Brand><h3 className='blue'>BetShare</h3></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                </Nav>
                                <Nav>
                                    <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                                    <Nav.Link as={Link} to={"/newtask"}>Add Task</Nav.Link>
                                    <Nav.Link as={Link} to={"/alltasks"}>All Tasks</Nav.Link>
                                    <Nav.Link as={Link} to={"/day"}>Day</Nav.Link>
                                    
                                    <button className='btn btn-sccuess'>Logout</button>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            

        )
    }
}