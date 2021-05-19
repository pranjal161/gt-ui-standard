import { DxcApplicationLayout } from '@dxc-technology/halstack-react';
import { FixMainTop } from './StyledAppLayout';
import NavBar from 'components/NavBar/NavBar';
import React from 'react';
import { applyRoutes } from '../../routes';

const AppLayout = (props: { route: any }) => {
    const { route } = props;

    return (
        <>
            <DxcApplicationLayout>
                <DxcApplicationLayout.Header>
                    <div data-testid="header">
                        <NavBar />
                    </div>
                </DxcApplicationLayout.Header>
                <DxcApplicationLayout.Main>
                    <FixMainTop data-testid="content">
                        {applyRoutes(route.routes)}
                    </FixMainTop>
                </DxcApplicationLayout.Main>
            </DxcApplicationLayout>
        </>
    )
}

export default AppLayout;
