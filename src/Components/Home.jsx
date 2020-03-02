import React from 'react';

//Data
import Data from './Assets/HomeProducts';

//react-Bootstrap
import {Card,Container,Row,Col,Button,Badge} from 'react-bootstrap';

//bootstrap CSS
import'./Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css'; 

//Image Placeholder
import BlankLogo from "./Assets/Images/about.jpeg";

class Home extends React.Component{

    render(){
        return(
            <Container fluid>
            <Row>
            {Data.map(e=>
            <Col xs={3} className="mb-3">
             <Card>
             <Card.Img variant="top" src={BlankLogo} />
             <Card.Title>{e.name}</Card.Title>
                <Card.Body>
                <Row>
                    <Col><h5>Price: </h5></Col>
                    <Col>
                    <h5>
                    <Badge className="float-right" variant="warning">
                    {e.price}
                    </Badge>
                    </h5>
                    </Col>
                </Row>
                <h5>Available Colors:</h5> 
                {e.color.map(f=>
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
            )}
            </Row>
            </Container>
        );
    }
}

export default Home;