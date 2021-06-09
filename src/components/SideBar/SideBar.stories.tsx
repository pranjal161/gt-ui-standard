import {Meta, Story} from '@storybook/react';
import SideBar, {SideBarProps} from 'components/SideBar/SideBar';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

export default {
    title: 'Components/SideBar',
    component: SideBar,
    decorators: [(story) => <div style={{flex: '1 1 auto', height: '600px'}}>{story()}</div>],
} as Meta;

const Template: Story<SideBarProps> = (args) => <SideBar {...args} />;

const useStyles = makeStyles(() => ({
    toolBar: {
        placeSelf:'stretch',
        height: '-webkit-fill-available',
        width: '74px',
        borderColor: 'green',
        borderStyle: 'dashed'
    },
    content: {
        placeSelf:'stretch',
        width: '600px',
        borderColor: 'green',
        borderStyle: 'dashed'
    },
    header: {
        placeSelf:'stretch',
        borderColor: 'green',
        borderStyle: 'dashed'
    }
}));

const Toolbar = () => {
    const classes = useStyles()

    return (<div className={classes.toolBar}>
        <div>Here the toolbar</div>
    </div>)
}

const Content = () => {
    const classes = useStyles()

    return (<div className={classes.content}>Here the content</div>)
}
const Header = () => {
    const classes = useStyles()

    return (<div className={classes.header}>Here the header</div>)
}

export const Default = Template.bind({});
Default.args = {
    toolbar:<Toolbar/>,
    content:<Content/>,
    header:<Header/>,
};

export const Expand = Template.bind({});
Expand.args = {
    toolbar:<Toolbar/>,
    content:<Content/>,
    header:<Header/>,
    open:true
};

export const Closed = Template.bind({});
Closed.args = {
    toolbar:<Toolbar/>,
    content:<Content/>,
    header:<Header/>,
    open:false
};

