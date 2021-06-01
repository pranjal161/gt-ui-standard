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
     * on click callback
     */
    onClick?: any
}

const AddButton: React.FC<AddButtonProps> = () => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)

const AddButton2: React.FC<AddButtonProps> = ({disabled = false, title = '', onClick}: AddButtonProps) => (
    <DxcButton
        mode="primary"
        label={title}
        disabled={disabled}
        onClick={onClick}
    />
)

console.log('AddButton2', AddButton2)

export default AddButton;
