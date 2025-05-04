import {useBalance} from "../../store/balance-context";
import BigCard from "../../components/UI/BIgCard";

function BankBalance() {
    const {summaryData, isLoading, error} = useBalance();

    if (isLoading) {
        return <BigCard heading="Balance" amount="Loading..."/>;
    }

    if (error) {
        return <BigCard heading="Balance" amount="Error loading data"/>;
    }

    return (<BigCard
        isEditable={true}
        amount={summaryData?.effectiveBalance || 0}
        heading="Balance"
    />);
}

export default BankBalance;