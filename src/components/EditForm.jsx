import React,{useEffect ,useState} from 'react';
import axios from 'axios'; //importing axios so we can make an api call
import { useParams } from 'react-router-dom'; // to be able to use the parameter that is in the url

const EditForm = () => {
    const {id} = useParams()//setting up use params {this needs to be the same as in the url in the app file}
    const [updateProduct,setUpdateProduct] = useState({}) //setting useState() to grab  and edit all the info from the api later
    useEffect(()=>{ //useEffect(()=>{     },[]) prevents useState() from running over and over again
        axios.put(`http://localhost:8000/api/product/update/${id}`) //the url of the api
        .then((response)=>{ //the info from the api
            console.log("response for one",response) //this is to show on the console what we got from the api
            if(response.data.results){
                setUpdateProduct(response.data.results); //setting the response/info that we got form the api useState so we can use it globally
            }
        })
        .catch(err => console.log("there is an error some where ",err)) //this will run if there is an error  most likely is the url
        },[])
    return (
        <div>
            <h1>update product</h1>
            <form   className='container'>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input type="text" className="form-control" name='title' id="" placeholder={updateProduct.title} value={updateProduct.title} />
                </div>

                <div className="form-group">
                    <label htmlFor="">price</label>
                    <input type="number" className="form-control" id="" name='price' placeholder={updateProduct.price} value={updateProduct.price} />
                </div>

                <div className="form-group">
                    <label htmlFor="">description</label>
                    <input type="text" className="form-control" id="" name='description' placeholder={updateProduct.description} value={updateProduct.description} />
                </div>
                <div>
                    <input type="submit" className='m-3 btn btn-success' />
                </div>
            </form>
        </div>
    );
};


export default EditForm;