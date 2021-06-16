import ContractUpsert from 'components/Activity/ContractUpsert/ContractUpsert';
import SideBarOfContractUpsert from 'components/Activity/ContractUpsert/SideBar/SideBar';
import ContractView from 'components/Activity/ContractView/ContractView';
import TitleBarOfContractUpsert from 'components/Activity/ContractUpsert/Header/Header';

export const configs:any = {
    contract_view : {
        activity : {
            skeleton : ContractView,
            header : TitleBarOfContractUpsert,
            sidebar : SideBarOfContractUpsert,
        }
    },
    unsolicited_payment : {
        activity : {
            skeleton : ContractUpsert,
            header : TitleBarOfContractUpsert,
            sidebar : SideBarOfContractUpsert,
        }
    }
}
