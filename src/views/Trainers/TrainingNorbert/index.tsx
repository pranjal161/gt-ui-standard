/* eslint-disable */

import {Theme, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import ExampleOfSideBar from 'stories/ExampleOfSideBar/ExampleOfSideBar';
import FormDialog from 'views/Trainers/TrainingNorbert/FormDialog/FormDialog';
import Tabs from '../../../theme/components/material/Tabs/Tabs'
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Theming from 'views/Trainers/TrainingNorbert/Theming/Theming';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}


function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    sidebar: {
        display: 'flex',
        justifyContent: 'flex-end',
        flex: '1 1 auto',
        height:'600px',
    }
}));

const TrainingNorbert = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Theming" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Theming/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FormDialog/>
                Item Two
            </TabPanel>
            <div className={classes.sidebar}>
                <TabPanel value={value} index={2}>
                    <ExampleOfSideBar />
                </TabPanel>
            </div>
        </div>
    );
}

export default TrainingNorbert;
