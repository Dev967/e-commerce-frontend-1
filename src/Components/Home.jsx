import React from 'react';
import ReactDOM from 'react-dom';

//Data
import Data from './Assets/HomeProducts';
import Category from './Assets/Categories';

//react-Bootstrap
import {Card,Container,Row,Col,Button,Badge,ButtonGroup} from 'react-bootstrap';

//bootstrap CSS
import'./Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css'; 

//Image Placeholder
import BlankLogo from "./Assets/Images/about.jpeg";

class Product extends React.Component{
    render(){
        return(
            <Col xs={3} className="mb-3">
            <Card className="shadow rounded">
            <Card.Img variant="top" src={BlankLogo} />
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
                   </Badge>
                   )}
                  <Row className="mt-2">
                      <Col>
                      <Button variant="danger" className="mr-2">Purchase</Button>
                      <Button variant="info">More</Button>
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
        ReactDOM.render(temp.map(e=> <Product key={e.id} value={e}/>), document.getElementById('Products'));
    }
    render(){
        return(
            <React.Fragment>
                <ButtonGroup className="my-4">
                {Category.map(e=><Button key={e.id}onClick={()=>{this.filter(e.name);}} variant="outline-secondary" className="mr-2">{e.name}</Button>)}
            </ButtonGroup>
            <Container fluid>
            <Row id="Products">
            {Data.map(e=>
                <Product value={e} key={e.id}/>
            )}
            </Row>
            </Container>
            </React.Fragment>
        );
    }
}

export default Home;