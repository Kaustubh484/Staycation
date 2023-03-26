import { useEffect, useState } from "react"
import axios from "axios"
const useFetch=(url)=>{
    const [data,setData]= useState([]);
    const [loading,setLoding]= useState(false);
    const [error,setError]= useState(false);

    useEffect(()=>{
     const fetchData= async()=>{
        setLoding(true)
        try{
        const res= await axios.get(url)
        setData(res.data)
    }catch(err){
        setError(err)
    }
      
      setLoding(false)
     }
     fetchData()
    },[])

    const reFetchData= async()=>{
     
        setLoding(true)
        try{
        const res= await axios.get(url)
        setData(res.data)
    }catch(err){
        setError(err)
    }
      
      setLoding(false)
     }
     return{data,loading,error,reFetchData}
}
export default useFetch