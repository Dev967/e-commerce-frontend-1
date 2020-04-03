import React from 'react';

//react-Bootstrap
import {Card,Container,Row,Col,Button,Badge,Modal} from 'react-bootstrap';

//bootstrap CSS
import'./Assets/bootstrap-4.4.1-dist/css/bootstrap.min.css'; 

//My Css
import '../Home.css';

//Data
import categories from './Assets/Categories';

//Context API
import {Consumer} from './Context';

//Other Components
import {Product} from './Product';
import {MyToast} from './CartNotification';





class Home extends React.Component{
    state={
        toast_show: false
    }

    handleToast = () => {
        this.setState({toast_show: true});
        setTimeout(() => this.setState({toast_show: false}), 5000);
    }
    render_products(x){
        const add_in_cart = (b)=>{
            let index = x.data.indexOf(b);
            let newArray = [...x.data];
            if(x.data[index].in_cart) newArray[index].in_cart = false;
            else newArray[index].in_cart = true;

            x.modifyData(newArray);    
        }
        let filteredData = x.data.filter(f=>{return f.filtered})
        return filteredData.map(p => <Product callParent={add_in_cart} value={p} key={p.id} handleToast={this.handleToast} />)
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
            <MyToast show={this.state.toast_show} onClose={ () => this.setState({toast_show: false})} />
            </Row>
            </Container>
            </React.Fragment>
        );
    }
}

export default Home;