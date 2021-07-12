import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { format, isValid } from 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import { InputProps } from 'hooks/useValidator';
import React from 'react';
import useInput from 'hooks/useInput';

/**
 * Display a Input field
 * @param {props} props Contains information related to the input
 * @returns {*} Return the Input
 */

const DateInput = (props: InputProps) => {
    const {inputId, value, label, field, setValue } = useInput(props);

    const onChangeMethod = (date: Date | null) => {
        let value;
        if (date && isValid(date)) {
            value = format(date, 'yyyy-MM-dd')
            setValue(value)
        }
    }

    const onBlurMethod = (event: any) => {
        if (event.target.value) {
            const dateParts = event.target.value.split('/')
            const date = new Date(dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2]);
            let value;
            if (isValid(date)) {
                value = format(date, 'yyyy-MM-dd')
                setValue(value)
            }
        }
    }

    console.log('value', value)

    return (
        <span id={inputId} hidden={!field.visible} data-testid={inputId}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id={field.id}
                    label={label}
                    format="dd/MM/yyyy"
                    value={value}
                    disabled={field?.disabled}
                    required={field?.required}
                    onBlur={onBlurMethod}
                    onChange={onChangeMethod}
                    onFocus={() => console.log()}
                />
            </MuiPickersUtilsProvider>
        </span>
    );
};

export default DateInput
