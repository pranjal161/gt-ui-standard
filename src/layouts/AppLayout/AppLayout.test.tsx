import { render, screen } from '@testing-library/react';

import AppLayout from './AppLayout';
import { LocationDisplay } from 'App';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('Checking AppLayout to display Header', () => {
    render(<AppLayout route={'/'} />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
});

test('Checking AppLayout to display Content Section', () => {
    render(<AppLayout route={'/'} />);
    expect(screen.getByTestId('content')).toBeInTheDocument();
});

test('AppLayout on Home Page that exits', () => {
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