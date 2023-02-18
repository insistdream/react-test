
import React from 'react'
import { SearchBar } from 'antd-mobile'
import styles from './index.m.less';

function OrderListComp(props) {
  const {data,loading,run} = props
  if(loading) {
    return <div className={styles.loading}>loading...</div>
  }
  if(data && !data.length) {
    return <div className={styles.loading}>暂无数据</div>
  }
  return (
    <>
      {data && data.map((v,index)=><div className={styles['list-item']} key={index}>
        <div className={styles.left}>
          <div className={styles.item}>
            <div>服务</div>
            <div>{v.serviceName}</div>
          </div>
          <div className={styles.item}>
            <div>运单号</div>
            <div>{v.logisticsNo}</div>
          </div>
          <div className={styles.item}>
            <div>关联运单</div>
            <div></div>
          </div>
          <div className={styles.item}>
            <div>收件人</div>
            <div>{v.username}</div>
          </div>
          <div className={styles.item}>
            <div>联系电话</div>
            <div>{v.phone}</div>
          </div>
          <div className={styles.item}>
            <div>下单日期</div>
            <div>{v.date}</div>
          </div>
        </div>
        <div className={styles.right}>
          <div><button className={styles.btn1}>面单</button></div>
          <div><button className={styles.btn2}>更多</button></div>
        </div>
      </div>)}
    </>
  )
}

export default React.memo(OrderListComp)