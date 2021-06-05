import {makeStyles} from '@material-ui/core/styles';
import SideBar, {SideBarProps} from 'components/SideBar/SideBar';
import {Meta, Story} from '@storybook/react';
import React from 'react';

export default {
    title: 'Components/Activity/SideBar',
    component: SideBar,
} as Meta;

const Template: Story<SideBarProps> = (args) => <SideBar {...args} />;

const useStyles = makeStyles((theme) => ({
    toolBar: {
        height: '100%',
        width: '100%',
        borderColor: 'green',
        borderStyle: 'dashed'
    },
    content: {
        height: '100%',
        width: '540px',
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

export const Skeleton = Template.bind({});
Skeleton.args = {
    toolbar:<Toolbar/>,
    content:<Content/>,
    open:true,
};

export const Default = Template.bind({});
Default.args = {
    toolbar:<div>toolbar</div>,
    content:<Content/>,
    open:false
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
