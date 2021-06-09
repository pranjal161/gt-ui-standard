import React, { useRef } from 'react';

import PropTypes from 'prop-types';
import Tab from '../Tabs/Tab/Tab';
import TabButton from '../Tabs/TabButton/TabButton';
import Tabs from './Tabs';

import { findByTestAttr } from '../../test/testUtils';
import { mount } from 'enzyme';

let defaultTabs = ['tabId-1', 'tabId-2', 'tabId-3', 'tabId-4'];
let defaultSelectedTab = defaultTabs[0];
const defaultCloseTabsClick = (tabId) => {
    for(let i = 0; i < defaultTabs.length; i++) {
        if(tabId === defaultTabs[i]) {
            defaultTabs.splice(i, 1);
            break;
        }
    }

    if(defaultSelectedTab === tabId) {
        defaultSelectedTab = defaultTabs[0];
    }
};

const defaultProps = {
    activeTabId: defaultSelectedTab,
    avoidChildRerender: true,
    onTabClose: defaultCloseTabsClick
};

let tabIDObject = {
    'tabId-1': 'Tab Label 1',
    'tabId-2': 'Tab Label 2',
    'tabId-3': 'Tab Label 3',
    'tabId-4': 'Tab Label 4'
};

const SimpleComponent = ({text}) => {
    // used to count the number of times the component renders
    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;

    return (
        <div>
            <p>
                Render text: {text}
            </p>
            <p
                className="render-count">
                {renderCount.current}
            </p>
        </div>
    )
};

SimpleComponent.propTypes = {
    text: PropTypes.string
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };

    return mount(
        <Tabs {...setupProps} >
            {
                defaultTabs.map((tabId) => (
                    <Tab
                        key={tabId}
                        tabId={tabId}
                        title={tabIDObject[tabId]}
                        activated={defaultSelectedTab === tabId}>
                        <SimpleComponent text={tabId} />
                    </Tab>
                ))
            }
        </Tabs>)
}

describe('test 4 tabs component', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = setup();
    });

    afterAll(() => {
        wrapper.unmount();
    });

    test('render 4 tabs, change active tab from default', () => {
        const tabsButtons = wrapper.find(TabButton);
        const newTabIndex = 1;
        tabsButtons.at(newTabIndex).find('div > div').first().simulate('click');
        const tabsContentArray = findByTestAttr(wrapper, 'tab-content');
        tabsContentArray.forEach((tabDiv, index) => {
            if(index !== newTabIndex)
                expect(tabDiv.props().style).toHaveProperty('display', 'none');
            else
                expect(tabDiv.props().style).toHaveProperty('display', 'block');
        });
    });

    test('render 4 tabs, change active tabs, check component rerender', () => {
        const tabsButtons = wrapper.find(TabButton);
        const newTabIndex = 0;
        tabsButtons.at(newTabIndex).find('div').first().simulate('click');
        const tabsContentCmpArray = wrapper.find(SimpleComponent);
        tabsContentCmpArray.forEach((cmp) => {
            expect(cmp.find('p.render-count').text()).toBe('1');
        });
    });

    test('render 4 tabs, close first tab', () => {
        const tabsButtons = wrapper.find(TabButton);
        const firstTabIndex = 0;
        const firstTabCloseIcon = findByTestAttr(tabsButtons.at(firstTabIndex), 'tab-close-icon');
        firstTabCloseIcon.find('div').simulate('click');
        // component has to be unmounted and remounted, because it doesn't receive props, 
        // but its children are rendered with map. Standard wrapper.update() doesn't work here.
        wrapper.unmount();
        wrapper = setup({activeTabId: defaultSelectedTab});
        const tabsContentCmpArray = wrapper.find(SimpleComponent);
        expect(tabsContentCmpArray.length).toBe(3);
        // Since the first tab was selected and is now closed, 
        // the former second tab should be visible now as the first tab at index 0
        const tabsContentArray = findByTestAttr(wrapper, 'tab-content');
        tabsContentArray.forEach((tabDiv, index) => {
            if(index !== 0)
                expect(tabDiv.props().style).toHaveProperty('display', 'none');
            else
                expect(tabDiv.props().style).toHaveProperty('display', 'block');
        });
    });

    test('add new tab, check if is active', () => {
        defaultTabs.push('tabId-5');
        tabIDObject = {...tabIDObject, 'tabId-5': 'Tab Label 5'};
        wrapper.unmount();
        wrapper = setup({activeTabId: 'tabId-5'});
        const tabsContentArray = findByTestAttr(wrapper, 'tab-content');
        tabsContentArray.forEach((tabDiv, index) => {
            if(index !== tabsContentArray.length - 1)
                expect(tabDiv.props().style).toHaveProperty('display', 'none');
            else
                expect(tabDiv.props().style).toHaveProperty('display', 'block');
        });
    });

    test('add existing tab, check if is active', () => {
        let existingTabId = 'tabId-3'
        let indexExisting = defaultTabs.indexOf(existingTabId);
        wrapper.unmount();
        wrapper = setup({activeTabId: existingTabId});
        const tabsContentArray = findByTestAttr(wrapper, 'tab-content');
        tabsContentArray.forEach((tabDiv, index) => {
            if(index !== indexExisting)
                expect(tabDiv.props().style).toHaveProperty('display', 'none');
            else
                expect(tabDiv.props().style).toHaveProperty('display', 'block');
        });
    });
});