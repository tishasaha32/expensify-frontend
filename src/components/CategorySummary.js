import React, { useState , useEffect} from 'react'
import styles from './CategorySummary.module.css'
import ItemsList from '../Common/ItemsList';
import NoData from '../Common/NoData';
import Summary from '../Common/Summary';

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
                <option value="" disabled selected hidden>Expense Type</option>
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
                <Summary summary={totalExpenseCategoryWise} summaryOf={selectedCategory} />
            </>
        )}

        {/* Display "No data found" message when filteredTransaction is empty */}
        {isElementsVisible && filteredTransaction.length === 0 && (
            <>
                <NoData selected={selectedCategory}/>
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

export default CategorySummary