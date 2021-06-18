/* eslint-disable no-unused-vars */

import { DxcButton, DxcCheckbox, DxcInput, DxcSelect } from '@dxc-technology/halstack-react';
import { FilterIcon, PencilIcon, SearchIcon } from 'assets/svg';

import Dialog from 'theme/components/material/Dialog/Dialog';
import React from 'react';
import Table from 'components/Table/Table';
import Typo from 'components/Typography/Typo';
import axios from 'axios';
import { globalTokens } from 'theme/standard/palette';
import { makeStyles } from '@material-ui/styles';
import {useTranslation} from 'react-i18next';

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
    const {t} = useTranslation(['person', 'common']);

    const [isVisible, setIsVisible] = React.useState(true);
    const [isFiltersVisible, setIsFiltersVisible] = React.useState(false);
    const [isChecked, setIsChecked] = React.useState(false);
    const [isSearching, setIsSearching] = React.useState<boolean>(false);
    const [filters, setFilters] = React.useState<any>({});

    const [selectedObj, setSelectedObj] = React.useState<any>({});

    const [personsUrl, setPersonsUrl] = React.useState('');

    const personsColumns = [
        { label: 'person:name', property: 'person:display_id1' },
        { label: 'person:client_number', property: 'person:client_number' },
        { label: 'person:country_code', property: 'person:reference_country_code' },
        { label: 'person:postal_code', property: 'person:postal_code' },
        { label: 'person:birth_date_alt', property: 'person:birth_date' }
    ];

    const inputHandleChange = (inputName: string, newValue?: any) => {
        if (inputName === 'person:client_number' || inputName === 'person:reference_country_code' || inputName ==='person:last_name') {
            newValue = newValue.toUpperCase();
        }
        if (inputName === 'person:first_name') {
            // newValue = capitalize(newValue);
        }

        if (newValue !== '') {
            setFilters({
                ...filters,
                [inputName]: newValue 
            });
        }

        else {
            delete filters[inputName];
            setFilters({
                ...filters
            });
        }
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
                strFilters += `${key}=*${filters[key]}*`;

                if (Object.keys(filters).indexOf(key) !== Object.keys(filters).length - 1) {
                    strFilters += '&';
                }
            });

            return strFilters;
        }
    }

    const createPersonsUrl = (filters: any) => {
        const fields = generateRequestFilters(filters);
        // const res = await axios.get('http://20.33.40.147:13111/csc/insurance/persons?person:client_number=PRSN0000708', header);
        
        setPersonsUrl(`http://20.33.40.147:13111/csc/insurance/persons${fields}`);
        
    }

    const testFindPersons = async (url: string) => {
        try {
            const res = await axios.get(url, header);
            console.log({res});
        }
        catch (err) {
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

    React.useEffect(() => {
        createPersonsUrl(filters);
    }, [filters])

    const DialogActions = () => (
        <>
            <DxcButton mode="text" label={t('common:cancel')} onClick={() => showDialog()} />
            <DxcButton mode="secondary" label={t('common:create')} onClick={() => testFindPersons(personsUrl)} />

            {
                isSearching ? 
                    <DxcButton mode="primary" label={t('common:modify')} /> 
                    : <DxcButton mode="primary" label={t('common:search')} onClick={() => onSearchingChange()} disabled={Object.keys(filters).length === 0} />
            }
        </>
    );
    
    const selectObj = (obj: any = {}) => {
        setSelectedObj({...obj});
        console.log({obj});
    }

    const DialogContent = () => (
        <div className={classes.root}>
            <Typo variant="title" value={t('common:search_party')} />
            <div className={classes.filters}>
                <div className={classes.filterColumn}>
                    <DxcInput placeholder="Ex: PRSN00000000" value={filters['person:client_number']} className={classes.input} label={t('person:client_number')} size="fillParent" onChange={(value: string) => inputHandleChange('person:client_number', value)} />
                    {/* <DxcInput value={filters['person:last_name']} className={classes.input} label={`${t('person:last_name')} / ${t('person:legal_name')}`} onChange={() => inputHandleChange('person:last_name')} /> */}
                    <DxcInput value={filters['person:last_name']} className={classes.input} label={`${t('person:last_name')} / ${t('person:legal_name')}`} onChange={(value: string) => inputHandleChange('person:last_name', value)} />
                </div>

                <div className={classes.filterColumn}>
                    <DxcInput placeholder="Ex: FR" value={filters['person:reference_country_code']} className={classes.input} label={t('person:country_code')} onChange={(value: string) => inputHandleChange('person:reference_country_code', value)} />
                    <DxcInput placeholder="Ex: Juliette" value={filters['person:first_name']} label={`${t('person:first_name')} / ${t('person:trade_name')}`} onChange={(value: string) => inputHandleChange('person:first_name', value)}/>
                </div>

                <div className={classes.filterColumn}>
                    {/* <DxcSelect className={classes.input} label="Type" onChange={inputHandleChange('type')} /> */}
                    <DxcButton mode="secondary" label={t('common:advanced_filters')} icon={<FilterIcon size={30} />} iconPosition="after" onClick={onFiltersVisibilityChange} />
                </div>
            </div>

            {
                isFiltersVisible &&
                    <>
                        <hr />
                        <div className={classes.advFiltersContainer}>
                            <Typo variant="title" value={t('common:advanced_filters')} />
                            <div className={classes.advFilters}>
                                <div className={classes.advFilterColumn}>
                                    <div className={classes.advFilterColumnRow}>
                                        <DxcSelect value={filters['identifier']} className={classes.input} label={t('common:identifier')} size="medium" onChange={(value: string) => inputHandleChange('identifier', value)} />
                                        <DxcInput value={filters['identifier_value']} className={classes.input} label={t('common:identifier_value')} suffixIcon={<SearchIcon size={30} /> } onChange={(value: string) => inputHandleChange('identifier_value', value)} />
                                    </div>
                                    <DxcInput value={filters['person:postal_code']} label={t('person:postal_code')} onChange={(value: string) => inputHandleChange('person:postal_code', value)} />
                                </div>
                                
                                <div className={classes.advFilterColumn}>
                                    <DxcInput value={filters['search_key']} className={classes.input} size="fillParent" label={t('common:search_key')} onChange={(value: string) => inputHandleChange('search_key', value)} />
                                    <DxcCheckbox checked={isChecked} label={t('common:phonetic')} labelPosition="after" onChange={onCheckboxChange} />
                                </div>
                            </div>
                        </div>
                    </>
            }
            
            {
                isSearching &&
                    <>
                        <div className={classes.table}>
                            <Table url={personsUrl} columnId={personsColumns} showPaginator={true} />
                        </div>
                    </>
            }
        </div>
    );

    return (
        <div className={classes.training}>
            <DxcButton label="Click me" onClick={onVisibilityChange} />

            <Dialog 
                icon={<PencilIcon size={35}/>}
                title={t('common:edit_payer')}
                content={<DialogContent />}
                open={isVisible}
                fullWidth={true}
                actions={<DialogActions />}
            />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    training: {
        padding: 30
    },
    
    root: {
        '& .MuiFormControl-root': {
            maxWidth: '191px',
        },
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

    filters: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
        
        '& [class*="filterColumn"] > div[type="button"]': {
            paddingBottom: 0,
            outline: 'none',
            '& span.MuiButton-label > span':{
                color: globalTokens.__grey_2
            }
        },

        '& .FwHvz': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 5,
            paddingTop: 1,
            '& > svg': {
                fill: globalTokens.__grey_2
            }
        }
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
    },

    advFilterColumn: {
        height: 140,
        minWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'space-between',

        '& > .bKZdgH': {
            marginBottom: 16
        },

        '& .cQqUvF': {
            '& > .MuiFormControl-root': {
                maxWidth: 'none'
            }
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
    },

    table: {
    },

    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 500
    }
}));

export default TrainingQuentin;
