import { Theme, makeStyles } from '@material-ui/core/styles';

import { DxcButton } from '@dxc-technology/halstack-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ActionsModalProps {

    /**
     * onClose
            */
    onClose: Function

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
        paddingRight: '0px !important',
    },
    cancelButton: {
        color: theme.palette.primary.main
    },
    addButton: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        marginLeft: theme.spacing(8),
    }

}));

/**
 * Button container for Money in dialog
    * @param {ActionsModalProps} props Props of the component.
    * @returns {React.component} Display the component.
*/
const ActionsModal: React.FC<ActionsModalProps> = (props: ActionsModalProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

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
            <DxcButton
                className={classes.cancelButton}
                mode="text"
                label={t('cancel')}
                onClick={onClose}
                margin="medium"
            />
            <DxcButton
                className={classes.addButton}
                mode="primary"
                label={t('add')}
                onClick={addMoney}
                margin="medium"
            />
        </div>
    )
}

export default ActionsModal;