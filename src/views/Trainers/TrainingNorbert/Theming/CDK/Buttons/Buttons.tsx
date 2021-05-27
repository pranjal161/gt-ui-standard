import {DxcButton} from '@dxc-technology/halstack-react';
import React from 'react';

// eslint-disable-next-line require-jsdoc
function Buttons() {
    return (
        <div>
            <DxcButton
                mode="primary"
                label="Primary Button"
                margin="medium"
            />
            <DxcButton
                mode="secondary"
                label="Secondary Button"
                margin="medium"
            />
            <DxcButton
                mode="text"
                label="Text Button"
                margin="medium"
            />
        </div>
    );
}

export default Buttons;
