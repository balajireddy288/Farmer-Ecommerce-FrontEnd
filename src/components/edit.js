import React, { useContext, useState,useEffect } from 'react'
import { LoginContext } from './context';
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { ToastContainer, toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { Navbar } from './navbar';
import { useLocation } from 'react-router-dom';

export const Edit = (props) => {
    const location = useLocation();
    const opt1 = new URLSearchParams(location.search).get('query');
    const opt = encodeURIComponent(opt1);
  const { logindata, setLoginData } = useContext(LoginContext);
  const [product,setproduct]=useState([]);
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

  const fetchproduct=async()=>{
    const res = await fetch(`http://localhost:8080/buy/${opt}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      const data = await res.json();
      console.log(data.message);
      if (data.status === 401 || !data) {
        console.log("error");
      } else {
        setproduct(data.message[0])
  
      }
}

  useEffect(()=>{
    fetchproduct()
  },[]);


  
  const makepost=async()=>{
    const { product_name, price, quantity, produced_date, expiration_date, category } = input;
    const data=await fetch('http://localhost:8080/edit',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
             email, opt, price, quantity, produced_date, expiration_date, category,
            })
        })
            const res= await data.json();
            if (res) {
                alert("product Edited successfully");
                his('/main');
            }else{
              alert('Error in editing product');
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
            <input type='text' name='product_name' id='product_name' onChange={setVal} placeholder='Enter the product name' value={opt} readOnly></input>
          </div>
          <div className='form_input'>
            <label htmlFor='price'>price</label>
            <input type='text' name='price' id='price' onChange={setVal} placeholder='new price of the product'  required></input>
          </div>
          <div className='form_input'>
            <label htmlFor='quantity'>Total Quantity</label>
            <input type='text' name='quantity' id='quantity'  onChange={setVal} placeholder='new quantity'  required></input>
          </div>
          <div className='form_input'>
            <label htmlFor='produced_date'>Date Produced:</label>
            <input type='date' name='produced_date' id='produced_date' onChange={setVal} placeholder='Company name'  required></input>
          </div>
          <div className='form_input'>
            <label htmlFor='expiration_date'>Date of Expiration:</label>
            <input type='date' name='expiration_date' id='expiration_date' onChange={setVal} placeholder='Company name' required></input>
          </div>
          <div className='form_input'>
            <label htmlFor='category'>Category</label>
            <input type='text' name='category' id='category'  placeholder='category name' value={product.category} readOnly></input>
          </div>

          <button className='button' onClick={makepost} >Post</button>
          <br></br>
          
          <ToastContainer />
        </div>
      </section>
    </>
  )
}
