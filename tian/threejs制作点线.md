```js
window.onload=function(){
    //定义场景、相机、渲染、几何体,线体
var scene,camera,renderer,cube,light;
//初始化渲染
function initThree(){
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias:true //高级算法 如果有很多点线用这个性能会好一点
    })
    renderer.setSize(width,height);//设置渲染器的大小
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF,1.0);//设置颜色
}

//初始化相机
function initCamera(){
    //透视相机
    camera = new THREE.PerspectiveCamera(45,width/height,1,1000);
    camera.position.x =0;
    camera.position.y =0;
    camera.position.z =1000;
    // camera.up.x = 0;
    // camera.up.y=0;
    // camera.up.z=1;
    // camera.lookAt({
    //     x : 0,
    //     y : 0,
    //     z : 0
    // });
}

//初始化场景
function initScene(){
    scene = new THREE.Scene();
}
//初始化光线
function initLight() {
    //初始化光的位置
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
}

function initObject() {

    var geometry = new THREE.Geometry(); //创建几何体
    //设置线条材质
    var material = new THREE.LineBasicMaterial( { vertexColors: true }//默认使用顶点的颜色额
         );
    var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3( -100, 0, 0 );
    var p2 = new THREE.Vector3(  100, 0, 0 );
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push( color1, color2 );
        //定义一条线
    var line = new THREE.Line( geometry, material, THREE.LineSegments );
    scene.add(line);
}

function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    renderer.clear();
    renderer.render(scene, camera);
}
threeStart();
}


html:
<div id="canvas-frame"></div>
```
