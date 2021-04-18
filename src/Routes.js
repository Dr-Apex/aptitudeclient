import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import Subscribe from './core/Subscribe';
import Payment from './core/Payment';
import QuestionPage from './core/QuestionPage';
import QuestionList from './core/QuestionList';
import ChapterList from './core/ChapterList';
import AddTopic from './admin/AddTopic';
import AddChapter from './admin/AddChapter';
import AddProduct from './admin/AddProduct';
// import Cart from './core/Cart';
// import AdminRoute from './auth/helper/AdminRoutes';
// import PrivateRoute from './auth/helper/PrivateRoutes';
// import UserDashBoard from './user/UserDashBoard';
// import AdminDashBoard from './user/AdminDashBoard';
// import AddCategory from './admin/AddCategory';
// import ManageCategories from './admin/ManageCategories';
// import AddProduct from './admin/AddProduct';
// import ManageProducts from './admin/ManageProducts';
// import UpdateProduct from './admin/UpdateProduct';
// import UpdateCategories from './admin/UpdateCategories';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/home" exact component={Home} />
        <Route path="/subscribe" exact component={Subscribe} />
        <Route path="/payment" exact component={Payment} />
        <Route path="/question/:questionId" exact component={QuestionPage} />
        <Route path="/question-list/:categoryId" exact component={QuestionList} />
        <Route path="/chapter-list/:topicId" exact component={ChapterList} />
        <Route path="/add-topic" exact component={AddTopic} />
        <Route path="/add-chapter" exact component={AddChapter} />
        <Route path="/add-product" exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  );
};

// <Route path="/cart" exact component={Cart} />
// <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
// <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
// <AdminRoute path="/admin/create/category" exact component={AddCategory} />
// <AdminRoute path="/admin/categories" exact component={ManageCategories} />
// <AdminRoute path="/admin/create/product" exact component={AddProduct} />
// <AdminRoute path="/admin/products" exact component={ManageProducts} />
// <AdminRoute
//   path="/admin/product/update/:productId"
//   exact
//   component={UpdateProduct}
// />
// <AdminRoute
//   path="/admin/category/update/:categoryId"
//   exact
//   component={UpdateCategories}
// />
export default Routes;
