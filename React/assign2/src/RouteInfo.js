import React from 'react';
import PriceInfo from './PriceInfo';

class RouteInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Sourcecity:'Dubai',
            Destinationcity:'Bangalore',
    }
}
render() {
    return (
        <div>
            <h2>Route Information</h2>
            <p>Source City: {this.state.Sourcecity}</p>
            <p>Destination City: {this.state.Destinationcity}</p>
        </div>
    )
}
}

export default RouteInfo;