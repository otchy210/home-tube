import React, { useEffect, useRef } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';
import Config from '../../images/config.svg';
import Icon from '../../images/icon.svg';
import Language from '../../images/language.svg';
import Logo from '../../images/logo.svg';
import Search from '../../images/search.svg';
import { partiallyPreventDefault } from '../../utils/EventUtils';
import { PrimaryButton } from '../common/buttons';
import { Form, FormSearchInput } from '../common/form';
import { FluidContainer } from '../common/layouts';
import { NavItem, NavLink, NavItemDropdown, NavLinkDropdown, DropdownMenu, DropdownItem } from '../common/nav';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarNav, NavbarToggler } from '../common/navbar';
import { useHomePageQuery } from '../providers/HomePageQueryProvider';
import { LANGUAGES, useI18n } from '../providers/I18nProvider';
import { SearchQuery, useSearchQuery } from '../providers/SearchQueryProvider';
import { Shortcut, useShortcut } from '../providers/ShortcutProvider';

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
    const { registerShortcut, unregisterShortcut } = useShortcut();
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
    useEffect(() => {
        const focusSearchInput: Shortcut = {
            keyCode: 191,
            fn: () => {
                namesRef.current?.focus();
            },
        };
        registerShortcut(focusSearchInput);
        return () => {
            unregisterShortcut(focusSearchInput);
        };
    });
    return (
        <Navbar>
            <FluidContainer>
                <NavbarBrand className="me-auto" href="/" onClick={partiallyPreventDefault(() => setPage('1'))}>
                    <HomeTubeIcon className="d-inline d-sm-none" />
                    <HomeTubeLogo className="d-none d-sm-inline" />
                </NavbarBrand>
                <NavbarToggler />
                <NavbarCollapse className="justify-content-end mt-3 mt-sm-0">
                    <NavbarNav>
                        <NavItem>
                            <Form className="d-flex" onSubmit={onSearchSubmit}>
                                <FormSearchInput onKeyDown={onQueryKeyDown} ref={namesRef} />
                                <PrimaryButton className="ms-2" onClick={onSearchSubmit}>
                                    <SearchIcon />
                                    <span className="d-inline d-sm-none d-md-inline ms-1 ms-sm-0 ms-lg-1 align-middle">{t('Search')}</span>
                                </PrimaryButton>
                            </Form>
                        </NavItem>
                        <NavItemDropdown className="ms-2 mt-2 mt-sm-0">
                            <NavLinkDropdown className="p-1">
                                <LanguageIcon />
                                <IconLabel>{t('Language')}</IconLabel>
                            </NavLinkDropdown>
                            <DropdownMenu position="end">
                                {LANGUAGES.map(({ key, label }) => {
                                    return (
                                        <DropdownItem key={`lang-${key}`} onClick={() => setLangKey(key)}>
                                            {key === langKey ? '▸ ' : ''}
                                            {t(label)}
                                        </DropdownItem>
                                    );
                                })}
                            </DropdownMenu>
                        </NavItemDropdown>
                        <NavItem className="ms-2 mt-2 mt-sm-0">
                            <LinkContainer to="/config">
                                <NavLink className="p-1">
                                    <ConfigIcon />
                                    <IconLabel>{t('Config')}</IconLabel>
                                </NavLink>
                            </LinkContainer>
                        </NavItem>
                    </NavbarNav>
                </NavbarCollapse>
            </FluidContainer>
        </Navbar>
    );
};

export default Header;
