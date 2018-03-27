export const dateReurn1=(date1)=>{
    date1.toLocaleString('en-US',{ hour12:false}).replace(/\b\d\b/g,'0$&'),repalce(new RegExp('/','gm'),'-')
}


// 判断是否为数组
export default const judgeArr=(arr)=>{
    if(Array.isArray(arr)){
        return true
    }
}


// set去重
export default const compareTwo(dataOne,dataTwo)=>{
    return Number(dateOne.replace(/\-/g,""))
        Number(dateTwo.replace(/\-/g,""))
}




// 数组的“短路运算”every和some
// 情况一：全部满足
export   const  allTrueArr=(arrs)=>{
    return arr.every((arr)=>{
        return arr>20;  //如果数组的每一项都满足则返回true，如果有一项不满足返回fasle,终止遍历
    })
}

//有一个满足
export   const  oneTrueArr=(arrs)=>{
    return arr.some((arr)=>{
        return arr>20;  //如果数组的每一项都满足则返回true，终止遍历 如果有一项不满足返回fasle,
    })
}



//对象遍历
export const traverseObj=(obj)=>{
    for (let variable in obj){
        if(obj.hasOwnProperty(variable)){
            console.log(variable,obj[variable])
        }
    }
}

//axios 的get
export const  getAjax= function (getUrl, getAjaxData){
    return axios.get(getUrl,{
        params:{
            'getAjaxDataObj1':getAjaxData.obj1, //obj1为getAjaxData的一个属性
            'getAjaxDataObj2':getAjaxData.obj2, //obj2为getAjaxData的一个属性
        }
    }).then(data=>{
        //成功返回
    }).catch(err=>{
        //错误返回
    })
} 

//axios 的post
export const  postAjax= function (getUrl, postAjaxData){
    return axios.post(postUrl,{
        params:{
            'getAjaxDataObj1':postAjaxData.obj1, //obj1为getAjaxData的一个属性
            'getAjaxDataObj2':postAjaxData.obj2, //obj2为getAjaxData的一个属性
        }
    }).then(data=>{
        //成功返回
    }).catch(err=>{
        //错误返回
    })
} 


//请求拦截  将当前城市信息放入请求中
axios.interceptors.request.use(config =>{
  config.headers.cityCode = window.sessionStorage.cityCode  //jsCookie.get('cityCode')
  return config
})

//相应拦截：处理response的结果
axios.interceptors.response.use((response) =>{
    let data = response.data
    if(response.request.responseType === 'arraybuffer' &&!data.length){
        response.data = 0
    }
})

