import React, {useEffect, useState} from 'react';
import useValidator, {Field, InputProps} from 'hooks/useValidator';
import {DxcInput} from '@dxc-technology/halstack-react';
import useBindInputToStep from 'hooks/useBindInputToStep';
import {useTranslation} from 'react-i18next';

/**
 * Display a Input field
 * @param {props} props Contains information related to the input
 * @returns {*} Return the Input
 */
const TextField = (props: InputProps) => {
    const {t} = useTranslation();
    const {hRef, propertyName, data, type, onChangeMethod, onBlurMethod, context = undefined} = props;
    const {inputId, status, statusMessage }: any = useBindInputToStep({hRef, property: propertyName})

    const {FieldWrapper, Validation} = useValidator();
    const field: Field = FieldWrapper(data, propertyName, type);
    const [showError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const [value, setValue] = useState(field?.value);

    const onChange = (value: any) => {
        const validatedOutput = Validation(field, value, type);
        setValue(value);

        setError(!validatedOutput.valid);
        if (!validatedOutput.valid) {
            setErrorMessage(validatedOutput.error)
        }
        else if (onChangeMethod) {
            onChangeMethod(value);
        }
    }

    const onBlur = (value: any) => {
        const validatedOutput = Validation(field, value, type);
        setValue(value);
        setError(!validatedOutput.valid);
        if (!validatedOutput.valid) {
            setErrorMessage(validatedOutput.error)
        }
        else if (onBlurMethod) {
            onBlurMethod(value);
        }
    }

    useEffect(() => {
        setError(!errorMessage)
    }, [errorMessage])

    const invalid = status === 'error'
    const assistiveText = statusMessage ? statusMessage : showError ? errorMessage : null

    return (
        <div id={inputId} hidden={!field.visible} data-testid={field.id} >
            <DxcInput
                label={t(propertyName, {context})}
                required={field?.required}
                disabled={field?.disabled}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                assistiveText={assistiveText}
                invalid={invalid}
            />
        </div>
    );
};

export default TextField
