import './App.css';
import AddTransaction from './components/AddTransaction';
import WeeklySummary from './components/WeeklySummary';
import DailySummary from './components/DailySummary';
import SpendingItems from './components/SpendingItems';
import CategorySummary from './components/CategorySummary';
import MonthlySummary from './components/MonthlySummary';
import DateSummary from './components/DateSummary';
import { useState } from 'react';

function App() {
  const [weeklyExpense, setWeeklyExpense] = useState(0);
  const [dailyExpense, setDailyExpense] = useState(0);
  const [transactions,setTransactions] =  useState([]);
  const [activeTab,setActiveTab] = useState('home');
  const [reportTab,setReportTab] = useState('timePeriod')

  //Function to handle tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleReportTabClick = (tab) =>{
    setReportTab(tab);
  }

  return (

    <div className="App">
      <div className='menus'>
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>
          Home
        </button>
        <button className={activeTab === 'report' ? 'active' : ''} onClick={() => handleTabClick('report')}>
          Report
        </button>
        <button className={activeTab === 'chart' ? 'active' : ''} onClick={() => handleTabClick('charts')}>
          Charts
        </button>
      </div>
      {activeTab === 'home' && (
        <>
          <WeeklySummary weeklyExpense ={weeklyExpense} setWeeklyExpense={setWeeklyExpense} transactions={transactions}/>
          <DailySummary setDailyExpense ={setDailyExpense} dailyExpense={dailyExpense} transactions ={transactions}/>
          <SpendingItems transactions ={transactions} setTransactions={setTransactions}/>
          <AddTransaction transactions ={transactions} setTransactions={setTransactions}/>
        </>
      )}
      {activeTab === 'report' && (
        <div className='reportTabs'>
          <button className={reportTab === 'monthly' ? 'report' : ''} onClick={() => handleReportTabClick('monthly')}>
            Monthly
          </button>
          <button className={reportTab === 'category' ? 'report' : ''} onClick={() => handleReportTabClick('category')}>
            Category
          </button>
          <button className={reportTab === 'date' ? 'report' : ''} onClick={() => handleReportTabClick('date')}>
            Date
          </button>
        </div>
      )}
      {reportTab==='monthly' &&(
        <MonthlySummary transactions={transactions}/>
      )}
      {reportTab==='category' &&(
        <CategorySummary transactions={transactions}/>
      )}
      {reportTab==='date' &&(
        <DateSummary transactions={transactions}/>
      )}
    </div>

  );
}

export default App; 
