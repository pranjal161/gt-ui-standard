import { DxcCheckbox } from '@dxc-technology/halstack-react';
import React from 'react';
import { getComponentStyle } from 'theme/components/material';
import { makeStyles } from '@material-ui/core/styles';

interface CheckboxProps {
    checked: boolean,
    value?: any,
    label?: string,
    labelPosition?: string,
    disabled?: boolean,
    onChange?: any,
    size?: string,
    margin?: string
}

const useStyles = makeStyles(getComponentStyle('Checkbox'));

const Checkbox : React.FC<CheckboxProps> = ({
    checked = false,
    value,
    label,
    labelPosition,
    disabled,
    onChange,
    size,
    margin
}: CheckboxProps) => {
    const classes: any = useStyles();

    console.log({classes});
    
    return (
        <>
            <DxcCheckbox className={classes.checkbox} label={label} value={value} checked={checked}
                labelPosition={labelPosition} disabled={disabled}
                onChange={onChange} size={size} margin={margin} />
        </>
    )
}

export default Checkbox;