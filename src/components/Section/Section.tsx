import { DxcBox, DxcHeading } from '@dxc-technology/halstack-react';

import React from 'react';

export interface SectionProps {

    title: string;
    actions?: any;
    icon: any;
    content?: any;
}

/**
 * Display group information
 * Have summary and action
 * Can be expand to see Detail
 * @constructor
 */

const Section = (props: SectionProps) => {
    const { title, icon, actions, content } = props;

    return (
        <>
            <DxcBox size="fillParent" display="block" margin="small">
                <div className="col-12">
                    <div className="col-8 d-inline-flex p-2">
                        <span>{icon}</span>
                        <DxcHeading level={5} weight="light" text={title} />
                    </div>
                    <div className="col-4 d-inline-flex justify-content-end p-2">
                        {actions}
                    </div>
                </div>
                <div className="col-12 p-2">
                    {content}
                </div>
            </DxcBox>
        </>
    )
}

export default Section;
