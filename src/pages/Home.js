import React, {useState} from 'react';
import Header from '@/components/Layout/Header';
import OrderList from '@/components/OrderList';
import Pagination from '@/components/Pagination';
import { useRequest } from 'ahooks';
import { debounce } from '@/utils/index'
import { rPagination } from './netapi';
import styles from './index.m.less';

function HomePage() {
    const { data: mainData, loading, run } = useRequest(rPagination, {
        pageIndex:1,
        pageSize:5
    });
    const [pageIndex,setPageIndex] = useState(1)
    const [pageSize,setPageSize] = useState(5)
    
    const onChangeStatus = v => {
        console.log(v)
        run({status:v.status,pageIndex:'',keyword:'',date:''})
    }
    const onChangeSearch = keyword => {
        debounce(run,800)({keyword,status:'',pageIndex:'',date:''})
    }
    const onChangeDate = v => {
        console.log(v)
        run({date:v,status:'',pageIndex:'',keyword:''})
    }
    const onChangePage = page =>{
        setPageIndex(page)
        run({pageIndex:page,pageSize:5,status:'',keyword:'',date:''})
    }
    return (
        <div className={styles.home}>
            <Header 
                onChangeStatus={onChangeStatus}
                onChangeSearch={onChangeSearch}
                onChangeDate={onChangeDate}
                run={run}
            />
            <div className={styles.content}>
              <OrderList loading={loading} data={mainData?.data} />
            </div>
            <div className={styles.footer}>
                {mainData?.data?.length > 0 && <Pagination 
                    pageIndex={pageIndex} 
                    pageSize={pageSize} 
                    total={mainData.total}
                    onChange={onChangePage} 
                />}
            </div>
        </div>
    )
}

export default HomePage