import React from 'react';
import image from '_sb_mock_images/TabButton.png'

export interface TabButtonProps {

    /**
     * Props1
     */
    props1?: any
}

const TabButton: React.FC<TabButtonProps> = () => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)

export default TabButton;
