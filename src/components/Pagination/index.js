import React,{useState,useEffect} from 'react'
import classnames from 'classnames'
import styles from './index.m.less';

function Pagination(props) {
    const {pageSize,pageIndex,total,onChange} = props
    const [pageCount,setPageCount] = useState(0)

    useEffect(()=>{
        setPageCount(Math.ceil(total/pageSize))
    },[pageSize,total])

    const handlePrev = ()=>{
        if(pageIndex == 1)return
        onChange(pageIndex - 1)
    }
    const handleNext = ()=>{
        const nextPage = pageIndex+1
        if(nextPage>total)return
        onChange(nextPage)
    }
    return (
        <div className={styles.pagination}>
            <div className={classnames({[styles.prev]:true,[styles.disabled]:pageIndex == 1})} onClick={handlePrev}>上一页</div>
            <div className={styles.info}>{pageIndex}/{pageCount}</div>
            <div className={classnames({[styles.next]:true,[styles.disabled]:pageIndex+1 > pageCount})} onClick={handleNext}>下一页</div>
        </div>
    )
}

export default Pagination