import React, { useState } from 'react'
import './both.css'
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Auth } from './auth';

export const Signup = () => {
    const [show, setshow] = useState(false);
    const [cshow, csetshow] = useState(false);
    const [input, setInput] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        cpassword: ""
    }
    )



    const setVal = (e) => {
        const { name, value } = e.target;

        setInput(() => {
            return { ...input, [name]: value }
        })

    }

    const addData = async (e) => {
        e.preventDefault();

        const { name, email, role, password, cpassword } = input;

        if (name === "") {
            toast.warning("name is required!", {
                position: "top-center"
            });
        } else if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else if (cpassword === "") {
            toast.error("cpassword is required!", {
                position: "top-center"
            });
        }
        else if (cpassword.length < 6) {
            toast.error("confirm password must be 6 char!", {
                position: "top-center"
            });
        } else if (password !== cpassword) {
            toast.error("pass and Cpass are not matching!", {
                position: "top-center"
            });
        } else {

            const data = await fetch('http://localhost:8080/register', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name, email, role, password, cpassword
                })
            })
            const res = await data.json();
            console.log(res);
            if (data.status === 201) {
                toast.success("Registration Successfully done😃!", {
                    position: "top-center"
                });
                setInput({ ...input, name: "", email: "", password: "", cpassword: "" });
            }else if(res.status===422)
                alert("already exist");


        }
    }


    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1> Sign Up</h1>
                        <p> Hi,we are glad to have you back</p>
                    </div>
                    <form>
                        <div className='form_input'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' onChange={setVal} name='name' value={input.name} id='name' placeholder='Enter Your name'></input>
                        </div>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' onChange={setVal} name='email' id='email' value={input.email} placeholder='Enter Your Email Address'></input>
                        </div>
                        <div className='form_input'>
                            <label htmlFor='role'>Role</label>
                            <input type='text' onChange={setVal} name='role' value={input.role} id='rolw' placeholder='Signing up as producer or customer'></input>
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!show ? "password" : "text"} name="password" value={input.password} onChange={setVal} id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setshow(!show)}>
                                    {!show ? "show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <div className="two">
                                <input type={!cshow ? "password" : "text"} name="cpassword" onChange={setVal} value={input.cpassword} id="cpassword" placeholder='Enter Your password again' />
                                <div className="showpass" onClick={() => csetshow(!cshow)}>
                                    {!cshow ? "show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='button' onClick={addData}>Sign Up</button>
                        <p>Already have an Account?<Link to='/login'><span><strong> login</strong></span></Link></p>
                    </form>
                    {/* <Auth/>  */}
                    <br></br>
                    <span style={{ color: "white" }}>Go back? <Link to='/' style={{ color: "white" }}>Home</Link></span>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

