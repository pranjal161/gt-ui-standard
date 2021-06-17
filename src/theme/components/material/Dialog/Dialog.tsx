import {
    Dialog as MuiDialog,
    DialogActions as MuiDialogActions,
    DialogContent as MuiDialogContent,
    DialogTitle as MuiDialogTitle,
} from '@material-ui/core';
import {CloseIcon} from 'assets/svg';
import IconButton from 'theme/components/material/IconButton/IconButton';
import React from 'react';
import Typo from 'components/Typography/Typo';
import {getComponentStyle} from 'theme/components/material/index';
import {makeStyles} from '@material-ui/core/styles';

export interface DialogProps {

    /**
     * icon to display in the left header
     */
    icon?: any

    /**
     * Title
     */
    title?: any

    /**
     * open
     */
    open?: boolean

    /**
     * Content to display
     */
    content?: any

    /**
     * onClose callback
     * Display The close icon in the right header if a callback is set
     */
    onClose?: any

    /**
     * maxWidth
     */
    maxWidth?: any //false | 'xs' | 'sm' | 'md' | 'lg ' | 'xl' |undefined

    /**
     * fullWidth
     */
    fullWidth: boolean

    /**
     * Actions to display
     */
    actions?: any
}

const useStyles = makeStyles(getComponentStyle('Dialog'));

const Dialog: React.FC<DialogProps> = ({
    icon,
    title,
    content,
    open = false,
    onClose,
    actions,
    fullWidth = false,
    maxWidth = 'md'
}: DialogProps) => {
    const classes: any = useStyles()

    const handleClose = () => {
        onClose && onClose()
    }

    return (
        <MuiDialog onClose={handleClose} aria-labelledby="customized-MuiDialog-title" open={open} maxWidth={maxWidth}
            fullWidth={fullWidth}>
            <MuiDialogTitle disableTypography className={classes.titleRoot}>
                <div>
                    <div className={classes.titleIcon}>{icon}</div>
                    <Typo variant={'dialogTitle'} value={title} className={classes.title}/>
                </div>
                {onClose && <IconButton onClick={onClose}>
                    <div data-testid={'dialog-btn-close-icon'}>
                        <CloseIcon/></div>
                </IconButton>}
            </MuiDialogTitle>
            <MuiDialogContent className={classes.content}>
                {content}
            </MuiDialogContent>
            <MuiDialogActions className={classes.actions}>
                {actions}
            </MuiDialogActions>
        </MuiDialog>
    );
}

export default Dialog;
