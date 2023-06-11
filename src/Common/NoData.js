import React from 'react'
import styles from './NoData.module.css'
import noDataFound from '../Assets/noDataFound.png'

function NoData({selected}) {
  return (
    <div>
        <div className={styles.noDataFound}>
            <img src={noDataFound} />
            <p>No Transactions History found for {selected}</p>
        </div>
    </div>
  )
}

export default NoData