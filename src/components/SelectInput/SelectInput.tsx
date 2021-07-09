import {DxcSelect} from '@dxc-technology/halstack-react';
import React from 'react';
import useInput from 'hooks/useInput';

export interface SelectInputProps {
    hRef: string;
    property: string;
    context?: string,
    onChange?: any,
}

/**
 * Display a Input field
 * @param {props} props Contains information related to the input
 * @returns {*} Return the Input
 */
const SelectInput = (props: SelectInputProps) => {
    const {inputId, value, label, field, invalid, setValue} = useInput(props)

    return (
        <span id={inputId} hidden={!field.visible} data-testid={field.id}>
            <DxcSelect
                options={field.values}
                required={field?.required}
                disabled={field?.disabled}
                value={value || undefined}
                onChange={setValue}
                onBlur={setValue}
                label={label}
                invalid={invalid}
            />
        </span>
    );
};

export default SelectInput
