import React, { Component } from 'react'
import { Navbar, Nav, Container, Button, NavDropdown, Dropdown, DropdownButton } from 'react-bootstrap'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import {
    Link
} from "react-router-dom";

export default class NavbarComp extends Component {


    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
                    <Container>
                        <Navbar.Brand><h3 className='blue'>Chasy</h3></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} to={"/today"}>Today</Nav.Link>
                                <Nav.Link as={Link} to={"/newtask"}>Add Task</Nav.Link>
                                <Nav.Link as={Link} to={"/alltasks"}>All Tasks</Nav.Link>
                                {/* A JSX comment
                                <NavDropdown id="callasible-nav-dropdown" title="Day">
                                    <Dropdown.Item as={Link} to={"/sunday"}>Sunday</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={"/monday"}>Monday</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={"/tuesday"}>Tuesday</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={"/wednesday"}>Wednesday</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={"/thursday"}>Thursday</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={"/friday"}>Friday</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={"/saturday"}>Saturday</Dropdown.Item>
                            
                                </NavDropdown>
                                */}
                                <Nav.Link as={Link} to={"/account"}>My Account</Nav.Link>
                                <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
                                <Nav.Link as={Link} to={"/"}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>


        )
    }
}