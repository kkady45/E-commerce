import logo from './logo.svg';
import './App.css';
import Layout from './Layout/Layout';
import Home from './Home/Home.jsx';
import Login from './Login/Login.jsx'
import Men from './Men/Men.jsx'
import Women from './Women/Women.jsx'
import Jewellery from './Jewellery/Jewellery.jsx'
import Cart from './Cart/Cart.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import SignUp from './SignUp/SignUp.jsx';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './ProductDetails/ProductDetails.jsx';

function App() {
  const routes=createBrowserRouter([{path:'',element:<Layout/>,children:[
    {index:true,element:<SignUp/>},
    {path:'login',element:<Login/>},
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'productDetails/:productId',element:<ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
    {path:'men',element:<ProtectedRoute><Men/></ProtectedRoute>},
    {path:'women',element:<ProtectedRoute><Women/></ProtectedRoute> },
    {path:'jewellery',element:<ProtectedRoute><Jewellery/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'*',element:<p className='text-white fs-1'>error</p>},

   
  ]}])
  return (
   <>

   <RouterProvider router={routes}/>
   
   
   </>
  );
}

export default App;
