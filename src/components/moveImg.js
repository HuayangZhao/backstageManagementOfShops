// 移动盒子
let flexImgBox = document.querySelector(".flexImgBox");
flexImgBox.onmousedown = function(event){
  event = event || window.event;
  // let distanceX = event.clientX - flexImgBox.offsetLeft;
  // let distanceY = event.clientY - flexImgBox.offsetTop;
  let installX = event.clientX;
  let installY = event.clientY;
  // console.log(distanceX,distanceY)  鼠标距离盒子的距离
  document.onmousemove(function(event){
    event = event || window.event;
    let endX = event.clientX - installX;
    let endY = event.clientY - installY;
    flexImgBox.css({"right":endX + 'px',"top":endY + 'px'})
  });
  document.onmouseup(function(){
    document.onmousemove = null;
  })
};
