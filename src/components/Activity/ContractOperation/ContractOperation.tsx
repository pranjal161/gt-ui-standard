import React, {useCallback, useState} from 'react';
import Stepper, {StepProps} from 'components/Stepper/Stepper';
import Button from 'components/Button/Button';
import DateInput from 'theme/components/material/DateInput/DateInput';
import InformationSheet from 'views/UnsolicitedPaymentActivity/InformationSheet/InformationSheet';
import InvestmentSplit from 'views/UnsolicitedPaymentActivity/InvestmentSplit/InvestmentSplit';
import ActivityStep from 'components/ActivityStep/ActivityStep';
import UnsolicitedPayment from 'views/UnsolicitedPaymentActivity/UnsolicitedPayment/UnsolicitedPayment';
import WithScroll from 'components/WithScroll/WithScroll';
import {makeStyles} from '@material-ui/core/styles';
import {scrollIntoView} from 'utils/system';
import useAia from 'hooks/useAia';
import useConfigurations from 'hooks/useConfigurations';
import useResponse from 'hooks/useResponse';
import {useSelector} from 'react-redux';
import useStep from 'hooks/useStep';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {},
    body: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        height: '100%'
    },
    bodyLeft: {
        flex: '1 1 auto',
        marginRight: theme.spacing(4)
    },
    bodyRight: {
        maxWidth: '25%'
    },
    content: ({contentOffsetTop = ''}: any) => ({
        height: `calc(100vh - ${contentOffsetTop}px - 100px)`, // Footer to remove
        overflowY: 'hidden',
        '& > * > div': {
            marginBottom: theme.spacing(2)
        }
    }),
    sidebar: ({sideBarOffsetTop = ''}: any) => ({
        height: `calc(100vh - ${sideBarOffsetTop}px - 100px)`, // Footer to remove
        backgroundColor: theme.palette.background.paper
    })
}))

const ContractOperation: React.FC<any> = (props: any) => {
    const [contentOffsetTop, setContentOffsetTop] = useState()
    const [sideBarOffsetTop, setSideBarOffsetTop] = useState()
    const hRef = props.hRef
    const {t} = useTranslation()
    const {baId, getActivityConf} = useConfigurations();
    const isSideBarOpen = useSelector((state: any) => state.secondaryTabs.secondaryTabsIDs[baId].isSideBarOpen);
    const [currentStep, setCurrentStep] = useState(0);
    const classes: any = useStyles({contentOffsetTop, sideBarOffsetTop});
    const [activityResponse] = useResponse(hRef);
    const {patch} = useAia();
    const handleContentOffsetTop = useCallback((node) => {
        if (node !== null) {
            setContentOffsetTop(node.offsetTop);
        }
    }, []);
    const {canValidateStep} = useStep()

    const steps = [
        {
            id: 0,
            code: 'unsolicited_payment',
            label: t('common:_UNSOLICITED_PAYMENT'),
            required: true,
            fullfilled: true,
            error: true,
            component: <UnsolicitedPayment response={activityResponse} hRef={hRef}/>
        },
        {
            id: 1,
            code: 'investment_split',
            label: t('common:_INVESTMENT_SPLIT'),
            required: true,
            fullfilled: true,
            error: true,
            component: <InvestmentSplit response={activityResponse} hRef={hRef}/>
        },
        {
            id: 2,
            code: 'information_sheet',
            label: t('common:_INFORMATION_SHEET'),
            required: true,
            fullfilled: true,
            error: true,
            component: <InformationSheet response={activityResponse} hRef={hRef}/>
        }
    ]
    const handleSideBarOffsetTop = useCallback((node) => {
        if (node !== null) {
            setSideBarOffsetTop(node.offsetTop);
        }
    }, []);

    const configurations = getActivityConf(props)

    const SideBarConf = configurations.sidebar

    const nextStep = (index: number) => {
        const inputErrors = canValidateStep()
        if (inputErrors.length === 0) {
            const step = index >= steps.length ? steps.length - 1 : index;
            setCurrentStep(step);
        }
        else {
            //We scroll to view the first error
            scrollIntoView(inputErrors[0])
        }
    }

    const patchDate = (value: any, id: string) => {
        const payload: any = {};
        payload[id] = value;
        patch(hRef, payload).then(() => {
            setCurrentStep(0);
        });
    }

    const currentStepConfig = steps && steps.filter((step: StepProps) => (step.id === currentStep))
    const CurrentStep = currentStepConfig &&
        <ActivityStep key={currentStepConfig[0].id} code={currentStepConfig[0].code}>
            {currentStepConfig[0].component}</ActivityStep> ||
        <div/>

    return (
        <div className={`col-12 ${classes.body}`}>
            <div className={`col-9 ${classes.bodyLeft}`}>

                <div className="d-flex pt-3 pb-3">
                    <div className="col-2">
                        {activityResponse &&
                        <DateInput propertyName="date_effect"
                            hRef={hRef}
                            onChangeMethod={(value: any) => patchDate(value, 'date_effect')}
                            data={activityResponse.data}/>}
                    </div>
                    <div className="col-10">
                        <Stepper currentStep={currentStep} steps={steps} showStepsAtATime={3}
                            onChange={(index: number) => setCurrentStep(index)}/>
                    </div>

                </div>
                <div ref={handleContentOffsetTop} className={classes.content}>
                    <WithScroll>

                        {CurrentStep}

                        <div className="m-2 p-1" style={{float: 'right'}}>
                            <Button onClick={() => nextStep(currentStep + 1)} title={t('common:_NEXT_BUTTON')}/>
                        </div>
                    </WithScroll>
                </div>
            </div>
            <div ref={handleSideBarOffsetTop}
                className={isSideBarOpen ? `col-3 ${classes.bodyRight + ' ' + classes.sidebar}` : `${classes.bodyRight + ' ' + classes.sidebar}`}>
                <SideBarConf mainEntityHRef={props.mainEntityHRef} hRef={props.hRef}/>
            </div>
        </div>
    );
}

export default React.memo(ContractOperation);
