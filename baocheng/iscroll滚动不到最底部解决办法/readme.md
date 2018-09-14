参考链接: http://www.cnblogs.com/starof/p/5215845.html

        原因:因为DOMContentLoaded和$(document).ready()事件是载入DOM结构后就会被调用,

        所以在图片等元素未载入前可能无法确定滚动区域的长宽，iscroll无法计算出要滚动的正确高度,

        此时可以使用onLoad事件来实现。

        如果DOM结构很复杂，最好延迟100ms再执行

        <script src="iscroll.js"><script>
        <script>
                    var myscroll;
                    function loaded(){
                setTimeout(function(){
                            myscroll=new iScroll("wrapper");
                    }，100 );
                }
                window.addEventListener("load",loaded,false);
        </script>

        微信浏览器和safrial浏览器出现滑动屏幕时，整个页面滑动的问题，解决办法如下：
        禁止body的默认滚动

        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);