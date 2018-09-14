/**
 * Created by liaohainan by jiaojiao
 */

const shell = require("shelljs");
const inquirer = require("inquirer");
const fs = require("fs");

let basePath = `${process.cwd()}/src/pages`;
// 开始
checkMaster()
// 启动项目
async function start() {
  let { name } = await whatName();
  await createDir(name);
  await creatRouter(name);

  console.log(`项目${basePath}/${name}创建成功！请注意要手动添加菜单`);
  await startProject();
}
function checkMaster(){
	let currentBranch = String(shell.exec('git symbolic-ref --short -q HEAD'))
	if(currentBranch.trim() == 'master'){
		let choices = ["不在master创建", "确定"];
		inquirer
    .prompt([
      {
        type: "list",
        message: "确定要在master分支创建项目吗？",
        name: "object",
        choices: choices
      }
    ])
    .then(function(answers) {
      if (answers.object == "确定") {
        start();
      } else {
        console.log("已结束对话");
      }
    });
	}
}
// 创建项目名称
function whatName() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "文件夹名称（首字母大写）？",
      validate: name => {
        //验证首字母大写
        if (!/^[A-Z]/.test(name)) {
          console.log("首字母大写");
          return false;
        }
        //验证是否已经存在
        let isExist = fs.existsSync(`${basePath}/${name}`);
        if (isExist) {
          console.log(`已经存在${name}文件夹`);
          return false;
        }
        return true;
      }
    }
  ]);
}
// 创建路由
async function creatRouter(name) {
  let { routerPath } = await creatRouterPath();
  let { routerName } = await creatRouterName();
  // let routerPath = name.toLocaleLowerCase()
  let routerTemp = `{
			path: BathHost + '/${routerPath}',
			component: () => import('@/pages/${name}'),
			meta: {
				title: '${routerName}'
			},
		},
		// replace此行为自动创建脚本替换用，请不要随意做改动`;

  shell.sed(
    "-i",
    /\/\/ replace此行为自动创建脚本替换用，请不要随意做改动/,
    routerTemp,
    "./src/router/index.js"
  );
}
// 创建路由地址
function creatRouterPath() {
  return inquirer.prompt([
    {
      type: "input",
      name: "routerPath",
      message: "路由地址（请注意不要重复））？"
    }
  ]);
}
// 创建路由名称
function creatRouterName() {
  return inquirer.prompt([
    {
      type: "input",
      name: "routerName",
      message: "路由名称（请注意不要重复））？"
    }
  ]);
}
// 创建文件夹
function createDir(name) {
  let path = basePath + "/" + name;
  fs.mkdirSync(path);
  shell.cp("-R", basePath + "/Demo/*", path);
}

// 启动项目

function startProject() {
	let choices = ["启动项目", "不启动"];
  inquirer
    .prompt([
      {
        type: "list",
        message: "选择启动整个项目还是单个项目",
        name: "object",
        choices: choices
      }
    ])
    .then(function(answers) {
      if (answers.object == "启动项目") {
        shell.exec(`npm run dev`);
      } else {
        console.log("已结束对话");
      }
    });
}
