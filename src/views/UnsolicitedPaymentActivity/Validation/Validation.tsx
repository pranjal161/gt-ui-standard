import AccordionContainer from 'components/AccordionContainer/AccordionContainer';
import { ActivityProps } from 'components/Activity/Activity';
import { AddFolderIcon } from 'assets/svg';
import InvestmentAllocation from './InvestmentAllocation';
import MoneyInSummary from './MoneyInSummary';
import React from 'react';

const Validation: React.FC<ActivityProps> = (props: { hRef: string }) => {
    const { hRef } = props;
    const sections = [
        { title: 'General Information', component: <>General Information</> },
        { title: 'Unsolicited Payment Summary', component: <>Unsolicited Payment Summary</> },
        { title: 'Money In Details', component: <MoneyInSummary hRef={hRef} /> },
        { title: 'Investment Allocation', component: <InvestmentAllocation hRef={hRef} /> }
    ]

    return (
        <>
            {sections.map((section, index: number) => (
                <div key={index}>
                    <AccordionContainer title={section.title} prefixActions={<AddFolderIcon />} defaultExpanded={true}>
                        {section.component}
                    </AccordionContainer>
                </div>
            ))}
        </>
    )
}

export default Validation;