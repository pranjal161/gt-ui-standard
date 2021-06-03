import {BusinessIcon, CloseIcon, ContactIcon, ContractIcon, TicketIcon} from '../../../assets/svg';
import React from 'react';
import styled from 'styled-components';
import {Typography} from '@material-ui/core';

export interface TabButtonProps {

    /**
     * The props of the TabButton component.
     * @param {boolean} activated - Is the tab active or not.
     * @param {string} title - The main title that the tab should display.
     * @param {string} tabId - The unique Id of the TabButton in the Tabs component.
     * @param {string} [subTitle = null] - The smaller title displayed above the main title.
     * @param {string} [icon = null] - The icon to be displayed to the left of the main title.
     * @param {Function} [onClose = null] - The function that handles the event on closing a tab. Displays the close icon if set
     * @param {Function} [onClose = null] - The function that handles the event on selecting a tab.
     * Should set the activated props to true. This is handled in parent component.
     */
    activated: boolean,
    title: string,
    tabId: string,
    subTitle?: string,
    icon?: string,
    onTabClose?: Function,
    onTabClick?: Function
}

interface TabButtonContainerProps {
    isActive: boolean
}

const TabButtonComponent = styled.div`
  border-bottom: unset;
  box-sizing: border-box;
  height: 48px;
  max-width: 300px;
  padding: 9px 14px 9px 6px;
  background-color: ${(props: TabButtonContainerProps) => (props.isActive ? '#F5F7FA' : '#FAFBFC')};
  color: ${(props: TabButtonContainerProps) => (props.isActive ? '#102A43' : '#627D98')};
  border-style: solid;
  border-width: 2px 2px 0px 2px;
  border-color: ${(props) => (props.isActive ? '#BCCCDC' : '#FAFBFC ')};;
  border-radius: ${(props: TabButtonContainerProps) => (props.isActive ? '4px 4px 0px 0px' : '2px 2px 0px 0px')};

  & > div {
    display: flex;
    align-items: center;
  }
`;

const TabButtonIcon = styled.div`
  width: 20px;
  height 24px;
`;

const TabTitlesContainer = styled.div`
  padding-left: 10px;
  flex-grow: 1;
  line-height: 0.6;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 28px;
`;

const TabMainTitleContainer = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 15px;

  ${(props: { isSubTitleMissing: boolean }) => (props.isSubTitleMissing ? 'padding-top: 7px;' : '')}
  & > span {
    font-size: ${(props) => (props.isSubTitleMissing ? '13px' : '11px')};
    font-weight: bold;
  }
`;

const TabMainSubTitleContainer = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 13px;
`;

const TabButtonCloseIcon = styled.div`
  & > svg {
    color: #102A43;
  }
`;

const TabButton: React.FC<TabButtonProps> = (props: TabButtonProps) => {
    const {
        activated,
        tabId,
        title,
        subTitle = null,
        icon = null,
        onTabClose = null,
        onTabClick = null
    } = props;

    const handleTabClick = (e: React.ChangeEvent<any>) => {
        e.stopPropagation();
        if (onTabClick)
            onTabClick(tabId);
    }

    const handleTabClose = (e: React.ChangeEvent<any>) => {
        e.stopPropagation();
        if (onTabClose)
            onTabClose(tabId);
    }

    return (
        <div>
            <TabButtonComponent
                isActive={activated}
                onClick={handleTabClick}>
                <div>
                    {
                        icon &&
                        <TabButtonIcon>
                            {
                                icon === 'ticket' ?
                                    <TicketIcon/> :
                                    icon === 'contract' ?
                                        <ContractIcon/> :
                                        icon === 'person' ?
                                            <ContactIcon/> :
                                            icon === 'company' ?
                                                <BusinessIcon/> :
                                                <TicketIcon/>
                            }

                        </TabButtonIcon>
                    }
                    <TabTitlesContainer>
                        {
                            subTitle &&
                            <TabMainSubTitleContainer>
                                <Typography variant={'display1'}>
                                    {subTitle}
                                </Typography>
                            </TabMainSubTitleContainer>
                        }
                        <TabMainTitleContainer
                            isSubTitleMissing={subTitle === null}>
                            <span>
                                {title}
                            </span>
                        </TabMainTitleContainer>
                    </TabTitlesContainer>
                    {
                        onTabClose &&
                        <TabButtonCloseIcon
                            onClick={handleTabClose}>
                            <CloseIcon/>
                        </TabButtonCloseIcon>
                    }
                </div>
            </TabButtonComponent>
        </div>
    )
}

export default TabButton;
