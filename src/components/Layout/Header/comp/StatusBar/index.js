
import React, {useRef, useState} from 'react'
import { Dropdown, Radio, Space } from 'antd-mobile'
import { CheckOutline } from 'antd-mobile-icons'
import styles from './index.m.less';

function StatusBarComp(props) {
    const {onChangeStatus} = props
    const ref = useRef(null)
    const statusList = [{title:'新订单',key:'newOrder',status:1},{title:'已揽收',key:'collect',status:2},{title:'派送中',key:'intransi',status:3},{title:'全部',key:'all',status:''}]
    const [current, setCurrent] = useState({key:'all',title:'全部'})
    const handleItemClick = (v)=>{
      setCurrent(v)
      onChangeStatus(v)
      ref.current?.close()
    }
    return (
      <div className={styles['status-bar']}>
        <Dropdown
          ref={ref}
        >
          <Dropdown.Item key='status' title='包裹状态'></Dropdown.Item>
          <Dropdown.Item key='orderStatus' title={current.title}>
            <ul style={{ padding: 12 }} className={styles['status-item-wrap']}>
              {statusList.map(v=><li onClick={()=>handleItemClick(v)} key={v.key} className={styles['status-item']}>
                <div>{v.title}</div>
                {current.key === v.key && <div><CheckOutline fontSize={'18px'} color="#f00" /></div>}
              </li>)}
            </ul>
          </Dropdown.Item>
        </Dropdown>
      </div>
    )
}

export default React.memo(StatusBarComp)