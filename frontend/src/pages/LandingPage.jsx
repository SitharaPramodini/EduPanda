import React from 'react';
import logo from '../../public/edupanda.png'
import './user/usermanage.css'
import { Link } from "react-router-dom";


function App() {
    return (
        <div className="containers">
            <div className="splits lefts">
                <div className="centered">
                    <h2 className='land-name'>EduPanda</h2>
                    <Link to="/login">
                        <button className="log">
                            Login
                        </button>
                    </Link>
                </div>
            </div>

            <div className="splits rights">
                <div className="centered">
                    <img className="land-logo" src={logo} alt="Avatar woman" />
                    <h2 className='land-head'>Transforming Education, Together</h2>
                    <p className='land-sub'>Experience a new era of learning with innovative courses designed to meet the demands of the modern world. Join us and shape the future of education</p>
                    <Link to="/register">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                            Learner
                        </button>
                    </Link>
                    <Link to="/instructor/register">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                            Instructor
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default App;
