import React, { useState } from 'react'
import ItemsList from '../Common/ItemsList';

const SpendingItems=({transactions, setTransactions})=> {

  return (
    <div>
        <ItemsList transactions ={transactions} setTransactions={setTransactions}/>
    </div>
  )};
  

export default SpendingItems