import React from 'react';
import {NavLink} from 'react-router-dom';
import {Row,Col,Container,Button,Card,Badge} from 'react-bootstrap';
import {Consumer} from './Context';

//React Bootstrap
import'./Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css'; 

class Component2 extends React.Component{
    operate(d,i,c){
        let DummyArr = [...d.data];
        if(c === "i"){
        DummyArr[DummyArr.indexOf(i)].amount += 1;
        } else if(c === "d" && DummyArr[DummyArr.indexOf(i)].amount ===! 1){
        DummyArr[DummyArr.indexOf(i)].amount -= 1;
        }else if(c === "r"){
        DummyArr[DummyArr.indexOf(i)].in_cart = false;
        }
        d.modifyData(DummyArr);
    }
    showCart(a){
        if(a.in_cart_data[0]){
                return a.in_cart_data.map(b =>
                    <Col xs={4}>
                    <Card className="rounded shadow bg-dark text-white m-1">
                        <Card.Img src={b.img_src} />
                        <Card.ImgOverlay>
                        <Card.Title><Col>
                        {b.name} 
                        <Badge variant="warning" className="float-right">{b.price}</Badge>
                        </Col>
                        </Card.Title>
                        <Card.Body>
                        <Row>
                            <Col>Quantity</Col>
                            <Col>
                            <Badge className="float-right" variant="success">{b.amount}</Badge>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                        <Col>
                            <Button className="" variant="primary" onClick={()=>{this.operate(a,b,"i")}}>+</Button>
                            <Button className="mx-1" variant="primary" onClick={()=>{this.operate(a,b,"d")}}>-</Button>
                        </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                            <Button variant="secondary" className="mr-4">Details</Button>
                            <Button variant="danger" onClick={()=>{this.operate(a,b,"r")}} >Remove</Button>
                            </Col>
                        </Row>
                        </Card.Body>
                        </Card.ImgOverlay>
                    </Card>
                    </Col>
                        )
        } else {
            return(
                    <Col className="my-auto">
                    <h3 className="display-3">Nothing in cart....</h3>
                    <Button className="text-white btn-large" variant="danger"><NavLink to="/">Add Products</NavLink></Button>
                    </Col>
            )
        }
    }
    render(){
        return(
         <React.Fragment>
              <Container>
                  <Row className="h-100">
                  <Consumer>
                {e => this.showCart(e)}
                </Consumer>
                  </Row>
              </Container>
         </React.Fragment>
        );
    }
}

export {Component2};