
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './navbar'
import { About } from './about'
import { Contact } from './contact'
import { Display_prod } from './display_prod'

export const Search = () => {
    const location = useLocation();
    const opt1 = new URLSearchParams(location.search).get('query');
    const product_name = encodeURIComponent(opt1);
    console.log(product_name)
    const [posts, setposts] = useState([]);
    const fetchPosts = async () => {
        const res = await fetch(`http://localhost:8080/search/${product_name}`, {
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
            console.log(data);
            
            console.log("post fetched for search");
            setposts(data);
            console.log(posts)

        }
    }
    useEffect(() => {
        fetchPosts()
    }, [product_name]);

    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="container my-4 text-center pt-20" style={{ marginLeft: '0' }}>
                <br></br>
                <br></br>
                <br></br>

                {/* {loadingstate === true ? <Spinner /> : ""} */}
                <div className="row">
                    {posts.map((element) => {
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


            <div id="second" style={{ maxWidth: "100%", height: "auto", color: "whitesmoke", marginTop: "100px" }}>
                <About />
            </div>
            <div id="third" style={{ maxWidth: "100%", height: "auto", color: "whitesmoke" }}>
                <Contact />
            </div>
        </>
    )
}
