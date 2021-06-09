import { DxcApplicationLayout } from '@dxc-technology/halstack-react';
import NavBar from 'components/NavBar/NavBar';
import React from 'react';
import { WindowTabsContainerMemo } from 'components/WindowTabs/WindowTabsContainer';
import { applyRoutes } from '../../routes';

const AppLayout = (props: { route: any }) => {
    const { route } = props;

    return (
        <>
            <DxcApplicationLayout>
                <DxcApplicationLayout.Header>
                    <div data-testid="header">
                        <NavBar />
                        <WindowTabsContainerMemo />
                    </div>
                </DxcApplicationLayout.Header>
                <DxcApplicationLayout.Main>
                    <div className="mt-42" data-testid="content">
                        {applyRoutes(route.routes)}
                    </div>
                </DxcApplicationLayout.Main>
            </DxcApplicationLayout>
        </>
    )
}

export default AppLayout;