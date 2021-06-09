import {BusinessIcon, CloseIcon, ContactIcon, ContractIcon, TicketIcon} from 'assets/svg';
import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
    button: {
        borderBottom: 'unset',
        boxSizing: 'border-box',
        height: '48px',
        maxWidth: '350px',
        minWidth: '280px',
        marginLeft: '4px',
        marginRight: '4px',
        padding: '9px 14px 9px 6px',
        backgroundColor: theme.palette.project.tabs.button.background,
        borderColor: theme.palette.project.tabs.button.border,
        color: theme.palette.project.tabs.button.color,
        borderStyle: 'solid',
        borderWidth: '2px 2px 0px 2px',
        borderRadius: '2px 2px 0px 0px',
        '& > div': {
            display: 'flex',
            alignItems: 'center'
        }
    },
    buttonActivated: {
        backgroundColor: theme.palette.project.tabs.activated.background,
        borderColor: theme.palette.project.tabs.activated.border,
        color: theme.palette.project.tabs.activated.color,
        borderRadius: '4px 4px 0px 0px'
    },
    titlesContainer: {
        paddingLeft: '10px',
        flexGrow: 1,
        lineHeight: '0.7',
        textAlign: 'left',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        height: '28px'
    },
    mainTitle: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        height: '15px',
        '& > span': {
            fontFamily: theme.typography.fontFamily,
            fontSize: '11px'
        },
        fontWeight: 'bold'
    },
    noSubTitle: {
        marginTop: '7px',
        '& > span': {
            fontSize: '13px'
        }

    },
    subTitle: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        height: '13px',

        '& > span': {
            fontFamily: theme.typography.fontFamily,
            fontSize: '9px'
        }
    },
    buttonIcon: {
        width: '20px',
        height: '24px',
    },
    buttonCloseIcon: {
        '& > svg': {
            color: theme.palette.project.tabs.closeIcon,
        }
    }
}))

const TabButton: React.FC<TabButtonProps> = (props: TabButtonProps) => {
    const classes = useStyles()
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
            <div className={clsx(classes.button, {[classes.buttonActivated]: activated})}
                onClick={handleTabClick}>
                <div>
                    {
                        icon &&
                        <div className={classes.buttonIcon}>
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

                        </div>
                    }
                    <div className={classes.titlesContainer}>
                        {
                            subTitle &&
                            <div className={classes.subTitle}>
                                <span>{subTitle}</span>
                            </div>
                        }
                        <div className={clsx(classes.mainTitle, {[classes.noSubTitle]: !props.subTitle})}>
                            <span>{title}</span>
                        </div>
                    </div>
                    {
                        onTabClose &&
                        <div className={classes.buttonCloseIcon}
                            onClick={handleTabClose}>
                            <CloseIcon/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TabButton;
