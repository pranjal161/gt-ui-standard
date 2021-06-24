import { DxcButton, DxcInput, DxcTabs } from '@dxc-technology/halstack-react';

import Button from 'theme/components/material/Button/Button';
import DistributorsManagement from 'views/UnsolicitedPaymentActivity/UnsolicitedPayment/DistributorsManagement/DistributorsManagement';
import EditPayer from 'views/UnsolicitedPaymentActivity/UnsolicitedPayment/EditPayer/EditPayer';
import { PencilIcon } from 'assets/svg';
import React from 'react';
import {debounce} from '@material-ui/core/utils/';
import { globalTokens } from 'theme/standard/palette';
import { makeStyles } from '@material-ui/styles';
import { trainingTabs } from './tabs';
import useAia from 'hooks/useAia';

const TrainingQuentin = () => {

    const url = 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FI7O/operations/unsolicited_payment/ID-mvQagAQ0';
    const classes = useStyles();

    const [isVisible, setIsVisible] = React.useState(false);
    const [person, setPerson] = React.useState<any>({});
    const [value, setValue] = React.useState<any>();

    const [activeTab, setActiveTab] = React.useState(0);
    const onTabClick = (i: number) => {
        setActiveTab(i);
    };

    const { patch, fetch } = useAia();

    const debouncedLog = React.useCallback(
        debounce((val: any) => console.log(val), 1000),
        []
    );

    const handleChange = (newValue: string) => {
        setValue(newValue);
        debouncedLog(newValue);
    };

    const getData = async (url: string) => {
        const res = await fetch(url);
        console.log({res});
    }

    const patchPayer = async (person: any = {}) => {
        setPerson(person);
        const res = await patch(url, {'premium:addressee_person': person.href});
        console.log({res});
    }

    return (
        <>

            <DxcTabs
                activeTabIndex={activeTab}
                onTabClick={onTabClick}
                tabs={trainingTabs}
            />

            {/* TAB 1 - EDIT PAYER */}

            {activeTab === 0 && (
                <div className={classes.tab}>
                    <DxcButton label="Open dialog" onClick={() => setIsVisible(true)} margin="xsmall" />
                    <DxcButton label="Test fetch" onClick={() => getData(url)} margin="xsmall" />

                    <p><b>Selected person :</b> {JSON.stringify(person)}</p>

                    <EditPayer
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        onChange={(person: any) => patchPayer(person)}
                    />

                    <DxcInput
                        label="Test debounce function"
                        assistiveText="Please check the console while typing"
                        value={value}
                        onChange={handleChange}
                    />

                    <Button variant="primary" title="Themed button" onClick={() => console.log('you clicked me!')} />
                    <Button variant="secondary" title="Themed button" Icon={<PencilIcon />} onClick={() => console.log('you clicked me!')} />
                </div>
            )}

            {/* TAB 2 - DISTRIBUTORS MANAGEMENT */}

            {activeTab === 1 && (
                <div className={`${classes.tab} ${classes.dm}`}>
                    <DistributorsManagement />
                </div>
            )}
        </>
    );
}

const useStyles = makeStyles({
    tab: {
        padding: 30
    },
    dm: {
        backgroundColor: globalTokens.__grey_7
    }
});

export default TrainingQuentin;
