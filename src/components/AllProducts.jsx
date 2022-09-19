import React, {useState,useEffect} from 'react'; //importing react and some methods of react
import axios from "axios"; //to be able to use apis
import {Link} from "react-router-dom"; //to be able to use routes


const AllProducts = (props) => {
    const [product,setProduct] = useState([]) //setting useState() to grab  and edit all the info from the api later
    const [productDeleted,setDeletedProduct] = useState(false)
    useEffect(()=>{ //useEffect(()=>{     },[]) prevents useState() from running over and over again
    axios.get("http://localhost:8000/api/product") //the url of the api
    // this is a promes
    .then((response)=>{ //the info from the api
        console.log("response",response) //this is to show on the console what we got from the api
        setProduct(response.data.results); //setting the response/info that we got form the api useState so we can use it globally
    })
    .catch(err => console.log("there is an error some where ",err)) //this will run if there is an error  most likely is the url
    },[productDeleted,props.formSubmitted])


    const deleteProduct = (id)=>{
        axios.delete(`http://localhost:8000/api/product/delete/${id}`)
        .then((response)=>{ 
            console.log("response for delete",response) 
            setDeletedProduct(!productDeleted)
        })
        .catch(err => console.log("there is an error some where ",err)) 
    }

    return (
        <div  className='container'>
            <h1>all products</h1>
            {
            //using .map() to make a copy of the array/list that was retrieve from the api  because we dont want to modify the original
                product.map((item,index)=>{ //item== every item in the array//   index every index in the array
                    return(
                        <div key={item._id} className='card mb-3'>

                        {/* garbing specific info from the array  using  item.something*/}
                        {/* if you want to view one  when click use link */}
                            <h2><Link to={`/product/${item._id}`}>title: {item.title}</Link></h2>
                            <h2>Price: {item.price}</h2>
                            <h2>description: {item.description}</h2>
                            <h4>date created: {item.createdAt}</h4>
                            <Link to={`/product/update/${item._id}`} className='btn btn-info'>edit {item.title}</Link>
                            <button onClick={(e)=>deleteProduct(item._id)} className='btn btn-danger' >delete {item.title}</button>
                        </div>
                    )
                })
            }
        </div>
    );
};
export default AllProducts;