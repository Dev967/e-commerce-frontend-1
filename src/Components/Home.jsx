import React from 'react';

//react-Bootstrap
import {Card,Container,Row,Col,Button,Badge,Modal,Toast} from 'react-bootstrap';

//bootstrap CSS
import'./Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css'; 

import {Consumer} from './Context';

import categories from './Assets/Categories';

const ReviewComponent = (props) => {
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
        <React.Fragment>
            <Row>
                <Col>
                    <h4>{props.Reviews.name}</h4>
                </Col>
                <Col>
                    <div className="float-right">{props.Reviews.date}</div>
                </Col>
            </Row>
            {
                printArr.map(e=>{
                    if(e) return <i className="fa fa-lg fa-star mb-2 mr -1" />
                    else return <i className = "fa fa-lg fa-star-o mb-2 mr-1" />
                })
            }
            <p>{props.Reviews.review}</p>
        </React.Fragment>
    );
}
const MyModal = (props) =>{
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

            <h1>Reviews: </h1>
            {props.Reviews.map(e=>{
               return <ReviewComponent Reviews={e} />
            })}
          </Modal.Body>
          <Modal.Footer>
            <Row>
                <Col>
    <Button variant="success" onClick={()=> {props.contentAll.callParent(props.contentAll.value);props.onUpdateCartState()}}>{props.inCart}</Button>
                </Col>
                <Col className="float-right">
            <Button onClick={props.contentOnHide}>Close</Button>
                </Col>
            </Row>            
          </Modal.Footer>
        </Modal>
      );
    }

class Product extends React.Component{
    constructor(props){
        super();
        if(props.value.in_cart) this.state = {cart_state: "Remove"}
        else this.state = {cart_state: "Add"}
    }
    state ={
        modal_show: false,
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
                if(e) return <i className = "fa fa-star fa-lg mr-1 mb-2" />
                else return <i className = "fa fa-star-o fa-lg mr-1 mb-2" />
            })
    }
    render(){
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
                     <Button variant="info" onClick={()=> {this.props.callParent(this.props.value); this.update_cart_state()}}><i className="fa fa-shopping-cart fa-lg mr-1"></i>{this.state.cart_state}</Button>
                      </Col>
                  </Row>
               </Card.Body>
           </Card>
           <MyModal contentShow={this.state.modal_show} contentOnHide={this.modalSetHide} contentAll={this.props} inCart={this.state.cart_state} onUpdateCartState={this.updateUpdateCartState} Reviews={this.props.value.Review} />
           </Col>
        );
    }
}
class Home extends React.Component{
    render_products(x){
        const add_in_cart = (b)=>{
            let index = x.data.indexOf(b);
            let newArray = [...x.data];
            if(x.data[index].in_cart) newArray[index].in_cart = false;
            else newArray[index].in_cart = true;

            x.modifyData(newArray);    
        }
        let filteredData = x.data.filter(f=>{return f.filtered})
        return filteredData.map(p => <Product callParent={add_in_cart} value={p} key={p.id} />)
    }
    filter(d,categoryName){
        d.set_selected(categoryName);
        let newData = [...d.data];
        newData.forEach(e=> e.category.includes(categoryName)?e.filtered = true:e.filtered =false);
        d.modifyData(newData);
    }
    render_buttons(y){
        return categories.map(c=> <Button variant="outline-secondary" className="mx-3 mt-4" onClick={()=>this.filter(y,c.name)} active={c.name.includes(y.selected)}>{c.name}</Button>)   
     }
    render(){
        return(
            <React.Fragment>
            <Container fluid>
            <Row className="mb-4">
            <Consumer>
            {e=> this.render_buttons(e)}
            </Consumer>
            </Row>
            <Row>
            <Consumer>
                {e=> this.render_products(e)}
            </Consumer>
            </Row>
            </Container>
            </React.Fragment>
        );
    }
}

export default Home;