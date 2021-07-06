import {makeStyles} from '@material-ui/core/styles';
import useBindInputToStep from 'hooks/useBindInputToStep';
import React, {useState} from 'react';
import {getUniqueId} from 'utils/system';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
}))

export interface BindToStep {

    /**
     * hRef os thr ressource
     */
    hRef: string

    /**
     * property
     */
    property: string

    /**children
     *
     */
    children?: any

}

/**
 * Bind a property to API, to manage status_report
 * @param {BindToStep} props Props definition
 * @constructor
 */
const BindToStep: React.FC<BindToStep> = ({hRef, property, children}: BindToStep) => {
    const classes = useStyles()
    const [uniqueId] = useState(getUniqueId(property))

    const [ref, errorMessageAPI] = useBindInputToStep({hRef, property, uniqueId})

    return (
        <div id={uniqueId} ref={ref} className={classes.root}>
            {errorMessageAPI && <p ref={ref} className="MuiFormHelperText-root Mui-error">{errorMessageAPI}</p>}
            {children}
        </div>
    );
}

export default BindToStep;
