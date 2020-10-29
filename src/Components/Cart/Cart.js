import React from 'react';
import {connect} from 'react-redux';

class Cart extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props)
        return(
            <div className="Cart">
                
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, null)(Cart);