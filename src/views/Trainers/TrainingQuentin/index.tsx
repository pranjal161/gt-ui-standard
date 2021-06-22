import { DxcButton, DxcInput } from '@dxc-technology/halstack-react';

import EditPayer from './EditPayer/EditPayer';
import React from 'react';
import {debounce} from '@material-ui/core/utils/';
import { makeStyles } from '@material-ui/styles';

const TrainingQuentin = () => {

    const classes = useStyles();

    const [isVisible, setIsVisible] = React.useState(false);
    const [person, setPerson] = React.useState<any>(JSON.stringify({}));
    const [value, setValue] = React.useState<any>();

    const debouncedLog = React.useCallback(
        debounce((val: any) => console.log(val), 1000),
        []
    );

    const handleChange = (newValue: string) => {
        setValue(newValue);
        debouncedLog(newValue);
    };

    return (
        <div className={classes.training}>
            <DxcButton label="Click me" onClick={() => setIsVisible(true)} />

            <p><b>Selected person :</b> {person}</p>

            <EditPayer
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                onChange={(person: any) => setPerson(JSON.stringify(person))}
            />

            <DxcInput
                label="Test debounce function"
                assistiveText="Please check the console while typing"
                value={value}
                onChange={handleChange}
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
