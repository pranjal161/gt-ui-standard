import { Theme, makeStyles } from '@material-ui/core/styles';

import CreateMoneyIns from './CreateMoneyIns/CreateMoneyIns';
import Header from 'components/Activity/ContractView/Header/Header';
import React from 'react';

// import useAia from 'hooks/useAia';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '90%',
        margin: 'auto'
    },
}));

const TrainingMaxime = () => {
    const classes = useStyles();
    const [activityUrl, onLaunchActivity]: [any, any] = React.useState({});
    const [isOpen, setIsOpen]: [boolean, Function] = React.useState(false);

    // const [response, setResponse]: [any, Function] = React.useState();
    // NEED TO CREATE AN UP AND SEND THE RESPONSE OF UP_ID AS PROPS
    // url => http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FH60/operations/unsolicited_payment
    //  myProps = response.data._links.self.href
    // const { post, fetch } = useAia();

    // const getMyUpInformations = async() => {
    //     try{
    //         const res = await post('http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FH60/operations/unsolicited_payment', {});
    //         console.log(res);
            
    //         const up_infos = await fetch(res.data._links.self.href)
    //         setResponse(up_infos);
    //     }
    //     catch(err) {
    //         return err;
    //     }
    // }

    // React.useEffect(() => {
    //     getMyUpInformations();
    // }, [])

    const onClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <h2>.</h2>
            <div className={classes.container}>
                <Header title={'Contract number: PCMR000381'} hRef={'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FHtW'} onLaunchActivity={onLaunchActivity} />
            </div>
            <h3>{activityUrl.hRef}</h3>

            <button onClick={() => setIsOpen(!isOpen)}>click</button>

            {/* {
                response &&
                    <CreateMoneyIns open={isOpen} onClose={onClose} response={response}/>
            } */}
            <CreateMoneyIns open={isOpen} onClose={onClose}/>
            
        </>
    )
}

export default TrainingMaxime;
