(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(3),i=n.n(r),c=(n(14),n(1)),s=n(4),u=n(5),l=n(7),d=n(6),f=n(8),h=function(){return o.a.createElement("header",null,"Header")},v={value:0,class:""},m={value:1,class:"snakeHead"},p={value:2,class:"snakeBody"},g={value:3,class:"snakeFood"},w="snakeSuperFood",k=function(e){e.isOn;var t=e.celState,n="matrixCel ";return 1===t&&(n+=m.class),2===t&&(n+=p.class),3===t&&(n+=g.class),4===t&&(n+=w),o.a.createElement("div",{className:n})},b=function(e){var t=e.matrix;return o.a.createElement("div",{className:"matrixWrapper"},t.map(function(e,n){return o.a.createElement("div",{key:"row-".concat(n),className:"matrixRow"},e.map(function(e,a){return o.a.createElement(k,{key:"col-".concat(a),celState:t[n][a]})}))}))},x=function(e){var t=e.matrix;return o.a.createElement("main",null,o.a.createElement(b,{matrix:t}))},y=function(){return o.a.createElement("footer",null,"Footer")},E=(n(16),{height:25,width:25});(function(e,t){var n,a,o,r,i,c,s=t||function(e){};document.body.addEventListener("touchstart",function(e){var t=e.changedTouches[0];n="none",a=t.pageX,o=t.pageY,c=(new Date).getTime(),e.preventDefault()},!1),document.body.addEventListener("touchmove",function(e){e.preventDefault()},!1),document.body.addEventListener("touchend",function(e){var t=e.changedTouches[0];r=t.pageX-a,i=t.pageY-o,(new Date).getTime()-c<=300&&(Math.abs(r)>=150&&Math.abs(i)<=100?n=r<0?"left":"right":Math.abs(i)>=150&&Math.abs(r)<=100&&(n=i<0?"up":"down")),s(n),e.preventDefault()},!1)})("oi",function(e){"top"==e&&alert("top swipe"),"right"==e&&alert("right swipe"),"down"==e&&alert("down swipe"),"left"==e&&alert("left swipe")});var S=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).generateMatrix=function(e,t){return Object(c.a)(new Array(e)).map(function(e){return Object(c.a)(new Array(t)).map(function(e){return 0})})},n.getFood=function(){if(n.state.hasFood)return n.state.foodPos;var e=function(){for(var e,t,a=n.state.snake,o=E.width,r=E.height,i=!0;i;)e=Math.floor(Math.random()*(o-0+1))+0,t=Math.floor(Math.random()*(r-0+1))+0,i=!!a.filter(function(n){return n[0]===e&&n[1]===t}).length;return n.setState({foodPos:[e,t],hasFood:!0}),{v:[e,t]}}();return"object"===typeof e?e.v:void 0},n.updateMatrix=function(){var e,t=n.getSnake(!1),a=n.getFood();(e=t[0][0]===a[0]&&t[0][1]===a[1])&&(t=n.getSnake(e),n.setState({hasFood:!1,foodPos:[]}));var o=Object(c.a)(n.state.matrix).map(function(e,n){return e.map(function(e,o){var r=n,i=o,c=!!t.filter(function(e){var t=e[0],n=e[1];return r===t&&i===n}).length,s=r===t[0][0]&&i===t[0][1],u=r===a[0]&&i===a[1];return c?s?m.value:p.value:u?g.value:v.value})});n.setState({matrix:o})},n.getDirection=function(e){var t=(window.event?window.event:e).keyCode;return 38===t?"up":40===t?"down":37===t?"left":39===t?"right":void 0},n.handleKeydown=function(e){n.setState({direction:n.getDirection(e)})},n.stop=function(){n.setState({speed:0}),clearInterval(n.interval)},n.speedUp=function(){return n.setState(function(e){return{speed:e.speed-200}},function(){n.interval=setInterval(function(){return n.updateMatrix()},n.state.speed)})},n.speedDown=function(){return n.setState(function(e){return{speed:e.speed+200}},function(){n.interval=setInterval(function(){return n.updateMatrix()},n.state.speed)})},n.getSnake=function(e){var t=n.state,a=t.direction,o=t.snake,r=Object(c.a)(o);e||r.splice(-1,1);var i=o[0];"up"===a&&r.unshift([i[0]-1,i[1]]),"right"===a&&r.unshift([i[0],i[1]+1]),"down"===a&&r.unshift([i[0]+1,i[1]]),"left"===a&&r.unshift([i[0],i[1]-1]);var s=r[0][0],u=r[0][1];return console.log("updatedSnakeHeadX",u),console.log("updatedSnakeHeadX ".concat(u," matrixDimensions.width ").concat(E.width)),console.log("updatedSnakeHeadY ".concat(s," matrixDimensions.height ").concat(E.height)),u<0||u>=E.width||s<0||s>=E.height?(console.log("Game Over - Out of bonderies"),n.setState({snake:o}),n.stop(),o):r.filter(function(e,t){return t>1&&(s===e[0]&&u===e[1])}).length?(console.log("Game Over - Crossing"),n.setState({snake:o}),n.stop(),o):(n.setState({snake:r}),r)},n.state={matrix:n.generateMatrix(E.height,E.width),direction:"right",speed:100,snake:[[12,12],[11,12],[10,12]],hasFood:!1,foodPos:[]},n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.body.addEventListener("keydown",this.handleKeydown),this.interval=setInterval(function(){return e.updateMatrix()},this.state.speed)}},{key:"componentWillUnmount",value:function(){document.body.removeEventListener("click",this.handleClick),clearInterval(this.interval)}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(h,null),o.a.createElement(x,{matrix:this.state.matrix,snake:this.state.snake}),o.a.createElement(y,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(18)}},[[9,2,1]]]);
//# sourceMappingURL=main.7371734b.chunk.js.map