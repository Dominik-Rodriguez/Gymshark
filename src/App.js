import React from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import routes from './routes';

class App extends React.Component{
  render(){
    return (
      <div className="App">
        <Header />
        {/* <div className="menu">
                    <a href="" className="MensSide">MENS</a>
                    <a href="" className="WomensSide">WOMENS</a>
                    <a href="" className="AboutUs">ABOUT US</a>
                    {/* <a>ACCESSORIES</a> */}
                {/* </div> */}
          {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
