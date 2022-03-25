import './App.css';
import AddCategories from './Components/Admin/Categories/AddCategories';
import DisplayCategories from './Components/Admin/Categories/DisplayCategories'
import AddProducts from './Components/Admin/Products/AddProducts';
import {Switch,Route} from 'react-router-dom'
import AddImages from './Components/Admin/Products/AddImages';
import DisplayProducts from './Components/Admin/Products/DisplayProducts';


function App() {
  return (
   <div>
    <Switch>
    <Route path="/" exact component={AddCategories} />
    <Route path="/admin/displaycat" exact component={DisplayCategories} />
    <Route path="/admin/addproducts" exact component={AddProducts} />
    <Route path="/admin/addimages" exact component={AddImages} />
    <Route path="/admin/displayproducts" exact component={DisplayProducts} />
    </Switch>
   </div>
  );
}

export default App;
