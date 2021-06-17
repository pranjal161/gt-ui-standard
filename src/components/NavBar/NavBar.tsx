import { DxcHeader, DxcTabs } from '@dxc-technology/halstack-react';
import { AddIcon, CircleFull, ExtensionsIcon, HelpIcon, History, MoreVert, SearchIcon } from 'assets/svg';
import React, { useState } from 'react';
import Button from 'theme/components/material/Button/Button';
import DXCLogo from 'assets/dxc_logo.jpg';
import IconButton from 'theme/components/material/IconButton/IconButton';
import { MainNavContainer } from './StyledNavBar';
import SecondaryTabs from './SecondaryTabs';
import Typo from 'components/Typography/Typo';
import {changeLanguageCountry} from 'configs';
import en from 'assets/gb.jpg';
import fr from 'assets/fr.jpg';
import { makeStyles } from '@material-ui/core/styles';
import nl from 'assets/nl.jpg';
import { useHistory } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    button: {
        minHeight: '37px',
        marginRight: theme.spacing(4)
    },
    label: {
        fontSize: '12px'
    }
}));

const NavBar = () => {
    const {t} = useTranslation()
    const history = useHistory();
    const [lang, setLang] = useState<string>('en');

    const langs = [
        {
            value: 'fr',
            label: 'FR',
            iconSrc: fr,
        },
        {
            value: 'en',
            label: 'US',
            iconSrc: en,
        },
        {
            value: 'nl',
            label: 'NL',
            iconSrc: nl,
        },
    ];

    const currentLang: any = langs.find((item) => item.value === lang)
    const [langIcon, setLangIcon] = useState(currentLang.iconSrc);

    const classes = useStyles();

    const changeLang = (value: string) => {
        // // to check refresh
        setLang(value);
        const currentLang: undefined | { value: string, label: string, iconSrc: string } = langs.find((item) => item.value === value);
        if (currentLang) {     
            changeLanguageCountry(currentLang.value, currentLang.label);
            setLangIcon(currentLang.iconSrc);
        }
        // if (value !== applicationContext.language) {
        //     applicationContext.changeLang(value);<
        // }
    };

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
                    <MainNavContainer.SecondaryViewButtonsContainer>
                        <DxcHeader.Dropdown
                            options={langs}
                            onSelectOption={changeLang}
                            value={lang}
                            iconSrc={langIcon}
                            margin="xxsmall"
                            padding="xxsmall" />
                        <div title="Help">
                            <IconButton color={'primary'}
                                onClick={() => goToPage('/home')}>
                                <HelpIcon/>
                            </IconButton>
                        </div>
                        <div title="Training">
                            <IconButton color={'primary'}
                                onClick={() => goToPage('/training')}>
                                <ExtensionsIcon />
                            </IconButton>
                        </div>
                        <div title="ContractSearch">
                            <IconButton color={'primary'}
                                onClick={() => goToPage('/ContractSearch')}>
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <Button 
                            color="secondary"
                            variant="outlined"
                            classes={{root: classes.button, label: classes.label}}>
                            OPEN MY NEXT TICKET
                        </Button>
                        <div title="Add">
                            <IconButton color={'primary'}>
                                <AddIcon />
                            </IconButton>
                        </div>
                        <div title="Go back">
                            <IconButton color={'primary'}>
                                <History />
                            </IconButton>
                        </div>
                        <div title="More">
                            <IconButton color={'primary'}>
                                <MoreVert />
                            </IconButton>
                        </div>
                        <div title="Button">
                            <IconButton color={'primary'}>
                                <CircleFull />
                            </IconButton>
                        </div>
                    </MainNavContainer.SecondaryViewButtonsContainer>
                </MainNavContainer.NavRow>
                <MainNavContainer.NavRow>
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
