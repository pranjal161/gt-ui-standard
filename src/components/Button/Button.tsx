import { DxcButton } from '@dxc-technology/halstack-react'
import React from 'react';

export interface ButtonProps {

    /**
     * Disable the button
     */
    disabled?: boolean

    /**
     * Title
     */
    title?: string

    /**
     * Mode
     */
    mode?: 'primary' | 'secondary' | 'text';

    /**
     * Icon to display
     */
     Icon?: any ;

    /**
     * on click callback
     */
    onClick?: () => void
}

/**
 * Generic button, use to add an item of a list
 * @param {ButtonProps} props Props of the component.
 * @returns {React.component} Display the button
 */
const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const {
        disabled = false,
        title = '',
        onClick,
        mode = 'primary',
        Icon,
    } = props

    // eslint-disable-next-line react/display-name
    const extraProps = Icon && { icon: () => <Icon />, iconPosition: 'after' } || {}

    return (
        <DxcButton
            mode={mode}
            label={title}
            disabled={disabled}
            onClick={onClick}
            {...extraProps}
        />
    )
}

export default Button;
