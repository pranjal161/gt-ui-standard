import { DxcApplicationLayout, DxcFooter, DxcHeader } from '@dxc-technology/halstack-react';

import React from 'react';
import { applyRoutes } from '../../routes';

const AuthLayout = (props: { route: any }) => (
    <DxcApplicationLayout>
        <DxcApplicationLayout.Header>
            <div data-testid="header">
                <DxcHeader></DxcHeader>
            </div>
        </DxcApplicationLayout.Header>
        <DxcApplicationLayout.Main>
            <div data-testid="content">
                {applyRoutes(props.route.routes)}
            </div>
        </DxcApplicationLayout.Main>
        <DxcApplicationLayout.Footer>
            <div data-testid="footer">
                <DxcFooter />
            </div>
        </DxcApplicationLayout.Footer>
    </DxcApplicationLayout>

)

export default AuthLayout;
