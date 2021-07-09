import useStep from 'hooks/useStep';
import {useCallback, useEffect, useState} from 'react';
import useValidator, {Field} from 'hooks/useValidator';
import useAia from 'hooks/useAia';
import useBindInputToStep from 'hooks/useBindInputToStep';
import useResponse from 'hooks/useResponse';
import {useTranslation} from 'react-i18next';

/**
 * Handle features on Input
 * @param {string} hRef ressource bind the the property
 * @param {string} property property To bind
 * @param {string} type Type of value
 * @param {any} i18nOptions usefull to precise context for i18n
 * @param {any} onChange callback
 * @return {any} array of features
 */
const useInput = ({hRef, property, type, i18nOptions, onChange}: any) => {
    const {t} = useTranslation();
    const {patch} = useAia();
    const [response, loading] = useResponse(hRef)
    const {setDataToPatch} = useStep()
    const {FieldWrapper: fieldWrapper, Validation: validation} = useValidator();
    const {inputId, status} = useBindInputToStep({hRef, property})
    const [field, setField]: any = useState({})
    const [value, _setValue] = useState(undefined);
    const [validationResult, setValidationResult]: any = useState({valid: true, error: undefined});

    useEffect(() => {
        if (!value && response.data) {
            const field: Field = fieldWrapper(response.data, property);
            setField(field)
            _setValue(field.value)
        }

    }, [response, fieldWrapper, property, value])

    const handleOnChange = useCallback((newValue: any) => {
        onChange && onChange(newValue)
        //We patch immediately according API response
        const [isImmediatePatch, patchHRef] = field.immediatePatch
        if (isImmediatePatch) {
            patch(patchHRef, {[property]: newValue})
        }
        else
            setDataToPatch({hRef, property, value:newValue})
    },[property, field, onChange, patch])

    const setValue = useCallback((newValue: any) => {
        const result = validation(field, newValue, type)
        setValidationResult(result)
        _setValue(newValue)
        if (result.valid)
            handleOnChange(newValue)
    }, [field, type, validation, handleOnChange])

    const label = t(property, i18nOptions)
    const invalid = !validationResult.valid || status === 'error'
    const errorMessage = validationResult.error || (status === 'error' && status.statusMessage)

    return {value, setValue, loading, field, inputId, invalid, label, errorMessage}
}

export default useInput;
