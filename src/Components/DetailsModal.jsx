import React from 'react';

//Bootstrap
import { Modal, Badge, Button, Row } from 'react-bootstrap';

import { ReviewComponent } from './ReviewComponent';
import {FaShoppingCart, FaWindowClose} from 'react-icons/fa';

class MyModal extends React.Component {
  render() {
    if (this.props.Reviews.isLoading) return <div>Loading....</div>
    else return (

      <Modal
        show={this.props.contentShow}
        onHide={this.props.contentOnHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.contentAll.value.name}
            <h6>- {this.props.contentAll.value.photographer}</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{this.props.contentAll.value.color.map(e => <Badge className="mr-3" variant="success">{e}</Badge>)}</h5>
          <p>
            {this.props.contentAll.value.desc}
          </p>
          <Row className="">
            <Button className="ml-3 mb-2" variant="success" onClick={() => { this.props.modify(this.props.contentAll.value); this.props.onUpdateCartState() }}><FaShoppingCart className="mr-2"/> {this.props.inCart}</Button>
            <Button className="mx-2 mb-2" onClick={this.props.contentOnHide}><FaWindowClose className="mr-2"/>Close</Button>
          </Row>
          <h3>Reviews: </h3>
          <hr />
          {this.props.Reviews.map(e => {
            return <ReviewComponent Reviews={e} />
          })}
        </Modal.Body>
      </Modal>
    );
  }
}

export default MyModal