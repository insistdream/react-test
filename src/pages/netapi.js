import rpcService from '@/netapi/rpcServiceV';

const sleep = (s)=>new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve()
    },s * 1000)
})

export async function rPagination(params={}) {
  await sleep(1.2)
  let response = await rpcService('GET', '/data.json', {
    params,
    defaultParams: {
      pageIndex: 1,
      pageSize : 5,
    },
  });
  const status = params.status || ''
  const date = params.date || ''
  const keyword = params.keyword || ''
  const pageSize = params.pageSize || 5
  const pageIndex = params.pageIndex || 1
  const total = response.length


  // 模拟后台状态、分页数据返回
  if(status) {
    const data = response.filter(v=>v.status === status)
    return {
      total: data.length,
      data
    }
  }
  if(keyword) {
    const data = response.filter(v=>v.phone.indexOf(keyword) !== -1 || v.logisticsNo.indexOf(keyword) !== -1)
    return {
      total: data.length,
      data
    }
  }
  if(date) {
    const data = response.filter(v=>v.date == date)
    return {
      total: data.length,
      data
    }
  }
  if(pageIndex) {
    const data = response.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    return {
        total,
        data
    }
  }
  return {
    total,
    data: response
  }
}