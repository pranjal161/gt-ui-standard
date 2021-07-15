import React from 'react';

import { DxcCheckbox } from '@dxc-technology/halstack-react';
import { InputProps } from 'hooks/useValidator';
import useInput from 'hooks/useInput';

const Checkbox = (props: InputProps) => {
    const { inputId, field, value, setValue } = useInput(props);
    
    // to handle yes/no API value alongwith true/false
    const checkValue = (fieldValue: any) => {
        let value = fieldValue;
        if (value === 'yes') { 
            value = true 
        }
        else if (value === 'no') { 
            value = false 
        }
        
        return value;
    }

    let checked = checkValue(value);

    return (
        <span id={inputId} hidden={!field.visible} data-testid={field.id}>
            <DxcCheckbox
                checked={checked}
                required={field.required}
                disabled={field.editable}
                onChange={setValue}
            />
        </span>
    )
}

export default Checkbox;
