import React,{useState,useEffect} from 'react'
import { json, useLocation,useNavigate } from 'react-router-dom';
import './styles.css'
import { useContext } from 'react';
import { LoginContext } from './context';
import { Navbar } from './navbar';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export const Buy_product = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const email = logindata.email;
  const his=useNavigate();
    const location = useLocation();
    const opt1 = new URLSearchParams(location.search).get('query');
    const product_name = encodeURIComponent(opt1);
    const opt2 = new URLSearchParams(location.search).get('date');
    const produced_date = encodeURIComponent(opt2);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [pincode, setPincode] = useState(0);
    const [address, setAddress] = useState('');
    const [totalAmount, setTotalAmount] = useState(quantity*price);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        
        calculateTotalAmount(newQuantity, price);
    };

    const handlePriceChange = (e) => {
        const newPrice = parseFloat(e.target.value);
        setPrice(newPrice);
        calculateTotalAmount(quantity, newPrice);
    };

    const calculateTotalAmount = (quantity, price) => {
        setTotalAmount(quantity * price);
    };
    const props={product_name,price,quantity,totalAmount};
    const handleConfirmBuy=async()=>{
       if(pincode==0 || address=='')
        alert("enter your address");
       const dateTime=new Date().toLocaleString();
       console.log(dateTime);
       const status="pending";
      const response=await fetch(`http://localhost:8080/buy`,{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          email, product_name, price, quantity,totalAmount, address,pincode,dateTime,status
        })
      })
      const data=await response.json();
      console.log(data);
      if(data)
        {
          alert('Product bought successfully');
          his('/main');
        }else{
          alert("error in buying product");
          
        }
    }
    const fetchproduct=async()=>{
        const res = await fetch(`http://localhost:8080/buy/${product_name}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });
      
          const data = await res.json();
          console.log(data);
          if (data.status === 401 || !data) {
            console.log("error");
          } else {
            console.log("bought");
            setQuantity(data.quantity);
            setPrice(data.price);
            setTotalAmount(data.quantity*data.price)
          }
    }
    const handlepincode=(e)=>{
        const pincode = parseInt(e.target.value);
        setPincode(pincode);
    }
    const handleAddress=(e)=>{
        const address = e.target.value;
        setAddress(address);
    }
  useEffect(()=>{
    fetchproduct()
  },[]);

  
    
  return (
    <>
     <Navbar />
     <br></br>
     <br></br>
     <br></br>
            <div className="buy-container" style={{ color: "black" }}>
                <h2 style={{textAlign:"center"}}>{product_name}</h2>
                <div className="buy-form">
                <label htmlFor="product_name" >Product Name:</label>
                    <input
                        type="text"
                        id="quantity"
                        value={product_name}
                        readOnly
                    />
                    <label htmlFor="quantity" >Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        max={15}
                        onChange={handleQuantityChange}
                    />
                    <label htmlFor="price" >Price:</label>
                    <input
                        type="number"
                        id="price"
                        step="0.01"
                        value={price}
                        onChange={handlePriceChange}
                        readOnly
                    />
                    <label htmlFor="total-amount" >Total Amount:</label>
                    <input
                        type="text"
                        id="total-amount"
                        value={totalAmount.toFixed(2)}
                        readOnly
                    />
                </div>
                <button onClick={handleShow}>Add address</button>
                <button onClick={handleConfirmBuy}style={{marginTop:"15px"}}>Buy</button>


                <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>PinCode:</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Enter your pincode"
                onChange={handlepincode}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={3}  onChange={handleAddress}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} style={{color:"black"}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </div></>
  )
}


