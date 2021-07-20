import {useCallback, useEffect, useState} from 'react';
import useValidator, {Field} from 'hooks/useValidator';

import useAia from 'hooks/useAia';
import useBindInputToStep from 'hooks/useBindInputToStep';
import useResponse from 'hooks/useResponse';
import useSetDataToPatch from 'hooks/useSetDataToPatch';
import {useTranslation} from 'react-i18next';

/**
 * Handle features on Input
 * @param {string} hRef ressource bind the the property
 * @param {string} property property To bind
 * @param {string} type Type of value
 * @param {object} list List object consisting current list item & List name
 * @param {any} i18nOptions usefull to precise context for i18n
 * @param {any} onChange callback
 * @return {any} array of features
 */
export interface useInputValueProps {

    /**
     * Property to display
     */
    property: any

    /**
     * ressource bind the the property
     */
    hRef: any

    /**
     * Type of value
     */
     type?: string

    /**
     * usefull to precise context for i18n
     */
     i18nOptions?:string

    /**
     * onChange callback
     */
     onChange?: any

    /**
     * List object consisting current list item & List name
     */
     list?: any

    /**
     * patch immdediately
     */
     immediatePatch?: boolean

     /**
     * Store in Redux or not to patch it further
     */
    notToStore?: boolean
}

const useInput = ( {hRef, property, type, i18nOptions, onChange, list, immediatePatch, notToStore }: useInputValueProps) => {
    const {t} = useTranslation();
    const {patch} = useAia();
    const [response, loading] = useResponse(hRef)
    const {setDataToPatch} = useSetDataToPatch()
    const {FieldWrapper: fieldWrapper, Validation: validation} = useValidator();
    const {inputId, status, statusMessage} = useBindInputToStep({hRef, property})
    const [field, setField]: any = useState({})
    const [value, _setValue] = useState(undefined);
    const [validationResult, setValidationResult]: any = useState({valid: true, error: undefined});

    useEffect(() => {
        if ((value === undefined || value === null) && response && response.data) {
            const field: Field = fieldWrapper(response.data, property, type, list, immediatePatch);
            setField(field)
            _setValue(field.value)
        }

    }, [response, fieldWrapper, property, value, list, type])

    const handleOnChange = useCallback((newValue: any) => {
        onChange && onChange(newValue)
        //We patch immediately according API response
        // to add influencer check here later
        if (!notToStore) {
            if (field.immediatePatch) {
                patch(hRef, {[property]: newValue})
            }
            else
                setDataToPatch({hRef, property, value:newValue})
        }
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
    const errorMessage = validationResult.error || (status === 'error' && statusMessage)

    return {value, setValue, loading, field, inputId, invalid, label, errorMessage}
}

export default useInput;
