import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Icon from '../../images/icon.svg';
import Logo from '../../images/logo.svg';

const Header: React.FC = () => {
    return (
        <Navbar bg="light" variant="light" className="border-bottom" fixed="top" expand="sm">
            <Container fluid>
                <Navbar.Brand href="#" className="me-auto">
                    <Icon className="d-inline d-md-none" style={{ height: '32px' }} />
                    <Logo className="d-none d-md-inline" style={{ height: '32px' }} />
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
