import React, { useContext, useState } from 'react'
import { LoginContext } from './context';
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { ToastContainer, toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { Navbar } from './navbar';

export const Editpost = (props) => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [image, setImage] = useState(null);
  const email = logindata.email;
  const name = logindata.name;
  const his = useNavigate();
  const [input, setInput] = useState({
    product_name: "",
    price: "",
    quantity: "",
    produced_date: "",
    expiration_date: "",
    category: "",
  }
  )
  const setVal = (e) => {
    const { name, value } = e.target;

    setInput(() => {
      return { ...input, [name]: value }
    })

  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  


  
  const makepost=async()=>{
    const { product_name, price, quantity, produced_date, expiration_date, category } = input;
    const data=await fetch('http://localhost:8080/post',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
             email, product_name, price, quantity, produced_date, expiration_date, category,image
            })
        })
            console.log(data);
            const res= await data.json();
            if (res) {
                alert("product added successfully");
                his('/main');
            }else{
              alert('Error in adding product');
            }
  }

  return (
    <>
      <Navbar />
      <section style={{ marginTop: "100px" }}>
        <div className='form_data '>
          <h5 style={{ color: "white" }}>Add Product</h5>
          <button style={{ backgroundColor: "rgb(75, 75, 75)", border: "none", marginLeft: "400px",width:'100px' }} onClick={() => his('/main')}>
            <CloseIcon style={{ color: "white", fontSize: "50px" }} />
          </button>
          <div className='form_input'>
            <label htmlFor='product_name'>Product Name:</label>
            <input type='text' name='product_name' id='product_name' onChange={setVal} placeholder='Enter the product name' required></input>
          </div>
          <div className='form_input'>
            <label htmlFor='price'>price</label>
            <input type='text' name='price' id='price' onChange={setVal} placeholder='price of the product' required></input>
          </div>
          <div className='form_input'>
            <label htmlFor='quantity'>Total Quantity</label>
            <input type='text' name='quantity' id='quantity' onChange={setVal} placeholder='quantity' required></input>
          </div>
          <div className='form_input'>
            <label for="image">Image:</label>
            <input type="file" id="image" name="image" accept=".jpg, .jpeg" onChange={handleFileChange} style={{ color: 'white' }} />
          </div>
          <div className='form_input'>
            <label htmlFor='produced_date'>Date Produced:</label>
            <input type='date' name='produced_date' id='produced_date' onChange={setVal} placeholder='Company name' required></input>
          </div>
          <div className='form_input'>
            <label htmlFor='expiration_date'>Date of Expiration:</label>
            <input type='date' name='expiration_date' id='expiration_date' onChange={setVal} placeholder='Company name' required></input>
          </div>
          <div className='form_input'>
            <label htmlFor='category'>Category</label>
            <input type='text' name='category' id='category' onChange={setVal} placeholder='category name' required></input>
          </div>

          <button className='button' onClick={makepost} >Post</button>
          <br></br>
          
          <ToastContainer />
        </div>
      </section>
    </>
  )
}
