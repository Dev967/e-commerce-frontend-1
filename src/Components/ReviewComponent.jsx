import React from 'react';

//Bootstrap
import {Container, Row, Col} from 'react-bootstrap';

export const ReviewComponent = (props) => {
    let printArr = [false,false,false,false,false];
    let rating = props.Reviews.rating;
    printArr = printArr.map(e => {
        if(rating != 0){
            rating --;
            console.log(rating);
            return true;
        }else return false;
    })
    return(
        <Container className="mt-1 shadow">
            <hr />
            <Row>
                <Col xs="2" >
                    <img className="img" src="/about.jpeg" height="70" width="70" />
                </Col>
                <Col>
                    <Row>
                        <h4>{props.Reviews.name}</h4>
                        <Col>
                            <div className="float-right">{props.Reviews.date}</div>
                        </Col>
                    </Row>
                <Row>
                {
                    printArr.map(e=>{
                        if(e) return <i className="fa fa-lg fa-star mb-2 mr-1 rated" />
                        else return <i className = "fa fa-lg fa-star-o mb-2 mr-1 empty-rated" />
                    })
                }
                </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="mt-2">{props.Reviews.review}</p>
                </Col>
            </Row>
        </Container>
    );
}
