import React from 'react';
import {applyRoutes} from '../../routes';

const ErrorLayout = (props: { route: any }) => {
    const { route } = props;

    return (<div>
        <h2>Error page - Oops! Something went wrong</h2>
        <div data-testid="error-content">
            {applyRoutes(route.routes)}
        </div>
    </div>);
}

export default ErrorLayout;
