import React, { useState , useEffect} from 'react'
import styles from './CategorySummary.module.css'
import noDataFound from '../Assets/noDataFound.png'

function CategorySummary({transactions}) {
    const [isElementsVisible, setIsElementsVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [totalExpenseCategoryWise, setTotalExpenseCategoryWise] = useState(0);


    //Function to setIsSelectedCategory to True
    const handleSelectChange=(event)=>{
        setSelectedCategory(event.target.value);
        setIsElementsVisible(true);
    }

    //Filter the Transactions of the category Selected
    const filteredTransaction = transactions.filter(transaction => transaction.category===selectedCategory);

    useEffect(() => { 

        // Calculate Category Wise expense by summing up the filtered transactions
        const totalExpenseCategoryWise = filteredTransaction.reduce((amount,filteredTransaction) =>  amount = amount + parseFloat(filteredTransaction.expense) , 0 )
        setTotalExpenseCategoryWise(totalExpenseCategoryWise);
    })

  return (
    <div>
        {/* Select field */}
        <div className={styles.selectCategoryField}>
            <select value= {selectedCategory} onChange={handleSelectChange} required > 
                <option value="" disabled selected hidden>Selete Type</option>
                <option value="Transportation">Transportation</option> 
                <option value="Fooding">Fooding</option> 
                <option value= "Pets">Pets</option> 
                <option value="Health Care">Health Care</option> 
                <option value="Insurance">Insurance</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Housing">Housing</option>
                <option value="Others">Others</option>
            </select>
        </div>

        {/* Total Spent on the Category Selected */}
        {isElementsVisible && filteredTransaction.length!==0 &&(
        <>
            <div className={styles.spenditure}>
                <p className={styles.titleText}>Total Spent on {selectedCategory}</p>
                <div className={styles.amountSpent}>
                    <span className={styles.dollar}>$</span>
                    <span className={styles.amount}>{totalExpenseCategoryWise}.</span>
                    <span className={styles.amountAfterDecimal}>00</span>
                </div>
            </div>
        </>
        )}

        {/* Display "No data found" message when filteredTransaction is empty */}
        {isElementsVisible && filteredTransaction.length === 0 && (
            <div className={styles.noDataFound}>
                <img src={noDataFound} />
                <p>No Transactions History found for {selectedCategory}</p>
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

export default CategorySummary