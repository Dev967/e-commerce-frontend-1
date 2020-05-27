import React from 'react';

//react-Bootstrap
import { Card, Container, Row, Col, Button, Badge, Modal } from 'react-bootstrap';

//bootstrap CSS
import './Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css';

//My Css
import '../Home.css';

//Data
import categories from './Assets/Categories';


//Other Components
import { connect } from 'react-redux';
import Product from './Product';
import { MyToast } from './CartNotification';
import { setSelected, modify, setCount } from './Redux/Actions';


const mapDispatchToProps = dispatch => ({
    set_selected: (s) => dispatch(setSelected(s)),
    modifyData: (s) => dispatch(modify(s))
})
const mapStateToProps = state => {
    return {
        data: state.MainData.data,
        selected: state.Selected.selected,
    }
}

class Home extends React.Component {
    state = {
        toast_show: false
    }
    handleToast = () => {
        this.setState({ toast_show: true });
        setTimeout(() => this.setState({ toast_show: false }), 5000);
    }
    render_products() {
        let filteredData = this.props.data.filter(f => { return f.filtered })
        return filteredData.map(p => <Product /*callParent={add_in_cart}*/ value={p} key={p.id} handleToast={this.handleToast} />)
    }
    filter(categoryName) {
        this.props.set_selected(categoryName);
        let newData = [...this.props.data];
        newData.forEach(e => e.category.includes(categoryName) ? e.filtered = true : e.filtered = false);
        this.props.modifyData(newData);
    }
    render_buttons() {
        return categories.map(c => <Button variant="outline-secondary" className="mx-3 mt-4" onClick={() => this.filter(c.name)} active={c.name.includes(this.props.selected)}>{c.name}</Button>)
    }
    render() {
        return (
            <React.Fragment>
                <Container className="home-container" fluid>
                    <Row className="mb-4">
                        {this.render_buttons()}
                    </Row>
                    <Row>
                        {this.render_products()}
                        <MyToast show={this.state.toast_show} onClose={() => this.setState({ toast_show: false })} />
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);