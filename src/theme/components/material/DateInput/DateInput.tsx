import { format, isValid } from 'date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useState } from 'react';
import useValidator, { Field, InputProps } from 'hooks/useValidator';
import DateFnsUtils from '@date-io/date-fns';
import useBindInputToStep from 'hooks/useBindInputToStep';
import { useTranslation } from 'react-i18next';

/**
 * Display a Input field
 * @param {props} props Contains information related to the input
 * @returns {*} Return the Input
 */
const DateInput = (props: InputProps) => {
    const { t } = useTranslation();
    const { hRef, propertyName, data, type = 'date', onChangeMethod, onBlurMethod } = props;
    useBindInputToStep({hRef, property : propertyName})

    const { FieldWrapper } = useValidator();
    const field: Field = FieldWrapper(data, propertyName, type);
    const [value, setValue] = useState(field?.value);

    const onChange = (date: Date | null) => {
        setValue(date);
        let value;
        if (date && isValid(date)) {
            value = format(date, 'yyyy-MM-dd')
            if (onChangeMethod) {
                onChangeMethod(value);
            }
        }
    }

    const onBlur = (event: any) => {
        if (event.target.value) {
            const dateParts = event.target.value.split('/')
            const date = new Date(dateParts[1] + '/' + dateParts[0] + '/' + dateParts[2]);
            setValue(date);
            let value;
            if (isValid(date)) {
                value = format(date, 'yyyy-MM-dd')
                if (onBlurMethod) {
                    onBlurMethod(value);
                }
            }
        }
    }

    return (
        <span hidden={!field.visible} data-testid={propertyName}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id={field.id}
                    label={t(propertyName)}
                    format="dd/MM/yyyy"
                    value={value}
                    disabled={field?.disabled}
                    required={field?.required}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={() => console.log()}
                />
            </MuiPickersUtilsProvider>
        </span>
    );
};

export default DateInput
