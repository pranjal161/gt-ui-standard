import { DxcButton, DxcCheckbox, DxcInput, DxcSelect } from '@dxc-technology/halstack-react';
import { FilterIcon, PencilIcon, SearchIcon } from 'assets/svg';

import Dialog from 'theme/components/material/Dialog/Dialog';
import React from 'react';
import Table from 'components/Table/Table';
import Typo from 'components/Typography/Typo';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

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
    const [isFiltersVisible, setIsFiltersVisible] = React.useState(false);
    const [isChecked, setIsChecked] = React.useState(false);
    const [isSearching, setIsSearching] = React.useState<boolean>(false);
    const [filters, setFilters] = React.useState({});

    const [clientNum, setClientNum] = React.useState('');
    const [countryCode, setCountryCode] = React.useState('');
    // const [type, setType] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [identifier, setIdentifier] = React.useState('');
    const [identifierValue, setIdentifierValue] = React.useState('');
    const [postCode, setPostCode] = React.useState('');
    const [searchKey, setSearchKey] = React.useState('');

    const inputHandleChange = (setValue: Function) => (inputName: string) => (newValue: string) => {
        setValue(newValue);
        setFilters({
            ...filters,
            [inputName]: newValue 
        });
    }

    const onFiltersVisibilityChange = () => {
        setIsFiltersVisible(!isFiltersVisible);
    }

    const onVisibilityChange = () => {
        setIsVisible(!isVisible);
    }

    const onSearchingChange = () => {
        setIsSearching(!isSearching);
    }

    const onCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const generateRequestFilters = (filters: any) => {
        if (Object.keys(filters).length === 0) {
            return
        }
        else {
            let strFilters = '?';

            Object.keys(filters).forEach((key: string) => {
                strFilters += `${key}=${filters[key]}*`;

                if (Object.keys(filters).indexOf(key) !== Object.keys(filters).length) {
                    strFilters += '&';
                }
            });

            return strFilters;
        }
    }

    const getPersons = async (filters: any) => {
        try {
            onSearchingChange();
            const fields = generateRequestFilters(filters);
            // const res = await axios.get('http://20.33.40.147:13111/csc/insurance/persons?person:client_number=PRSN0000708', header);
            const res = await axios.get(`http://20.33.40.147:13111/csc/insurance/persons${fields}`, header);
            console.log({res});
        }
        
        catch(err) {
            console.log({err});
        }
    }
    
    const patchContract = async (contract: string) => {
        try {
            const res = await axios.put(`http://20.33.40.147:13111/csc/insurance/contracts/${contract}/party_roles/`, {} , header)
            console.log({res});
        }
        catch (err) {
            console.log({err});
        }
    }

    const showDialog = async () => {
        await patchContract('ID-W4Fb6FApI');
        setIsVisible(false);
    }

    const DialogActions = () => (
        <>
            <DxcButton mode="text" label="Cancel" onClick={() => showDialog()} />
            <DxcButton mode="secondary" label="Create" />

            {
                isSearching ? 
                    <DxcButton mode="primary" label="Modify" /> 
                    : <DxcButton mode="primary" label="Search" onClick={() => getPersons(filters)} />
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
                    <DxcInput value={clientNum} className={classes.input} label="Client number" size="fillParent" onChange={inputHandleChange(setClientNum)('person:client_number')} />
                    <DxcInput value={lastName} className={classes.input} label="Last Name / Legal Name" onChange={inputHandleChange(setLastName)('person:last_name')} />
                </div>

                <div className={classes.filterColumn}>
                    <DxcInput value={countryCode} className={classes.input} label="Country code" onChange={inputHandleChange(setCountryCode)('person:reference_country_code')} />
                    <DxcInput value={firstName} label="First Name / Trade Name" onChange={inputHandleChange(setFirstName)('person:first_name')}/>
                </div>

                <div className={classes.filterColumn}>
                    {/* <DxcSelect className={classes.input} label="Type" onChange={inputHandleChange('type')} /> */}
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
                                        <DxcSelect value={identifier} className={classes.input} label="Identifier" size="medium" onChange={setIdentifier} />
                                        <DxcInput value={identifierValue} className={classes.input} label="Identifier value" suffixIcon={<SearchIcon size={30} /> } onChange={inputHandleChange(setIdentifierValue)('identifier_value')} />
                                    </div>
                                    <DxcInput value={postCode} label="Postcode" onChange={inputHandleChange(setPostCode)('person:postal_code')} />
                                </div>
                                
                                <div className={classes.advFilterColumn}>
                                    <DxcInput value={searchKey} className={classes.input} label="Search key" size="large" onChange={inputHandleChange(setSearchKey)('searchKey')} />
                                    <DxcCheckbox checked={isChecked} label="Phonetic" labelPosition="after" onChange={onCheckboxChange} />
                                </div>
                            </div>
                        </div>

                        {
                            isSearching &&
                                <>
                                    <Table url="#" columnId={[]} showPaginator={true} />
                                </>
                        }
                    </>
            }
        </>
    );

    return (
        <>
            <DxcButton label="Click me" onClick={onVisibilityChange} />

            <Dialog 
                icon={<PencilIcon size={30}/>}
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

    input: {
        maxWidth: '191px'
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
        marginBottom: 30,
        marginTop: 10,
        
        '&:nth-last-child()': {
            paddingBottom: 0,
        },
    },
    
    filterColumn: {
        minHeight: 125,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'space-between',
        paddingBottom: 5,
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
        marginTop: 10,
        '& > .cQqUvF': {
            width: 491
        }
    },

    advFilterColumn: {
        height: 140,
        minWidth: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'space-between',

        '& > .bKZdgH': {
            marginBottom: 16
        }
    },

    advFilterColumnRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        '& > .bGwLMU': {
            marginRight: 10,
            width: 191
        },

        '& > .bKZdgH': {
            paddingTop: 1
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
