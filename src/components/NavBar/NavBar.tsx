import { ExtensionsIcon, HelpIcon } from 'assets/svg';
import React, { useState } from 'react';

import DXCLogo from 'assets/dxc_logo.jpg';
import { DxcHeader } from '@dxc-technology/halstack-react';
import IconButton from 'components/IconButton/IconButton';
import { MainNavContainer } from './StyledNavBar';
import {changeLanguageCountry} from 'configs';
import en from 'assets/gb.jpg';
import fr from 'assets/fr.jpg';
import nl from 'assets/nl.jpg';
import { useHistory } from 'react-router-dom';

const NavBar = () => {
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
            label: 'EN',
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

    const changeLang = (value: string) => {
        // // to check refresh
        setLang(value);
        const currentLang: undefined | { value: string, label: string, iconSrc: string } = langs.find((item) => item.value === value);
        if (currentLang) {     
            changeLanguageCountry(currentLang.value, currentLang.label);
            setLangIcon(currentLang.iconSrc);
        }
        // if (value !== applicationContext.language) {
        //     applicationContext.changeLang(value);
        // }
    };

    const goToPage = (route: string) => {
        history.push(route);
    }

    return (
        <>
            <MainNavContainer>
                <MainNavContainer.NavRow
                    align="center"
                    height="3.5rem">
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
                            <IconButton color={'secondary'}
                                onClick={() => goToPage('/home')}>
                                <HelpIcon/>
                            </IconButton>
                        </div>
                        <div title="Training">
                            <IconButton
                                onClick={() => goToPage('/training')}>
                                <ExtensionsIcon />
                            </IconButton>
                        </div>
                    </MainNavContainer.SecondaryViewButtonsContainer>
                </MainNavContainer.NavRow>
            </MainNavContainer>
        </>
    )
}

export default NavBar;
