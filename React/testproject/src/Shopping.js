import React from 'react';

class Shopping extends React.Component {
    render() {
        return (
            <div> 
                <h2>Shopping Page</h2>
                <Product name="Magna 10x Watch" price="3500" brand="Apple" mnname="1034 MicroWave" mprice="7000"/>
            </div>
        )
    }
}

class Product extends React.Component {
    render() {
        return(
            <div>
                <h2>List of products</h2>
                <Watch name={this.props.name} price={this.props.price} brand={this.props.brand}/>
                <MicroWave mnname={this.props.mnname} mprice={this.props.mprice} />
             </div>
        )
    }
}

class Watch extends React.Component {
    render() {
        return(
           <div><h3>Watch Details</h3>
            <p>Product name is {this.props.name}</p>
            <p>Product price is {this.props.price}</p>
            <p>Product brand is {this.props.brand}</p>
           </div>
        )
    }
}

class MicroWave extends React.Component{
    render(){
        return(
            <div><h3>MicroWave Details</h3>
            <p>Product name is {this.props.mnname}</p>
            <p>Product price is {this.props.mprice}</p>
            </div>
        )
    }
}
export default Shopping;

// ReactDOM.render(<shoppingcomponent />, document.getElementById('root'));