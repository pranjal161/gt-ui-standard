/* eslint-disable no-unused-vars */

import { DxcButton } from '@dxc-technology/halstack-react';
import EditPayer from './EditPayer/EditPayer';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const TrainingQuentin = () => {

    const classes = useStyles();

    const [isVisible, setIsVisible] = React.useState(true);
    const [value, setValue] = React.useState<any>('');

    React.useEffect(() => {
        console.log({value});
    }, [value])

    return (
        <div className={classes.training}>
            <DxcButton label="Click me" onClick={() => setIsVisible(true)} />

            <p>{value}</p>

            <EditPayer
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                onChange={(value: any) => setValue(JSON.stringify(value))}
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
