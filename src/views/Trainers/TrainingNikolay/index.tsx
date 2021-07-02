import React from 'react';
import Tab from '../../../components/Tabs/Tab/Tab';
import Tabs from '../../../components/Tabs/Tabs';

const TrainingNikolay = React.memo(() => {
    console.log('Render Nikolay')

    return (
        <>
            <h1>Hello Nikolay</h1>
            <div>
                <Tabs
                    activeTabId="1A">
                    <Tab
                        tabId="1A"
                        activated={true}
                        title="Title 1 GGGGGGGgggggggQQQQQqqqqqqe TitlGGGGGGGgggggggQQQQQqqqqqqe 1"
                        subTitle="SubTitle 1 GGGGGGGgggggggQQQQQqqqqqqe TitlGGGGGGGgggggggQQQQQqqqqqqe 1"
                        icon="person">
                        <div>
                            Tab content 1
                        </div>
                    </Tab>
                    <Tab
                        tabId="2A"
                        activated={false}
                        title="Title 2 TitlGGGGGGGgggggggQQQQQqqqqqqe TitlGGGGGGGgggggggQQQQQqqqqqqe 2"
                        subTitle="SubTitle 2 GGGGGGGgggggggQQQQQqqqqqqe TitlGGGGGGGgggggggQQQQQqqqqqqe 1"
                        icon="ticket">
                        <div>
                            Tab content 2
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
})

TrainingNikolay.displayName = 'TrainingNikolay';
export default TrainingNikolay;