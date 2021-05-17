import React from 'react';
import {applyRoutes} from '../../routes';

const ErrorLayout = (props: { route: any }) => (
    <div>
        <h2>Error page - Oops! Something went wrong</h2>
        {applyRoutes(props.route.routes)}
    </div>
)

export default ErrorLayout;
