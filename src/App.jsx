import logo from './logo.svg';
import './App.css';
import {Routes,Route,Link} from "react-router-dom"; //to be able to use routes
import AllProducts from './components/AllProducts';
import Form from './components/Form';
import OneProduct from './components/OneProduct';
import EditForm from './components/EditForm';
import {useState} from 'react';

function App() {
  const [formSubmitted,setFormSubmitted] = useState(false);
  return (
    <div className="App ">
      <h1>Product manager</h1>
      <Routes>
        <Route exact path='/' element={ // this is saying to only load to items in this specific route 
          <div>
              <Form formSubmitted={ formSubmitted} setFormSubmitted={setFormSubmitted}></Form>
        <hr />
      <AllProducts formSubmitted={ formSubmitted} ></AllProducts>
          </div>
        } ></Route>

        <Route exact path='/product/:id' element={ // this route will get the id of the click product 
          <OneProduct></OneProduct>
        } ></Route>


      <Route exact path='/product/update/:id' element={ // this route will update one product
          <EditForm></EditForm>
        } ></Route>
      </Routes>

    </div>
  );
}

export default App;
