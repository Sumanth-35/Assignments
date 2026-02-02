import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            num1:0,
        }
    }
    addition(){
        this.setState({num1: this.state.num1 + 1});
    }

    subtraction(){
        this.setState({num1: this.state.num1 - 1});
    }
    reset(){
        this.setState({num1: 0});
    }

    render() {
        return(
            <div>
                <h2>Calculator</h2>
                <p>Value: {this.state.num1}</p>
                <button onClick={ () => this.addition() }> Add </button><br/>
                <button onClick={ () => this.subtraction() }> Subtract </button><br/>
                <button onClick={ () => this.reset() }> Reset </button>

             </div>
        )
    }
}
export default Calculator;