import React from 'react';
import image from '_sb_mock_images/Tab.png'

export interface TabProps {

    /**
     * Props1
     */
    props1?: any
}

const Tab: React.FC<TabProps> = () => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)

export default Tab;
