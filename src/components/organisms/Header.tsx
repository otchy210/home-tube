import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Icon from '../../images/icon.svg';

const Header: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" fixed="top" expand="sm">
            <Container fluid>
                <Navbar.Brand href="#" className="me-auto">
                    <Icon />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end mt-3 mt-sm-0">
                    <Nav>
                        <Form className="d-flex">
                            <FormControl type="search" />
                            <Button variant="primary" className="ms-2">
                                Search
                            </Button>
                        </Form>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#features" className="ms-1">
                            Config
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
