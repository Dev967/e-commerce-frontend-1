import React from 'react';

//Bootstrap
import {Modal, Badge, Button, Row} from 'react-bootstrap';

import {ReviewComponent} from './ReviewComponent';
export const MyModal = (props) =>{
    return (
        <Modal
          show ={ props.contentShow}
          onHide = {props.contentOnHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.contentAll.value.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>{props.contentAll.value.color.map(e=><Badge className="mr-3" variant="success">{e}</Badge>)}</h5>
            <p>
              {props.contentAll.value.desc}
            </p>
            <Row className="">
                <Button className="ml-3 mb-2" variant="success" onClick={()=> {props.contentAll.callParent(props.contentAll.value);props.onUpdateCartState()}}><i className="fa fa-shopping-cart fa-lg mr-2" /> {props.inCart}</Button>
                <Button className="mx-2 mb-2" onClick={props.contentOnHide}><i className="fa fa-close fa-g mr-2" />Close</Button>
                <Button className="mb-2 btn-secondary"><i className="fa fa-pencil fa-lg mr-2" />Add Review</Button>
            </Row>         
            <h3>Reviews: </h3>
            <hr />
            {props.Reviews.map(e=>{
               return <ReviewComponent Reviews={e} />
            })}
          </Modal.Body>
        </Modal>
      );
    }