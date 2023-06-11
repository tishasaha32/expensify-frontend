import React,{useEffect} from 'react'
import Summary from '../Common/Summary';

function Balance({weeklyExpense, setWeeklyExpense, transactions}){

    const date = new Date();
    const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()-1));
    const lastDayOfWeek = new Date(date.setDate(date.getDate() + 6));
    
    // Filter transactions for the current week
    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate >= firstDayOfWeek &&
          transactionDate <= lastDayOfWeek
        );
    });
  
    useEffect(() => { 

        // Calculate weekly expense by summing up the filtered transactions
        const weeklyExpense = filteredTransactions.reduce((amount,filteredTransaction) =>  amount = amount + parseFloat(filteredTransaction.expense) , 0 )
        setWeeklyExpense(weeklyExpense);    
    })

    return(
        <div>
            <Summary summary={weeklyExpense} summaryOf={"week"}/>
        </div>
    );
}

export default Balance;