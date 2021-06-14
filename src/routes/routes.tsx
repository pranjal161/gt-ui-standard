/* eslint-disable react/display-name */

import React, { lazy } from 'react';

import AppLayout from 'layouts/AppLayout/AppLayout';
import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import ContractSearch from 'views/ContractSearch/ContractSearch';
import ErrorLayout from 'layouts/ErrorLayout/ErrorLayout';
import Home from 'views/Home/Home';
import { Redirect } from 'react-router-dom';
import Trainers from 'views/Trainers';

/**
 * An empty component that returns null.
 * It is used in routes array to render an empty component for route /viewTab.
 * If there is no component on this route, the route will simply redirect to the /errors/error-404 route.
 * This is done to override this behavior in this case without affecting other cases. 
 * The AppLayout component has a component that uses react-router-dom's useRouteMatch hook to 
 * show/hide content with div display: block or hidden, if the route is /viewTab.
 * This is done to avoid component rerender in the case of route change.
 * @returns {void}
 */

const NullCmp = () => (
    null
)

const routes: any = [
    {
        path: '/',
        name: 'default',
        exact: true,
        component: () => <Redirect to={'/home'} />
    },
    {
        path: '/auth',
        name: 'auth',
        exact: false,
        component: AuthLayout,
        routes: [
            {
                path: '/auth/signin',
                name: 'signIn',
                exact: true,
                component: lazy(() => import( 'views/SignIn/SignIn'))
            },
            {
                path: '/auth/signup',
                name: 'signUp',
                exact: true,
                component: lazy(() => import( 'views/SignUp/SignUp'))
            },
            {
                component: () => <Redirect to="/errors/error-404"/>
            }
        ]
    },
    {
        path: '/errors',
        component: ErrorLayout,
        routes: [
            {
                path: '/errors/error-404',
                exact: true,
                component: lazy(() => import('views/Errors/Error404/Error404'))
            },
            {
                component: () => <Redirect to="/errors/error-404"/>
            }
        ]
    },
    {
        route: '*',
        component: AppLayout,
        routes: [
            {
                path: '/home',
                name: 'home',
                exact: true,
                component: Home
            },
            {
                path: '/ContractSearch',
                name: 'ContractSearch',
                exact: true,
                component: ContractSearch
            },
            {
                path: '/viewTab',
                name: 'viewTab',
                exact: true,
                component: NullCmp
            },
            {
                path: '/training',
                name: 'Training',
                component: Trainers.Training,
                routes: [
                    {
                        path: '/training/akruti',
                        name: 'trainingAkruti',
                        exact: true,
                        component: Trainers.TrainingAkruti
                    },
                    {
                        path: '/training/jeenal',
                        name: 'trainingJeenal',
                        exact: true,
                        component: Trainers.TrainingJeenal
                    },
                    {
                        path: '/training/nikolay',
                        name: 'trainingNikolay',
                        exact: true,
                        component: Trainers.TrainingNikolay
                    },
                    {
                        path: '/training/norbert',
                        name: 'trainingNorbert',
                        exact: true,
                        component: Trainers.TrainingNorbert
                    },
                    {
                        path: '/training/pranjal',
                        name: 'trainingPranjal',
                        exact: true,
                        component: Trainers.TrainingPranjal
                    },
                    {
                        path: '/training/shivani',
                        name: 'trainingShivani',
                        exact: true,
                        component: Trainers.TrainingShivani
                    },
                    {
                        path: '/training/suhani',
                        name: 'trainingSuhani',
                        exact: true,
                        component: Trainers.TrainingSuhani
                    }
                ]
            },
            {
                component: () => <Redirect to="/errors/error-404"/>
            }
        ]
    }
];

export default routes;
