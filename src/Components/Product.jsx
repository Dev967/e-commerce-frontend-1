import React from 'react';
import MyModal from './DetailsModal';
//Bootstrap
import { Col, Row, Card, Badge, Button } from 'react-bootstrap';
import { modify } from './Redux/Actions';
import { connect } from 'react-redux';
import { baseURL } from "./Redux/Actions";
// import "./Assets/font-awesome.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FaStar, FaRegStar, FaInfo, FaCartArrowDown, FaTag } from 'react-icons/fa';

const mapDispatchToProps = dispatch => {
    return {
        modifyData: (c) => dispatch(modify(c)),
    }
}

const mapStateToProps = state => {
    return {
        data: state.MainData.data,
    }
}

class Product extends React.Component {
    constructor(props) {
        super();
        if (props.value.in_cart) this.state = { cart_state: "Remove" }
        else this.state = { cart_state: "Add" }
    }
    state = {
        modal_show: false,
        review_modal_show: false
    }

    addInCart = (p) => {
        const { data, modifyData, setCount } = this.props;
        let index = data.indexOf(p);
        let newData = [...data];
        newData[index].in_cart = !newData[index].in_cart;

        modifyData(newData);
    }

    toggleToast = () => {
        if (this.state.cart_state === "Add") this.props.handleToast();
    }

    toggleReviewModal = () => this.setState({ review_modal_show: !this.state.review_modal_show })

    modalSetShow = () => {
        this.setState({ modal_show: true });
    }
    modalSetHide = () => this.setState({ modal_show: false });

    updateUpdateCartState = () => this.update_cart_state();

    update_cart_state() {
        let new_state;
        if (this.props.value.in_cart) {
            new_state = "Remove";
            this.setState({ cart_state: new_state })
        } else {
            new_state = "Add";
            this.setState({ cart_state: new_state })
        }
    }
    rating() {
        let printAr = [false, false, false, false, false];
        let rating = 0;
        this.props.value.Review.forEach(e => { rating += e.rating });
        rating /= this.props.value.Review.length;
        rating = Math.round(rating);
        if (Number.isInteger(rating)) {
            printAr = printAr.map(e => {
                if (rating != 0) {
                    rating--;
                    return (true);
                } else {
                    return (false);
                }
            })
        }
        return printAr.map(e => {
            if (e) return /*<i className="fa fa-star fa-lg mr-1 mb-2 rated" />*/ <FaStar color="yellow" className="rated mr-1 mb-2 " />
            else return /*<i className="fa fa-star-o fa-lg mr-1 mb-2 empty-rated" />*/ <FaRegStar color="yellow" className="empty-rated mr-1 mb-2"/>
        })
    }
    render() {
        return (
            <Col lg={3} md="auto" sm="6" xs="auto" className="mb-0 col-md-4">
                <Card className="shadow rounded">
                    <Card.Img variant="top" src={this.props.value.img_src} />
                    <Card.Title className="pl-3 pt-2">{this.props.value.name}</Card.Title>
                    <Card.Body>
                        <Row>
                            <Col><h5>Price: </h5></Col>
                            <Col>
                                <h5>
                                    <Badge className="float-right" variant="warning">
                                        <FaTag className="mr-1"/>$
                   {this.props.value.price}
                                    </Badge>
                                </h5>
                            </Col>
                        </Row>
                        {this.rating()}
                        <h5>Tags:</h5>
                        {this.props.value.color.map(f =>
                            <Badge variant="success" className="mr-2">
                                {f}
                            </Badge>,
                        )}
                        <Row className="mt-2">
                            <Col>
                                <Button variant="danger" className="mr-2" onClick={this.modalSetShow}><FaInfo className="mr-1"/>More</Button>
                                <Button variant="info" onClick={() => {/*this.props.callParent(this.props.value);*/ this.addInCart(this.props.value); this.toggleToast(); this.update_cart_state() }}><FaCartArrowDown className="mr-1"/>{this.state.cart_state}</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <MyModal toggleReviewModal={this.toggleReviewModal} contentShow={this.state.modal_show} contentOnHide={this.modalSetHide} modify={this.addInCart} contentAll={this.props} inCart={this.state.cart_state} onUpdateCartState={this.updateUpdateCartState} Reviews={this.props.value.Review} />
            </Col>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);