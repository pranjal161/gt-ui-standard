import React, { useEffect, useState } from 'react';

import { DxcTextarea } from '@dxc-technology/halstack-react';
import {InputProps} from 'hooks/useValidator';
import useInput from 'hooks/useInput';

/**
 * Display a Input field
 * @param {props} props Contains information related to the input
 * @returns {*} Return the Input
 */
const TextArea = (props: InputProps) => {
    const {inputId, value, label, field, invalid, setValue, errorMessage} = useInput(props);

    const [inputValue, updateInput] = useState(value);

    const onchangeMethod = (value: any) => {
        updateInput(value);
    }

    useEffect(() => {
        updateInput(field.value);
    },[field]);

    return (
        <span id={inputId} hidden={!field.visible} data-testid={field.id}>
            <DxcTextarea
                label={label}
                required={field?.required}
                disabled={field?.disabled}
                onChange={onchangeMethod}
                onBlur={setValue}
                value={inputValue}
                assistiveText={errorMessage}
                invalid={invalid}
            />
        </span>
    );
};

export default TextArea
