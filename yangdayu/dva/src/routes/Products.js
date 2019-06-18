import React from 'react';
import {connect} from 'dva';
import ProductList from '../components/ProductList';

//连接model 和 component 的 connect；

function Products({ dispatch, products }){
	function handleDelete(id) {
		dispatch({
			type: 'products/delete',
			payload: id,
		});
	}

	return (
	    <div>
	      <h2>List of Products</h2>
	      <ProductList onDelete={handleDelete} products={products} />
	    </div>
	  );


	}

Products.propTypes = {

}


export default connect(({ products }) => ({
	products
}))(Products);

// connect 同时也传入了dispatch，是的，怎么传的？？
// dispatch 方法从哪里来？被 connect 的 Component 会自动在 props 中拥有 dispatch 方法。