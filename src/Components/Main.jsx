import React from 'react';

//router
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

//react-bootstrap
import { Navbar, Nav, Badge, Row } from 'react-bootstrap';

//bootstrap CSS
import './Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css';
//My CSS
import '../Main.css';

//Components
import Home from './Home';
import Component2 from './Component2';
import Component3 from './Component3';
import ErrorMsg from './Error';


//Data
import { connect } from 'react-redux';
import { fetchData } from './Redux/Actions';

//Icons
import {FaShoppingCart, FaInfo, FaHome} from 'react-icons/fa';

const mapStateToProps = state => ({
    count: state.Cart.count,
    isLoading: state.MainData.isLoading,
    ErrorMessage: state.MainData.errMess
})
const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(fetchData()),
})
//Navbar
class MyNavbar extends React.Component {
    render() {
        return (
            <Navbar className="my-navbar" bg="dark" expand="lg" variant="dark" fixed="top" className="shadow">
                <Navbar.Brand >
                    <NavLink to="/Component2">
                        <Row>
                           <FaShoppingCart color="white" className="mr-1"/><h5 className="count"><Badge variant="danger" className="ml-1 text-center">{this.props.no}</Badge></h5>
                        </Row>
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink key="1" className="mx-2 text-white" to="/"><FaHome className="mr-1"/>Home</NavLink>
                        <NavLink key="3" className="mx-2 text-white" to="/Component3"><FaInfo className="mr-1"/>About</NavLink>
                        <NavLink key="2" className="mx-2 text-white" to="/Component2"><FaShoppingCart className="mr-1" />Cart</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

class MainComponent extends React.Component {
    componentDidMount() {
        this.props.fetch();
    }

    render() {
        if (this.props.isLoading) return <div>Loading...</div>
        else if (this.props.ErrorMessage !== "") return <div>{this.props.ErrorMessage}</div>
        else return (
            <BrowserRouter>
                <div>
                    <MyNavbar no={this.props.count} />
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/Component2" component={Component2} exact />
                        <Route path="/Component3" component={Component3} exact />
                        <Route component={ErrorMsg} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);