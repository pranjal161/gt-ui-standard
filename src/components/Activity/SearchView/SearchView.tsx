import {PureContractSearch} from 'views/ContractSearch/ContractSearch';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {},
}))

const SearchView = (props: any) => {
    const classes = useStyles()
    let SearchComponent: any
    const NotDefinedSearchComponent = ({entityType}:any) => (<div>Search component not defined for {entityType}</div>)

    if (props.extraValues.entityType === 'contract')
        SearchComponent = PureContractSearch
    else {
        SearchComponent = NotDefinedSearchComponent
    }
    
    return (
        <div className={classes.root}>
            <SearchComponent entityType={props.extraValues.entityType} searchString={props.extraValues.searchString}/>
        </div>)
}

export default SearchView;
