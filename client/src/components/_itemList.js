import React from 'react'
import { Card } from 'antd';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch} from 'react-redux' ;
const _itemList = ({item}) => {
  const dispatch = useDispatch() 
   // update cart handler 
    const handleAddToCart=()=>{
        dispatch({
           type : 'ADD_TO_CART',
           payload: {...item,quantity:1} // payload is the data that is to be transported
        })
    }
  const { Meta } = Card ;
  return   <div>
    <Card 
    style={{ width: 240, marginBottom:20 }} 
    cover={<img alt={item.name} src= {item.image}  style={{ height: 250 }}/>}
 >
                                                                  
    <Meta title= {item.name}  />
    <div className='item-button'>
      <button onClick={handleAddToCart}> Add to cart</button>
    </div>
  </Card>
  </div>
}

export default _itemList