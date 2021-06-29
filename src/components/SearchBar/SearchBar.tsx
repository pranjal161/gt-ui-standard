import {FilterIcon, SearchIcon} from 'assets/svg';
import React, {useRef, useState} from 'react';

import Badge from '@material-ui/core/Badge';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from 'theme/components/material/IconButton/IconButton';
import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import {globalTokens} from 'theme/standard/palette';
import {makeStyles} from '@material-ui/core/styles';
import useOnClickOutside from 'hooks/useOnClickOutside';
import useTabs from 'hooks/useTabs';

const useStyles = makeStyles((theme) => ({
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 500,
        height: 37,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: globalTokens.__grey_5,
        borderRadius: 4,
        position: 'relative'
    },
    inputBase: {
        flex: 1,
        fontSize: 13,
        fontFamily: theme.typography.fontFamily,

        '::placeholder': {
            fontStyle: 'italic'
        },
        '& input': {
            '&::placeholder': {
                fontStyle: 'italic'
            }
        },
    },
    
    divider: {
        border: 'none',
        height: 28,
        width: 1,
        backgroundColor: globalTokens.__grey_5
    },
    iconButtonML: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(0.5)
    },
    iconButtonMR: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(1.5)
    },
    nativeSelect: {
        fontSize: 13,
        fontFamily: theme.typography.fontFamily,
        marginLeft: theme.spacing(2),

        '&:focus': {
            backgroundColor: globalTokens.white
        }
    },
    badge: {
        backgroundColor: globalTokens.lightRed,
        top: '30%',
        right: '40%'
    },
    divFilters: {
        position: 'absolute',
        left: 0,
        top: '105%',
        margin: '0 auto',
        zIndex: 100,
        width: '100%',
        padding: theme.spacing(1)
    }
}));

interface IChBxFilters {
    [key: string]: {
        type: string,
        label: string,
        checked: boolean
    }
}

interface IFilters {
    filtersById: IChBxFilters
}

const SearchBar = () => {
    const classes = useStyles();
    const refFilters = useRef(null);
    const [selectedSearchOption, setSearchOption] = useState('contract');
    const [selectedFiltersNumber, setNumberSF] = useState(0);
    const [toggleFilters, setToggleFilters] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [filters, setFilters] = useState<IFilters>({
        filtersById: {
            filterChBx1: {
                type: 'checkbox',
                label: 'Filter 1',
                checked: false
            },
            filterChBx2: {
                type: 'checkbox',
                label: 'Filter 2',
                checked: false
            }
        }
    });

    const arrayFilterIDs = Object.keys(filters.filtersById);
    const {openNewTab, forSearch} = useTabs()

    const openSearchTab = () => openNewTab(forSearch({entityType:selectedSearchOption, searchString, filters}))

    const handleSubmitSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();

        // if enter is pressed
        if (e.key === 'Enter') {
            openSearchTab()
        }
    }

    const handleSearchStringInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setSearchString(e.target.value);
    }

    const handleSearch = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        openSearchTab()
    }

    const handleSelectSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();
        setSearchOption(e.target.value);
    }

    const handleFiltersToggle = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setToggleFilters((prev) => !prev);
    }

    const handleFiltersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        console.log('handleFiltersChange e.target.name: ' + e.target.name);
        console.log('handleFiltersChange e.target.checked: ' + e.target.checked);
        setFilters((state: any) => ({
            ...state,
            filtersById: {
                ...state.filtersById,
                [e.target.name]: {
                    ...state.filtersById[e.target.name],
                    checked: e.target.checked
                }
            }
        }));

        let activeFiltersNum = arrayFilterIDs.reduce((activeFilters, filterId) => {
            if (filters.filtersById[filterId].checked) {
                activeFilters++;
            }

            return activeFilters;
        }, 0);

        // useState hasn't yet updated the filters with the setFilters hook, so it still has the value of past render
        // this means the current change needs to be made manually here.
        if (e.target.checked) {
            activeFiltersNum++;
        }
        else {
            activeFiltersNum--;
        }

        setNumberSF(activeFiltersNum);
    }

    useOnClickOutside(refFilters, () => setToggleFilters(false));

    return (
        <div
            className={classes.searchBar}>
            <NativeSelect
                value={selectedSearchOption}
                disableUnderline
                classes={{root: classes.nativeSelect}}
                IconComponent={ExpandMoreIcon}
                onChange={handleSelectSearch}>
                <option value={'all'}>All</option>
                <option value={'ticket'}>Tickets</option>
                <option value={'contract'} >Contracts</option>
                <option value={'person'}>Persons</option>
                <option value={'business'}>Businesses</option>
            </NativeSelect>
            <div
                className={classes.divider}/>
            <IconButton
                className="px-3"
                color="primary"
                size="small"
                onClick={handleSearch}>
                <SearchIcon/>
            </IconButton>
            <InputBase
                className={classes.inputBase}
                placeholder="Search for tickets, contracts, persons, etc."
                onChange={handleSearchStringInput}
                onKeyDown={handleSubmitSearch}/>
            <div
                ref={refFilters}>
                <Badge
                    classes={{badge: classes.badge}}
                    badgeContent={selectedFiltersNumber}
                    color="primary"
                    overlap="circle"
                    variant="dot">
                    <IconButton
                        classes={{root: classes.iconButtonMR}}
                        color="primary"
                        size="small"
                        onClick={handleFiltersToggle}>
                        <FilterIcon/>
                    </IconButton>
                </Badge>
                {
                    toggleFilters &&
                    <Paper
                        classes={{root: classes.divFilters}}>
                        <div>number of active filters selected: {selectedFiltersNumber}</div>
                        {
                            arrayFilterIDs.map((filter) => (
                                <div key={filter}><FormControlLabel key={filter} control={<Checkbox
                                    checked={filters.filtersById[filter].checked}
                                    onChange={handleFiltersChange}
                                    name={filter}/>} label={filters.filtersById[filter].label}/></div>))
                        }
                    </Paper>
                }
            </div>
        </div>
    )
}

export default SearchBar;
