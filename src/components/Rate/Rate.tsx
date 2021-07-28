import React from 'react';
import TextField from 'components/TextField/TextField';
import {UpDownArrow} from 'assets/svg';
import { getLink } from 'utils/functions';
import {makeStyles} from '@material-ui/core/styles';

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
const Rate = (props: { property: string, response: any, icon?: Boolean, list?:any, onChange: Function, type?:string }) => {
    const classes: any = useStyles();
    const hRef = props.response && getLink(props.response, 'self');
    const onChangeMethod = (newValue: number) => {
        props.onChange && props.onChange({value: newValue, data: props && props.list });
    };

    return (<div className={classes.root}>
        <TextField
            hRef={hRef}
            onChange={onChangeMethod}
            property={props.property}
            type={props.type}
            size="fillParent"
            list={props.list}
            notToStore={true}
        />
        {props.icon && <div className={classes.arrow}><UpDownArrow/></div>}
        {!props.type && <b><p className={classes.m0}>%</p></b>}
    </div>);
}

export default Rate;
