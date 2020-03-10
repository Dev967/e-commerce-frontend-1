import React from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import {Consumer} from './Context';
  
class Component2 extends React.Component{
    state = {
        in_cart_count : 0,
    }
    // show_cart(a){
    //         if(a.in_cart){
    //             return(
    //                 <Row>
    //                     <Container className="mx-auto">
    //                         <Row>
    //                             <Col>
    //                             <h3>{a.name}</h3>
    //                             </Col>
    //                         </Row>
    //                     </Container>
    //                 </Row>
    //                 );
    //         }
    //     }
    showCart(a){
        let tempArray = a.data.filter(b=>{return(b.in_cart)});
        return tempArray.map(c=> <h4>{c.name}</h4>)
    }
    render(){

        return(
         <React.Fragment>
                <Consumer>
                {e => this.showCart(e)}
                </Consumer>
         </React.Fragment>
        );
    }
}

export {Component2};