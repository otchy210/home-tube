import React, { useRef } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import Icon from '../../images/icon.svg';
import Logo from '../../images/logo.svg';
import Search from '../../images/search.svg';
import Config from '../../images/config.svg';
import { SearchQuery, useSearchQuery } from '../providers/SearchQueryProvider';
import { useHomePageQuery } from '../providers/HomePageQueryProvider';

const iconStyle = { height: '32px' };

const setIfExist = (name: string, refs: { [name: string]: React.RefObject<HTMLInputElement> }, setter: (value: string) => void) => {
    const ref = refs[name];
    if (!ref || !ref.current?.value) {
        return;
    }
    setter(ref.current.value);
};

const getSearchQueryFromRefs = (refs: { [name: string]: React.RefObject<HTMLInputElement> }): SearchQuery => {
    const searchQuery = {} as SearchQuery;
    setIfExist('names', refs, (value) => (searchQuery.names = JSON.stringify(value.split(/\s/))));
    return searchQuery;
};

const Header: React.FC = () => {
    const namesRef = useRef<HTMLInputElement>(null);
    const { setPage } = useHomePageQuery();
    const { setSearchQuery } = useSearchQuery();
    const doSearch = () => {
        const updatedSearchQuery = getSearchQueryFromRefs({
            names: namesRef,
        });
        setSearchQuery(updatedSearchQuery);
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
                <Navbar.Brand
                    className="me-auto"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setPage('1');
                    }}
                >
                    <Icon className="d-inline d-sm-none" style={iconStyle} />
                    <Logo className="d-none d-sm-inline" style={iconStyle} />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end mt-3 mt-sm-0">
                    <Nav>
                        <Form className="d-flex" onSubmit={onSearchSubmit}>
                            <FormControl type="search" onKeyDown={onQueryKeyDown} ref={namesRef} />
                            <Button className="ms-2 text-nowrap" onClick={onSearchSubmit}>
                                <Search style={{ height: '22px' }} />
                                <span className="d-inline d-sm-none d-md-inline ms-2 ms-sm-0 ms-lg-2 align-middle">Search</span>
                            </Button>
                        </Form>
                    </Nav>
                    <Nav className="mt-2 mt-sm-0">
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
