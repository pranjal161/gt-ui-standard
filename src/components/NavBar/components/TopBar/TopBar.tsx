import { AddIcon, CircleFull, ExtensionsIcon, HelpIcon, History, MoreVert, SearchIcon } from '../../../../assets/svg';
import React, { useRef, useState } from 'react';

import Button from '../../../../theme/components/material/Button/Button';
import IconButton from '../../../../theme/components/material/IconButton/IconButton';
import Paper from '@material-ui/core/Paper';
import { changeLanguageCountry } from 'configs';
import en from 'assets/gb.jpg';
import fr from 'assets/fr.jpg';
import { globalTokens } from 'theme/standard/palette';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        minHeight: 37,
        marginRight: theme.spacing(4)
    },
    label: {
        fontSize: '12px'
    },
    showMoreActionsIcon: {
        position: 'relative',
    },
    showMoreActionsContainer: {
        position: 'absolute',
        right: 0,
        top: '105%',
        zIndex: 100,
        overflow: 'hidden',
        minWidth: 120,
        maxWidth: 240,
    },
    action: {
        display: 'flex',
        height: 32,
        padding: 4,
        whiteSpace: 'nowrap',
        backgroundColor: 'white',

        '&:hover': {
            backgroundColor: globalTokens.__grey_7
        },

        '& > svg': {
            marginRight: 5,
            color: theme.palette.primary.main,
        },

        '& > img': {
            marginRight: 5
        },

        '& > div': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginRight: 5
        }
    },
    actionLanguageSelected: {
        backgroundColor: globalTokens.lightGreen,

        '&:hover': {
            backgroundColor: '#C2E79B'
        },
    }
}));

const TopBar = () => {
    const classes = useStyles();
    const [showMoreActions, setShowActions] = useState(false);
    const actionsRef = useRef(null);
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
    ];

    const currentLang: any = langs.find((item) => item.value === lang)

    const toggleMoreActions = () => {
        setShowActions((prev) => !prev);
    }

    useOnClickOutside(actionsRef, () => setShowActions(false));

    const goToTraining = () => {
        history.push('/training');
        setShowActions(false);
    }

    const goToHelp = () => {
        history.push('/home');
        setShowActions(false);
    }

    const goToContractSearch = () => {
        history.push('/ContractSearch');
        setShowActions(false);
    }

    const changeLanguage = (value: string) => {
        if(value !== lang) {
            setLang(value);
            const currentLang: undefined | { value: string, label: string, iconSrc: string } = langs.find((item) => item.value === value);

            if (currentLang) {     
                changeLanguageCountry(currentLang.value, currentLang.label);
            }
        }
    };

    return (
        <div className={classes.container}>
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
            <div 
                title="More"
                className={classes.showMoreActionsIcon}
                ref={actionsRef}>
                <IconButton 
                    color={'primary'}
                    onClick={toggleMoreActions}>
                    <MoreVert />
                </IconButton>
                {
                    showMoreActions &&
                    <Paper 
                        classes={{root: classes.showMoreActionsContainer}}>
                        <div 
                            className={classes.action}
                            onClick={goToTraining}>
                            <ExtensionsIcon /><div>Training</div>
                        </div>
                        <div 
                            className={classes.action}
                            onClick={goToHelp}>
                            <HelpIcon /><div>Help</div>
                        </div>
                        <div 
                            className={classes.action}
                            onClick={goToContractSearch}>
                            <SearchIcon /><div>Contract Search</div>
                        </div>
                        {
                            langs.map((lang) => (
                                lang.value === currentLang.value ?
                                    <div 
                                        className={classes.action+' '+classes.actionLanguageSelected}
                                        onClick={() => changeLanguage(lang.value)}>
                                        <img src={lang.iconSrc} title={lang.label} />
                                        <div>Current language: {lang.label}</div>
                                    </div> :
                                    <div 
                                        className={classes.action}
                                        onClick={() => changeLanguage(lang.value)}>
                                        <img src={lang.iconSrc} title={lang.label} />
                                        <div>Set language to: {lang.label}</div>
                                    </div>
                            ))
                        }
                    </Paper>
                }
            </div>
            <div title="Button">
                <IconButton color={'primary'}>
                    <CircleFull />
                </IconButton>
            </div>
        </div>
    )
}

export default TopBar;