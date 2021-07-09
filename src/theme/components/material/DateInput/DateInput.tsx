import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useState } from 'react';
import { format, isValid } from 'date-fns';
import useValidator, { Field } from 'hooks/useValidator';

import DateFnsUtils from '@date-io/date-fns';
import useBindInputToStep from 'hooks/useBindInputToStep';
import { useTranslation } from 'react-i18next';

/**
 * Display a Input field
 * @param {props} props Contains information related to the input
 * @returns {*} Return the Input
 */
const DateInput = (props: any) => {
    const { t } = useTranslation();
    const { hRef, property, data, type = 'date', onChange, onBlur } = props;
    const { inputId } = useBindInputToStep({hRef, property : property})

    const { FieldWrapper } = useValidator();
    const field: Field = FieldWrapper(data, property, type);
    const [value, setValue] = useState(field?.value);

    const onChangeMethod = (date: Date | null) => {
        setValue(date);
        let value;
        if (date && isValid(date)) {
            value = format(date, 'yyyy-MM-dd')
            if (onChange) {
                onChange(value);
            }
        }
    }

    const onBlurMethod = (event: any) => {
        if (event.target.value) {
            const dateParts = event.target.value.split('/')
            const date = new Date(dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2]);
            setValue(date);
            let value;
            if (isValid(date)) {
                value = format(date, 'yyyy-MM-dd')
                if (onBlur) {
                    onBlur(value);
                }
            }
        }
    }

    return (
        <span id={inputId} hidden={!field.visible} data-testid={property}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id={field.id}
                    label={t(property)}
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
