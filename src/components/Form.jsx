import React,{useState} from 'react';
import axios from 'axios';

const Form = (props) => {

const [formInfo,setFormInfo]= useState({}); //creating one  useState() instead of multiple ones
let  [errorForm,setErrorForm] = useState({}); //this will hold the errors if there is any when submitting the form   //? but it does not work
// let  [title,setTitle] = useState(""); //this will hold the errors if there is any when submitting the form  

//todo this runs on the onChange event 
const changeHandler = (e)=>{ //e ==  to the event/ onChange
    setFormInfo({
        ...formInfo, //...formInfo is grabbing all the info that is already inputted in the form  
        //? we need to add name=" something " for this to work in the inputs 
        //? we also need to add onChange{changeHandler} for this to work
        //* e.target.name is the name or name=""  in the current input 
        //*e.target.value is the value that is add to the input 
        [e.target.name]: e.target.value // this is saying what ever  values that is on this input/form  add it to Form info
    }) 
}

//! when submitting an incomplete form --> response looks like this: response.data.errors

//* when submitting a complete form  -->  response looks like this: response.data.results



//todo  if there are any errors then save the errors to a state variable

const onSubmission = (e)=>{ // Preventing the page reload //? we need onSubmit={onSubmission} on the form for this to work
    e.preventDefault();
    axios.post("http://localhost:8000/api/product/new",formInfo) //calling the api to create a new item //? formInfo is the info that is going to be created
    .then((res)=>{
        console.log("response after the form is submitted",res)
        
        if(res.data.error){ // if there are any errors then save it to a state variable
            setErrorForm(res.data.error);
        }
        else{
            setErrorForm({})
            props.setFormSubmitted(!props.FormSubmitted)
        }
    })

    .catch(err =>{console.log("there is an error after the form is submitted ",err)})
}



    return (
        <div>
            <h1>Create a new product</h1>
            <form onSubmit={onSubmission}  className='container'>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input type="text" className="form-control" name='title' id=""  onChange={changeHandler} />
                     <p className='text-danger' >here {errorForm.title?.message}</p>  {/*this validation are not showing */}
                    {/* {errorForm.name? errorForm.name.message:null} */}
                </div>

                <div className="form-group">
                    <label htmlFor="">price</label>
                    <input type="number" className="form-control" id="" name='price' onChange={changeHandler} />
                    <p className='text-danger' >here {errorForm.price?.message}</p>  {/*this validation are not showing  */}
                    
                </div>

                <div className="form-group">
                    <label htmlFor="">description</label>
                    <input type="text" className="form-control" id="" name='description' onChange={changeHandler} />
                    <p className='text-danger' >here {errorForm.price?.message}</p>  {/*this validation are not showing  */}
                </div>
                <div>
                    <input type="submit" className='m-3 btn btn-success' />
                </div>
            </form>
        </div>
    );
};


export default Form;
