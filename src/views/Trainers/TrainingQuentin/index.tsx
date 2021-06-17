import { DxcButton, DxcInput, DxcSelect } from '@dxc-technology/halstack-react';
import { FilterIcon, PencilIcon } from 'assets/svg';

import Checkbox from './Checkbox/Checkbox';
import Dialog from 'theme/components/material/Dialog/Dialog';
import React from 'react';
import Typo from 'components/Typography/Typo';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

// import Button from 'theme/components/material/Button/Button';

// OnClick on button "Modify" it should patch the new person as payer / return
// Patch while the component is called
// Use Dialog component by Norbert

const header = {
    headers: {
        'x-api-key': '48SmqcLpec3t1TO8EMzaDaamMz25pDZ469NFux41',
        'x-auth-username': 'kkdrensk',
        'Accept': 'application/vnd.hal+json',
        'Accept-Language': 'fr'
    }
}

const TrainingQuentin = () => {

    const classes = useStyles();

    const [isVisible, setIsVisible] = React.useState(true);
    const [isFiltersVisible, setIsFiltersVisible] = React.useState(true);
    const [isChecked, setIsChecked] = React.useState(false);
    const [searchValues] = React.useState([]);

    const onFiltersVisibilityChange = () => {
        setIsFiltersVisible(!isFiltersVisible);
    }

    const onVisibilityChange = () => {
        setIsVisible(!isVisible);
    }

    const onCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const getPersons = async () => {
        try {
            const res = await axios.get('http://20.33.40.147:13111/csc/insurance/persons?person:client_number=PRSN0000708', header);
            console.log({res});
        }
        
        catch(err) {
            console.log({err});
        }
    }

    const DialogActions = () => (
        <>
            <DxcButton mode="text" label="Cancel" onClick={() => setIsVisible(false)} />
            <DxcButton mode="secondary" label="Create" />

            {
                searchValues.length > 0 ? 
                    <DxcButton mode="primary" label="Modify" /> 
                    : <DxcButton mode="primary" label="Search" onClick={() => getPersons()} />
            }

            {/* <Button mode="text" title="Cancel" onClick={() => setIsVisible(false)} />
            <Button mode="secondary" title="Create" />

            {
                searchValues.length > 0 ? <Button mode="primary" title="Modify" /> : <Button mode="primary" title="Search" />
            } */}
        </>
    );

    const DialogContent = () => (
        <>
            <Typo variant="title" value="Search party" />
            <div className={classes.filters}>
                <div className={classes.filterColumn}>
                    <DxcInput label="Client number" size="fillParent" />
                    <DxcInput label="Last Name / Legal Name" />
                </div>

                <div className={classes.filterColumn}>
                    <DxcSelect label="Country" />
                    <DxcInput label="First Name / Trade Name"/>
                </div>

                <div className={classes.filterColumn}>
                    <DxcSelect label="Type" />
                    <DxcButton mode="secondary" label="Advanced Filters" icon={<FilterIcon size={30} />} iconPosition="after" onClick={onFiltersVisibilityChange} />
                </div>
            </div>

            {
                isFiltersVisible &&
                    <>
                        <hr />
                        <div className={classes.advFiltersContainer}>
                            <Typo variant="title" value="Advanced filters" />
                            <div className={classes.advFilters}>
                                <div className={classes.advFilterColumn}>
                                    <div className={classes.advFilterColumnRow}>
                                        <DxcSelect label="Identifier" size="medium" />
                                        <DxcInput label="Identifier value"/>
                                    </div>
                                    <DxcInput label="Postcode" />
                                </div>
                                
                                <div className={classes.advFilterColumn}>
                                    <DxcInput label="Search key" size="large" />
                                    <Checkbox checked={isChecked} label="Phonetic" labelPosition="after" onChange={onCheckboxChange} />
                                </div>
                            </div>
                        </div>

                        {
                            searchValues.length > 0 &&
                                <>
                                </>
                        }
                    </>
            }
        </>
    );

    const Icon = () => (
        <div className={classes.icon}>
            <PencilIcon size={30}/>
        </div>
    );

    return (
        <>
            <DxcButton label="Click me" onClick={onVisibilityChange} />

            <Dialog 
                icon={<Icon />}
                title="Edit payer"
                content={<DialogContent />}
                open={isVisible}
                fullWidth={true}
                actions={<DialogActions />}
            />
        </>
    );
}

const useStyles = makeStyles({
    root: {
        padding: 20,

        display: 'flex',
        flexDirection: 'column',
    },

    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },

    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20
    },

    icon: {
        '& > *': {
            fill: '#102A43'
        }
    },

    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    filters: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 10
    },
    
    filterColumn: {
        minHeight: 125,
        minWidth: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'space-between'
    },

    advFiltersContainer: {
        marginTop: 40
    },

    advFilters: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
    },

    advFilterColumn: {
        height: 140,
        minWidth: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'space-between',
        
        '& > .hYARPo > .MuiIconButton-label > svg, .bypHNL': {
            fill: 'black !important'
        }
        
    },

    advFilterColumnRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        '& > .bGwLMU': {
            width: 100
        }
    },

    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 500
    }
});

export default TrainingQuentin;
