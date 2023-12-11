// import "antd/dist/antd.min.css";
import 'antd/dist/reset.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom' ; 
import _homepage from "./pages/homepage"
import _itemspage from "./pages/itemspage";
import CardPage from './pages/CardPage';
import Register from './pages/register';
import Login from './pages/login';
import _billsPage from './pages/billsPage';
import CustomerPage from './pages/CustomerPage';
function App() {
  return (
    <>    
     <BrowserRouter>
     <Routes>
      <Route path="/" element={
        <ProtectedRoute>
      <_homepage/>
     </ProtectedRoute> 
      } />
      <Route path="/items" element= {
      <ProtectedRoute>
      <_itemspage/>
       </ProtectedRoute>
      } />
      <Route path="/cart" element= {
     <ProtectedRoute>
      <CardPage/>
       </ProtectedRoute>
      } />
      <Route path="/bills" element= {
      <ProtectedRoute>
      <_billsPage/>
       </ProtectedRoute>
      } />
      <Route path="/customers" element= {
      <ProtectedRoute>
      <CustomerPage/>
       </ProtectedRoute>
      } />
      <Route path="/login" element= {<Login/>} />
      <Route path="/register" element= {<Register/>} />
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({children}){
  if(localStorage.getItem('auth')){
    return children
  }
  else{
    return <Navigate to="/login"/>
  }
}
