import { DxcButton, DxcCheckbox, DxcInput, DxcSelect } from '@dxc-technology/halstack-react';
import { FilterIcon, SearchIcon } from 'assets/svg';

import React from 'react';
import Table from 'components/Table/Table';
import Typo from 'components/Typography/Typo';
import capitalize from '@material-ui/core/utils/capitalize';
import { globalTokens } from 'theme/standard/palette';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { personsColumns } from '../../personColumns';
import { useTranslation } from 'react-i18next';

interface EditPayerContentProps {

    /**
     * Function called when a filter and/or a row is selected.
     */
    onChange: Function,

    /**
     * Boolean value to define if the search has started.
     */
    isSearching: boolean,

    /**
     * The url where data will be get when there is a filter.
     */
    url: string
}

const EditPayerContent = ({onChange, isSearching, url}: EditPayerContentProps) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const [isFiltersVisible, setIsFiltersVisible] = React.useState(false);
    const [filters, setFilters] = React.useState<any>({});
    const [isChecked, setIsChecked] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState<any>({});

    React.useEffect(() => {
        console.log({filters});
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
            newValue = capitalize(newValue);
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
        setSelectedRow(val)
    }

    const onFiltersVisibilityChange = () => {
        setIsFiltersVisible(!isFiltersVisible);
    }

    return (
        <div className={classes.root}>
            <Typo variant="title" value={t('common:search_party')} />
            <div className={classes.filters}>
                <div className={classes.filterColumn}>
                    <DxcInput placeholder="Ex: PRSN00000000" value={filters['person:client_number'] ? filters['person:client_number'] : '' } className={classes.input} label={t('person:client_number')} size="fillParent" onChange={(value: string) => inputHandleChange('person:client_number', value)} />
                    <DxcInput placeholder="Ex: DUPONT" value={filters['person:last_name'] ? filters['person:last_name'] : ''} className={classes.input} label={`${t('person:last_name')} / ${t('person:legal_name')}`} onChange={(value: string) => inputHandleChange('person:last_name', value)} />
                </div>

                <div className={classes.filterColumn}>
                    <DxcInput placeholder="Ex: FR" value={filters['person:reference_country_code'] ? filters['person:reference_country_code'] : ''} className={classes.input} label={t('person:country_code')} onChange={(value: string) => inputHandleChange('person:reference_country_code', value)} />
                    <DxcInput placeholder="Ex: Juliette" value={filters['person:first_name'] ? filters['person:first_name'] : ''} label={`${t('person:first_name')} / ${t('person:trade_name')}`} onChange={(value: string) => inputHandleChange('person:first_name', value)}/>
                </div>

                <div className={classes.filterColumn}>
                    <DxcInput placeholder="Ex: 78000" value={filters['person:postal_code'] ? filters['person:postal_code'] : ''} label={t('person:postal_code')} onChange={(value: string) => inputHandleChange('person:postal_code', value)} />
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
                                </div>
                                
                                <div className={classes.advFilterColumn}>
                                    <DxcInput value={filters['search_key']} className={classes.input} size="large" label={t('common:search_key')} onChange={(value: string) => inputHandleChange('search_key', value)} />
                                    <DxcCheckbox checked={isChecked} label={t('common:phonetic')} labelPosition="after" onChange={onCheckboxChange} />
                                </div>
                            </div>
                        </div>
                    </>
            }
            
            {
                isSearching &&
                    <>
                        <Table url={url}    
                            columnId={personsColumns}  
                            showPaginator={true}
                            itemsByPage={5}
                            onRowSelected={(row: any) => selectRow(row)}/>
                    </>
            }
        </div>
    )
};

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
        justifyContent: 'flex-start',
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
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 500
    }
});

export default EditPayerContent;