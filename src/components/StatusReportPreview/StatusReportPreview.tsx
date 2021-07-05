import ContentList from 'components/ContentList/ContentList';
import PanelSection from 'components/PanelSection/PanelSection';
import useStep from 'hooks/useStep';
import React from 'react';
import {getStatusReport} from 'utils/functions';
import useResponse from 'hooks/useResponse';

const StatusReportPreview = ({hRef}: any) => {
    const {setStatus} = useStep()
    const [response] = useResponse(hRef)
    const statusReport = response && getStatusReport(response && response.data) || []
    const generateMessageLines = (lines: any) => lines.map((line: any) => ({
        id: line.propertyNames[0],
        styleType: ['text']
    }),)

    const handleOnClick = (item:any, message:any) => {
        const property = item.id
        console.log('item', item, message)
        setStatus({hRef, property, status:'error', message })
    }

    const Sections = statusReport && statusReport.messages && statusReport.messages.map((message: any, index: any) => <PanelSection key={index} title={message.message}
        content={<ContentList
            items={generateMessageLines(message.context)}
            data={message.context}
            onClick={(item:any) => handleOnClick(item, message.message)}
        />}/>)

    return Sections || <div>No errors</div>
}

export default React.memo(StatusReportPreview)
