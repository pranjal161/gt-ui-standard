import React, { Suspense } from 'react';
import {Route, Switch} from 'react-router-dom';

import routes from './routes';

export interface CustomRouteProps {
    path: string,
    name: string,
    exact: boolean,
    component: React.ComponentType,
    routes: Array<any>
}

const applyRoutes = (routes: Array<any>) => {
    if (!routes) return null
    
    return (
        <Switch>
            {routes.map((route: any, index: number) => applyRoute(route, index))}
        </Switch>
    );
}

const applyRoute: React.FC<CustomRouteProps> = ({ component: Component, ...rest}, index: number) => (
    <Route {...rest} key={index} render={
        (props: any) => <Suspense fallback={<div>Loading...</div>}><Component {...props} route={rest} /></Suspense>
    }
    />)

export {applyRoutes};
export default routes;
