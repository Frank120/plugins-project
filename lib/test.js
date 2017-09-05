var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle="red";
ctx.fillRect(10,10,50,50);
function copy()
{
    var imgData=ctx.getImageData(10,10,50,50);
    ctx.putImageData(imgData,10,70);
}