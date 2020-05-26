import React from 'react';
import { Modal, Col, span, Button, Row } from 'react-bootstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { submitForm } from "./redux/Actions";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const mapDispatchToProps = dispatch => {
    submit: (data) => submitForm(data);
}

class ReviewModal extends React.Component {
    handleSubmit(v) {
        submit(v);
    }
    render() {
        return (
            <Modal show={this.props.contentShow} onHide={this.props.contentHide} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Add Review</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form model="ReviewForm" onSubmit={(v) => this.handleSubmit(v)}>
                        <Row className="form-group" >
                            <Col>
                                <span htmlFor="FullName" className="label label-default ml-2">Full Name:</span>
                            </Col>
                            <Col md={8}>
                                <Control.text model=".FullName" id="FullName" name="FullName" placeholder="Fullname" className="form-control " validators={{ required, minLength: minLength(5), maxLength: maxLength(15) }} />
                                <Errors className="text-danger" model=".FullName" show="touched" messages={{ required: "Field is required. ", minLength: "Must be greater than 5. ", maxLength: "Must be smaller than 15. " }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            {/* Put rating module here...
                 */}
                        </Row>
                        <Row className="form-group" >
                            <Col>
                                <span htmlFor="Review" className="label label-default ml-2">Your Review:</span>
                            </Col>
                            <Col md={8}>
                                <Control.textarea model=".Review" id="Review" name="Review" placeholder="write your review here..." className="form-control " validators={{ required, minLength: minLength(10) }} />
                                <Errors className="text-danger" model=".Review" show="touched" messages={{ required: "Field is required. ", minLength: "Must be longer than 10. " }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" variant="primary">Submit review</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect(mapDispatchToProps)(ReviewModal); 