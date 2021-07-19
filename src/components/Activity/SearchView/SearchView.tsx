import useActivity from 'hooks/useActivity';
import {PureContractSearch} from 'views/ContractSearch/ContractSearch';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {},
}))

const SearchView = () => {
    const {activityProps} = useActivity()
    const {extraValues} = activityProps
    const classes = useStyles()
    let SearchComponent: any
    const NotDefinedSearchComponent = ({entityType}:any) => (<div>Search component not defined for {entityType}</div>)

    if (extraValues.entityType === 'contract')
        SearchComponent = PureContractSearch
    else {
        SearchComponent = NotDefinedSearchComponent
    }
    
    return (
        <div className={classes.root}>
            <SearchComponent entityType={extraValues.entityType} searchString={extraValues.searchString}/>
        </div>)
}

export default SearchView;
