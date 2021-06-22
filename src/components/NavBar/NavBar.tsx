import { DxcTabs } from '@dxc-technology/halstack-react';
import React from 'react';
import DXCLogo from 'assets/dxc_logo.jpg';
import { MainNavContainer } from './StyledNavBar';
import SearchBar from '../SearchBar/SearchBar';
import SecondaryTabs from './components/SecondaryTabs/SecondaryTabs';
import TopBar from './components/TopBar/TopBar';
import Typo from 'components/Typography/Typo';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
    const {t} = useTranslation()
    const history = useHistory();

    const goToPage = (route: string) => {
        history.push(route);
    }

    return (
        <>
            <MainNavContainer>
                <MainNavContainer.NavRow
                    align="center">
                    <MainNavContainer.LogoImg 
                        src={DXCLogo} 
                        alt="DXC Logo"
                        title="Home"
                        onClick={() => goToPage('/home')} />                    
                    <SearchBar />
                    <MainNavContainer.SecondaryViewButtonsContainer>
                        <TopBar />
                    </MainNavContainer.SecondaryViewButtonsContainer>
                </MainNavContainer.NavRow>
                <MainNavContainer.NavRow
                    justify="flex-start">
                    <MainNavContainer.NavTabs>
                        <DxcTabs
                            tabs={[
                                {label: <Typo variant={'tab'} value={t('common:myTicketsTab')} />},
                                {label: <Typo variant={'tab'} value={t('common:myBasketsTab')} />},
                            ]}>
                        </DxcTabs>
                    </MainNavContainer.NavTabs>
                    <MainNavContainer.SecondaryTabs>
                        <SecondaryTabs />
                    </MainNavContainer.SecondaryTabs>
                </MainNavContainer.NavRow>
            </MainNavContainer>
        </>
    )
}

export default NavBar;
