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
import navs from './Assets/navItems';
import Data from './Assets/HomeProducts';

//Navbar
class MyNavbar extends React.Component{
    render(){
return(
    <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand >
        <NavLink to={navs[0].path} >CART</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        {navs.map(e=> <NavLink key={e.id} className="mx-2 text-white" to={e.path}>{e.name}</NavLink>)}
        <NavLink key="2" className="mx-2 text-white" to="/Component2">Cart<Badge variant="danger" className="ml-1 text-center">{this.props.no}</Badge></NavLink>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
);
    }       
        }

class MainComponent extends React.Component{
    constructor(){
        super();
       this.modify =  this.modify.bind(this);
    }
    state ={
        in_cart_data: [],
        data: [...Data],
        count: 0
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
    render(){
        return(
           <Provider value={{
               data: this.state.data,
               modifyData : this.modify,
               source_cart_count: this.state.count,
               in_cart_data: this.state.in_cart_data
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