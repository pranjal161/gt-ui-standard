import React from 'react';
export interface TabProps {
    children: any,
    tabId: string,
    title: string,
    subTitle?: string,
    icon?: string,
    activated?: boolean
}

const Tab = (props: TabProps) => {
    const { children } = props;
    
    return (
        <>
            {children}
        </>
    );
}

export default Tab; 

export const MemoTab = React.memo(Tab)