import React from 'react';
import RouteInfo from './RouteInfo';

class FlightInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            airlineName:'Emirates',
            airlineCode:'EK203',
            seats:150,
           
        }
        }
    
    render() {
        return (
            <div>
                <h2>Flight Information</h2>
                <p>Airline Name: {this.state.airlineName}</p>
                <p>Airline Code: {this.state.airlineCode}</p>
                <p>Number of Seats: {this.state.seats}</p>
                
            </div>
        )
    }
}

export default FlightInfo;