import {DxcButton, DxcCheckbox, DxcInput, DxcSelect} from '@dxc-technology/halstack-react';
import { FilterIcon, PencilIcon, SearchIcon } from 'assets/svg';

import { APIConfig } from 'configs/apiConfig';
import Dialog from 'theme/components/material/Dialog/Dialog';
import React from 'react';
import Table from 'components/Table/Table';
import Typo from 'components/Typography/Typo';
import axios from 'utils/axios';
import { capitalizeFirstLetterAndRemove_ } from 'utils/functions';
import { globalTokens } from 'theme/standard/palette';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { personsColumns } from './personColumns';
import { useTranslation } from 'react-i18next';

interface EditPayerProps {
    isVisible: boolean,
    setIsVisible?: Function,
    onChange: Function
}

interface DialogActionsProps {
    filters: any,
    isSearching: boolean,
    onCancel: Function,
    onModify: Function,
    onSearch: Function,
    onCreate: Function
}

interface DialogContentProps {
    filters: any,
    classes: any,
    onChange: Function,
    isVisible: boolean,
    url: string
}

const DialogActions = ({filters = {}, isSearching, onCancel, onModify, onSearch, onCreate}: DialogActionsProps) => {
    const {t} = useTranslation();

    return (
        <>
            <DxcButton mode="text" label={t('common:cancel')} onClick={() => onCancel()} />
            <DxcButton mode="secondary" label={t('common:create')} onClick={() => onCreate()} />

            {
                isSearching ? 
                    <DxcButton mode="primary" label={t('common:modify')} onClick={() => onModify()} /> 
                    : <DxcButton mode="primary" label={t('common:search')} onClick={() => onSearch()} disabled={Object.keys(filters).length === 0} />
            }
        </>
    )
};

const DialogContent = ({classes, onChange, isVisible, url}: DialogContentProps) => {
    const {t} = useTranslation();
    const [isFiltersVisible, setIsFiltersVisible] = React.useState(false);
    const [filters, setFilters] = React.useState<any>({});
    const [isChecked, setIsChecked] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState<any>({});
    
    React.useEffect(() => {
        onChange({filters, selectedRow});
    }, [filters, selectedRow])

    const onCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const inputHandleChange = (inputName: string, newValue?: any) => {
        if (inputName === 'person:client_number' || inputName ==='person:last_name') {
            newValue = newValue.toUpperCase();
        }

        if (inputName === 'person:first_name') {
            newValue = capitalizeFirstLetterAndRemove_(newValue);
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

    const selectRow = (val: any) => {
        console.log({val});
        setSelectedRow({val});
    }

    const onFiltersVisibilityChange = () => {
        setIsFiltersVisible(!isFiltersVisible);
    }

    return (
        <div className={classes.root}>
            {/* <Typo variant="title" value={t('common:search_party')} /> */}
            <div className={classes.filters}>
                <div className={classes.filterColumn}>
                    <DxcInput placeholder="Ex: PRSN00000000" value={filters['person:client_number']} className={classes.input} label={t('person:client_number')} size="fillParent" onChange={(value: string) => inputHandleChange('person:client_number', value)} />
                    {/* <DxcInput value={filters['person:last_name']} className={classes.input} label={`${t('person:last_name')} / ${t('person:legal_name')}`} onChange={() => inputHandleChange('person:last_name')} /> */}
                    <DxcInput placeholder="Ex: DUPONT" value={filters['person:last_name']} className={classes.input} label={`${t('person:last_name')} / ${t('person:legal_name')}`} onChange={(value: string) => inputHandleChange('person:last_name', value)} />
                </div>

                <div className={classes.filterColumn}>
                    <DxcInput placeholder="Ex: FR" value={filters['person:reference_country_code']} className={classes.input} label={t('person:country_code')} onChange={(value: string) => inputHandleChange('person:reference_country_code', value)} />
                    <DxcInput placeholder="Ex: Juliette" value={filters['person:first_name']} label={`${t('person:first_name')} / ${t('person:trade_name')}`} onChange={(value: string) => inputHandleChange('person:first_name', value)}/>
                </div>

                <div className={classes.filterColumn}>
                    {/* <DxcSelect className={classes.input} label="Type" onChange={inputHandleChange('type')} /> */}
                    <DxcInput placeholder="Ex: 78000" value={filters['person:postal_code']} label={t('person:postal_code')} onChange={(value: string) => inputHandleChange('person:postal_code', value)} />
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
                                    <DxcCheckbox checked={isChecked} label={t('common:phonetic')} labelPosition="after" onChange={onCheckboxChange} />
                                </div>
                                
                                <div className={classes.advFilterColumn}>
                                    <DxcInput value={filters['search_key']} className={classes.input} size="fillParent" label={t('common:search_key')} onChange={(value: string) => inputHandleChange('search_key', value)} />
                                </div>
                            </div>
                        </div>
                    </>
            }
            
            {
                isVisible &&
                    <>
                        <div className={classes.table}>
                            <Table url={url} columnId={personsColumns} showPaginator={true} itemsByPage={5} onChange={(person: any) => selectRow(person)} />
                        </div>
                    </>
            }
        </div>
    )
};

const EditPayer = ({isVisible = false, setIsVisible = () => undefined, onChange }: EditPayerProps) => {
    
    const classes = useStyles();
    const {t} = useTranslation(['person', 'common']);

    const [filters, setFilters] = React.useState<any>({});
    const [personsUrl, setPersonsUrl] = React.useState('');
    const [isSearching, setIsSearching] = React.useState<boolean>(false);

    const onSearchingChange = () => {
        setIsSearching(!isSearching);
    }

    const testFindPersons = async (url: string) => {
        try {
            const res = await axios.get(url, {headers: APIConfig.defaultHeader});
            console.log({res});
        }
        catch (err) {
            console.log({err});
        }
    }

    React.useEffect(() => {
        console.log({filters})
        createPersonsUrl(filters);
        console.log({personsUrl});
    }, [filters]);

    const generateRequestFilters = (filters: any) => {
        if (Object.keys(filters).length === 0) {
            return
        }
        else {
            let strFilters = '?';

            Object.keys(filters).forEach((key: string) => {

                if (key === 'person:reference_country_code') {
                    strFilters += `${key}=${filters[key]}`;
                }
                else {
                    strFilters += `${key}=*${filters[key]}*`;
                }

                if (Object.keys(filters).indexOf(key) !== Object.keys(filters).length - 1) {
                    strFilters += '&';
                }
            });

            return strFilters;
        }
    }

    const createPersonsUrl = (filters: any) => {
        const fields = generateRequestFilters(filters);        
        setPersonsUrl(`http://20.33.40.147:13111/csc/insurance/persons${fields}`);
        
    }

    const manageData = (obj: any = {}) => {
        console.log({obj});
        setFilters({...obj?.filters})
        onChange({...obj?.selectedRow});
    }

    return (
        <>
            <Dialog 
                icon={<PencilIcon size={35}/>}
                title={t('common:edit_payer')}
                content={<DialogContent url={personsUrl} isVisible={isSearching} onChange={manageData} filters={filters} classes={classes} />}
                open={isVisible}
                fullWidth={true}
                actions={<DialogActions filters={filters} isSearching={isSearching} onSearch={onSearchingChange} onModify={(obj: any) => onChange(obj)} onCancel={() => setIsVisible(false)} onCreate={() => testFindPersons(personsUrl)} />}
            />
        </>
    )
}

const useStyles = makeStyles({    
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
        '& > .ewkDoX th': {
            backgroundColor: `${globalTokens.__grey_5} !important`
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

export default EditPayer;