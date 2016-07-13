var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var MenuCollection = require('../models/menu').MenuCollection;
var ShoppingCollection = require('../models/menu').ShoppingCollection;



var MenuOrderingComponent = React.createClass({
  getInitialState: function(){
    return {
      menuItems: [],
      cartItems: []
    }
  },
  componentWillMount: function(){
    var menuItems = new MenuCollection();
      var cartItems = new ShoppingCollection();

      menuItems.add([
        {'name': 'Spring Rolls', 'price': 500, 'description': 'Yummy rolls with nice sauce', 'type':'appetizer'},
        {'name': 'Miso Soup', 'price': 300, 'description': 'Flavorful soup with tofu', 'type':'appetizer'},
        {'name': 'Bamboo Shrimp', 'price': 900, 'description': 'Shrimp with a bamboo sauce', 'type':'appetizer'},
        {'name': 'Green Curry', 'price': 1500, 'description': 'Mild curry with chicken', 'type':'entree'},
        {'name': 'PineApple Chicken', 'price': 1300, 'description': 'Chicken with pineapples', 'type':'entree'},
        {'name': 'Lemon Chicken', 'price': 1200, 'description': 'Grilled chicken with lemon sauce', 'type':'entree'},
        {'name': 'Garden Delight', 'price': 1000, 'description': 'Chefs special *spicy', 'type':'entree'},
        {'name': 'Spicy Basil', 'price': 1500, 'description': 'Basil chicken *spicy', 'type':'entree'},
        {'name': 'Cashew Nut', 'price': 1300, 'description': 'Chicken with cashews', 'type':'entree'},
        {'name': 'Ginger Special', 'price': 1600, 'description': 'Chicken with giner sauce', 'type':'entree'},
        {'name': 'Fried Rice', 'price': 400, 'description': 'Rice mixed with egg and vegetables', 'type':'side'},
        {'name': 'White Rice', 'price': 400, 'description': 'White sticky rice', 'type':'side'},
        {'name': 'Brown Rice', 'price': 400, 'description': 'Brown sticky rice', 'type':'side'},
        {'name': 'Fried IceCream', 'price': 300, 'description': 'Ice cream fried with chocolate sauce', 'type':'dessert'},
        {'name': 'Fried Banana', 'price': 200, 'description': 'Two fried bananas with fruit sauce', 'type':'dessert'},
        {'name': 'Fried Apples', 'price': 200, 'description': 'Fried apples with brownsugar', 'type':'dessert'},
        ]);

      this.setState({
        'menuItems': menuItems,
        'cartItems': cartItems
      });
    },
    handleAddToCart: function(model){
      this.state.cartItems.add(model);
      this.forceUpdate();
    },
    handleRemoveFromCart: function(model){
      this.state.cartItems.remove(model);
      this.forceUpdate();
    },
    handlePlaceOrder: function(){
      this.state.cartItems.sync();
      this.forceUpdate();
    },
    render: function(){
      return(
        <div className='row'>
          <nav className="nav">
            <h1>Majestic Thai</h1>
          </nav>
          <MenuList handleAddToCart={this.handleAddToCart} menuItems={this.state.menuItems}/>
          <MenuOrderCalculation handlePlaceOrder={this.handlePlaceOrder} handleRemoveFromCart={this.handleRemoveFromCart} cartItems={this.state.cartItems}/>
        </div>
      );
    }
  });

var MenuList = React.createClass({
  render: function(){
    var self = this;

    var menuItemList = this.props.menuItems.map(function(model){
      return <li className="menu-list well" key={model.cid}>{model.get('name')} {model.get('description')} {model.displayPrice()}
        <button className="btn add" onClick={function(){self.props.handleAddToCart(model)}}>Add</button>
      </li>
    });
    return(
      <div className="menu-list col-md-offset-1 col-md-5">
        <h3>Menu</h3>
        <ul>
          {menuItemList}
        </ul>
      </div>
    );
  }
});

var MenuOrderCalculation = React.createClass({
  render: function(){
    var self = this;

    var cartItemList = this.props.cartItems.map(function(model){
      return <li className="well" key={model.cid}>{model.get('name')} {model.displayPrice()}
        <button className="btn remove" onClick={function(){self.props.handleRemoveFromCart(model)}}>Remove</button>
      </li>
    });
    return(
      <div className="order col-md-4">
        <h3>Order</h3>
        <ul>
          {cartItemList}
        </ul>
        <p>Cart Total: {this.props.cartItems.getCartTotal()}</p>
        <br className="float"/>
        <button onClick={function(){self.props.handlePlaceOrder()}} className="btn remove">Place Order</button>
    </div>
    );
  }
});



module.exports = {
  'MenuOrderingComponent': MenuOrderingComponent,
  'MenuOrderCalculation':MenuOrderCalculation
};
