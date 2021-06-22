import ContractOperation from 'components/Activity/ContractOperation/ContractOperation';
import ContractView from 'components/Activity/ContractView/ContractView';
import HeaderOfContractUpsert from 'components/Activity/ContractOperation/Header/Header';
import HeaderOfContractView from 'components/Activity/ContractView/Header/Header';
import SideBarOfContractUpsert from 'components/Activity/ContractOperation/SideBar/SideBar';

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
            skeleton : ContractOperation,
            header : HeaderOfContractUpsert,
            sidebar : SideBarOfContractUpsert,
        }
    }
}
