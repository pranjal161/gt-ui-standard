import React, { useEffect, useState } from 'react';

import { DxcCheckbox } from '@dxc-technology/halstack-react';
import { InputProps } from 'hooks/useValidator';
import useInput from 'hooks/useInput';

const Checkbox = (props: InputProps) => {
    const { inputId, field, setValue } = useInput(props);
    
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

    let value = checkValue(field.value);
    const [checked, changeChecked] = useState<boolean>(value);
    const onChange = (newValue: boolean) => {
        setValue(newValue);
    };

    useEffect(() => {
        let value = checkValue(field.value);
        changeChecked(value);
    }, [field]);

    return (
        <span id={inputId} hidden={!field.visible} data-testid={field.id}>
            <DxcCheckbox
                checked={checked}
                required={field.required}
                disabled={field.editable}
                onChange={onChange}
            />
        </span>
    )
}

export default Checkbox;