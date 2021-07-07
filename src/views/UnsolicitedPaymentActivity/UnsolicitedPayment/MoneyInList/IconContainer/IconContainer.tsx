import { DeleteIcon, PencilIcon } from 'assets/svg';
import { Theme, makeStyles } from '@material-ui/core/styles';

import React from 'react';

// import { useTranslation } from 'react-i18next';

export interface IconContainerProps {

    /**
         * onDelete
              */
    onDelete: any

    /**
         * onEdit
              */
    onEdit: any
}
const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > span > svg': {
            fill: theme.palette.primary.main
        }
    },
    editIcon: {
        marginRight: theme.spacing(1 / 2),
        '& :hover': {
            cursor: 'pointer'
        }
    },
    deleteIcon: {
        marginLeft: theme.spacing(1 / 2),
        '& :hover': {
            cursor: 'pointer'
        }
    }
}));

/**
 * EXPLAIN WHAT THE COMPONENT DOES
  * @param {IconContainerProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const IconContainer: React.FC<IconContainerProps> = (props: IconContainerProps) => {
    const classes = useStyles();
    const {
        onDelete,
        onEdit
    } = props

    return (
        <div className={classes.container}>
            {
                onEdit &&
                <span className={classes.editIcon} onClick={onEdit}>
                    <PencilIcon />
                </span>
            }

            <span className={classes.deleteIcon} onClick={onDelete}>
                <DeleteIcon />
            </span>
        </div>
    )
}

export default IconContainer;