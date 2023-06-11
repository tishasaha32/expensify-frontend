import React, { useState, useEffect } from 'react'
import styles from './DateSummary.module.css'
import NoData from '../Common/NoData';
import ItemsList from '../Common/ItemsList';
import Summary from '../Common/Summary';

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
            <Summary summary={totalExpense} summaryOf={formatDate(selectedDate)}/>
        </>
        )}

        {/* Display "No data found" message when filteredTransaction is empty */}
        {isElementsVisible && filteredTransaction.length === 0 && (
            <>
                <NoData selected ={formatDate(selectedDate)}/>
            </>
        )}

         {/* Map through the filtered transactions (category wise) */}
         {isElementsVisible && filteredTransaction.length!==0 && (
        <>
            <ItemsList transactions={filteredTransaction}/>
        </>
        )}
    </div> 
  )
}

export default DateSummary