import React from 'react';
import TextField from 'components/TextField/TextField';
import {UpDownArrow} from 'assets/svg';
import { getLink } from 'utils/functions';
import {makeStyles} from '@material-ui/core/styles';

// import TextField from 'components/TextField/TextField';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: 100,
        position: 'relative',
        '& label': {
            display: 'none',
            '& + div': {
                margin: 0,
                '& input': {
                    textAlign: 'right',
                    paddingRight: 10
                }
            }
        },
        '& > div': {
            margin: '0 6px'
        }
    },
    m0: {
        margin: 0
    },
    arrow: {
        position: 'absolute',
        top: 5,
        right: -8,
        '& svg': {
            height: 14
        }
    }
}));
const Rate = (props: { property: string, response: any, icon?: Boolean, list?:any }) => {
    const classes: any = useStyles();
    const hRef = props.response && getLink(props.response, 'self');
    const onChange = (newValue: string) => {
        console.log(newValue);
    };

    return (<div className={classes.root}>
        <TextField
            hRef={hRef}
            onChange={onChange}
            property={props.property}
            type="text"
            size="small"
            list={props.list}
        />
        {/* <DxcInput
            value={inputValue}
            margin="xxsmall"
            onChange={onChange}
        /> */}
        {props.icon && <div className={classes.arrow}><UpDownArrow/></div>}
        <b><p className={classes.m0}>%</p></b>
    </div>);
}

export default Rate;
