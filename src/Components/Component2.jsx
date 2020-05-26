import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Container, Button, Card, Badge } from 'react-bootstrap';

//React Bootstrap
import './Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css';

import { modify, setCount } from './Redux/Actions';
import { connect } from 'react-redux';
const mapDispatchToProps = dispatch => ({
    modifyData: (c) => dispatch(modify(c)),
    setCount: (e) => dispatch(setCount(e))
})

const mapStateToProps = state => ({
    data: state.MainData.data,
    in_cart_data: state.Cart.inCartData,
})

class Component2 extends React.Component {
    remove(i) {
        let DummyArr = [...this.props.data];

        DummyArr[DummyArr.indexOf(i)].in_cart = false;
        this.props.modifyData(DummyArr);
    }
    removeAll() {
        let DummyData = [...this.props.data];
        DummyData.forEach(e => { e.in_cart = false; })
        this.props.modifyData(DummyData);
    }
    showCart() {
        if (this.props.in_cart_data[0]) {
            return <Container fluid>
                <Row>{this.props.in_cart_data.map(b =>
                    <Col xs="auto" lg="4" md="6" sm="auto">
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
                                            <Button variant="secondary" className="mr-4 mt-2">Details</Button>
                                            <Button variant="warning" className="mt-2" onClick={() => { this.remove(b) }} >Remove</Button>
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
                        <Button variant="danger" onClick={() => { this.removeAll() }}>Remove All</Button>
                        <Button variant="success" className="float-right">Next</Button>
                    </Col>
                </Row>
            </Container>
        } else {
            return (
                <Col className="my-auto">
                    <h3 className="display-3">Nothing in cart....</h3>
                    <Button className="text-white btn-large this2" variant="danger"><NavLink to="/">Add Products</NavLink></Button>
                </Col>
            )
        }
    }
    render() {
        return (
            <React.Fragment>
                <Container className="mt-3">
                    {this.showCart()}
                </Container>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component2);