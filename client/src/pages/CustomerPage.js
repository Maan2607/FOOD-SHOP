import { useState,useEffect } from 'react'
import React from 'react'
import { useDispatch } from 'react-redux'
import _defaultLayout from '../components/_defaultLayout'
import axios from 'axios'
import { Table } from 'antd'
const CustomerPage = () => {
  const [billsdata,setbillsdata] = useState([])
  const dispatch = useDispatch() ;
  const getallBills = async()=>{
    try {
      dispatch({
       type: 'SHOW_LOADING'
      })
      const {data} = await axios.get('/api/bills/get-bills')
      setbillsdata(data) ;
      dispatch({type: 'HIDE_LOADING'}) ;
      console.log(data) ;
    } catch (error) {
       dispatch({type: 'HIDE_LOADING'}) ;
      console.log(error)
    }
  } ;
  // use effects
  useEffect(()=>{
    getallBills() 
  },[dispatch]) ;

  const columns = [
    {title : 'ID', dataIndex:'_id'},
    {title : 'Name', dataIndex : 'customerName'},
    {title : 'Contact No.' , dataIndex: 'cutomerContact'},
      
  ];

  return (
   <_defaultLayout>
    <h1>Customer Page</h1>
    <Table columns={columns} dataSource={billsdata} bordered />
   </_defaultLayout>
  )
}

export default CustomerPage