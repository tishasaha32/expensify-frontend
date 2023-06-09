import './App.css';
import AddTransaction from './components/AddTransaction';
import WeeklySummary from './components/WeeklySummary';
import DailySummary from './components/DailySummary';
import SpendingItems from './components/SpendingItems';
import CategorySummary from './components/CategorySummary';
import MonthlySummary from './components/MonthlySummary';
import DateSummary from './components/DateSummary';
import Chart from './components/Chart'
import logo from './Assets/LOGO6.png'
import { useState } from 'react';

function App() {
  const [weeklyExpense, setWeeklyExpense] = useState(0);
  const [dailyExpense, setDailyExpense] = useState(0);
  const [transactions,setTransactions] =  useState([
    {emoji:"📋",title:"Test 5",expense:"23",category:"Insurance",date:"2023-06-16",id:5},
    {emoji:"🏠",title:"Test 7",expense:"33",category:"Housing",date:"2023-06-16",id:7},
    {emoji:"🚗",title:"Test 1",expense:"22",category:"Transportation",date:"2023-06-10",id:1},
    {emoji:"🐶",title:"Test 3",expense:"43",category:"Pets",date:"2023-06-10",id:3},
    {emoji:"🏥",title:"Test 4",expense:"34",category:"Health Care",date:"2023-06-08",id:4},
    {emoji:"🎬",title:"Test 6",expense:"34",category:"Entertainment",date:"2023-06-02",id:6},
    {emoji:"💰",title:"Test 8",expense:"56",category:"Others",date:"2023-06-02",id:8},
    {emoji:"🍔",title:"Test 2",expense:"32",category:"Fooding",date:"2023-06-01",id:2}]);
  const [activeTab,setActiveTab] = useState('home');
  const [reportTab,setReportTab] = useState('monthly');
  const [chartTab,setChartTab] = useState('monthlyChart'); 

  //Function to handle tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleReportTabClick = (tab) =>{
    setReportTab(tab);
  }

  const handleChartTabClick = (tab) =>{
    setChartTab(tab);
  }
  return (

    <div className="App">
      <img src={logo} className="logo"/>
      <div className='menus'>
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>
          Home
        </button>
        <button className={activeTab === 'report' ? 'active' : ''} onClick={() => handleTabClick('report')}>
          Report
        </button>
        <button className={activeTab === 'charts' ? 'active' : ''} onClick={() => handleTabClick('charts')}>
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
        <>
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
        <div>
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
        </>
      )}
      

      {activeTab === 'charts' && (
        <div className='chartTabs'>
          <Chart transactions={transactions}/>
        </div>
      )}
  </div>
  );
}

export default App; 
