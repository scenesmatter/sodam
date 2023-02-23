
const category = document.querySelectorAll('.category');

let all = [],    
    markers = [];

// 지도를 담을 영역의 DOM 레퍼런스
const mapContainer = document.getElementById('map'); 

// 지도를 생성할 때 필요한 기본 옵션
const mapOptions = { 
	center: new kakao.maps.LatLng(35.87170628445063, 128.60152645767263), //지도의 중심좌표.
	level: 7 //지도의 레벨(확대, 축소 정도)
};

// 지도 생성 및 객체 리턴
var map = new kakao.maps.Map(mapContainer, mapOptions);


// 카테고리 눌렀을 때 메뉴 스타일 변경
const menuStyleChange = (clickDom) => {

    for(let i=0; i < category.length; i++) {

        if(category[i] === clickDom) category[i].classList.add("on")
        else category[i].classList.remove("on")
    }
}

// 카테고리 눌렀을 때 실행할 함수
const clickMenu = (e) => {
    const clickDom = e.currentTarget;
    
    if(clickDom.classList.contains("on")) return;

    menuStyleChange(clickDom)

    removeMarker()

    addMarker(clickDom.dataset.category)
}

// 카테고리 클릭 이벤트
for(let i=0; i < category.length; i++) {
    category[i].addEventListener("click", clickMenu);
}

// 카테고리별 마커 생성 함수
function addMarker(category) {
    for(let i = 0; i < all.length; i++) {
        // 이미지 주소
        let imgSrc = "/img/map_marker.png";
        // 이미지 크기
        let imgSize = new kakao.maps.Size(35, 45);
        // 마커가 표시될 위치
        let markerPosition = new kakao.maps.LatLng(all[i].latitude, all[i].longitude);
        // 마커 이미지
        let markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);
        // 마커를 생성
        let marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
        });

        if(all[i].category === category) {
            // 마커가 지도 위에 표시되도록 설정
            marker.setMap(map);
            markers.push(marker);
        }
    }
}

// 카테고리별 마커 지우는 함수
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 커스텀 오버레이에 표시할 컨텐츠 입니다
let content = '<div class="mapWrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '            카카오 스페이스닷원' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="/img/map_marker.png" width="73" height="70">' +
            '            </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '  </div>';

// 마커 위에 커스텀오버레이를 표시합니다
// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
// 지도에 마커를 표시합니다
let marker = '',
    overlay = '',
    contentNode = document.createElement('div');

for(let i=0; i < all.length; i++) {
    let position = new kakao.maps.LatLng(all[i].latitude, all[i].longitude);
    
    marker = new kakao.maps.Marker({
        map: map, 
        position: position[i]
    });    
    
    overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: position[i] 
    });
}

// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
kakao.maps.event.addListener(marker, 'click', function() {
    contentNode.innnerHTML(content);
    overlay.setContent(contentNode);
});

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
function closeOverlay() {
    overlay.setMap(null);     
}

// fetch() 함수로 DB의 데이터 불러오기
const mapFetch = async () => {
    const data = await(await fetch("/map/info")).json();
    all = data;
    console.log(all);
}
mapFetch();

