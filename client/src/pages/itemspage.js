import React,{useEffect,useState} from 'react'
import _defaultLayout from './../components/_defaultLayout'
import { useDispatch } from 'react-redux';
import {DeleteOutlined,EditOutlined} from '@ant-design/icons' ;
import axios from 'axios';
import {message ,Modal,Button, Table, Form, Input, Select } from 'antd';
const _itemspage = () => {
const dispatch = useDispatch() ;
  const [itemsdata,setitemsdata] = useState([])
  const [popModal,setPopModal] = useState(false)
  const [editItem,setEditItem] = useState(null)
  const getallitems = async()=>{
    try {
      dispatch({
       type: 'SHOW_LOADING'
      })
      const {data} = await axios.get('/api/items/get-item')
      setitemsdata(data) ;
      dispatch({type: 'HIDE_LOADING'}) ;
      console.log(data) ;
    } catch (error) {
       dispatch({type: 'HIDE_LOADING'}) ;
      console.log(error)
    }
  } ;
  // use effects
  useEffect(()=>{
    getallitems() 
  },[dispatch]) ;

  // handle delete
   const handleDelete = async(record) =>{
    try {
      dispatch({
       type: 'SHOW_LOADING'
      })
       await axios.post('/api/items/delete-item',{itemId:record._id}) ;
     message.success("item deleted successfully")
     getallitems() ;
     setPopModal(false) ;
      dispatch({type: 'HIDE_LOADING'}) ;
     } catch (error) {
      dispatch({type: 'HIDE_LOADING'}) ;
      message.error("something went wrong")
      console.log(error)
    }
   }

 // table data
 const columns = [
  {title : 'Name', dataIndex:'name'},
  {title : 'Image', dataIndex : 'image',
  render: (image,record) =><img src={image} alt={record.name} height="60" width="60" />},
  {title : 'Price' , dataIndex: 'price'},
  {title:'Actions',
  dataIndex:"_id",
   render:(id,record) => (
    <div>
   <EditOutlined 
   style={{cursor : 'pointer'}}
   onClick={ ()=>{
    setEditItem(record) ;
    setPopModal(true) ;
   }}
   />    
   <DeleteOutlined 
   style={{cursor : 'pointer'}}
   onClick={()=>{
    handleDelete(record)
  }}
   /> 
</div>
),
},
];
// handle form submit
const handleSubmit = async (value) =>{
  //await is usually used to unwrap promises by passing a Promise as the expression . Using await pauses the execution of its surrounding async function until the promise is settled (that is, fulfilled or rejected). When execution resumes, the value of the await expression becomes that of the fulfilled promise.
// console.log(value) ;
if(editItem===null){
  try {
    dispatch({
     type: 'SHOW_LOADING'
    })
    const res = await axios.post('/api/items/add-item', value) ;
   message.success("item added successfully")
   getallitems() ;
   setPopModal(false) ;
    dispatch({type: 'HIDE_LOADING'}) ;
  
  } catch (error) {
    dispatch({type: 'HIDE_LOADING'}) ;
    message.error("something went wrong")
    console.log(error)
  }
}
else{
  try {
    dispatch({
     type: 'SHOW_LOADING'
    })
    await axios.put('/api/items/edit-item', {...value,itemId:editItem._id}) ;
   message.success("item updated successfully")
   getallitems() ;
   setPopModal(false) ;
    dispatch({type: 'HIDE_LOADING'}) ;
  
  } catch (error) {
    message.error("something went wrong")
    console.log(error)
  }
}

} ;
  return (
       <_defaultLayout>
       <div className='d-flex justify-content-between'>
        <h1>Items List</h1>
        <Button type="primary" onClick={()=>setPopModal(true)}>Add Item</Button>
        </div>
        <Table columns={columns} dataSource={itemsdata} bordered />
           {
            popModal && (
     <Modal title= {`${editItem !== null ?  'Edit Item' : 'Add New Item'}`}
     visible={popModal}  
     onCancel={()=> {
      setEditItem(null) 
     setPopModal(false)
     }} footer={false}>
         <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input/>
           </Form.Item>
           <Form.Item name="price" label="Price">
              <Input/>
           </Form.Item>
           <Form.Item name="image" label="Image URL">
                <Input/>
             </Form.Item>
             <Form.Item name="category" label="Category">
             <Select>
             <Select.Option value="drinks">Drinks</Select.Option>
             <Select.Option value="rice">Rice</Select.Option>
              <Select.Option value="noodels">Noodels</Select.Option>
             </Select>
             </Form.Item>
            <div className='d-flex justify-content-end'>
              <Button type="primary" htmlType='submit'>SAVE</Button>
            </div>
            </Form>
         </Modal>
            )
           }    
       </_defaultLayout>
       
    
  )
}
export default _itemspage ;