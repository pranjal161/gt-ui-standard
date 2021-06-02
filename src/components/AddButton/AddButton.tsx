import {AddBoxIcon} from 'assets/svg';
import {DxcButton} from '@dxc-technology/halstack-react'
import React from 'react';
import image from '_sb_mock_images/AddButton.png'

export interface AddButtonProps {

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
     * Add icon
     */
    withIcon?: boolean;

    /**
     * on click callback
     */
    onClick?: () => void
}

const AddButton2: React.FC<AddButtonProps> = () => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)
console.log('AddButton2', AddButton2)

const AddButton: React.FC<AddButtonProps> = (props: AddButtonProps) => {
    const {
        disabled = false,
        title = '',
        onClick,
        mode = 'primary',
        withIcon = true
    } = props

    // eslint-disable-next-line react/display-name
    const extraProps = withIcon && {icon: () => <AddBoxIcon/>, iconPosition: 'after'} || {}

    return (<DxcButton
        mode={mode}
        label={title}
        disabled={disabled}
        onClick={onClick}
        {...extraProps}
    />
    )
}

export default AddButton;
