import IconButton from 'theme/components/material/IconButton/IconButton';
import {LeftChevronIcon} from 'assets/svg';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

export interface TitleBarProps {

    /**
     * Title
     */
    title?: any

    /**
     * rightTitle
     */
    rightTitle?: any

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
        padding: theme.spacing(1, 1, 1, 2)
    },
    title: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '22px',
        color: theme.palette.primary.contrastText
    },
    backIcon: {
        marginRight: theme.spacing(2)
    },
    rightTitle: {
        fontFamily: theme.typography.fontFamily,
        fontSize: '16px',
        color: theme.palette.primary.contrastText
    }
}))

const TitleBar: React.FC<TitleBarProps> = ({title, rightTitle, onBack}: TitleBarProps) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div>
                {onBack && <div className={classes.backIcon}><IconButton onClick={() => onBack && onBack()}>
                    <LeftChevronIcon size={32}/>
                </IconButton></div>}

                <div className={classes.title}>
                    {title}
                </div>
            </div>
            {rightTitle && <div className={classes.rightTitle}>
                {rightTitle}
            </div>}
        </div>)
}

export default TitleBar;
