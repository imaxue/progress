```js
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <script src="http://code.jquery.com/jquery-latest.js"></script>
        <title></title>
    </head>
    <body>
    <textarea  style="resize:none" name="text" id="txt" cols="30" rows="10"></textarea>
    <span class="title2 hide"><span>0</span>/10</span>
    <script>
        var flag = true;
        $('#txt').on('compositionstart',function(){
            flag = false;
        })
        $('#txt').on('compositionend',function(){
            flag = true;
        })
        $('#txt').on('input',function(){
            setTimeout(function(){
                if(flag){
                    var num = $("#txt").val().replace(/\s+/g,"").length;
                    if(num<10){
                        $("#txt").removeAttr("maxlength");
                        $(".title2").html('<span>'+num+'</span>' + '/10');
                    }
                    else{           
                        $(".title2 span").text(num);           
                        $("#txt").attr("maxlength",10);
                    }
                }
            },0)
        })
    </script>
    </body>
</html>


```
