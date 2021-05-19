import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import routes, { applyRoutes } from './index';

import { LocationDisplay } from '../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

const routerNodes: null | ReactElement = applyRoutes(routes);

test('Landing on Page that exits', () => {
    const history = createMemoryHistory()
    const route = '/home'
    history.push(route)
    render(
        <Router history={history}>
            <LocationDisplay />
        </Router>
    );
    expect(screen.getByTestId('location-display')).toHaveTextContent(route);
});

test('Landing on a bad page redirects to Error Page', () => {
    const history = createMemoryHistory()
    history.push('/some/bad/route')
    const errorRoute = '/errors/error-404';
    render(
        <Router history={history}>
            {routerNodes}
            <LocationDisplay />
        </Router>
    )

    expect(screen.getByTestId('location-display')).toHaveTextContent(errorRoute);
})