import React from 'react';
import image from '_sb_mock_images/Title.png'

export interface TitleBarProps {

    /**
     * props to define and describe
     */
    prop1?: any
}

const TitleBar: React.FC<TitleBarProps> = () => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)

export default TitleBar;
