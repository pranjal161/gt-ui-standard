import {
    getErrorMessage,
    getLink,
    getMaxLength,
    getMaxValue,
    getMinLength,
    getMinValue,
    getOneOfFromResponse,
    getPropertyType,
    isFieldEditable,
    isFieldRequired,
    isFieldVisible
} from 'utils/functions';

export interface Field {
        id: string,
        min: number,
        max: number,
        visible: boolean,
        disabled: boolean,
        required: boolean,
        minLength: number,
        maxLength: number,
        value: any,
        type: any,
        values: Array<OneofInterface>,
        error: any
}

export interface OneofInterface {
    value: any,
    label: string
}

export interface InputProps {
    propertyName: string;
    context?: string,
    data: any; 
    type?: string, 
    onChangeMethod?: any, 
    onBlurMethod?: any
}

export interface ErrorField {
    error: string | null,
    valid: boolean
}

const useValidator = () => {

    const FieldWrapper = ( data: any, propertyName: string, type?: string) => {
        let field: Field = {
            id: createId(data, propertyName),
            min: getMinValue(data, propertyName),
            max: getMaxValue(data, propertyName),
            visible: isFieldVisible(data, propertyName),
            disabled: !isFieldEditable(data, propertyName),
            required: isFieldRequired(data, propertyName),
            minLength: getMinLength(data, propertyName),
            maxLength: getMaxLength(data, propertyName),
            value: data && data.hasOwnProperty(propertyName) ? data[propertyName] : undefined,
            type: type? type: getPropertyType(data, propertyName),
            values: getOneOfFromResponse(data, propertyName),
            error: getErrorMessage(data, propertyName)
        }
        
        return field;
    }

    const createId = (data: any, propertyName: string) => {
        let elementId = '';
        if (data) {
            const link = getLink(data, 'self');
            const baArray = link && link.split('/');
            const id = baArray && link.split('/').slice(baArray.length - 1, baArray.length)[0].split('-')[1];
            elementId = id + '_' + propertyName;
        }
        
        return elementId;
    }

    const Validation = (InputWrapper: Field, newValue: any, type?:string) => {
        let validate: ErrorField = {
            error: '',
            valid: true
        }
        validate = ValidateMinMaxValue(InputWrapper, newValue, validate);
        validate = ValidateMinMaxlength(InputWrapper, newValue, validate);

        switch(type) {
            case 'email':
                validate = ValidateEmail(newValue, validate);
                break;
            case 'number':
                validate = ValidateNumber(newValue, validate);
                break;
        }
        
        return validate;
    }

    const ValidateMinMaxValue = (InputWrapper: Field, value: any, errorField: ErrorField): ErrorField => {
        //Check for max and min values
        if (InputWrapper?.min || InputWrapper?.max) {
            if ((+value) > InputWrapper.max) {
                errorField.error = 'MORE_THAN_MAXVALUE';
                errorField.valid = false
            }
            else if ((+value) < InputWrapper?.min) {
                errorField.error = 'LESS_THAN_MINVALUE';
                errorField.valid = false
            }
            
            return errorField;
        }
        
        return errorField;
    }

    const ValidateMinMaxlength = (InputWrapper: Field, value: any, errorField: ErrorField): ErrorField => {
        //Check for max and min values
        if (InputWrapper?.minLength || InputWrapper?.maxLength) {
            if (value.length > InputWrapper?.maxLength) {
                errorField.error = 'MORE_THAN_MAXLENGTH';
                errorField.valid = false
            }
            else if (value.length < InputWrapper?.minLength) {
                errorField.error = 'LESS_THAN_MINLENGTH';
                errorField.valid = false
            }
            
            return errorField;
        }
        
        return errorField;
    }
    
    const ValidateEmail = (value: any, errorField: ErrorField) => {
        if (value && value !== '') {
            const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$');
            const emailValidation = emailRegex.test(value);
            if (emailValidation === false) {
                errorField.error = '_ENTER_VALID_EMAIL';
                errorField.valid = false;
            }
        }  
        
        return errorField;
    }

    const ValidateNumber = (value: any, errorField: ErrorField) => {
        if(value && value !== '') {
            if (!Number(value)) {
                errorField.error = 'INVALID_NUMBER';
                errorField.valid = false;
            }
        }
        
        return errorField;
    }

    return { FieldWrapper, Validation }
}

export default useValidator
