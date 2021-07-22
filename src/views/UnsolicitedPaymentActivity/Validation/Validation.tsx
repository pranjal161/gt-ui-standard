import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import { ActivityProps } from 'components/Activity/Activity';
import { AddFolderIcon } from 'assets/svg';
import GeneralInfoView from './GeneralInfoView';
import MoneyInSummary from './MoneyInSummary';
import React from 'react';

const Validation: React.FC<ActivityProps> = (props: { hRef: string }) => {
    const { hRef } = props;
    const sections = [
        { title: 'General Information', component: <GeneralInfoView hRef={hRef}/> },
        { title: 'Unsolicited Payment Summary', component: <>Unsolicited Payment Summary</> },
        { title: 'Money In Details', component: <MoneyInSummary hRef={hRef} /> },
        { title: 'Investment Allocation', component: <>Investment Allocation</> }
    ]

    return (
        <>
            {sections.map((section, index: number) => (
                <span key={index}>
                    <AccordionContainer title={section.title} prefixActions={<AddFolderIcon />}>
                        {section.component}
                    </AccordionContainer>
                </span>
            ))}
        </>
    )
}

export default Validation;