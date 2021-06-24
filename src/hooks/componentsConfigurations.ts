import ContractOperation from 'components/Activity/ContractOperation/ContractOperation';
import ContractView from 'components/Activity/ContractView/ContractView';
import HeaderOfContractUpsert from 'components/Activity/ContractOperation/Header/Header';
import HeaderOfContractView from 'components/Activity/ContractView/Header/Header';
import SearchView from 'components/Activity/SearchView/SearchView';
import SideBarOfContractOperation from 'components/Activity/ContractOperation/SideBar/SideBar';
import SideBarOfContractView from 'components/Activity/ContractView/SideBar/SideBar';

export const configs:any = {
    search:{
        activity : {
            skeleton: SearchView,
        }
    },
    contract_view : {
        activity : {
            skeleton : ContractView,
            header : HeaderOfContractView,
            sidebar : SideBarOfContractView,
        }
    },
    unsolicited_payment : {
        activity : {
            skeleton : ContractOperation,
            header : HeaderOfContractUpsert,
            sidebar : SideBarOfContractOperation,
        }
    }
}
