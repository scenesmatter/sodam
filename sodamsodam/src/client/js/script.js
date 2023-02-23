$(function(){
    var homePickLink = new Array();
    homePickLink[homePickLink.length] = [
        "https://www.instagram.com/getasens/",
        "getsens",
        "게타상스",
        "패션잡화",
        "대구광역시 중구 국채보상로150길 76-12 3층"
    ];
    homePickLink[homePickLink.length] = [
        "https://www.instagram.com/nice__kitchen_/",
        "nicekitchen",
        "나이스키친",
        "식료품",
        "대구광역시 중구 동성로5길 41 1층"
    ];
    homePickLink[homePickLink.length] = [
        "https://www.instagram.com/i_want_to_be_an_oasis/",
        "oasis",
        "신기루잡화점",
        "문구사무",
        "대구광역시 중구 중앙대로 457 2층"
    ];
    homePickLink[homePickLink.length] = [
        "https://www.instagram.com/from.tds/",
        "tds",
        "티디에스",
        "인테리어",
        "대구광역시 남구 양지로14길 7 1층"
    ];
    homePickLink[homePickLink.length] = [
        "https://www.instagram.com/official._.play//",
        "play",
        "플레이",
        "문구사무",
        "대구광역시 수성구 지범로17길 74 1층"
    ];

    var homePickLinkOrder = Math.floor(Math.random()*(homePickLink.length));
    homePickLinkOrder = (isNaN(homePickLinkOrder)) ? 0 : homePickLinkOrder;
    $('.homePickLink').attr('href', homePickLink[homePickLinkOrder][0]);
    $('.homePickLink img').attr('src', '/client/img/homepick_' + homePickLink[homePickLinkOrder][1] + '.jpg');
    $('.homePickLink img').attr('alt', homePickLink[homePickLinkOrder][1]);
    $('.homePickName').text(homePickLink[homePickLinkOrder][2]);
    $('.homePickCategory').text(homePickLink[homePickLinkOrder][3]);
    $('.homePickAddress').text(homePickLink[homePickLinkOrder][4]);
});