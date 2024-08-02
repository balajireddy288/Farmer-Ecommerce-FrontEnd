import React from 'react'
import { useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import image1 from './farm.jpg';
import { useContext} from 'react';
import { LoginContext } from './context';

const ExpandMore = styled((props) => {

    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const Display_prod = (props) => {
    const his=useNavigate();
    const { logindata, setLoginData } = useContext(LoginContext);
     const email = logindata.email;
     const role=logindata.role;
     console.log(role);
    const {product_name,price,quantity,image,produced_date,expiration_date,category}=props;
    const [readstate, setreadstate] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
        setreadstate(!readstate);
    };
const handlebutton=()=>{
    if(role=='consumer') his(`/buy?query=${product_name}&date=${produced_date}`)
        else his(`/edit?query=${product_name}`)
}
    return (
        <>
             <div className="my-3" style={{backgroundColor:"grey"}}>
            <div class="card" style={{ width: "300px",height:"auto",marginLeft:"150px" ,}} >
                
                <img src={image} class="card-img-top" alt="..." style={{width:'300px',height:"220px"}}/>
                <div class="card-body">
                    <h5 class="card-title">{product_name}</h5>
                    <h5 class="card-text" style={{ color: "black" }}>Price: {price }</h5>
                    <h5 class="card-text" style={{ color: "black" }}>Total Quantity: { quantity}</h5>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph fontSize={17}>
                            Produced Date:&nbsp;&nbsp;&nbsp;{new Date(produced_date).toLocaleDateString()} <br>
                            </br>
                            Expiration Date:&nbsp;&nbsp;&nbsp;{new Date(expiration_date).toLocaleDateString()}
                        </Typography>

                    </CardContent>
                </Collapse>
                <div style={{}}><CardActions disableSpacing>

                    <button expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more" style={{ border: "none", backgroundColor: "white", color: "black",marginLeft:'170px' }}><span> {readstate === false ? "view more..." : "View less.."}</span></button>
                </CardActions></div>
                <div>
                <center><button style={{width:"100px",display:"inline-block",padding:"8px 10px",backgroundColor:"green",borderRadius:"10px",color:"white"}} onClick={handlebutton} >{role=='producer'?"Edit":"Buy"}</button></center>
                </div>
               
            </div>
            </div>


        </>
    )
}
