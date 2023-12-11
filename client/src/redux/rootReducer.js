const intialState ={
    loading:false,  // for spiner
    cartItems:[]
}

export const rootReducer =(state=intialState,action) =>{
  switch(action.type){
    case 'SHOW_LOADING' :
      return{
        ...state,
        loading : true,
      };
      case 'HIDE_LOADING' :
        return{
          ...state,
          loading: false,
        }
    case'ADD_TO_CART' :
    return{
      ...state, // it is current state of application
      // It uses the spread operator (...state) to create a shallow copy of the current state. This is a common practice in Redux to ensure that you don't directly mutate the original state.
      cartItems: [...state.cartItems,action.payload], 
    }
    case 'UPDATE_CART':
    return {
      ...state, // ... means spread operators 
      // Spread syntax (...) allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.
      cartItems:state.cartItems.map(item=>
      item._id === action.payload._id ?
      {...item,quantity: action.payload.quantity} 
      : item),
    };
    case  'DELETE_FROM_CART':
    return {
      ...state,
      cartItems: state.cartItems.filter( //we use filter to remove
      (item)=>item._id !== action.payload._id
      ),
    } ;
   default : return state ;
  }   
} ;