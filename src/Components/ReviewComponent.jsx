import React from 'react';

//Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
import {FaStar, FaRegStar} from "react-icons/fa";

export const ReviewComponent = (props) => {
    let printArr = [false, false, false, false, false];
    let rating = props.Reviews.rating;
    printArr = printArr.map(e => {
        if (rating != 0) {
            rating--;
            return true;
        } else return false;
    })
    return (
        <Container className="mt-1 shadow">
            <hr />
            <Row>
                <Col xs="2" >
                    <img className="img" src={"/about.jpeg"} height="70" width="70" />
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
                            printArr.map(e => {
                                if (e) return <FaStar className="mb-2 mr-1 rated" color="yellow"/>
                                else return <FaRegStar className="mb-2 mr-1 empty-rated" color="yellow"/>
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
