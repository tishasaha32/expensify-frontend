import React, {useEffect} from 'react'
import styles from './DailySummary.module.css'

function DailySummary({setDailyExpense,transactions, dailyExpense}){

  const date = new Date();
  const currentDate = `${date.getDate()} - ${(date.getMonth() + 1)} - ${date.getFullYear()}`;
  
  // Filter transactions for the current date
  const filteredTransactions = transactions.filter((transaction)=>{
    const enteredDate = new Date(transaction.date)
    const enteredFullDate = `${enteredDate.getDate()} - ${(enteredDate.getMonth() + 1)} - ${enteredDate.getFullYear()}`;
    return(
      enteredFullDate === currentDate);
  });

  useEffect(() => { 

    // Calculate daily expense by summing up the filtered transactions
    const dailyExpense = filteredTransactions.reduce((amount,filteredTransaction) =>  amount = amount + parseFloat(filteredTransaction.expense) , 0 )
    setDailyExpense(dailyExpense);
  })

  return (
    <div className={styles.dailySummaryContainer}>
        <div className={styles.currentDay}>
            <p>Today</p>
            <p>${dailyExpense}.00</p>
        </div>
    </div>
  );
}

export default DailySummary;