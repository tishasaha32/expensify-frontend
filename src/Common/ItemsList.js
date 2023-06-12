import React from 'react'
import bin from '../Assets/bin.png'
import styles from './ItemsList.module.css'


function ItemsList({transactions , setTransactions}) {
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
    (<div>
        {/*  Map through the transactions and render each transaction item */}
        <div className={styles.itemsContainer}>
        {transactions?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transaction => (
        <div className={styles.transaction}>
            <p className={styles.emoji}>{transaction?.attributes?.emoji}</p>
            <div className={styles.items}>
            <div>
                <p className={styles.title}>{transaction?.attributes?.title}</p>
                <p className={styles.category}>{transaction?.attributes?.category}</p>
            </div>
            <div>
                <p className={styles.expense}>${transaction.attributes?.expense}.00</p>
                <p className={styles.date}>{formatDate(transaction?.attributes?.date)}</p>
            </div>
            </div>
            <img src={bin} className={styles.deleteButton} onClick={()=>handleDeleteButton(transaction.id)}/>
        </div>
        ))} 
        </div>
    </div>)
  )
}

export default ItemsList