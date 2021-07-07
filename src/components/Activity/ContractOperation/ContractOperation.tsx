import React, {useCallback, useState} from 'react';
import Stepper, {StepProps} from 'components/Stepper/Stepper';
import ActivityStep from 'components/ActivityStep/ActivityStep';
import Button from 'components/Button/Button';
import DateInput from 'theme/components/material/DateInput/DateInput';
import InformationSheet from 'views/UnsolicitedPaymentActivity/InformationSheet/InformationSheet';
import InvestmentSplit from 'views/UnsolicitedPaymentActivity/InvestmentSplit/InvestmentSplit';
import UnsolicitedPayment from 'views/UnsolicitedPaymentActivity/UnsolicitedPayment/UnsolicitedPayment';
import WithScroll from 'components/WithScroll/WithScroll';
import {makeStyles} from '@material-ui/core/styles';
import {scrollIntoView} from 'utils/system';
import useAia from 'hooks/useAia';
import useConfigurations from 'hooks/useConfigurations';
import useResponse from 'hooks/useResponse';
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
    const hRef = props.hRef

    const [contentOffsetTop, setContentOffsetTop] = useState()
    const [sideBarOffsetTop, setSideBarOffsetTop] = useState()
    const classes: any = useStyles({contentOffsetTop, sideBarOffsetTop});

    const {t} = useTranslation()
    const {getActivityConf} = useConfigurations();

    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    const handleSidebarChange = useCallback((open: boolean) => {
        setIsSideBarOpen(open)
    }, [setIsSideBarOpen])

    const [currentStep, setCurrentStep] = useState(0);
    const [activityResponse] = useResponse(hRef);
    const {patch} = useAia();

    const handleContentOffsetTop = useCallback((node) => {
        if (node !== null) {
            setContentOffsetTop(node.offsetTop);
        }
    }, []);
    const {canValidateStep} = useStep()

    const initSteps = useCallback(() => [
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
    ], [activityResponse, hRef, t])

    const steps = initSteps()

    const handleSideBarOffsetTop = useCallback((node) => {
        if (node !== null) {
            setSideBarOffsetTop(node.offsetTop);
        }
    }, []);

    const configurations = getActivityConf(props)

    const SideBarConf = configurations.sidebar

    const nextStep = useCallback((index: number) => {
        const inputErrors = canValidateStep()
        if (inputErrors.length === 0) {
            const step = index >= steps.length ? steps.length - 1 : index;
            setCurrentStep(step);
        }
        else {
            //We scroll to view the first error
            scrollIntoView(inputErrors[0])
        }
    }, [steps, canValidateStep])

    const patchDate = useCallback((value: any, id: string) => {
        const payload: any = {};
        payload[id] = value;
        patch(hRef, payload).then(() => {
            setCurrentStep(0);
        });
    }, [hRef, patch])

    const currentStepConfig = steps && steps.filter((step: StepProps) => (step.id === currentStep))
    const CurrentStep = currentStepConfig &&
        <ActivityStep key={currentStepConfig[0].id} code={currentStepConfig[0].code}>
            {currentStepConfig[0].component}</ActivityStep> ||
        <div/>

    const handleStepperOnChange = useCallback((index: number) => setCurrentStep(index), [setCurrentStep])

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
                            onChange={handleStepperOnChange}/>
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
                <SideBarConf mainEntityHRef={props.mainEntityHRef} hRef={props.hRef} onChange={handleSidebarChange}/>
            </div>
        </div>
    );
}

export default React.memo(ContractOperation);
