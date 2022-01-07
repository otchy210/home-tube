import React, { useRef } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Icon from '../../images/icon.svg';
import Logo from '../../images/logo.svg';
import Search from '../../images/search.svg';
import Config from '../../images/config.svg';
import { createSearchParams, useNavigate } from 'react-router-dom';

const iconStyle = { height: '32px' };

const Header: React.FC = () => {
    const queryRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const doSearch = () => {
        const params = createSearchParams();
        params.append('names', queryRef.current?.value ?? '');
        navigate(`/search${params.get('names') !== '' ? `?${params.toString()}` : ''}`);
    };
    const onQueryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // cannot avoid using deprecated `e.keyCode` due to https://qiita.com/ledsun/items/31e43a97413dd3c8e38e
        if (e.keyCode === 13) {
            e.preventDefault();
            doSearch();
            return;
        }
    };
    const onSearchSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        doSearch();
    };
    return (
        <Navbar bg="light" variant="light" className="border-bottom" fixed="top" expand="sm">
            <Container fluid>
                <LinkContainer to="/">
                    <Navbar.Brand className="me-auto">
                        <Icon className="d-inline d-sm-none" style={iconStyle} />
                        <Logo className="d-none d-sm-inline" style={iconStyle} />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end mt-3 mt-sm-0">
                    <Nav>
                        <Form className="d-flex" onSubmit={onSearchSubmit}>
                            <FormControl type="search" onKeyDown={onQueryKeyDown} ref={queryRef} />
                            <Button variant="primary" className="ms-2 text-nowrap" onClick={onSearchSubmit}>
                                <Search style={{ height: '22px' }} />
                                <span className="d-inline d-sm-none d-md-inline ms-2 ms-sm-0 ms-lg-2 align-middle">Search</span>
                            </Button>
                        </Form>
                    </Nav>
                    <Nav>
                        <LinkContainer to="/config">
                            <Nav.Link className="ms-1 py-0">
                                <Config style={iconStyle} />
                                <span className="d-inline d-sm-none d-lg-inline ms-2 ms-sm-0 ms-lg-2 align-middle">Config</span>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
