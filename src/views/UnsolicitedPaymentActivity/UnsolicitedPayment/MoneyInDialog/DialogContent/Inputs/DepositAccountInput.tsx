import { DxcSelect } from '@dxc-technology/halstack-react';
import React from 'react';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

// import { getActivities } from 'utils/functions';

export interface DepositAccountInputProps {

    /**
       * href
       * @description href of the deposit account to display his value
       */
    href: string

    /**
   * formData
   * @description Object where I feed the value of the Money In form
  */
    formData: any

    /**
   * onChange
   * @description Function to change the value of the input
  */
    onChange: Function
}

/**
 * The component display a select input with deposit account options
  * @param {DepositAccountInputProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const DepositAccountInput: React.FC<DepositAccountInputProps> = (props: DepositAccountInputProps) => {
    const { t } = useTranslation();
    const {
        href,
        formData,
        onChange
    } = props

    const [response] = useResponse(href);
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
                onChange={onChange('money_in:deposit_bank_account')}
                value={formData['money_in:deposit_bank_account']}
                label={t('deposit_account')}
                onChangeMethod={onChange('money_in:deposit_bank_account')}
            />
        </div>
    )
}

export default DepositAccountInput;