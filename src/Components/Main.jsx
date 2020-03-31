import React from 'react';

//router
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom';

//react-bootstrap
import {Navbar, Nav, Badge} from 'react-bootstrap';

//bootstrap CSS
import'./Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css'; 

//Components
import Home from './Home';
import {Component2} from './Component2';
import Component3 from './Component3';
import ErrorMsg from './Error';
import {Provider} from './Context';
//Data
import Data from './Assets/HomeProducts';
//Fonts
import 'font-awesome/css/font-awesome.min.css';


//Navbar
class MyNavbar extends React.Component{
    render(){
return(
    <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand >
        <NavLink to="/"><span className="fa fa-shopping-cart fa-lg mr-1"></span></NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        <NavLink key="1" className="mx-2 text-white" to="/"><i className="fa fa-home fa-lg mr-1"></i>Home</NavLink>                               
        <NavLink key="3" className="mx-2 text-white" to="/Component3"><i className="fa fa-info-circle fa-lg mr-1"></i>About</NavLink>
        <NavLink key="2" className="mx-2 text-white" to="/Component2"><i className="fa fa-shopping-cart fa-lg mr-1"></i>Cart</NavLink>
        <h5><Badge variant="danger" className="ml-0 text-center">{this.props.no}</Badge></h5>   
        </Nav>
        </Navbar.Collapse>
    </Navbar>
);
    }       
        }

class MainComponent extends React.Component{
    constructor(props){
        super(props);
       this.modify =  this.modify.bind(this);
       this.setSelected = this.setSelected.bind(this);
    }
    state ={
        in_cart_data: [],
        data: [...Data],
        count: 0,
        selected: "All"
    }
    set_count(){
        let noOfCount = this.state.data.filter(e=>{return e.in_cart});
        this.setState({in_cart_data: [...noOfCount]});
        this.setState({count: noOfCount.length});
    }
    modify(c){
        this.setState({data : c});
        this.set_count();
    }
    setSelected(s){
        this.setState({selected: s});
    }
    render(){
        return(
           <Provider value={{
               data: this.state.data,
               modifyData : this.modify,
               source_cart_count: this.state.count,
               in_cart_data: this.state.in_cart_data,
               selected: this.state.selected,
               set_selected: this.setSelected
           }}>
                <BrowserRouter>
            <div>
                <MyNavbar no={this.state.count}/>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/Component2" component={Component2} exact/>
                    <Route path="/Component3" component={Component3} exact/>
                    <Route component={ErrorMsg}/>
                </Switch>
            </div>
            </BrowserRouter>
           </Provider>
        );
    }
}

export default MainComponent;