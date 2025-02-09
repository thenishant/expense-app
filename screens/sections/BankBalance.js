import {BalanceContextProvider, useBalance} from "../../store/balance-context";
import BigCard from "../../components/UI/BIgCard";

function BankBalance() {
    const {summaryData, isLoading, error} = useBalance();

    const handleAmountChange = (newAmount) => {
        console.log("New Amount Entered:", newAmount);
    };

    if (isLoading) {
        return <BigCard heading="Balance in Bank" amount="Loading..."/>;
    }

    if (error) {
        return <BigCard heading="Balance in Bank" amount="Error loading data"/>;
    }

    return (<BigCard
        isEditable={true} // Pass `true` to show the pencil icon
        amount={summaryData?.effectiveBalance || 0}
        heading="Balance in Bank"
        onAmountChange={handleAmountChange}
    />);
}

// const BankBalance = () => (<BalanceContextProvider>
//     <BankBalanceContent/>
// </BalanceContextProvider>);

export default BankBalance;