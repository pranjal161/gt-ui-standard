import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import useBindInputToStep from 'hooks/useBindInputToStep';

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
    const {inputId, statusMessage} = useBindInputToStep({hRef, property})

    return (
        <div id={inputId} className={classes.root}>
            {statusMessage && <p className="MuiFormHelperText-root Mui-error">{statusMessage}</p>}
            {children}
        </div>
    );
}

export default React.memo(BindToStep);
