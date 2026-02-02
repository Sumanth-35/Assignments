import React from 'react';

class PriceInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state={TicketPrice:45000}
    }

render() {
    return (
        <div>
            <h2>Price Information</h2>
            <p>Ticket Price: {this.state.TicketPrice}</p>
        </div>
    )
}
}
export default PriceInfo;