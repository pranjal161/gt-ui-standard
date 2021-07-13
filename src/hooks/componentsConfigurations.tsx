import ContractOperation from 'components/Activity/ContractOperation/ContractOperation';
import ContractView from 'components/Activity/ContractView/ContractView';
import HeaderOfContractUpsert from 'components/Activity/ContractOperation/Header/Header';
import HeaderOfContractView from 'components/Activity/ContractView/Header/Header';
import InformationSheet from 'views/UnsolicitedPaymentActivity/InformationSheet/InformationSheet';
import InvestmentSplit from 'views/UnsolicitedPaymentActivity/InvestmentSplit/InvestmentSplit';
import SearchView from 'components/Activity/SearchView/SearchView';
import SideBarOfContractOperation from 'components/Activity/ContractOperation/SideBar/SideBar';
import SideBarOfContractView from 'components/Activity/ContractView/SideBar/SideBar';
import UnsolicitedPayment from 'views/UnsolicitedPaymentActivity/UnsolicitedPayment/UnsolicitedPayment';
import Validation from 'views/UnsolicitedPaymentActivity/Validation/Validation';

export const configs: any = {
    activities: {
        contract_view: {
            structure: ContractView,
            mode: 'view',
            header: HeaderOfContractView,
            sidebar: SideBarOfContractView,
        },
        unsolicited_payment: {
            structure: ContractOperation,
            mode: 'create',
            header: HeaderOfContractUpsert,
            sidebar: SideBarOfContractOperation,
            steps: [{
                id: 0,
                code: 'unsolicited_payment',
                label: 'common:_UNSOLICITED_PAYMENT',
                required: true,
                fulfilled: true,
                error: true,
                component: UnsolicitedPayment
            },
            {
                id: 1,
                code: 'investment_split',
                label: 'common:_INVESTMENT_SPLIT',
                required: true,
                fulfilled: true,
                error: true,
                component: InvestmentSplit
            },
            {
                id: 2,
                code: 'information_sheet',
                label: 'common:_INFORMATION_SHEET',
                required: true,
                fulfilled: true,
                error: true,
                component: InformationSheet
            },
            {
                id: 3,
                code: 'validation',
                label: 'common:_VALIDATION',
                required: true,
                fulfilled: true,
                error: true,
                isValidationStep : true,
                component: Validation
            }
            ]
        },
        search: {
            structure: SearchView,
            mode: 'view',
        }
        ,
    }
}
