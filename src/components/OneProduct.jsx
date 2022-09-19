import React,{useEffect ,useState} from 'react';
import axios from 'axios'; //importing axios so we can make an api call
import { useParams } from 'react-router-dom'; // to be able to use the parameter that is in the url
import { useNavigate } from 'react-router-dom';

const OneProduct = () => {

    const {id} = useParams()//setting up use params {this needs to be the same as in the url in the app file}
    const [oneProduct,setOneProduct] = useState({}) //setting useState() to grab  and edit all the info from the api later
    const [notFound,setNotFound] = useState(false) //setting useState() to grab  and edit all the info from the api later if there is and error
    const navigate = useNavigate();

    useEffect(()=>{ //useEffect(()=>{     },[]) prevents useState() from running over and over again
    axios.get(`http://localhost:8000/api/product/${id}`) //the url of the api
    .then((response)=>{ //the info from the api
        console.log("response for one",response) //this is to show on the console what we got from the api
        if(response.data.results){
            setOneProduct(response.data.results); //setting the response/info that we got form the api useState so we can use it globally
        }
        else{
            setNotFound(true) //this will run if there is an error
        }
    })
    .catch(err => console.log("there is an error some where ",err)) //this will run if there is an error  most likely is the url
    },[])

    const deleteProduct = ()=>{
        axios.delete(`http://localhost:8000/api/product/delete/${id}`)
        .then((response)=>{ 
            console.log("response for delete",response) 
            navigate("/")
        })
        .catch(err => console.log("there is an error some where ",err)) 
    }

    return (
        <div >
            {notFound?<h1> <img src="https://media2.giphy.com/media/lgcUUCXgC8mEo/200.webp?cid=ecf05e476xbkjmnwot96y2c1qsca6of80mnr0y705ih7nckx&rid=200.webp&ct=g" alt="get rick rolled" /> this product does not exist buddy  <img src="https://media2.giphy.com/media/lgcUUCXgC8mEo/200.webp?cid=ecf05e476xbkjmnwot96y2c1qsca6of80mnr0y705ih7nckx&rid=200.webp&ct=g" alt="get rick rolled" /></h1>:
            <div>
                <h3> details about product ({oneProduct.title}) </h3>
            <p>price ({oneProduct.price})</p>
            <p>description ({oneProduct.description})</p>
            <button onClick={deleteProduct} className='btn btn-danger' >delete {oneProduct.title}</button>
            </div>
        } 

        </div>
    );
};

export default OneProduct;