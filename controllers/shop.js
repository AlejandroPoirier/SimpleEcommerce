const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  // Product.fetchAll()
  // .then( ([rows, fieldData]) => {
  //   res.render('shop/product-list', {
  //     prods: rows,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // }).catch(err => console.log(err));

  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
  .catch(err => {
    console.log('Error en getProducts:', err)
  })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // ==== Primera opcion de Query para 1 instancia ====
  // Product.findByPk(prodId)
  // .then((product) => {
  //   if (product) {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     });
  //   } else {
  //     res.redirect('/')
  //   }
  // })
  // .catch((err) => {
  //   console.log('Error en getProduct: ', err);
  // });

  // ==== Segunda opcion de Query usando condicion WHERE ====
  Product.findAll({
    where: {
      id: prodId
    }
  })
  .then(([product]) => {
    if(product) {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    } else {
      res.redirect('/')
    }
  })
  .catch( err => {
    console.log('Error en getProduct:', err)
  })
};

exports.getIndex = (req, res, next) => {
  // Product.fetchAll()


  Product.findAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
  .catch(err => {
    console.log('Error en getIndex:', err)
  })
  
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};