import React from 'react';
import image from '_sb_mock_images/Tabs.png'

export interface TabsProps {

    /**
     * Props1
     */
    props1?: any
}

const Tabs: React.FC<TabsProps> = () => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)

export default Tabs;
