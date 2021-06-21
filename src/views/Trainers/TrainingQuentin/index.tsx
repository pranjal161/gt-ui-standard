/* eslint-disable no-unused-vars */

import { DxcButton } from '@dxc-technology/halstack-react';
import EditPayer from './EditPayer/EditPayer';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const TrainingQuentin = () => {

    const classes = useStyles();

    const [isVisible, setIsVisible] = React.useState(false);
    const [person, setPerson] = React.useState<any>(JSON.stringify({}));

    return (
        <div className={classes.training}>
            <DxcButton label="Click me" onClick={() => setIsVisible(true)} />

            <p><b>Selected person :</b> {person}</p>

            <EditPayer
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                onChange={(person: any) => setPerson(JSON.stringify(person))}
            />
            
        </div>
    );
}

const useStyles = makeStyles({
    training: {
        padding: 30
    },
});

export default TrainingQuentin;
