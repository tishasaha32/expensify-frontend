import React, { useState, useEffect } from 'react'
import styles from './DateSummary.module.css'
import noDataFound from '../Assets/noDataFound.png'

function DateSummary({transactions}) {
    const [selectedDate,setSelectedDate] = useState('');
    const [isElementsVisible, setIsElementsVisible] = useState(false);
    const [totalExpense,setTotalExpense] = useState(0)
    
    //Funtion to format date
    const formatDate = (selectedDate) => {
        const dateObj = new Date(selectedDate);
        return `${dateObj.getDate()} - ${(dateObj.getMonth() + 1)} - ${dateObj.getFullYear()}`;
    };

    //function to filter transactions date wise
    const filteredTransaction = transactions.filter(transaction=>{
        const date = new Date(transaction.date);
        const transactionDate = `${date.getDate()} - ${(date.getMonth() + 1)} - ${date.getFullYear()}`;
        return formatDate(selectedDate) === transactionDate;
    });

    //Function to handle Submit Button
    const handleExpenseByDate=(e)=>{
        setSelectedDate(e.target.value);
        setIsElementsVisible(true);
    }

    useEffect(() => { 

        // Calculate expense by summing up the filtered transactions on a particular date
        const totalExpense = filteredTransaction.reduce((amount,filteredTransaction) =>  amount = amount + parseFloat(filteredTransaction.expense) , 0 )
        setTotalExpense(totalExpense);
    })

  return (
    <div>
        {/* Input for date */}
        <div className={styles.dateContainer}>
            <input 
                type='date'
                value={selectedDate}
                placeholder='dd-mm-yyyy' 
                required
                onChange={(e)=>handleExpenseByDate(e)}
            />
        </div>

        {/* Total Amount Spent on a particular date */}
        {isElementsVisible && filteredTransaction.length!==0 && (
        <>
            <div className={styles.spenditure}>
                <p className={styles.titleText}>Total Spent on {formatDate(selectedDate)}</p>
                <div className={styles.amountSpent}>
                    <span className={styles.dollar}>$</span>
                    <span className={styles.amount}>{totalExpense}.</span>
                    <span className={styles.amountAfterDecimal}>00</span>
                </div>
            </div>
        </>
        )}

        {/* Display "No data found" message when filteredTransaction is empty */}
        {isElementsVisible && filteredTransaction.length === 0 && (
            <div className={styles.noDataFound}>
                <img src={noDataFound} />
                <p>No Transactions History found for {formatDate(selectedDate)}</p>
            </div>
        )}

         {/* Map through the filtered transactions (category wise) */}
         {isElementsVisible && filteredTransaction.length!==0 && (
        <>
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
        </>
        )}
    </div> 
  )
}

export default DateSummary