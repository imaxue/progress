//定义UI 在component内；

import React , { PropTypes } from 'react';
import { Table, Popconfirm , Button } from 'antd';

function ProductList({onDelete,products}){
	const columns = [{
	   title: 'Name',
	   dataIndex: 'name',
	 }, {
	   title: 'Actions',
	   render: (text, record) => {
	     return (
	       <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
	         <Button>Delete</Button>
	       </Popconfirm>
	     );
	   },
	 }];
	 return (
	   <Table
	     dataSource={products}
			 columns={columns}
			 rowKey='id'
	   />
	 );
}

ProductList.propTypes = {
	onDelete:PropTypes.func.isRequired,
	products:PropTypes.array.isRequired,
}

export default ProductList;