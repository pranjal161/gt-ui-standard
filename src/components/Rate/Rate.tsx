import { DxcInput } from '@dxc-technology/halstack-react';
import React from 'react';
import { UpDownArrow } from 'assets/svg';
import { makeStyles } from '@material-ui/core/styles';

// import TextField from 'components/TextField/TextField';

const useStyles = makeStyles((theme) => ({
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
const Rate = (props: { property: string, response: any, icon?: Boolean }) => {
    const classes: any = useStyles();
    const onChange = (newValue: string) => {
        console.log(newValue);
    };
    const inputValue = '100';

    return (<div className={classes.root}>
        {/* <TextField
            onChangeMethod={onChange}
            propertyName={props.property}
            type="text"
            data={props.response}
        /> */}
        <DxcInput
            value={inputValue}
            margin="xxsmall"
            onChange={onChange}
        />
        {props.icon && <div className={classes.arrow}><UpDownArrow /></div>}
        <b><p className={classes.m0}>%</p></b>
    </div>);
}

export default Rate;