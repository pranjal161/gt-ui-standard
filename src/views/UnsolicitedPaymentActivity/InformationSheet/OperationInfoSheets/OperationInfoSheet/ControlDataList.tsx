import Checkbox from 'components/Checkbox/Checkbox';
import React from 'react';
import { getDescriptionValueFromList } from 'utils/functions';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';

const ControlDataList = (props: { hRef: string }) => {
    const [response] = useResponse(props.hRef);
    const { patch } = useAia();
    const data_list = response && response.data['info_sheet_operation:control_data_list'];

    const patchDataValue = (value: boolean, item: any) => {
        let patchList = JSON.parse(JSON.stringify(data_list));
        patchList.forEach((list: { [x: string]: any; }) => {
            if (list['info_sheet_control_data:element'] === item['info_sheet_control_data:element']) {
                if (value) {
                    list['info_sheet_control_data:value'] = 'yes'
                }
                else list['info_sheet_control_data:value'] = 'no'
            }
        })
        patch(props.hRef, { 'info_sheet_operation:control_data_list': patchList })
    }

    return (
        <>
            {data_list && data_list.map((item: any, index: number) => (
                <div className="col-6 d-inline-flex" key={item['info_sheet_control_data:element']+index}>
                    <Checkbox
                        hRef={props.hRef}
                        property="info_sheet_control_data:value"
                        list={{ ...item, listName: 'info_sheet_operation:control_data_list'}}
                        onChange={(value: any) => patchDataValue(value, item)} />
                    <div className="px-2 pt-2 mt-1">
                        {getDescriptionValueFromList(item['info_sheet_control_data:element'],
                            'info_sheet_control_data:element', response.data, 'info_sheet_operation:control_data_list')}
                    </div>
                </div>
            ))}
        </>
    )
}

export default ControlDataList;