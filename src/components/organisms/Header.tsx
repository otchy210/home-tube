import React, { useRef } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Icon from '../../images/icon.svg';
import Logo from '../../images/logo.svg';
import Search from '../../images/search.svg';
import Language from '../../images/language.svg';
import Config from '../../images/config.svg';
import { SearchQuery, useSearchQuery } from '../providers/SearchQueryProvider';
import { useHomePageQuery } from '../providers/HomePageQueryProvider';
import { partiallyPreventDefault } from '../../utils/EventUtils';
import styled from 'styled-components';
import { LANGUAGES, useI18n } from '../providers/I18nProvider';

const HomeTubeIcon = styled(Icon)`
    width: 32px;
    height: 32px;
`;

const HomeTubeLogo = styled(Logo)`
    height: 32px;
`;

const SearchIcon = styled(Search)`
    height: 22px;
`;

const LanguageIcon = styled(Language)`
    width: 32px;
    height: 32px;
`;

const ConfigIcon = styled(Config)`
    width: 32px;
    height: 32px;
`;

const IconLabel = styled.span.attrs({ className: 'd-inline d-sm-none d-lg-inline ms-1 ms-sm-0 ms-lg-1 align-middle' })`
    color: rgba(0, 0, 0, 0.55);
`;

const setIfExist = (name: string, refs: { [name: string]: React.RefObject<HTMLInputElement> }, setter: (value: string) => void) => {
    const ref = refs[name];
    if (!ref || !ref.current?.value) {
        return;
    }
    setter(ref.current.value);
};

const getSearchQueryFromRefs = (refs: { [name: string]: React.RefObject<HTMLInputElement> }): SearchQuery => {
    const searchQuery = {} as SearchQuery;
    setIfExist('names', refs, (value) => (searchQuery.names = value.split(/\s/)));
    return searchQuery;
};

const Header: React.FC = () => {
    const { langKey, setLangKey, t } = useI18n();
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
                <Navbar.Brand className="me-auto" href="/" onClick={partiallyPreventDefault(() => setPage('1'))}>
                    <HomeTubeIcon className="d-inline d-sm-none" />
                    <HomeTubeLogo className="d-none d-sm-inline" />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end mt-3 mt-sm-0">
                    <Nav>
                        <Form className="d-flex" onSubmit={onSearchSubmit}>
                            <FormControl type="search" onKeyDown={onQueryKeyDown} ref={namesRef} />
                            <Button className="ms-2 text-nowrap" onClick={onSearchSubmit}>
                                <SearchIcon />
                                <span className="d-inline d-sm-none d-md-inline ms-1 ms-sm-0 ms-lg-1 align-middle">{t('Search')}</span>
                            </Button>
                        </Form>
                    </Nav>
                    <Nav className="ms-2 mt-2 mt-sm-0">
                        <NavDropdown
                            title={
                                <>
                                    <LanguageIcon />
                                    <IconLabel>{t('Language')}</IconLabel>
                                </>
                            }
                        >
                            {LANGUAGES.map(({ key, label }) => {
                                return (
                                    <NavDropdown.Item key={`lang-${key}`} onClick={() => setLangKey(key)}>
                                        {key === langKey ? '▸ ' : ''}
                                        {t(label)}
                                    </NavDropdown.Item>
                                );
                            })}
                        </NavDropdown>
                    </Nav>
                    <Nav className="ms-2 mt-2 mt-sm-0">
                        <LinkContainer to="/config">
                            <Nav.Link className="p-0">
                                <ConfigIcon />
                                <IconLabel>{t('Config')}</IconLabel>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
