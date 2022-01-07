import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Icon from '../../images/icon.svg';
import Logo from '../../images/logo.svg';
import Config from '../../images/config.svg';

const iconStyle = { height: '32px' };

const Header: React.FC = () => {
    return (
        <Navbar bg="light" variant="light" className="border-bottom" fixed="top" expand="sm">
            <Container fluid>
                <Navbar.Brand href="#" className="me-auto">
                    <Icon className="d-inline d-md-none" style={iconStyle} />
                    <Logo className="d-none d-md-inline" style={iconStyle} />
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
                            <Config style={iconStyle} />
                            <span className="d-inline d-sm-none d-lg-inline ms-2 ms-sm-0 ms-lg-2 align-middle">Config</span>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
