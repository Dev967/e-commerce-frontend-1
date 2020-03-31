import React from 'react';

//react-Bootstrap
import {Card,Container,Row,Col,Button,Badge,Modal,Spinner} from 'react-bootstrap';

//bootstrap CSS
import'./Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css'; 

import {Consumer} from './Context';

import categories from './Assets/Categories';

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
        loader:true
    }

    modalSetShow = () => this.setState({modal_show:true});
    modalSetHide = () => this.setState({modal_show:false});
    
    updateUpdateCartState = () => this.update_cart_state();
    handleImage = () => this.setState({loader:false});
    handleLoader = () => {
        if(this.state.loader == ""){
            return 
            <Spinner animation="border" role="status" >
            <span className="sr-only">Loading...</span>
            </Spinner>
        }else {
            return null;
        }
    }
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
    render(){
        return(
            <Col lg={3} md="auto" sm="6" xs="auto" className="mb-0 col-md-4">
            <Card className="shadow rounded">
            <Card.Img variant="top" onLoad={this.handleImage} src={this.props.value.img_src} />
            {this.handleLoader}
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
           <MyModal contentShow={this.state.modal_show} contentOnHide={this.modalSetHide} contentAll={this.props} inCart={this.state.cart_state} onUpdateCartState={this.updateUpdateCartState} />
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