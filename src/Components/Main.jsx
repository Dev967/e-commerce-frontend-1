import React from 'react';

//router
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom';

//react-bootstrap
import {Navbar, Nav} from 'react-bootstrap';

//bootstrap CSS
import'./Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css'; 

//Components
import Home from './Home';
import Component2 from './Component2';
import Component3 from './Component3';
import ErrorMsg from './Error';

//Data
import navs from './Assets/navItems';

//Navbar
class MyNavbar extends React.Component{
    render(){
return(
    <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand >
        <NavLink to={navs[0].path} >Cart</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        {navs.map(e=> <NavLink className="mx-2 text-white" to={e.path}>{e.name}</NavLink>)}
        </Nav>
        </Navbar.Collapse>
    </Navbar>
);
    }
}

class MainComponent extends React.Component{
    render(){
        return(
            <BrowserRouter>
            <div>
                <MyNavbar />
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/Component2" component={Component2} exact/>
                    <Route path="/Component3" component={Component3} exact/>
                    <Route component={ErrorMsg}/>
                </Switch>
            </div>
            </BrowserRouter>
        );
    }
}

export default MainComponent;