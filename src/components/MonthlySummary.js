import React, { useState, useEffect } from 'react'
import styles from './MonthlySummary.module.css';
import noDataFound from '../Assets/noDataFound.png'

function MonthlySummary({transactions}) {
  const [selectedMonth,setSelectedMonth] = useState('');
  const [isElementsVisible, setIsElementsVisible] = useState(false);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [month,setMonth] = useState('');

  //Function to filter Transactions on the basis of Month entered
  const filteredTransaction = transactions.filter(transaction=>{
    const numericValue = parseInt(selectedMonth)
    if (!isNaN(numericValue)) {
      const date = new Date(transaction.date);
      const transactionMonth = date.getMonth() + 1;
      return numericValue === transactionMonth;
    }
  })  

  //Function to handle Submit Button
  const handleExpenseByMonth=(e)=>{
    setSelectedMonth(e.target.value)
    console.log( e.target.options[e.target.selectedIndex].textContent)
    setMonth(e.target.options[e.target.selectedIndex].textContent)
    setIsElementsVisible(true);
  }
  
  useEffect(() => { 

    // Calculate expense by summing up the filtered transactions of a particular month
    const monthlyExpense = filteredTransaction.reduce((amount,filteredTransaction) =>  amount = amount + parseFloat(filteredTransaction.expense) , 0 )
    setMonthlyExpense(monthlyExpense);
  })
  return (
    <div>
      <div className={styles.monthFieldContainer}>
          <select value={selectedMonth} onChange={(e)=>handleExpenseByMonth(e)} required> 
              <option value="" disabled selected hidden>Choose Month</option>
              <option value="1">January</option> 
              <option value="2">February</option> 
              <option value="3">March</option> 
              <option value="4">April</option> 
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
          </select>
      </div>
    
      {/* Total Spent on the Month Selected */}
      {isElementsVisible && filteredTransaction.length!==0 &&(
        <>
            <div className={styles.spenditure}>
                <p className={styles.titleText}>Total Spent on {month}</p>
                <div className={styles.amountSpent}>
                    <span className={styles.dollar}>$</span>
                    <span className={styles.amount}>{monthlyExpense}.</span>
                    <span className={styles.amountAfterDecimal}>00</span>
                </div>
            </div>
        </>
        )}

        {/* Display "No data found" message when filteredTransaction is empty */}
        {isElementsVisible && filteredTransaction.length === 0 && (
            <div className={styles.noDataFound}>
                <img src={noDataFound} />
                <p>No Transactions History found for {month}</p>
            </div>
        )}

        {/* Map through the filtered transactions (month wise) */}
        {isElementsVisible && filteredTransaction.length!==0 &&(
        <div className={styles.itemsContainer}>
            {filteredTransaction.map(transaction => (
            <div className={styles.transaction}>
                <p className={styles.emoji}>{transaction.emoji}</p>
                <div className={styles.items}>
                <div>
                    <p className={styles.title}>{transaction.title}</p>
                    <p className={styles.category}>{transaction.category}</p>
                </div>
                <div>
                    <p className={styles.expense}>${transaction.expense}.00</p>
                    <p className={styles.date}>{transaction.date}</p>
                </div>
                </div>
            </div>
            ))}
        </div>
        )}
    </div>
  )
}

export default MonthlySummary