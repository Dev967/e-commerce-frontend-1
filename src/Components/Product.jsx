import React from 'react';
import {MyModal} from './DetailsModal';
//Bootstrap
import {Col, Row, Card, Badge, Button} from 'react-bootstrap';

export class Product extends React.Component{
    constructor(props){
        super();
        if(props.value.in_cart) this.state = {cart_state: "Remove"}
        else this.state = {cart_state: "Add"}
    }
    state ={
        modal_show: false,
    }

    toggleToast = () => {
        if(this.state.cart_state === "Add") this.props.handleToast();
    }

    modalSetShow = () => this.setState({modal_show:true});
    modalSetHide = () => this.setState({modal_show:false});
    
    updateUpdateCartState = () => this.update_cart_state();

    update_cart_state(){
        let new_state;
        if(this.props.value.in_cart){
            new_state = "Remove";
            this.setState({cart_state: new_state})
        }  else {
            new_state = "Add";
            this.setState({cart_state: new_state})
        }
    }
    rating(){
        let printAr = [false,false,false,false,false];
        let rating =0;
        this.props.value.Review.forEach(e => {rating += e.rating});
            rating /= this.props.value.Review.length;
            rating = Math.round(rating);
            if(Number.isInteger(rating)){
                printAr = printAr.map(e =>{
                    if(rating != 0){
                       rating--;
                       return(true);
                   } else{
                       return(false);
                   }
               })
        }
            return printAr.map(e => {
                if(e) return <i className = "fa fa-star fa-lg mr-1 mb-2 rated" />
                else return <i className = "fa fa-star-o fa-lg mr-1 mb-2 empty-rated" />
            })
    }
    render(){
        console.log(this.state);
        // console.log(this.state.toast_show);
        return(
            <Col lg={3} md="auto" sm="6" xs="auto" className="mb-0 col-md-4">
            <Card className="shadow rounded">
            <Card.Img variant="top" src={this.props.value.img_src} />
            <Card.Title>{this.props.value.name}</Card.Title>
               <Card.Body>
               <Row>
                   <Col><h5>Price: </h5></Col>
                   <Col>
                   <h5>
                   <Badge className="float-right" variant="warning">
                   <span className="fa fa-tag fa-large mr-1"></span>
                   {this.props.value.price}
                   </Badge>
                   </h5>
                   </Col>
               </Row>
                   {this.rating()}
               <h5>Available Colors:</h5> 
               {this.props.value.color.map(f=>
                   <Badge variant="success" className="mr-2">
                       {f}
                   </Badge>,
                   )}
                  <Row className="mt-2">
                      <Col>
                      <Button variant="danger" className="mr-2" onClick={this.modalSetShow}><i className="fa fa-info-circle fa-large mr-1"></i>More</Button>
                     <Button variant="info" onClick={()=> {this.props.callParent(this.props.value); this.toggleToast(); this.update_cart_state()}}><i className="fa fa-shopping-cart fa-lg mr-1"></i>{this.state.cart_state}</Button>
                      </Col>
                  </Row>
               </Card.Body>
           </Card>
           <MyModal contentShow={this.state.modal_show} contentOnHide={this.modalSetHide} contentAll={this.props} inCart={this.state.cart_state} onUpdateCartState={this.updateUpdateCartState} Reviews={this.props.value.Review} />
           </Col>
        );
    }
}