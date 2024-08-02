import React from 'react'
import './header.css'
export const About = () => {
    return (
        <>
            <h2 style={{ textAlign: "center" }}><strong>About us</strong></h2>
            <div className='welcome-container'>
                <h4> Farm Smart Solutions is a forward-thinking company specializing in the intersection of agriculture and technology.</h4>
                <p>At Farm Smart Solutions, we are dedicated to revolutionizing the agricultural landscape through innovative technology and insightful solutions. Our mission is to empower farmers and agricultural businesses by providing state-of-the-art tools and resources that enhance productivity, efficiency, and sustainability.</p>
            </div>
            <div style={{ marginLeft: "50px" }}>
                <h4><strong>What We Offer</strong></h4>
                <ul>
                    <li><p><strong>Direct-to-Consumer Sales:</strong>  Connect directly with consumers and market your produce through our user-friendly platform. Increase your reach and profitability by cutting out intermediaries.</p></li>
                    <li><p><strong>Market Insights: </strong> Gain valuable insights into consumer preferences, market trends, and pricing strategies to optimize your sales and grow your business.</p></li>
                    
                </ul>
            </div>
            <br></br>
        </>
    )
}
