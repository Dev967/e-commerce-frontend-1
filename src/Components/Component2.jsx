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
        } else if(c === "d" && DummyArr[DummyArr.indexOf(i)].amount !== 1){
        DummyArr[DummyArr.indexOf(i)].amount -= 1;
        }else if(c === "r"){
        DummyArr[DummyArr.indexOf(i)].in_cart = false;
        }
        d.modifyData(DummyArr);
    }
    removeAll(x){
        let DummyData = [...x.data];
        DummyData.forEach(e=>{e.in_cart = false;})
        x.modifyData(DummyData);        
    }
    showCart(a){
        if(a.in_cart_data[0]){
                return <Container fluid>
                    <Row>{a.in_cart_data.map(b =>
                    <Col xs="auto" lg="6" md="6" sm="auto">
                    <Card className="rounded shadow bg-dark text-white m-1">
                        <Card.Img src={b.img_src} />
                        <Card.ImgOverlay>
                        <Card.Title><Col>
                        {b.name} 
                        <Badge variant="warning" className="float-right">${b.price}</Badge>
                        </Col>
                        </Card.Title>
                        <Card.Body>
                        <Row>
                            <Col>
                            <Button variant="secondary" className="mr-4 mt-2"><i className="fa fa-info-circle fa-large mr-1"></i>Details</Button>
                            <Button variant="warning" className="mt-2" onClick={()=>{this.operate(a,b,"r")}} >Remove</Button>
                            </Col>
                        </Row>
                        </Card.Body>
                        </Card.ImgOverlay>
                    </Card>
                    </Col>
                        )}
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Button variant="danger" onClick={()=>{this.removeAll(a)}}>Remove All</Button>
                            <Button variant="success" className="float-right">Next</Button>
                        </Col>
                    </Row>
                    </Container>
        } else {
            return(
                    <Col className="my-auto">
                    <h3 className="display-3">Nothing in cart....</h3>
                    <Button className="text-white btn-large this2" variant="danger"><NavLink to="/">Add Products</NavLink></Button>
                    </Col>
            )
        }
    }
    render(){
        return(
         <React.Fragment>
              <Container>
                  <Consumer>
                {e => this.showCart(e)}
                </Consumer>
              </Container>
         </React.Fragment>
        );
    }
}

export {Component2};