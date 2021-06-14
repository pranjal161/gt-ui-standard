import { DxcApplicationLayout } from '@dxc-technology/halstack-react';
import NavBar from 'components/NavBar/NavBar';
import React from 'react';
import TabViewContainer from '../../components/TabView/TabViewContainer';
import { WindowTabsContainerMemo } from 'components/WindowTabs/WindowTabsContainer';
import { applyRoutes } from '../../routes';

// the DxcApplicationLayout.Main has a CSS rule top: 64px, 
// while the MainNavBar has a height of 128px. 
// This means that to avoid getting the main page content covered by the header,
// a margin-top is needed in DxcApplicationLayout.Main

const AppLayout = (props: { route: any }) => {
    const { route } = props;

    /**
     * The component TabViewContainer is displayed only on route /viewTab, 
     * and it's content is only hidden, not unrendered. 
     * This is done to avoid rerendering the data fetch heavy secondary tabs components.
     */

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
                    <div className="mt-42" data-testid="content" style={{marginTop: 64}}>
                        <TabViewContainer />
                        {applyRoutes(route.routes)}
                    </div>
                </DxcApplicationLayout.Main>
            </DxcApplicationLayout>
        </>
    )
}

export default AppLayout;