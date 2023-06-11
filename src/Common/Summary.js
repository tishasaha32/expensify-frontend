import React from 'react'
import styles from './Summary.module.css'

function Summary({summary,summaryOf}) {
  return (
    <div>
        <div className={styles.spenditure}>
            <p className={styles.titleText}>Total Spent on {summaryOf}</p>
            <div className={styles.amountSpent}>
                <span className={styles.dollar}>$</span>
                <span className={styles.amount}>{summary}.</span>
                <span className={styles.amountAfterDecimal}>00</span>
            </div>
        </div>
    </div>
  )
}

export default Summary