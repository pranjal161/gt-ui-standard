import {makeStyles} from '@material-ui/core/styles';
import useBindInputToStep from 'hooks/useBindInputToStep';
import React from 'react';

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
    const {inputId, ref, errorMessage} = useBindInputToStep({hRef, property})

    return (
        <div id={inputId} ref={ref} className={classes.root}>
            {errorMessage && <p ref={ref} className="MuiFormHelperText-root Mui-error">{errorMessage}</p>}
            {children}
        </div>
    );
}

export default React.memo(BindToStep);
