import React from 'react'
import bin from '../Assets/bin.png'
import styles from './ItemsList.module.css'


function ItemsList({transactions , setTransactions, activeTab}) {
    // Function to format the date
    function formatDate(date) {
        const enteredDate = new Date(date);
        const enteredFullDate = `${enteredDate.getDate()} - ${(enteredDate.getMonth() + 1)} - ${enteredDate.getFullYear()}`;
        return enteredFullDate;
    }

    //Funtion to Delete a Transaction
    const handleDeleteButton=(id)=>{
        const deletePost = async() =>{
            fetch(`http://localhost:1337/api/transactions/${id}`, {method: 'DELETE'}
        )}
        deletePost();
        const filteredTransactions = transactions.filter(transaction=>transaction.id!=id);
        setTransactions(filteredTransactions)
    }
  return (
    (<div className={styles.itemsList}>
        {/*  Map through the transactions and render each transaction item */}
        <div className={styles.itemsContainer} style={{height: activeTab == "report" ? '38vh' : '48vh'}}>
        {transactions?.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date)).map(transaction => (
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