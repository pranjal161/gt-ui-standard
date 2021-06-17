import IconButton from 'theme/components/material/IconButton/IconButton';
import {LeftChevronIcon} from 'assets/svg';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {capitalizeFirstLetterAndRemove_} from 'utils/functions';

export interface HeaderProps {

    /**
     * Title
     */
    title?: string

    /**
     * rightTitle
     */
    rightTitle?: string

    /**
     * On back callback
     */
    onBack?: any
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1, 2, 1, 2),
        height:'54px'
    },
    iconTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& > *': {
            marginRight: theme.spacing(2)
        }
    },
    title: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '22px',
        color: theme.palette.primary.contrastText
    },
    backIcon: {
        marginRight: theme.spacing(2),
        color: theme.palette.primary.contrastText
    },
    rightTitle: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '16px',
        color: theme.palette.primary.contrastText
    }
}))

const Header: React.FC<HeaderProps> = ({title, rightTitle, onBack}: HeaderProps) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.iconTitle}>
                {onBack && <div className={classes.backIcon}>
                    <IconButton color={'inherit'} onClick={() => onBack && onBack()} size={'small'}>
                        <LeftChevronIcon size={32}/>
                    </IconButton></div>}

                <div className={classes.title}>
                    {title && capitalizeFirstLetterAndRemove_(title) /* To remove*/}
                </div>
            </div>
            {rightTitle && <div className={classes.rightTitle}>
                {rightTitle}
            </div>}
        </div>)
}

export default Header;
