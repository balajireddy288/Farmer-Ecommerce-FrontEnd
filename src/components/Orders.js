import React, { useEffect } from 'react'
import { Navbar } from './navbar'
import { useContext,useState } from 'react';
import { LoginContext } from './context';
import './styles.css'

export const Orders = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    const email = logindata.email;
    const role=logindata.role;
    const [transactions, setTransactions] = useState([]);
    const fetchorders = async () => {
        const data = await fetch(`http://localhost:8080/orders/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });
        let res = await data.json();
        console.log("orders",res)
        setTransactions(res);
        console.log(transactions)
    }
    useEffect(()=>{
        fetchorders()
    },[]);

    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', color: "Black", borderRadius: '5px' }}>
                <h1>Transaction History</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', color: 'white', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>

                <table style={{ width: '100%', color: 'black', borderCollapse: "collapse", border: '1px solid black' }}>
                    <thead>
                        <tr >
                            <th className="table-cell" style={{ border: '2px solid black' }}>Product_Name</th>
                            <th className="table-cell" style={{ border: '2px solid black' }}>Price</th>
                            <th className="table-cell" style={{ border: '2px solid black' }}>Quantity</th>
                            <th className="table-cell" style={{ border: '2px solid black' }}>Total Amount</th>
                            <th className="table-cell" style={{ border: '2px solid black' }}>Address</th>
                            <th className="table-cell" style={{ border: '2px solid black' }}>PinCode</th>
                            <th className='table-cell' style={{ border: '2px solid black' }}>Date & Time</th>
                            <th className='table-cell' style={{ border: '2px solid black' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? transactions.sort((a, b) => new Date(b.formattedDate) - new Date(a.formattedDate)).map((transaction, index) => (
                            <tr key={index}  style={{ border: '1px solid white' }}>
                                <td className="table-cell" style={{ border: '2px solid black' }}>{transaction.product_name}</td>
                                <td className="table-cell" style={{ border: '2px solid black' }}>{transaction.price}</td>
                                <td className="table-cell" style={{ border: '2px solid black' }}>{transaction.quantity}</td>
                                <td className="table-cell" style={{ border: '2px solid black' }}>{transaction.totalAmount}</td>
                                <td className="table-cell" style={{ overflowWrap: 'break-word', whiteSpace: 'normal',wordWrap:"break-word",border: '2px solid black' }}>{transaction.address}</td>
                                <td className="table-cell" style={{ border: '2px solid black' }}>{transaction.pincode}</td>
                                <td className='table-cell' style={{ border: '2px solid black' }}>{transaction.dateTime}</td>
                                <td className='table-cell' style={{ border: '2px solid black' }}><strong>{transaction.status}</strong></td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6"><h2>No Orders available</h2></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
