import React  from "react";
import {useSelector,useDispatch} from "react-redux" // use selector- Allows you to extract data from the Redux store state for use in this component, using a selector function
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import "../styles/_defaultLayout.css";
import { useState , useEffect} from "react";
import _spinner from "./_spinner";
const { Header, Sider, Content } = Layout;

   const _defaultLayout = ({children}) =>  {
   const navigate=useNavigate()
    const {cartItems,loading} = useSelector(state => state.rootReducer) 
    const [collapsed,setcollapsed] = useState(false) ; 
 const toggle = () => {
    setcollapsed(!collapsed);
  };
  // useeffect to get local storge data 
  useEffect(()=>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  },[cartItems])
    return (
      <Layout>
        {loading && <_spinner/>}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h1 className="text-center text-light font-wight-bold mt-4">My Food Shop</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
              <Link to="/bills">Bills</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
              <Link to="/items">Items</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              <Link to="/customers">Cutomers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" 
            icon={<LogoutOutlined />} 
        onClick={()=>{
          localStorage.removeItem('auth')
          navigate('/login') ;
        }}
              >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <div className="cart-item d-flex justify-content-space-betweeen flex-row" 
            onClick={()=>navigate('/cart')}> 
              <p>{cartItems.length}</p>
              <ShoppingCartOutlined/>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }


export default _defaultLayout