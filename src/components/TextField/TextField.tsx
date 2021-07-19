import React, { useEffect, useState } from 'react';

import {CircularProgress} from '@material-ui/core';
import {DxcInput} from '@dxc-technology/halstack-react';
import { InputProps } from 'hooks/useValidator';
import useInput from 'hooks/useInput';

/**
 * Display a Input field
 * @param {props} props Contains information related to the input
 * @returns {*} Return the Input
 */
const TextField = (props: InputProps) => {
    const {inputId, value, label, field, invalid, setValue, errorMessage, loading} = useInput(props);

    const [inputValue, updateInput] = useState(value);

    const onchangeMethod = (value: any) => {
        updateInput(value);
    }

    useEffect(() => {
        updateInput(field.value);
    },[field]);

    const Skeleton = () => <CircularProgress
        variant="indeterminate"
        size={14}
        thickness={4}
    />
    const otherProps = loading && {suffixIcon : <Skeleton/> }

    return (
        <div id={inputId} hidden={!field.visible && !loading} data-testid={field.id}>
            <DxcInput
                label={label}
                required={field?.required}
                disabled={field?.disabled}
                onChange={onchangeMethod}
                onBlur={setValue}
                size={props.size ? props.size : 'medium'}
                value={loading ? inputValue || ' ' : inputValue}
                assistiveText={errorMessage}
                invalid={invalid}
                {...otherProps}
            />
        </div>
    );

};

export default TextField
