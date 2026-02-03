import React from 'react';

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = { price: 1000 ,  discount: 10 };
    }

    // changeprice() {
    //     this.setState({ price: 2000, discount: 20 });
    // }

    render() {
        setTimeout(() => {
            this.setState({ price: 2000, discount: 20 })
        }, 5000);
        
        return (
            <div>
                <p>The price of the component is {this.state.price}</p>
                {/* <button onClick={ () => this.changeprice() }>  update price</button> */}
                <p>the discount offered is {this.state.discount}</p>
            </div>
        )
    }
}

export default Price;