import { CrossIcon, History, PlusSquare, RightActiveArrow } from 'assets/svg';
import {Theme, makeStyles} from '@material-ui/core/styles';

import IconButton from 'theme/components/material/IconButton/IconButton';
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
    activity:{
        padding: '0 20px',
    },
    header: {
        fontSize: 16,
        fontWeight: 600,
        color: theme.palette.text.primary,
        marginTop: 10
    },
    list: {
        counterReset: 'item',
        listStyleType: 'none',
        marginBottom: 5,
        fontSize: 14,
        padding: 0
    },
    listItem: {
        marginBottom: 6,
        position: 'relative',
        fontFamily: theme.typography.fontFamily,
        '&:before': {
            content: 'counter(item) "  "',
            counterIncrement: 'item',
            color: '#000000',
            fontWeight: 600,
            marginRight: 10
        }
    },
    lisItemActive: {
        position: 'absolute',
        left: -6,
        top: -1,

        '& svg': {
            height: 23,
            fill: '#000',
            background: '#fff'
        }
    },
    heading: {
        color: '#888888',
        fontSize: 18,
        fontWeight: 400,
        margin: '10px 0'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    footerButton: {
        '& button': {
            padding: '5px 10px !important',
            fontSize : 14,
            
            '& > span > span': {
                display: 'flex',
                alignItems: 'center',

                '& svg': {
                    height: 25,
                    marginRight: 6
                }
            }
        }
    },
    textButton: {
        display: 'inline-block',
        wordBreak: 'break-word',
        maxWidth: 85,
        textAlign: 'left',
        textDecoration: 'underline'
    },
    abortButton: {
        '& button': {
            border: '1px solid red !important',
            borderRadius: 5,

            '& svg': {
                fill: 'red !important',
            }
        }
    },
    textButtonAbort: {
        color: 'red !important',
        textDecoration: 'none'
    },
    button: {
        '& button': {
            fontSize : 14,
            borderRadius: 5,
            paddingRight: 0,
            paddingLeft: 0,

            '& svg': {
                marginRight: 5
            }
        }
    }
}));

const ActivitySteps = (props: { mainSteps: Array<any>, optionalSteps: Array<any>, onClick: Function }) => {
    const { mainSteps, optionalSteps, onClick } = props;
    const classes: any = useStyles();

    return (
        <div className={classes.activity}>
            <h3 className={classes.header}>Activity Steps</h3>
            <hr />
            <ul className={classes.list}>
                {mainSteps && mainSteps.map((main: any, inx: number) => <>
                    <li className={classes.listItem} key={inx}>{main.active && <span className={classes.lisItemActive}><RightActiveArrow /></span>}{main.label}</li>
                </>)}
            </ul>
            <hr />
            {optionalSteps && <><h4 className={classes.heading} data-testid="optional-step">Optionnals Steps</h4>
                {optionalSteps.map((optional: any, index: number) => <div className={classes.button} key={index}><IconButton onClick={() => onClick(optional.id)}><PlusSquare />{optional.label}</IconButton></div>)}
                <hr /></>}
            <div className={classes.footer}>
                <div className={`${classes.footer} ${classes.footerButton}`}><IconButton onClick={() => onClick()}><History /><span className={classes.textButton}>Activity Summary</span></IconButton></div>
                <div className={`${classes.footer} ${classes.footerButton} ${classes.abortButton}`}><IconButton onClick={() => onClick()}><CrossIcon /><span className={classes.textButtonAbort}>Abort Activity</span></IconButton></div>
            </div>
        </div>
    );
}

export default ActivitySteps;