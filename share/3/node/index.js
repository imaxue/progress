/**
* Created by liuliang02
*/
const inquirer = require('inquirer');
const fs = require('fs');
const Path = require('path');
const cp = require('child_process');


/**
 *模板
*/

let author = `
/**
 * Created by $user on $time.
 * desc:描述
 */
`;


let  index = `
import React from 'react'
import {Form, Tabs} from 'antd';
import combineContainer from 'ROOT_SOURCE/base/CompConjunction'

import F from './form'
import T from './table'

import * as actions from './actions'
import * as reducers from './reducers'

const TabPane = Tabs.TabPane;

let ListTable = combineContainer(T).withReducers(reducers).withActions(actions).val()
let ListForm = combineContainer(F).withReducers(reducers).withActions(actions).val()
ListForm = Form.create()(ListForm)

export default(props) => {
       
    return (
        <div>         
            <ListForm/>
            <ListTable/>                                         
        </div>
    )
}
`;

let  actions =`
import ActionFactory from 'ROOT_SOURCE/base/ActionFactory'
import { MOD_PREFIX } from './constants'


export const LIST__UPDATE_FORM_DATA
          = \`\${MOD_PREFIX}__LIST__UPDATE_FORM_DATA\`

export const LIST__UPDATE_TABLE_DATA
          = \`\${MOD_PREFIX}__LIST__UPDATE_TABLE_DATA\`



export const updateTable = ActionFactory.createUpdateTable({
    
    url: 'xx',
    
    handler: (dispatch, getState, formData, resultBody) => {
        
        // 更新formData
        dispatch({
            type: LIST__UPDATE_FORM_DATA,
            payload: {
                ...formData,
                total: resultBody.total,
            }
        })
        
        // 更新tableData
        dispatch({
            type: LIST__UPDATE_TABLE_DATA,
            payload: {
                dataSource: resultBody.list,
            }
        })
        
        return resultBody
    }
    
})
`;

let constants = `
export const MOD_PREFIX = '$file'
`
let form = `
import React from 'react'
import { Input, Button, Form, Select } from 'antd'

import BaseFormContainer from 'ROOT_SOURCE/base/BaseFormContainer'

import DateRangePicker from 'ROOT_SOURCE/components/DateRangePicker'

const FormItem = Form.Item
const Option = Select.Option


export default class extends BaseFormContainer {
      
    render() {
        let { form, formData } = this.props
        let { getFieldDecorator } = form
        let { name, startDate, endDate } = formData     
        
        return this.wrapItems(<div>
           
            <FormItem label={('姓名')}>
                {getFieldDecorator('name', { initialValue: name || '' })(<Input />)}
            </FormItem>

            <FormItem label={('时间')}>
                <DateRangePicker
                    dateShowFormat='YYYY-MM-DD HH:mm:ss'
                    form={form}
                    startVal={startDate}
                    startKey='startDate'
                    endVal={endDate}
                    endKey='endDate'
                />
            </FormItem>        
            
            <FormItem>
                <Button type="primary" htmlType="submit"> 查询 </Button>
            </FormItem>
            
        </div>)
    }
}
`;

let reducers = `
import { 
    LIST__UPDATE_FORM_DATA,
    LIST__UPDATE_TABLE_DATA
} from './actions'

import ReducerFactory from 'ROOT_SOURCE/base/ReducerFactory'

export const $file__List = ReducerFactory.createListPageReducer(
    LIST__UPDATE_FORM_DATA,
    LIST__UPDATE_TABLE_DATA,
)`;

let table = `
import React from 'react'

import BaseTableContainer from 'ROOT_SOURCE/base/BaseTableContainer'

export default class extends BaseTableContainer {

    getRowKey() {
        return (record, index) => index
    }

    getColumns() {
        if (this._columns) 
            return this._columns;
        
        return this._columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span style={{
                        cursor: 'pointer'
                    }}>查看</span>
                )
            }
        ]
    }

    getScroll() {
        return {x: 2800}
    }

}
`
/**
*逻辑代码
*1.遍历目录查找src下的目录，找出containers、或者下面二、三级文件夹新建 redux 模板套餐
*/
let basePath = `${process.cwd()}/src`;
let componentPath = [];//所有组件路径
let lastPath = '';//保存路径
let lastName = '';//组件名字

componentPath = dirList(Path.resolve(`${basePath}/containers`));


function start(){
    where(componentPath).then(data => {
    
        lastPath = data.path;

        whatName().then(data => {
            lastName = data.name;

            create(lastPath,lastName);

        })
    })
}

function where(componentPath){
    return inquirer.prompt([{
        type: 'list',
        name: 'path',
        message: '在哪里创建组件？',
        choices: componentPath
      }])
}

function whatName(){
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: '组件名称（首字母大写）？',
        validate: (name) => {
                //验证首字母大写
                if(!/^[A-Z]/.test(name)){
                    console.log('首字母大写');
                    return false;
                }
                //验证是否已经存在
                let isExist = fs.existsSync(`${basePath}/${lastPath}/${name}`);
                if (isExist) {
                    console.log(`已经存在${name}组件`);
                    return false;
                }
                return true;
           }
      }])
}



function create (path,name) {
    path = `${basePath}/${path}`;
    let componentObj = {
        index: index,
        actions: actions,
        constants: constants,
        form:form,
        reducers : reducers,
        table:table
    }

    let user = cp.execSync('git config user.name', {encoding:'utf-8'});
    let isExist = fs.existsSync(path);
    if(!isExist){
        //不存在先创建
        fs.mkdirSync(path);
    }
    fs.mkdirSync(path + '/' + name);
    let name_name = name.replace( /([A-Z])/g,'_$1').slice(1).toUpperCase();
    let authorStr =  author.replace('$user', user.trim())
                           .replace('$time', formatDate());
    for(let objKey of Object.keys(componentObj)){
        fs.writeFileSync(path + '/' + name + `/${objKey}.js`, authorStr + componentObj[objKey].replace(/\$file/g, name_name));
    }      
    console.log(`组件${path}/${name}创建成功！`);

}

function dirList(absP){
    let list = [];
    let files = fs.readdirSync(absP);
        list.push(`containers`);
    for(let i = 0;i< files.length;i++){
        let filePath = Path.resolve(absP,files[i]);
        if(!fs.statSync(filePath).isFile()){
            list.push(`containers/${files[i]}`);               
        }
    }
    return list;    
}


function formatDate() {
    let currentTime = new Date();
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth() + 1;
    let day = currentTime.getDate();
                
    month = month.length < 2 ? '0' + month: month;
    day = day.length < 2 ? '0' + day: day;
                
    let currentDate = year + '-' + month + '-' +  day;
    return currentDate;
};
module.exports = start;
