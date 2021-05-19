import { render, screen } from '@testing-library/react';

import ErrorLayout from './ErrorLayout';
import { LocationDisplay } from 'App';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('Checking AuthLayout to display Error Content Section', () => {
    render(<ErrorLayout route={'/'} />);
    expect(screen.getByTestId('error-content')).toBeInTheDocument();
});

test('ErrorLayout on Error Page that exits', () => {
    const history = createMemoryHistory()
    const route = '/errors/error-404'
    history.push(route)
    render(
        <Router history={history}>
            <ErrorLayout route={route} />
            <LocationDisplay />
        </Router>
    );
    expect(screen.getByTestId('location-display')).toHaveTextContent(route);
});