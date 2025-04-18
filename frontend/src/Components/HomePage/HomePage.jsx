import React from 'react'
import "./HomePage.css"
import { FaAirbnb } from 'react-icons/fa'
const HomePage = () => {

    return (
        <section className='home-page-section'>
            <div className="container">
                <div className="home-main">
                    <div className="inner-box">
                        <h2 className='text-interview-ai' ><span className='text-interview'>Interviewer</span>
                            <span className='text-ai'>  AI</span></h2>
                        <h5>AI Interview Assistant for real-time support. Unlimited sessions,dual responses,and cutting-edge AI models</h5>
                        <div className='loder'>
                            <svg className='svg-width' viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                                <circle className="spin" cx="400" cy="400" fill="none"
                                    r="200" strokeWidth="50" stroke="#E387FF"
                                    strokeDasharray="700 1400"
                                    strokeLinecap="round" />
                            </svg>
                            <FaAirbnb className='custom-icon' />
                            {/* <div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage
