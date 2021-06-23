import React from 'react';
import image from '_sb_mock_images/Layout_TopBar.png'

export interface TopBarProps {

    /**
     * prios1
     */
    props1?: any
}

const TopBar: React.FC<TopBarProps> = () => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)

export default TopBar;
