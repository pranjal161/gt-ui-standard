import { Theme, makeStyles } from '@material-ui/core/styles';

import { Bell } from 'assets/svg';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { capitalizeFirstLetterAndRemove_ } from 'utils/functions';
import { globalTokens } from 'theme/standard/palette';

export interface ContractDisplayHeaderProps {

    /**
     * Title
     */
    title?: string

    /**
     * Response
     */
    response?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        padding: '14px 32px',
        maxHeight: '70px',
        borderRadius: '8px 8px 0px 0px',
    },
    informationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoLeft: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoRight: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: theme.palette.primary.contrastText,
        margin: '0',
        marginRight: '15px',
        fontWeight: 600
    },
    button: {
        textTransform: 'none',
        color: theme.palette.primary.contrastText,
    },
    pictureSlot: {
        height: 40,
        width: 40,
        backgroundColor: theme.palette.text.primary,
        borderRadius: '8px',
        marginRight: '15px'
    },
    dropDown: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: globalTokens.__grey_1,
        borderRadius: 4
    }
}));

/**
 * Generic contract header, use to display contract name and activities launcher
 * @param {ContractDisplayHeaderProps} props Props of the component.
 * @returns {React.component} Display the contract header
 */
const ContractDisplayHeader: React.FC<ContractDisplayHeaderProps> = (props: ContractDisplayHeaderProps) => {
    const classes = useStyles();
    const {
        title,
        response
    } = props

    React.useEffect(() => {
        console.log(response['_links']['item'])
    })

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (element: string) => {
        console.log(element)
        setAnchorEl(null);
    };

    return (
        <div className={classes.container}>
            <div className={classes.informationContainer}>
                <div className={classes.infoLeft}>
                    <div className={classes.pictureSlot}></div>
                    <p className={classes.title}>{title}</p>
                </div>

                <div className={classes.infoRight}>
                    <div>
                        <Bell size={30}/>
                    </div>
                    <div className={classes.dropDown}>
                        <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Activities
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {response['_links']['item'].map((keyName: any, i: number) => (
                                <MenuItem key={i} onClick={() => handleClose(response['_links']['item'][i]['href'])}>{capitalizeFirstLetterAndRemove_(response['_links']['item'][i]['name'])}</MenuItem>
                            ))}
                        </Menu>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContractDisplayHeader;