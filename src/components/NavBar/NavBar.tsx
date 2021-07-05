import React, { useState } from 'react';

import DXCLogo from 'assets/dxc_logo.jpg';
import { DxcSpinner } from '@dxc-technology/halstack-react';
import SearchBar from '../SearchBar/SearchBar';
import SecondaryTabs from './components/SecondaryTabs/SecondaryTabs';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TopBar from './components/TopBar/TopBar';
import { globalTokens } from 'theme/standard/palette';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useLoader from 'hooks/useLoader';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
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
    },
    spinner: {
        maxWidth: 94,
        width: '100%',
        padding: '5px 20px',
        minHeight: 64
    },
    mainNavContainer: {
        width: '100%',
        height: 128,
        backgroundColor: 'white',

        '&::after': {
            content: '""',
            display: 'block',
            height: 2,
            width: '100%',
            backgroundColor: globalTokens.lightGrey,
            position: 'absolute',
            bottom: 0,
        }
    },
    navRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: ((props: any) => (props.justifyRow ? props.justifyRow : 'space-between')),
        alignItems: ((props: any) => (props.alignRow ? props.alignRow : 'stretch')),
        height: ((props: any) => (props.heightRow ? props.heightRow : 'auto')),
    },
    logoImg: {
        maxHeight: 50,
        marginLeft: '2rem',
        marginTop: 14,
        cursor: 'pointer',

        '@media screen and (max-width: 1300px)': {
            maxHeight: 30,
            marginBottom: 15,
        }
    },
    secondaryViewButtonsContainer: {
        marginLeft: '2rem',
        marginRight: '1rem',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minWidth: 200
    },
    navTabs: {
        zIndex: 100,
        marginTop: 16,
        minWidth: 210,
    },
    secondaryTabs: {
        marginLeft: '2rem',
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 20,
        flexWrap: 'nowrap',
        overflow: 'hidden',
        alignItems: 'flex-end'
    }
}));

const NavBar = () => {
    const {t} = useTranslation()
    const history = useHistory();
    const classes = useStyles({}); //default classes
    const classesRow = useStyles({alignRow: 'center'})
    const [loading] = useLoader();

    const [activeNavTab, setNavTab] = useState(0);

    const goToPage = (route: string) => {
        history.push(route);
    }

    const handleActiveTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setNavTab(newValue);
    }

    return (
        <>
            <div className={classes.mainNavContainer}>
                <div className={classesRow.navRow}>
                    <img 
                        className={classes.logoImg} 
                        src={DXCLogo} 
                        alt="DXC Logo"
                        title="Home"
                        onClick={() => goToPage('/home')} />
                    <div className={classes.spinner}>
                        {loading && (
                            <DxcSpinner margin="xxsmall" mode="small" />
                        )}
                    </div>
                    <SearchBar />
                    <div className={classes.secondaryViewButtonsContainer}>
                        <TopBar />
                    </div>
                </div>
                <div className={classes.navRow}>
                    <div className={classes.navTabs}>
                        <Tabs
                            value={activeNavTab}
                            classes={{indicator: classes.tabsIndicator}}
                            onChange={handleActiveTab}
                            disableRipple>
                            <Tab classes={{root: classes.tabRoot}} label={t('common:myTicketsTab')} value={0}></Tab>
                            <Tab classes={{root: classes.tabRoot}} label={t('common:myBasketsTab')} value={1}></Tab>
                        </Tabs>
                    </div>
                    <div className={classes.secondaryTabs}>
                        <SecondaryTabs />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar;
