import { Theme, makeStyles } from '@material-ui/core/styles';

import Button from 'theme/components/material/Button/Button';
import React from 'react';

// import { useTranslation } from 'react-i18next';

export interface ActionsModalProps {

    /**
     * onClose
            */
    onClose?: Function

    /**
     * addMoney
            */
    addMoney: Function

    /**
     * formData
            */
    formData: any

}
const useStyles = makeStyles((theme: Theme) => ({
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 0,
        // marginTop: theme.spacing(8),
    },
    cancelButton: {
        color: theme.palette.primary.main
    },
    addButton: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: 'none',
        marginLeft: theme.spacing(8),
        '& :hover': {
            background: 'inherit',
            color: theme.palette.primary.main
        }
    }

}));

/**
 * EXPLAIN WHAT THE COMPONENT DOES
  * @param {ActionsModalProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const ActionsModal: React.FC<ActionsModalProps> = (props: ActionsModalProps) => {
    const classes = useStyles();
    // const { t } = useTranslation();

    const {
        onClose,
        addMoney,
        formData,
    } = props

    React.useEffect(() => {
        console.log(formData)
    }, [])

    return (
        <div className={classes.buttonContainer}>
            <Button className={classes.cancelButton} aria-controls="simple-menu" aria-haspopup="true" onClick={onClose} data-testid="button-activities">
                Cancel
            </Button>
            <Button variant="primary" className={classes.addButton} aria-controls="simple-menu" aria-haspopup="true" onClick={addMoney} data-testid="button-activities">
                Add
            </Button>
        </div>
    )
}

export default ActionsModal;