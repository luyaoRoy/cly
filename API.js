//创建地图并设置参数 
    var map = new AMap.Map('container', {
    resizeEnable: true, //是否监控地图容器尺寸变化
    zoom:11, //初始化地图层级
    center: [116.397428, 39.90923] ,//初始化地图中心点
    viewMode: '3D', //设置地图模式
    features: ['bg', 'road', 'building', 'point']
});
addMarker();

 //实时路况图层
 var trafficLayer = new AMap.TileLayer.Traffic({
    zIndex: 10
});

trafficLayer.setMap(map);

var isVisible = true;
function toggle() {
    if (isVisible) {
        trafficLayer.hide();
        isVisible = false;
    } else {
        trafficLayer.show();
        isVisible = true;
    }
}

// 实例化点标记
function addMarker() {
    map.clearMap();
    marker = new AMap.Marker({
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        map:map,
        icon: "",
        position: [116.481181, 39.989792],
        offset: new AMap.Pixel(-13, -30)
    });
    marker.setMap(map);
     //鼠标点击marker弹出自定义的信息窗体
     AMap.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker.getPosition());
    });
}

function updateMarker() {
    if (!marker) {
        return;
    }

    // 自定义点标记内容
    var markerContent = document.createElement("div");

    // 点标记中的图标
    var markerImg = document.createElement("img");
    markerImg.className = "markerlnglat";
    markerImg.src = "poi-marker-black.png";
    markerContent.appendChild(markerImg);

    // 点标记中的文本
    var markerSpan = document.createElement("span");
    markerSpan.className = 'marker';
    markerSpan.innerHTML = "Hi，我被更新啦！";
    markerContent.appendChild(markerSpan);

    marker.setContent(markerContent); //更新点标记内容
    marker.setPosition([116.391467, 39.927761]); //更新点标记位置
}

// 清除 marker
function clearMarker() {

    if (marker) {
        marker.setMap(null);
        marker = null;
    }
}

//实例化信息窗体
var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
    content = [];
content.push("<img src='roy2.jpg'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里");
content.push("电话：010-64733333");
content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");
var infoWindow = new AMap.InfoWindow({
    isCustom: true,  //使用自定义窗体
    content: createInfoWindow(title, content.join("<br/>")),
    offset: new AMap.Pixel(16, -45)
});

//构建自定义信息窗体
function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "custom-info input-card content-window-card";
    info.style.width="200px";
    info.style.height="70px";
    //可以通过下面的方式修改自定义窗体的宽高
    //info.style.width = "400px";
    // 定义顶部标题
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    var closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "https://webapi.amap.com/images/close2.gif";
    closeX.onclick = closeInfoWindow;

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    var bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    var sharp = document.createElement("img");
    sharp.src = "https://webapi.amap.com/images/sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
}

//关闭信息窗体
function closeInfoWindow() {
    map.clearInfoWindow();
}

var path = [
    new AMap.LngLat("116.368904","39.913423"),
    new AMap.LngLat("116.382122","39.901176"),
    new AMap.LngLat("116.387271","39.912501"),
    new AMap.LngLat("116.398258","39.904600")
];
var polyline = new AMap.Polyline({
    path: path,  
    borderWeight: 2, // 线条宽度，默认为 1
    strokeColor: 'red', // 线条颜色
    lineJoin: 'round' // 折线拐点连接处样式
});
map.add(polyline);
// 创建两个点标记
var marker1 = new AMap.Marker({
    position: new AMap.LngLat(117.39, 39.9),   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '北京'
});
var marker2 = new AMap.Marker({
    position: new AMap.LngLat(118.39, 39.9),   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '北京'
});
map.add(marker1);
map.add(marker2);

// 自动适配到合适视野范围
// 无参数，默认包括所有覆盖物的情况
map.setFitView();
// 传入覆盖物数组，仅包括polyline和marker1的情况
map.setFitView([polyline,marker1]);

  //绑定radio点击事件
  var radios = document.querySelectorAll("#map-styles input");
  radios.forEach(function(ratio) {
    ratio.onclick = setMapStyle;
  });

  function setMapStyle() {
    var styleName = "amap://styles/" + this.value;
    map.setMapStyle(styleName);
  }


 