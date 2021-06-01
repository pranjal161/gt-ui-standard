import React from 'react';
import image from '_sb_mock_images/SideBar.png'

export interface SideBarProps {

    /**
     * props to define and describe
     */
    value?: any
}

const SideBar: React.FC<SideBarProps> = () => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)

export default SideBar;
