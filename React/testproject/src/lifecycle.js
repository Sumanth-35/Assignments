import React from 'react';

// class Music extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             instrument:'Guitar',
//         }
//     }

    // shouldComponentUpdate(){          //componenet will be enabled or disabled
    //     return true;  // or false -it won't change
    // }

    // change =() =>{
    //     this.setState({instrument:'Piano'});
    // }

    // getSnapshotBeforeUpdate(prevProps, prevState){  // display the previous state or previous props
    //     document.getElementById("c1").innerHTML = " Previous Instrument is " + prevState.instrument;  
    // }

    // componentDidUpdate(){        //displays the latest value of instrument
    //     document.getElementById("c2").innerHTML = " The updated Instrument is " + this.state.instrument;
    // }

    // static getDerivedStateFromProps(props, state){
    //     return {instrument: props.New};
    // }



    // componentDidMount(){
    //     setTimeout(() => {
    //         this.setState({instrument:'Piano'})
    //     },3000); 
    // }
        
//     render() {
//         return (
//             <div>
//                 <h2>I know how to play this {this.state.instrument} instrument</h2>
//                 <button type="button" onClick={() => this.change()}>Change Instrument</button>
//                 <div id ="c1"></div>
//                 <div id ="c2"></div>
//             </div>
//         )
//     }
// }

// export default Music;

class ComponentWillUnmount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }
    render() {
        return (
            <div>
                <p>{this.state.show ? <Child/> : null}</p>
                <button onClick={ () => {
                    this.setState({show: !this.state.show})
                }}>
                    Toggle
                </button>
            </div>
        )
    }
}

class Child extends React.Component {
    componentWillUnmount(){
        alert("Component is unmounting");
    }
    render() {
        return (
            <h2>I am a Child Component</h2>
        )
    }
}

export default ComponentWillUnmount;