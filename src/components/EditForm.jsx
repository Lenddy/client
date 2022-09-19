import React,{useEffect ,useState} from 'react';
import axios from 'axios'; //importing axios so we can make an api call
import { useParams } from 'react-router-dom'; // to be able to use the parameter that is in the url
import { useNavigate } from 'react-router-dom';

const EditForm = () => {
    const {id} = useParams()//setting up use params {this needs to be the same as in the url in the app file}
    const [updateProduct,setUpdateProduct] = useState({}) 
    const [formInfo,setFormInfo]= useState({}); //creating one  useState() instead of multiple ones
    const [errorForm,setErrorForm] = useState({});
    const navigate = useNavigate("/");

    useEffect(()=>{ 
        axios.put(`http://localhost:8000/api/product/update/${id}`) //the url of the api
        .then((response)=>{ 
            console.log("response for one",response) //this is to show on the console what we got from the api
            if(response.data.results){
                setUpdateProduct(response.data.results);
            }
        })
        .catch(err => console.log("there is an error some where ",err)) 
        },[])

const changeHandler = (e)=>{ //e ==  to the event/ onChange
    setUpdateProduct({
        ...updateProduct,
        [e.target.name]: e.target.value
    });
}



const onSubmission = (e)=>{ // Preventing the page reload //? we need onSubmit={onSubmission} on the form for this to work
    e.preventDefault();
    axios.put(`http://localhost:8000/api/product/update/${id}`,updateProduct) //calling the api to create a new item //? formInfo is the info that is going to be created
    .then((res)=>{
        console.log("response after the form is submitted",res)
        if(res.data.error){ // if there are any errors then save it to a state variable
            setErrorForm(res.data.error.errors);
        }
        else{
            setErrorForm({});
            navigate("/");
        }
    })
    .catch(err =>{console.log("there is an error after the form is submitted ",err)})
}

    return (
        <div>
            <h1>update product</h1>
            <form onSubmit={onSubmission}  className='container'>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    
                    <input type="text" className="form-control" name='title' id="" onChange={changeHandler}  placeholder={updateProduct.title} value={updateProduct.title} />
                    <p>{errorForm.title?.message}</p> 
                </div>

                <div className="form-group">
                    <label htmlFor="">price</label>
                    <input type="number" className="form-control" id="" name='price' onChange={changeHandler}  placeholder={updateProduct.price} value={updateProduct.price} />
                    <p>{errorForm.price?.message}</p> 
                </div>

                <div className="form-group">
                    <label htmlFor="">description</label>
                    <input type="text" className="form-control" id="" name='description' onChange={changeHandler}    placeholder={updateProduct.description} value={updateProduct.description} />
                    <p>{errorForm.description?.message}</p> 
                </div>
                <div>
                    <input type="submit" className='m-3 btn btn-success' />
                </div>
            </form>
        </div>
    );
};


export default EditForm;