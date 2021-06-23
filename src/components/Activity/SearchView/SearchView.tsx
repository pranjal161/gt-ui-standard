import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import {PureContractSearch} from 'views/ContractSearch/ContractSearch';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}))

const SearchView = (props:any) => {
    const classes = useStyles()
    //let SearchComponent:any

    console.log('ICI', props)

    /*    if (props.extraValues.entitySearch === 'contract')
        SearchComponent = ContractSearch
    else
        SearchComponent = <div>Search component not defined</div>
*/
    
    return (
        <div className={classes.root}>
            <PureContractSearch searchString={props.extraValues.searchString}/>
        </div>)
}

export default SearchView;
