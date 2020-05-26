import React from 'react';
import {Toast, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "../MyToast.css";

export const MyToast = (props) => {
    return(
        <div>
            <Toast show={props.show} onClose={props.onClose} className="shadow-lg rounded">
            <Toast.Header><strong><h5>Product Added</h5></strong></Toast.Header>
            <Toast.Body>
                <strong>
                    <h5>
                    Your produts has been added to cart
                    </h5>
                </strong>
                <Button className="this" variant="secondary"><Link to="/Component2">Cart</Link></Button>
            </Toast.Body>
        </Toast>
        </div>
    );
}