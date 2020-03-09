import React from 'react';
import ReactDOM from 'react-dom';

//Data
import Data from './Assets/HomeProducts';
import Category from './Assets/Categories';

//react-Bootstrap
import {Card,Container,Row,Col,Button,Badge,ButtonGroup} from 'react-bootstrap';

//bootstrap CSS
import'./Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css'; 

import {Consumer} from './Context';

class Product extends React.Component{
    state = {
        cart_state : "Add",
    }
    update_cart_state(){
        let new_state;
        if(this.props.value.in_cart){
            new_state = "Remove";
            this.setState({cart_state: new_state})
        }  else {
            new_state = "Add";
            this.setState({cart_state: new_state})
        }
    }
    render(){
        return(
            <Col xs={3} className="mb-3">
            <Card className="shadow rounded">
            <Card.Img variant="top" src={this.props.value.img_src} />
            <Card.Title>{this.props.value.name}</Card.Title>
               <Card.Body>
               <Row>
                   <Col><h5>Price: </h5></Col>
                   <Col>
                   <h5>
                   <Badge className="float-right" variant="warning">
                   {this.props.value.price}
                   </Badge>
                   </h5>
                   </Col>
               </Row>
               <h5>Available Colors:</h5> 
               {this.props.value.color.map(f=>
                   <Badge variant="success" className="mr-2">
                       {f}
                   </Badge>,
                   )}
                  <Row className="mt-2">
                      <Col>
                      <Button variant="danger" className="mr-2">More</Button>
                     <Button variant="info" onClick={()=> {this.props.callParent(this.props.value)}}>{this.state.cart_state}</Button>
                      </Col>
                  </Row>
               </Card.Body>
           </Card>
           </Col>
        );
    }
}
class Home extends React.Component{
    filter(f){
        let temp = Data.filter(g=> {
           return(g.category.includes(f));
        });

        // ReactDOM.render(temp.map(e=> <Product key={e.id} value={e}/>), document.getElementById('Products'));
    }
    render_products(x){
        const add_in_cart = (b)=>{
            let index = x.data.indexOf(b);
            let newArray = [...x.data];
            if(x.data[index].in_cart) newArray[index].in_cart = false;
            else newArray[index].in_cart = true;

            x.modifyData(newArray);    
        }
        return x.data.map(p => <Product callParent={add_in_cart} value={p} key={p.id} />)
    }
    render(){
        return(
            <React.Fragment>
                <ButtonGroup className="my-4">
                {Category.map(e=><Button key={e.id}onClick={()=>{this.filter(e.name);}} variant="outline-secondary" className="mr-2">{e.name}</Button>)}
            </ButtonGroup>
            <Container fluid>
            <Row id="Products">
            <Consumer>
                {e=> this.render_products(e)}
            </Consumer>
            </Row>
            </Container>
            </React.Fragment>
        );
    }
}

export default Home;