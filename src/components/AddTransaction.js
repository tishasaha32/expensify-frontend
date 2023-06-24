import React, {useState} from 'react'
import styles from './AddTransaction.module.css'

// Modal component
const Modal = ({isOpen, children}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>
  );
};
function AddTransaction({transactions,setTransactions}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction,setTransaction] = useState({emoji:'',title:'',expense: null,category:'',date: new Date().toISOString().split('T')[0],});

  // Function to open the transaction modal
  const showTransactionModal = () => {
    setIsModalOpen(true);
  }

  // Function to handle closing the transaction modal
  const handleCloseButton = () => {
    setIsModalOpen(false);
    setTransaction('');
  }

  // Function to handle adding a transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();

    //Setting Emojis
    switch (transaction.category) {
      case 'Transportation':
        transaction.emoji = '🚗';
        break;
      case 'Fooding':
        transaction.emoji = '🍔';
        break;
      case 'Pets':
        transaction.emoji = '🐶';
        break;
      case 'Health Care':
          transaction.emoji = '🏥';
          break;
      case 'Insurance':
          transaction.emoji = '📋';
          break;
      case 'Entertainment':
        transaction.emoji = '🎬';
        break;
      case 'Housing':
        transaction.emoji = '🏠';
        break;
      default:
        transaction.emoji = '💰';
    }

    //Setting the objects in the Transactions array and storing it in the dataBase
    setTransactions([...transactions,{attributes: transaction}  ]);
    try {
      fetch("http://localhost:1337/api/transactions",{
      method: 'POST',
      body: JSON.stringify({
        data: transaction,
      }),
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      }
    })  
    } catch (error) {
      console.log(error)
    }
    console.log(transaction);
    setTransaction({emoji:'',title:'', expense:null,category:'',date:new Date().toISOString().split('T')[0],});
    setIsModalOpen(false);
  }
  return (
    <div className={styles.modalContainer}>

      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={showTransactionModal}>+</button>
      </div>
      
       {/* Transaction Modal */}
      <Modal isOpen={isModalOpen}>
        <form className={styles.form}  onSubmit={(e)=>handleAddTransaction(e)}>

          {/* Input fields */}
          <input 
            value={transaction.title}
            type="text" 
            placeholder="Enter the title" 
            required
            onChange={(e)=>setTransaction({...transaction, title: e.target.value})
            }
          />

          <input 
            defaultValue={transaction.expense} 
            type="number" 
            placeholder="Enter the expense"
            required
            onChange={(e)=>setTransaction({...transaction, expense: e.target.value})
            }
          />

          <input 
            value={transaction.date} 
            type='date' 
            required
            onChange={(e)=>setTransaction({...transaction, date :e.target.value})
            }
          />
          
          {/* Select field */}
          <select 
            onChange={(e)=>setTransaction({...transaction, category: e.target.value})} 
            required
          > 
              <option value="" disabled selected hidden>Expense Type</option>
              <option value="Transportation">Transportation</option> 
              <option value="Fooding">Fooding</option> 
              <option value="Pets">Pets</option> 
              <option value="Health Care">Health Care</option> 
              <option value="Insurance">Insurance</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Housing">Housing</option>
              <option value="Others">Others</option>
              
          </select>
          
          {/* Buttons */}
          <div className={styles.buttonsContainer}>
            <button className={styles.addModal}type="submit" value="submit">Add</button>
            <button className={styles.closeModal}onClick={handleCloseButton}>Close</button>
          </div>
          
        </form>
      </Modal>
    </div>
  );
}

export default AddTransaction 