import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { LoginContext } from './context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { SwipeableTemporaryDrawer } from './demo';


export const Navbar = () => {
    const handleOptionClick = (option) => {
        history(`/mainoption?opt=${option}`);
    };

    const { logindata, setLoginData } = useContext(LoginContext);
    const [query,setQuery]=useState('');
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleSearch=()=>{
        if(query)
          history(`/display?query=${query}`);
        
    }

    const goDash = () => {
        history("/general")
    }

    const goprofile=()=>{
        history('/profile');
    }

    const saved=()=>{
        history('/saved');
    }

    return (
        < nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor:"grey"}}>
            <div className="container-fluid">
                <h2>Farm Smart</h2>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{marginLeft:"40px"}}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" ><Link className="nav-link h5 " to="/main" style={{ color: "black", fontSize: "25px" }}>Home</Link></li>
                        <li class="nav-item dropdown" style={{ marginLeft: "20px" }}>
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "black", fontSize: "20px" }}>
                                Category
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><button class="dropdown-item" onClick={()=>handleOptionClick('vegetables')}>Vegetables</button></li>
                                <li><button class="dropdown-item" onClick={()=>handleOptionClick('fruits')}>Fruits</button></li>
                                <li><button class="dropdown-item" onClick={()=>handleOptionClick('seeds')}>Seeds</button></li>
                               
                            </ul>
                        </li>
                    </ul>
                    <div class="d-flex" >
                        <input class="form-control me-2"  onKeyDown={(e)=>{
                e.keyCode===13 && e.shiftKey===false && handleSearch();
            }} type="search"  value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by product name" aria-label="Search" style={{width:"250px"}}/>
                        <button class="btn btn-outline bg-dark text-light "   type="submit" onClick={handleSearch}>Search</button>
                    </div>
                    {/* <div className='avtar'>

                        {
                            logindata ? <Avatar style={{ background: "grey", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick} >{logindata.name[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }
                    </div> */}
                    <SwipeableTemporaryDrawer/>
                </div>
            </div>
        </nav >
    )


}