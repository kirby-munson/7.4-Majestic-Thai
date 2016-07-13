var Backbone = require('backbone');

var MenuItem = Backbone.Model.extend({
  idAttribute:'_id',
  urlRoot: 'https://tiny-lasagna-server.herokuapp.com/collections/kirby-menu',
  initialize: function(){
    console.log('a new menu item as been born!')
  },
  displayPrice: function(){
    return '$' + (this.get('price') / 100).toFixed(2);
  }
});

var MenuCollection = Backbone.Collection.extend({
  model: MenuItem,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/kirby-menu'
});


var ShoppingCollection = Backbone.Collection.extend({
  model: MenuItem,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/kirby-menu',
  getCartTotal: function(){
    var price = this.reduce(function(memo, model){
      return memo + model.get('price');
    }, 0);
    return '$' + (price / 100).toFixed(2);
  }
});

module.exports = {
  'MenuItem':MenuItem,
  'MenuCollection':MenuCollection,
  'ShoppingCollection':ShoppingCollection
};
