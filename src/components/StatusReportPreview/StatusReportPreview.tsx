import ContentList from 'components/ContentList/ContentList';
import PanelSection from 'components/PanelSection/PanelSection';
import React from 'react';
import {getStatusReport} from 'utils/functions';
import useResponse from 'hooks/useResponse';

const StatusReportPreview = ({hRef}: any) => {
    const response = useResponse(hRef)
    const statusReport = response && getStatusReport(response && response.data) || []
    const generateMessageLines = (lines: any) => lines.map((line: any) => ({
        id: line.propertyNames,
        styleType: ['text']
    }),)

    const Sections = statusReport && statusReport.messages && statusReport.messages.map((message: any, index: any) => <PanelSection key={index} title={message.message}
        content={<ContentList
            items={generateMessageLines(message.context)}
            data={message.context}/>}/>)

    return Sections || <div>No errors</div>
}

export default React.memo(StatusReportPreview)
