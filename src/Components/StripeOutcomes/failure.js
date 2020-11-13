import React from 'react';
import './failure.scss';
import {Link} from 'react-router-dom';

function Failure(){
    return(
        <div className="Failure">
            <div className="FailureBox">
                <h2>oops, looks like there might have been a mistake</h2>
    <p>If you would like to continue shopping with us, click{" "}
        <Link to="/" className="links">
            here.
        </Link>
    </p>
            </div>
        </div>
    )
}

export default Failure;