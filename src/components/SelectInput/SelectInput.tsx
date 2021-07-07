import React, { useState } from 'react';
import useValidator, { Field, InputProps } from 'hooks/useValidator';
import {DxcSelect} from '@dxc-technology/halstack-react';
import useBindInputToStep from 'hooks/useBindInputToStep';
import { useTranslation } from 'react-i18next';

/**
 * Display a Input field
 * @param {props} props Contains information related to the input
 * @returns {*} Return the Input
 */
const SelectInput = (props: InputProps) => {
    const { t } = useTranslation();
    const { hRef, propertyName, data, onChangeMethod, onBlurMethod } = props;
    const { inputId } = useBindInputToStep({hRef, property : propertyName})
    const { FieldWrapper } = useValidator();
    const field: Field = FieldWrapper(data, propertyName);
    const [value, setValue] = useState(field?.value);

    const onChange = (value: any) => {
        setValue(value);
        if (onChangeMethod) {
            onChangeMethod(value);
        }
    }

    const onBlur = (value: any) => {
        if (onBlurMethod && value) {
            onBlurMethod(value);
        }
    }

    return (
        <span id={inputId} hidden={!field.visible} data-testid={field.id}>
            <DxcSelect
                options={field.values}
                required={field?.required}
                disabled={field?.disabled}
                value={value || undefined}
                onChange={onChange}
                onBlur={onBlur}
                label={t(propertyName)}
            />
        </span>
    );
};

export default SelectInput
