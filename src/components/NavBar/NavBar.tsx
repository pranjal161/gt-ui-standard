import React, { useState } from 'react';
import DXCLogo from 'assets/dxc_logo.jpg';
import { MainNavContainer } from './StyledNavBar';
import SearchBar from '../SearchBar/SearchBar';
import SecondaryTabs from './components/SecondaryTabs/SecondaryTabs';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TopBar from './components/TopBar/TopBar';
import { globalTokens } from 'theme/standard/palette';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    tabsIndicator: {
        backgroundColor: theme.palette.primary.main
    },
    tabRoot: {
        fontSize: 14,
        fontWeight: 'bold',
        minWidth: 90,

        '&:hover': {
            backgroundColor: globalTokens.__grey_7
        }
    }
}));

const NavBar = () => {
    const {t} = useTranslation()
    const history = useHistory();
    const classes = useStyles();

    const [activeNavTab, setNavTab] = useState(0);

    const goToPage = (route: string) => {
        history.push(route);
    }

    const handleActiveTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setNavTab(newValue);
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
                <MainNavContainer.NavRow>
                    <MainNavContainer.NavTabs>
                        <Tabs
                            value={activeNavTab}
                            classes={{indicator: classes.tabsIndicator}}
                            onChange={handleActiveTab}
                            disableRipple>
                            <Tab classes={{root: classes.tabRoot}} label={t('common:myTicketsTab')} value={0}></Tab>
                            <Tab classes={{root: classes.tabRoot}} label={t('common:myBasketsTab')} value={1}></Tab>
                        </Tabs>
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
