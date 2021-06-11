import React from 'react';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '2px',
        },
        '*::-webkit-scrollbar-thumb': {
            background: '#97a0af',
            marginBlock: '8px',
            borderRadius: '2px'
        },
        '*::-webkit-scrollbar-track': {
            background: theme.palette.project.sidebar.toolbar.border,
            borderRadius: '2px'
        }
    },
    root: {
        placeSelf: 'stretch',
        height: '100%',
        overflowY: 'scroll',
    }
}
));

export interface WithScrollProps {

    /**
     * Children
     */
    children: any
}

/**
 * Apply scroll into the children
 * @param {WithScrollProps} children props
 * @constructor
 */
const WithScroll: React.FC<WithScrollProps> = ({children}: WithScrollProps) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}

export default WithScroll;
