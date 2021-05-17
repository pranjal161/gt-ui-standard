import { DxcApplicationLayout } from '@dxc-technology/halstack-react';
import NavBar from 'components/NavBar/NavBar';
import React from 'react';
import { applyRoutes } from '../../routes';
import styled from 'styled-components';

const FixMainTop = styled.div`
    margin-top: 42px;
`;

const AppLayout = (props: { route: any }) => {
    const { route } = props;

    return (
        <>
            <DxcApplicationLayout>
                <DxcApplicationLayout.Header>
                    <NavBar />
                </DxcApplicationLayout.Header>
                <DxcApplicationLayout.Main>
                    <FixMainTop>
                        {applyRoutes(route.routes)}
                    </FixMainTop>
                </DxcApplicationLayout.Main>
            </DxcApplicationLayout>
        </>
    )
}

export default AppLayout;
