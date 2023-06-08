import React, { useState } from 'react'
import CategorySummary from './CategorySummary'
import styles from './SpendingItems.module.css'
import bin from '../Assets/bin.png'
const SpendingItems=({transactions, setTransactions})=> {

  // Function to format the date
  function formatDate(date) {
    const enteredDate = new Date(date);
    const enteredFullDate = `${enteredDate.getDate()} - ${(enteredDate.getMonth() + 1)} - ${enteredDate.getFullYear()}`;
    return enteredFullDate;
  }

  //Funtion to Delete a Transaction
  const handleDeleteButton=(id)=>{
    const filteredTransactions = transactions.filter(transaction=>transaction.id!=id);
    setTransactions(filteredTransactions)
  }
  return (
    <div className={styles.itemsContainer}>
        {/*  Map through the transactions and render each transaction item */}
        {transactions?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transaction => (
          <div className={styles.transaction}>
            <p className={styles.emoji}>{transaction.emoji}</p>
            <div className={styles.items}>
              <div>
                <p className={styles.title}>{transaction.title}</p>
                <p className={styles.category}>{transaction.category}</p>
              </div>
              <div>
                <p className={styles.expense}>${transaction.expense}.00</p>
                <p className={styles.date}>{formatDate(transaction.date)}</p>
              </div>
            </div>
            <img src={bin} className={styles.deleteButton} onClick={()=>handleDeleteButton(transaction.id)}/>
          </div>
        ))} 
    </div>
  )};
  

export default SpendingItems