import React, { useEffect, useState } from 'react'
import _defaultLayout from '../components/_defaultLayout'
import axios from'axios' 
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch }
 from 'react-redux'
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons'
import { Button, Table,Modal,message,Form, Input, Select } from 'antd'
//The useSelector hook is used to extract the state of a component from the redux store using the selector function. 
//The useDispatch hook is used to update the state of the component and return a new state.
const CardPage = () => {
  const [subTotal,setSubtotal] = useState(0)
  const [billPopup,setBillPopup] = useState(false)
  const navigate = useNavigate()  
  const dispatch = useDispatch()
  const {cartItems} = useSelector(state=> state.rootReducer)  
  const handleIncreament=(record)=>{
    dispatch({ // it sends the type of action we want to execute
        type: 'UPDATE_CART' ,
        //In React, you can use spread syntax to pass objects such as props without the need to pass individual values.
        payload:{...record, quantity: record.quantity+1},
    }) ;
  } ;
  const handledecreament=(record)=>{
    if(record.quantity !==1)
   { dispatch({
        type: 'UPDATE_CART' ,
        payload:{...record, quantity: record.quantity-1},
    }) ;}
  } ;
  const columns = [
   {title : 'Name', dataIndex:'name'},
   {title : 'Image', dataIndex : 'image',
   render: (image,record) =><img src={image} alt={record.name} height="60" width="60" />},
   {title : 'Price' , dataIndex: 'price'},
   {title : 'Quantity',dataIndex: "_id",
    render : (id,record) => <div>
       <PlusCircleOutlined className='mx-3' 
       style={{cursor : 'pointer'}}
       onClick={()=>handleIncreament(record)}/>
       <b>{record.quantity}</b>
       <MinusCircleOutlined className='mx-3'
       style={{cursor : 'pointer'}}
       onClick={()=>handledecreament(record)}/>
    </div> },
   {title:'Actions',
   dataIndex:"_id",
    render:(id,record) => (
    <DeleteOutlined style={{cursor : 'pointer'}}
   onClick={()=>dispatch({
       type:"DELETE_FROM_CART",
       payload: record,
   })
 }
 />
),
},
];

 useEffect(()=>{
 let temp=0 ;
 cartItems.forEach((items) => (temp= temp + items.price* items.quantity));
 setSubtotal(temp) ;
 },[cartItems]) ;

 // handle Sumit
 const handleSubmit = async (value)=>{
  try {
    const newObject ={
      ...value,
      cartItems,
      subTotal,
      tax:Number(((subTotal/100)*10).toFixed(2)),
      TotalAmount:Number(
        Number(subTotal) + Number(((subTotal/100)*10).toFixed(2)) 
      ),
      userId: JSON.parse(localStorage.getItem('auth'))._id,
    };
    // console.log(newObject) ;
    await axios.post('api/bills/add-bills',newObject)
    message.success('Bill Generated')
    navigate('/bills')
  } catch (error) {
    message.error('Something went wrong')
    console.log(error)
  }
   
 }
  
  return (
  <_defaultLayout>
    <h1>Cart Page</h1>
    <Table columns={columns} dataSource={cartItems} bordered />
     <div className='d-flex flex-column align-items-end'>
        <hr/>    
       <h3>SUB TOTAL : Rs <b>{subTotal}</b> /-</h3>
       <Button type="primary" 
       onClick={()=> setBillPopup(true)}>
         Create Invoice
         </Button>
     </div>
     <Modal
     title="create Invoice"
     visible={billPopup} onCancel={()=>setBillPopup(false)} footer={false}>
      <Form layout='vertical'  onFinish={handleSubmit}>
            <Form.Item name="customerName" label="Customer Name">
              <Input/>
           </Form.Item>
           <Form.Item name="cutomerContact" label="Contact Number">
              <Input/>
           </Form.Item>
             <Form.Item name="paymentMode" label="Payment Method">
             <Select>
             <Select.Option value="cash">Cash</Select.Option>
             <Select.Option value="card">Card</Select.Option>
             </Select>
             </Form.Item>
             <div className='bill-it'>
               <h5>
                 Sub Total: <b>{subTotal}</b>
               </h5>
               <h4>TAX ( 10% ) :  
                 <b>
               {((subTotal/100)*10).toFixed(2)}
               </b>
               </h4>
               <h3>
                GRAND TOTAL ={" "}
                <b>Rs {Number(subTotal) + Number(((subTotal/100)*10).toFixed(2))} </b>
               </h3>
             </div>
            <div className='d-flex justify-content-end'>
              <Button type="primary" htmlType='submit'>Generate Bill</Button>
            </div>
            </Form>
     </Modal>
  </_defaultLayout>
  )
}

export default CardPage