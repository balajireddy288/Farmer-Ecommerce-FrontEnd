import React, { useEffect, useState, useContext } from 'react'
import { LoginContext } from './context'
import { Navbar } from './navbar'
import { useNavigate } from 'react-router-dom'
import { About } from './about'
import { Contact } from './contact'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Display_prod } from './display_prod'


export const Main = () => {
     const { logindata, setLoginData } = useContext(LoginContext);
     const email = logindata.email;
     const role=logindata.role;
     console.log(role);
  const [posts, setposts] = useState([]);
     const his = useNavigate();
  const fetchPosts = async () => {
    const res = await fetch(`http://localhost:8080/post`, {
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
      console.log("post fetched");
      setposts(data);

    }
  }
  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <>
      <Navbar />
       <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="container my-4 text-center pt-20" style={{marginLeft:'0'}}>
        <br></br>
        <br></br>
        <br></br>
        
        {/* {loadingstate === true ? <Spinner /> : ""} */}
        <div className="row">
          { posts.map((element) => {
            return (
              <div className="col-md-3" key={element.product_name} >
                <Display_prod
                  product_name={element.product_name}
                  price={element.price}
                  quantity={element.quantity}
                  image={element.image}
                  produced_date={element.produced_date}
                  expiration_date={element.expiration_date}
                  category={element.category}
                />
              </div>
            );
          })}

        </div>
      </div>
      {role==="producer"? <div style={{ position: "fixed", bottom: 70, right: 70 }}>
        <button style={{ backgroundColor: "rgb(61, 61, 61)", border: "none" }} onClick={() => his('/post')}><AddOutlinedIcon style={{ color: "white", fontSize: "70px" }} /></button>
      </div>:""}

     
       <div id="second"   style={{ maxWidth: "100%", height: "auto", color: "whitesmoke",marginTop:"100px" }}>
        <About />
      </div>
      <div id="third"   style={{ maxWidth: "100%", height: "auto", color: "whitesmoke" }}>
        <Contact />
      </div>  
    </>
  )
}
