
import React, {useState} from 'react'
import { SearchBar } from 'antd-mobile'
import styles from './index.m.less';

function SearchBarComp(props) {
    const {onChangeSearch} = props
    const [text, setText] = useState('')
    return (
      <div className={styles['search-header']}>
        <div className={styles['search-bar']}>
          <SearchBar
            placeholder='请输入包裹收件人快递号或收件人电话'  
            onSearch={val => {
              console.log(`onSearch：${val}`)
            }}
            onChange={val => {
              console.log(`onChange：${val}`)
              setText(val)
              onChangeSearch && onChangeSearch(val)
            }}
            onFocus={() => {
              console.log('onFocus')
            }}
            onBlur={() => {
              console.log('onBlur')
            }}
            onCancel={() => {
              console.log('onCancel')
            }}
          />
        </div>
        <div className={styles['search-btn']} onClick={()=>{
            onChangeSearch && onChangeSearch(text)
        }}>搜索</div>
      </div>
    )
}

export default React.memo(SearchBarComp)