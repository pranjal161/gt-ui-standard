import ContractUpsert from 'components/Activity/ContractUpsert/ContractUpsert';
import SideBarOfContractUpsert from 'components/Activity/ContractUpsert/SideBar/SideBar';
import ContractView from 'components/Activity/ContractView/ContractView';
import HeaderOfContractUpsert from 'components/Activity/ContractUpsert/Header/Header';
import HeaderOfContractView from 'components/Activity/ContractView/Header/Header';

export const configs:any = {
    contract_view : {
        activity : {
            skeleton : ContractView,
            header : HeaderOfContractView,
            sidebar : SideBarOfContractUpsert,
        }
    },
    unsolicited_payment : {
        activity : {
            skeleton : ContractUpsert,
            header : HeaderOfContractUpsert,
            sidebar : SideBarOfContractUpsert,
        }
    }
}
