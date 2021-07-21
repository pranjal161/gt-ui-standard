/* eslint-disable */
import {ActivityProps} from 'components/Activity/Activity';
import WithActivity from 'components/WithActivity';
import useActivity from 'hooks/useActivity';
import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import configStore from 'store/configStore';

const WrapActivity = ({children}: any) => {
    const activityProps: ActivityProps = {
        hRef: 'http://mock/activity/storybook',
        entityType: 'storybook',
        mainEntityHRef: 'http://mock/activity/storybook',
        activityCode: 'storybook',
        title: 'storybook'
    }
    const StartEndActivity = ({children}: any) => {
        const {startActivity, stopActivity} = useActivity()
        useEffect(() => {
            startActivity();

            return () => {
                stopActivity()
            }
        })

        return <>{children}</>
    }

    return <WithActivity {...activityProps}><StartEndActivity>{children}</StartEndActivity> </WithActivity>
}

const { store } = configStore()

const ProviderRedux = ({children, store}: any) => (
    <Provider store={store}>
        {children}
    </Provider>
);

export const WithReduxActivity = ({children}: any) => (
    <ProviderRedux store={store}>
        <WrapActivity>
            {children}
        </WrapActivity>
    </ProviderRedux>
)

