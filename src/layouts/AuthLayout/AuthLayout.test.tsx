import { render, screen } from '@testing-library/react';

import AuthLayout from './AuthLayout';
import { LocationDisplay } from 'App';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('Checking AuthLayout to display Header', () => {
    render(<AuthLayout route={'/'} />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
});

test('Checking AuthLayout to display Content Section', () => {
    render(<AuthLayout route={'/'} />);
    expect(screen.getByTestId('content')).toBeInTheDocument();
});

test('Checking AuthLayout to display Footer', () => {
    render(<AuthLayout route={'/'} />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
});

test('AuthLayout on SignIn Page that exits', () => {
    const history = createMemoryHistory()
    const route = '/auth/signin'
    history.push(route)
    render(
        <Router history={history}>
            <AuthLayout route={route} />
            <LocationDisplay />
        </Router>
    );
    expect(screen.getByTestId('location-display')).toHaveTextContent(route);
});