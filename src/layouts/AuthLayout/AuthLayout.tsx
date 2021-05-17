import { DxcApplicationLayout, DxcFooter, DxcHeader } from '@dxc-technology/halstack-react';

import React from 'react';
import { applyRoutes } from '../../routes';

const AuthLayout = (props: { route: { routes: any[]; }; }) => (
    <DxcApplicationLayout>
        <DxcApplicationLayout.Header>
            <DxcHeader></DxcHeader>
        </DxcApplicationLayout.Header>
        <DxcApplicationLayout.Main >
            {applyRoutes(props.route.routes)}
        </DxcApplicationLayout.Main>
        <DxcApplicationLayout.Footer>
            <DxcFooter />
        </DxcApplicationLayout.Footer>
    </DxcApplicationLayout>

)

export default AuthLayout;
