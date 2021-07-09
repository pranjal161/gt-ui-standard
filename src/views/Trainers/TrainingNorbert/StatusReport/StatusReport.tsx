/* eslint-disable */

import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';

import Button from 'components/Button/Button';
import TextField from 'components/TextField/TextField';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        padding: '8px',
        display: 'flex',
        margin: '8px',
        msFlexDirection: 'column',
        alignItems: 'center',
        '& > * ': {
            margin: '8px',
        },
    },
    focus: {
        borderStyle: 'solid',
        borderColor: 'red'
    }
}));

const patchValue = (value: any, property: any) => {

    console.log('patch', property, '=', value)
}

const StepContext = createContext({})

const useFocus = (property: any) => {
    const context: any = useContext(StepContext)

    const bool = context === property
    console.log('bool', bool, context, property)



    return useCallback(()=> bool,[bool])
}

const Input = React.memo(({property}: any) => {
    const classes = useStyles()
    const isFocus = useFocus(property)


    useEffect(() => {
        console.log('isFocus changed', property, isFocus)
    }, [isFocus])

    const focus = isFocus()
    console.log(property, 'render', focus)

    const onBlur = useCallback((value: any) => patchValue(value, property),[patchValue])

    return (<div className={clsx({[classes.focus]: focus})}><TextField
        hRef={'kjkjkjkjk'}
        property={property}
        onChange={onBlur}
    /></div>)
})

const StatusReport = () => {
    const [focusOn, setFocusOn] : [any, any] = useState('contract:start_date')
    const classes = useStyles()
    console.log('StatusReport render')

    const handleClick = () => (setFocusOn('contract:number'))

    return (
        <StepContext.Provider value={focusOn}>
            <div className={classes.root}>
                <Input key={1} property={'contract:status_date'}/>
                <Input key={2} property={'duration:renewal_month'}/>
                <Input key={3} property={'contract:number'}/>
                <Input key={4} property={'contract:product_label'}/>
                <Input key={5} property={'contract:start_date'}/>
                <Button title={'set focus'} onClick={handleClick}/>
            </div>
        </StepContext.Provider>
    );
}

export default StatusReport;
