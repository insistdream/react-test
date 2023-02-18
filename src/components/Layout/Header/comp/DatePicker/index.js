
import React, {useState} from 'react'
import { DatePicker } from 'antd-mobile'
import dayjs from 'dayjs'
import styles from './index.m.less';

function DatePickerComp(props) {
  const {onChangeDate} = props
  const [visible, setVisible] = useState(false)
  const [dateValue, setDateValue] = useState(false)
  const now = new Date()
  const onSetVisible = () => {
    setVisible(true)
  }
  return (
    <div className={styles['date-picker-comp']}>
      <div className={styles['date-text-wrap']}>
        <div className={styles['date-text-left']} onClick={onSetVisible}>{dateValue || '请选择日期'}</div>
        <div className={styles['date-text-right']}>&gt;</div>
      </div>
      <DatePicker
        title='时间选择'
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        max={now}
        onConfirm={val => {
          const date = dayjs(val.toLocaleDateString()).format('YYYY/MM/DD')
          onChangeDate(date)
          setDateValue(date)
        }}
      />
    </div>
  )
}

export default React.memo(DatePickerComp)