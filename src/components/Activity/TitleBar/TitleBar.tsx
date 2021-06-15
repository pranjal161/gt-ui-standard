import React from 'react';

export interface TitleBarProps {

    /**
     * props to define and describe
     */
    prop1?: any
}

const TitleBar: React.FC<TitleBarProps> = () => (
    <div>
        Titlebar
    </div>
)

export default TitleBar;
