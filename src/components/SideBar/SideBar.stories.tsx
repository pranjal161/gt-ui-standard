import {Meta, Story} from '@storybook/react';
import SideBar, {SideBarProps} from 'components/SideBar/SideBar';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

export default {
    title: 'Components/SideBar',
    component: SideBar,
} as Meta;

const Template: Story<SideBarProps> = (args) => <SideBar {...args} />;

const useStyles = makeStyles(() => ({
    toolBar: {
        height: '100%',
        width: '74px',
        borderColor: 'green',
        borderStyle: 'dashed'
    },
    content: {
        height: '100%',
        width: '600px',
        borderColor: 'green',
        borderStyle: 'dashed'
    }
}));

const Toolbar = () => {
    const classes = useStyles()

    return (<div className={classes.toolBar}>nav</div>)
}

const Content = () => {
    const classes = useStyles()

    return (<div className={classes.content}>content</div>)
}

export const Default = Template.bind({});
Default.args = {
    toolbar:<Toolbar/>,
    content:<Content/>,
};

export const Expand = Template.bind({});
Expand.args = {
    toolbar:<Toolbar/>,
    content:<Content/>,
    open:true
};

export const Closed = Template.bind({});
Closed.args = {
    toolbar:<Toolbar/>,
    content:<Content/>,
    open:false
};
