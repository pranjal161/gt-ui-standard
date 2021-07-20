import { DxcSelect } from '@dxc-technology/halstack-react';
import React from 'react';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

export interface DepositAccountInputProps {

    /**
       * href
       * @description href of the deposit account to display his value
       */
    hRef: string
}

/**
 * The component display a select input with deposit account options
  * @param {DepositAccountInputProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const DepositAccountInput: React.FC<DepositAccountInputProps> = (props: DepositAccountInputProps) => {
    const { t } = useTranslation();
    const {
        hRef,
    } = props

    const [response] = useResponse(hRef);
    const [bankAccountList, setBankAccountList] = React.useState<any>([])

    React.useEffect(() => {
        if (response) {
            setBankAccountList([{
                value: response.data._links.self.href,
                label: response.data._links.self.name
            }]);
        }
    }, [response])

    return (
        <div className="col-4 mt-4">
            <DxcSelect
                options={response ? bankAccountList : [{value: '', label: ''}]}
                value={response ? response.data._links.self.href : ''}
                label={t('deposit_account')}
            />
        </div>
    )
}

export default DepositAccountInput;