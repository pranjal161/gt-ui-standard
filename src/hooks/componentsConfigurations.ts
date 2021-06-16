import ContractUpsert from 'components/Activity/ContractUpsert/ContractUpsert';
import ContractView from 'components/Activity/ContractView/ContractView';
import TitleBar from 'components/Activity/TitleBar/TitleBar';
import ExampleOfSideBar from 'stories/ExampleOfSideBar/ExampleOfSideBar';

export const configs:any = {
    contract_view : {
        activity : {
            skeleton : ContractView,
            header : TitleBar,
            sidebar : ExampleOfSideBar
        }
    },
    unsolicited_payment : {
        activity : {
            skeleton : ContractUpsert,
            header : TitleBar,
            sidebar : ExampleOfSideBar
        }
    }
}
