var map, marker_s, marker_e;
var marker1;
var drawInfoArr = [];
var drawInfoArr2 = [];

var chktraffic = [];
var resultdrawArr = [];
var resultMarkerArr = [];

function initTmap() {

    // 1. 지도 띄우기
    map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(37.570028, 126.986072),
        width: "100%",
        height: "400px",
        zoom: 15,
        zoomControl: true,
        scrollwheel: true

    });
    // 마커 초기화
    marker_1 = new Tmapv2.Marker({
        icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_a.png",
        iconSize: new Tmapv2.Size(24, 38),
        map: map
    });

    var fullAddr_s = $("#CP_startPoint").val();
    $.ajax({
        method: "GET",
        url: "https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&callback=result",
        async: false,
        data: {
            "appKey": "AppKey",
            "coordType": "WGS84GEO",
            "fullAddr": fullAddr_s
        },
        success: function(response) {
            var resultInfo_s = response.coordinateInfo; // .coordinate[0];
            console.log(resultInfo_s);
            // 기존 마커 삭제
            /*if(marker_s) {
            	marker_s.setMap(null);
            }*/
            // 3.마커 찍기
            // 검색 결과 정보가 없을 때 처리
            if (resultInfo_s.coordinate.length == 0) {
                $("#result_s").text("요청 데이터가 올바르지 않습니다.");
            } else {
                var lon_s, lat_s;
                var resultCoordinate_s = resultInfo_s.coordinate[0];

                if (resultCoordinate_s.lon.length > 0) {
                    // 구주소
                    lon_s = resultCoordinate_s.lon;
                    lat_s = resultCoordinate_s.lat;
                } else {
                    // 신주소
                    lon_s = resultCoordinate_s.newLon;
                    lat_s = resultCoordinate_s.newLat
                }

                var lonEntr_s, latEntr_s;
                if (resultCoordinate_s.lonEntr == undefined && resultCoordinate_s.newLonEntr == undefined) {
                    lonEntr_s = 0;
                    latEntr_s = 0;
                } else {
                    if (resultCoordinate_s.lonEntr.length > 0) {
                        lonEntr_s = resultCoordinate_s.lonEntr;
                        latEntr_s = resultCoordinate_s.latEntr;
                    } else {
                        lonEntr_s = resultCoordinate_s.newLonEntr;
                        latEntr_s = resultCoordinate_s.newLatEntr;
                    }
                }
                var markerPosition_s = new Tmapv2.LatLng(Number(lat_s), Number(lon_s));

                // 마커 올리기
                marker_s = new Tmapv2.Marker({
                    position: markerPosition_s,
                    icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_s.png",
                    iconSize: new Tmapv2.Size(24, 38),
                    map: map
                });
                map.setCenter(markerPosition_s);

                // 검색 결과 표출
                var matchFlag, newMatchFlag;
                // 검색 결과 주소를 담을 변수
                var address = '',
                    newAddress = '';
                var city, gu_gun, eup_myun, legalDong, adminDong, ri, bunji;
                var buildingName, buildingDong, newRoadName, newBuildingIndex, newBuildingName, newBuildingDong;

                // 새주소일 때 검색 결과 표출
                // 새주소인 경우 matchFlag가 아닌
                // newMatchFlag가 응답값으로
                // 온다
                if (resultCoordinate_s.newMatchFlag.length > 0) {
                    // 새(도로명) 주소 좌표 매칭
                    // 구분 코드
                    newMatchFlag = resultCoordinate_s.newMatchFlag;

                    // 시/도 명칭
                    if (resultCoordinate_s.city_do.length > 0) {
                        city = resultCoordinate_s.city_do;
                        newAddress += city + "\n";
                    }

                    // 군/구 명칭
                    if (resultCoordinate_s.gu_gun.length > 0) {
                        gu_gun = resultCoordinate_s.gu_gun;
                        newAddress += gu_gun + "\n";
                    }
                    // 읍면동 명칭
                    if (resultCoordinate_s.eup_myun.length > 0) {
                        eup_myun = resultCoordinate_s.eup_myun;
                        newAddress += eup_myun + "\n";
                    } else {
                        // 출력 좌표에 해당하는
                        // 법정동 명칭
                        if (resultCoordinate_s.legalDong.length > 0) {
                            legalDong = resultCoordinate_s.legalDong;
                            newAddress += legalDong + "\n";
                        }
                        // 출력 좌표에 해당하는
                        // 행정동 명칭
                        if (resultCoordinate_s.adminDong.length > 0) {
                            adminDong = resultCoordinate_s.adminDong;
                            newAddress += adminDong + "\n";
                        }
                    }
                    // 출력 좌표에 해당하는 리 명칭
                    if (resultCoordinate_s.ri.length > 0) {
                        ri = resultCoordinate_s.ri;
                        newAddress += ri + "\n";
                    }
                    // 출력 좌표에 해당하는 지번 명칭
                    if (resultCoordinate_s.bunji.length > 0) {
                        bunji = resultCoordinate_s.bunji;
                        newAddress += bunji + "\n";
                    }
                    // 새(도로명)주소 매칭을 한
                    // 경우, 길 이름을 반환
                    if (resultCoordinate_s.newRoadName.length > 0) {
                        newRoadName = resultCoordinate_s.newRoadName;
                        newAddress += newRoadName + "\n";
                    }
                    // 새(도로명)주소 매칭을 한
                    // 경우, 건물 번호를 반환
                    if (resultCoordinate_s.newBuildingIndex.length > 0) {
                        newBuildingIndex = resultCoordinate_s.newBuildingIndex;
                        newAddress += newBuildingIndex + "\n";
                    }
                    // 새(도로명)주소 매칭을 한
                    // 경우, 건물 이름를 반환
                    if (resultCoordinate_s.newBuildingName.length > 0) {
                        newBuildingName = resultCoordinate_s.newBuildingName;
                        newAddress += newBuildingName + "\n";
                    }
                    // 새주소 건물을 매칭한 경우
                    // 새주소 건물 동을 반환
                    if (resultCoordinate_s.newBuildingDong.length > 0) {
                        newBuildingDong = resultCoordinate_s.newBuildingDong;
                        newAddress += newBuildingDong + "\n";
                    }
                    // 검색 결과 표출
                    if (lonEntr_s > 0) {
                        var docs = "<a style='color:orange' href='#webservice/docs/fullTextGeocoding'>Docs</a>"
                        var text = "검색결과(새주소) : " + newAddress + ",\n 응답코드:" + newMatchFlag +
                            "(상세 코드 내역은 " + docs + " 에서 확인)" + "</br> 위경도좌표(중심점) : " + lat_s + ", " + lon_s;
                        $("#result_s").html(text);
                    } else {
                        var docs = "<a style='color:orange' href='#webservice/docs/fullTextGeocoding'>Docs</a>"
                        var text = "검색결과(새주소) : " + newAddress + ",\n 응답코드:" + newMatchFlag +
                            "(상세 코드 내역은 " + docs + " 에서 확인)";
                        $("#result_s").html(text);
                    }
                }
                // 구주소일 때 검색 결과 표출
                // 구주소인 경우 newMatchFlag가
                // 아닌 MatchFlag가 응닶값으로
                // 온다
                if (resultCoordinate_s.matchFlag.length > 0) {
                    // 매칭 구분 코드
                    matchFlag = resultCoordinate_s.matchFlag;

                    // 시/도 명칭
                    if (resultCoordinate_s.city_do.length > 0) {
                        city = resultCoordinate_s.city_do;
                        address += city + "\n";
                    }
                    // 군/구 명칭
                    if (resultCoordinate_s.gu_gun.length > 0) {
                        gu_gun = resultCoordinate_s.gu_gun;
                        address += gu_gun + "\n";
                    }
                    // 읍면동 명칭
                    if (resultCoordinate_s.eup_myun.length > 0) {
                        eup_myun = resultCoordinate_s.eup_myun;
                        address += eup_myun + "\n";
                    }
                    // 출력 좌표에 해당하는 법정동
                    // 명칭
                    if (resultCoordinate_s.legalDong.length > 0) {
                        legalDong = resultCoordinate_s.legalDong;
                        address += legalDong + "\n";
                    }
                    // 출력 좌표에 해당하는 행정동
                    // 명칭
                    if (resultCoordinate_s.adminDong.length > 0) {
                        adminDong = resultCoordinate_s.adminDong;
                        address += adminDong + "\n";
                    }
                    // 출력 좌표에 해당하는 리 명칭
                    if (resultCoordinate_s.ri.length > 0) {
                        ri = resultCoordinate_s.ri;
                        address += ri + "\n";
                    }
                    // 출력 좌표에 해당하는 지번 명칭
                    if (resultCoordinate_s.bunji.length > 0) {
                        bunji = resultCoordinate_s.bunji;
                        address += bunji + "\n";
                    }
                    // 출력 좌표에 해당하는 건물 이름
                    // 명칭
                    if (resultCoordinate_s.buildingName.length > 0) {
                        buildingName = resultCoordinate_s.buildingName;
                        address += buildingName + "\n";
                    }
                    // 출력 좌표에 해당하는 건물 동을
                    // 명칭
                    if (resultCoordinate_s.buildingDong.length > 0) {
                        buildingDong = resultCoordinate_s.buildingDong;
                        address += buildingDong + "\n";
                    }
                    // 검색 결과 표출
                    if (lonEntr_s > 0) {
                        var text = "검색결과(지번주소) : " + address + "," + "\n" + "응답코드:" +
                            matchFlag + "</br>" + "위경도좌표(중심점) : " + lat_s + ", " + lon_s + "</br>";
                        $("#result_s").html(text);
                    } else {
                        var text = "검색결과(지번주소) : " + address + "," + "\n" + "응답코드:" +
                            matchFlag + "</br>";
                        $("#result_s").html(text);
                    }
                }
            }
        },
        error: function(request, status, error) {
            console.log(request);
            console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
            // 에러가 발생하면 맵을 초기화함
            // markerStartLayer.clearMarkers();
            // 마커초기화
            map.setCenter(new Tmapv2.LatLng(37.570028, 126.986072));
            $("#result_s").html("");
        }
    });

    var fullAddr_e = $("#CP_endPoint").val();
    $.ajax({
        method: "GET",
        url: "https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&callback=result",
        async: false,
        data: {
            "appKey": "AppKey",
            "coordType": "WGS84GEO",
            "fullAddr": fullAddr_e
        },
        success: function(response) {

            var resultInfo_e = response.coordinateInfo; // .coordinate[0];
            console.log(resultInfo_e);
            // 기존 마커 삭제
            /*if (marker_e) {
                marker_e.setMap(null);
            }*/

            // 3.마커 찍기
            // 검색 결과 정보가 없을 때 처리
            if (resultInfo_e.coordinate.length == 0) {
                $("#result_e").text("요청 데이터가 올바르지 않습니다.");
            } else {
                var lon_e, lat_e;
                var resultCoordinate_e = resultInfo_e.coordinate[0];

                if (resultCoordinate_e.lon.length > 0) {
                    // 구주소
                    lon_e = resultCoordinate_e.lon;
                    lat_e = resultCoordinate_e.lat;
                } else {
                    // 신주소
                    lon_e = resultCoordinate_e.newLon;
                    lat_e = resultCoordinate_e.newLat
                }

                var lonEntr_e, latEntr_e;

                if (resultCoordinate_e.lonEntr == undefined &&
                    resultCoordinate_e.newLonEntr == undefined) {
                    lonEntr_e = 0;
                    latEntr_e = 0;
                } else {
                    if (resultCoordinate_e.lonEntr.length > 0) {
                        lonEntr_e = resultCoordinate_e.lonEntr;
                        latEntr_e = resultCoordinate_e.latEntr;
                    } else {
                        lonEntr_e = resultCoordinate_e.newLonEntr;
                        latEntr_e = resultCoordinate_e.newLatEntr;
                    }
                }
                var markerPosition_e = new Tmapv2.LatLng(Number(lat_e), Number(lon_e));

                // 마커 올리기
                marker_e = new Tmapv2.Marker({
                    position: markerPosition_e,
                    icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_e.png",
                    iconSize: new Tmapv2.Size(24, 38),
                    map: map
                });
//                map.setCenter(markerPosition);
                // 검색 결과 표출
                var matchFlag, newMatchFlag;
                // 검색 결과 주소를 담을 변수
                var address = '',
                    newAddress = '';
                var city, gu_gun, eup_myun, legalDong, adminDong, ri, bunji;
                var buildingName, buildingDong, newRoadName, newBuildingIndex, newBuildingName, newBuildingDong;

                // 새주소일 때 검색 결과 표출
                // 새주소인 경우 matchFlag가 아닌
                // newMatchFlag가 응답값으로
                // 온다
                if (resultCoordinate_e.newMatchFlag.length > 0) {
                    // 새(도로명) 주소 좌표 매칭
                    // 구분 코드
                    newMatchFlag = resultCoordinate_e.newMatchFlag;

                    // 시/도 명칭
                    if (resultCoordinate_e.city_do.length > 0) {
                        city = resultCoordinate_e.city_do;
                        newAddress += city + "\n";
                    }

                    // 군/구 명칭
                    if (resultCoordinate_e.gu_gun.length > 0) {
                        gu_gun = resultCoordinate_e.gu_gun;
                        newAddress += gu_gun + "\n";
                    }
                    // 읍면동 명칭
                    if (resultCoordinate_e.eup_myun.length > 0) {
                        eup_myun = resultCoordinate_e.eup_myun;
                        newAddress += eup_myun + "\n";
                    } else {
                        // 출력 좌표에 해당하는
                        // 법정동 명칭
                        if (resultCoordinate_e.legalDong.length > 0) {
                            legalDong = resultCoordinate_e.legalDong;
                            newAddress += legalDong + "\n";
                        }
                        // 출력 좌표에 해당하는
                        // 행정동 명칭
                        if (resultCoordinate_e.adminDong.length > 0) {
                            adminDong = resultCoordinate_e.adminDong;
                            newAddress += adminDong + "\n";
                        }
                    }
                    // 출력 좌표에 해당하는 리 명칭
                    if (resultCoordinate_e.ri.length > 0) {
                        ri = resultCoordinate_e.ri;
                        newAddress += ri + "\n";
                    }
                    // 출력 좌표에 해당하는 지번 명칭
                    if (resultCoordinate_e.bunji.length > 0) {
                        bunji = resultCoordinate_e.bunji;
                        newAddress += bunji + "\n";
                    }
                    // 새(도로명)주소 매칭을 한
                    // 경우, 길 이름을 반환
                    if (resultCoordinate_e.newRoadName.length > 0) {
                        newRoadName = resultCoordinate_e.newRoadName;
                        newAddress += newRoadName + "\n";
                    }
                    // 새(도로명)주소 매칭을 한
                    // 경우, 건물 번호를 반환
                    if (resultCoordinate_e.newBuildingIndex.length > 0) {
                        newBuildingIndex = resultCoordinate_e.newBuildingIndex;
                        newAddress += newBuildingIndex + "\n";
                    }
                    // 새(도로명)주소 매칭을 한
                    // 경우, 건물 이름를 반환
                    if (resultCoordinate_e.newBuildingName.length > 0) {
                        newBuildingName = resultCoordinate_e.newBuildingName;
                        newAddress += newBuildingName + "\n";
                    }
                    // 새주소 건물을 매칭한 경우
                    // 새주소 건물 동을 반환
                    if (resultCoordinate_e.newBuildingDong.length > 0) {
                        newBuildingDong = resultCoordinate_e.newBuildingDong;
                        newAddress += newBuildingDong + "\n";
                    }
                    // 검색 결과 표출
                    if (lonEntr_e > 0) {
                        var docs = "<a style='color:orange' href='#webservice/docs/fullTextGeocoding'>Docs</a>"
                        var text = "검색결과(새주소) : " + newAddress + ",\n 응답코드:" + newMatchFlag +
                            "(상세 코드 내역은 " + docs + " 에서 확인)" + "</br> 위경도좌표(중심점) : " + lat_e + ", " + lon_e;
                        $("#result_e").html(text);
                    } else {
                        var docs = "<a style='color:orange' href='#webservice/docs/fullTextGeocoding'>Docs</a>"
                        var text = "검색결과(새주소) : " + newAddress + ",\n 응답코드:" + newMatchFlag +
                            "(상세 코드 내역은 " + docs + " 에서 확인)";
                        $("#result_e").html(text);
                    }
                }
                // 구주소일 때 검색 결과 표출
                // 구주소인 경우 newMatchFlag가
                // 아닌 MatchFlag가 응닶값으로
                // 온다
                if (resultCoordinate_e.matchFlag.length > 0) {
                    // 매칭 구분 코드
                    matchFlag = resultCoordinate_e.matchFlag;

                    // 시/도 명칭
                    if (resultCoordinate_e.city_do.length > 0) {
                        city = resultCoordinate_e.city_do;
                        address += city + "\n";
                    }
                    // 군/구 명칭
                    if (resultCoordinate_e.gu_gun.length > 0) {
                        gu_gun = resultCoordinate_e.gu_gun;
                        address += gu_gun + "\n";
                    }
                    // 읍면동 명칭
                    if (resultCoordinate_e.eup_myun.length > 0) {
                        eup_myun = resultCoordinate_e.eup_myun;
                        address += eup_myun + "\n";
                    }
                    // 출력 좌표에 해당하는 법정동
                    // 명칭
                    if (resultCoordinate_e.legalDong.length > 0) {
                        legalDong = resultCoordinate_e.legalDong;
                        address += legalDong + "\n";
                    }
                    // 출력 좌표에 해당하는 행정동
                    // 명칭
                    if (resultCoordinate_e.adminDong.length > 0) {
                        adminDong = resultCoordinate_e.adminDong;
                        address += adminDong + "\n";
                    }
                    // 출력 좌표에 해당하는 리 명칭
                    if (resultCoordinate_e.ri.length > 0) {
                        ri = resultCoordinate_e.ri;
                        address += ri + "\n";
                    }
                    // 출력 좌표에 해당하는 지번 명칭
                    if (resultCoordinate_e.bunji.length > 0) {
                        bunji = resultCoordinate_e.bunji;
                        address += bunji + "\n";
                    }
                    // 출력 좌표에 해당하는 건물 이름
                    // 명칭
                    if (resultCoordinate_e.buildingName.length > 0) {
                        buildingName = resultCoordinate_e.buildingName;
                        address += buildingName + "\n";
                    }
                    // 출력 좌표에 해당하는 건물 동을
                    // 명칭
                    if (resultCoordinate_e.buildingDong.length > 0) {
                        buildingDong = resultCoordinate_e.buildingDong;
                        address += buildingDong + "\n";
                    }
                    // 검색 결과 표출
                    if (lonEntr_e > 0) {
                        var text = "검색결과(지번주소) : " + address + "," + "\n" + "응답코드:" +
                            matchFlag + "</br>" + "위경도좌표(중심점) : " + lat_e + ", " + lon_e + "</br>";
                        $("#result_e").html(text);
                    } else {
                        var text = "검색결과(지번주소) : " + address + "," + "\n" + "응답코드:" + matchFlag + "</br>";
                        $("#result_e").html(text);
                    }
                }
            }
        },
        error: function(request, status, error) {
            console.log(request);
            console.log("code:" + request.status + "\n message:" + request.responseText + "\n error:" + error);
            // 에러가 발생하면 맵을 초기화함
            // markerStartLayer.clearMarkers();
            // 마커초기화
            map.setCenter(new Tmapv2.LatLng(37.570028, 126.986072));
            $("#result_e").html("");
        }
    });

//    alert("요금 정보를 참고하시길 바랍니다");
    // 기존 맵에 있던 정보들 초기화
    resettingMap();

    var searchOption = $("#selectLevel").val();
    var trafficInfochk = $("#year").val();

    // JSON TYPE EDIT [S]
    $.ajax({
        type: "POST",
        url: "https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",
        async: false,
        data: {
            "appKey": "AppKey",
            "startX": marker_s.getPosition()._lng,
            "startY": marker_s.getPosition()._lat,
            "endX": marker_e.getPosition()._lng,
            "endY": marker_e.getPosition()._lat,
            "reqCoordType": "WGS84GEO",
            "resCoordType": "EPSG3857",
            "searchOption": searchOption,
            "trafficInfo": trafficInfochk
        },
        success: function(response) {

            var resultData = response.features;

            var tDistance = "총 거리 : " + (resultData[0].properties.totalDistance / 1000).toFixed(1) + "km,";
            var tTime = " 총 시간 : " + (resultData[0].properties.totalTime / 60).toFixed(0) + "분,";
            var tFare = " 통행료 : " + resultData[0].properties.totalFare + "원,";
            var taxiFare = " 예상 택시 요금 : " + resultData[0].properties.taxiFare + "원";

            $("#resultInfo").text(tDistance + tTime + tFare + taxiFare);

            // 교통정보 표출 옵션값을 체크
            if (trafficInfochk == "Y") {
                for (var i in resultData) { // for문
                    // [S]
                    var geometry = resultData[i].geometry;
                    var properties = resultData[i].properties;
                    if (geometry.type == "LineString") {
                        // 교통 정보도 담음
                        chktraffic.push(geometry.traffic);
                        var sectionInfos = [];
                        var trafficArr = geometry.traffic;
                        for (var j in geometry.coordinates) {
                            // 경로들의 결과값들을 포인트 객체로 변환
                            var latlng = new Tmapv2.Point(
                                geometry.coordinates[j][0],
                                geometry.coordinates[j][1]);
                            // 포인트 객체를 받아 좌표값으로 변환
                            var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);

                            sectionInfos.push(convertPoint);
                        }

                        drawLine(sectionInfos, trafficArr);
                    } else {

                        var markerImg = "";
                        var pType = "";

                        if (properties.pointType == "S") { // 출발지
                            // 마커
                            markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
                            pType = "S";
                        } else if (properties.pointType == "E") { // 도착지
                            // 마커
                            markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                            pType = "E";
                        } else { // 각 포인트 마커
                            markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                            pType = "P"
                        }

                        // 경로들의 결과값들을 포인트 객체로 변환
                        var latlon = new Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1]);
                        // 포인트 객체를 받아 좌표값으로 다시 변환
                        var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

                        var routeInfoObj = {
                            markerImage: markerImg,
                            lng: convertPoint._lng,
                            lat: convertPoint._lat,
                            pointType: pType
                        };
                        // 마커 추가
                        addMarkers(routeInfoObj);
                    }
                } // for문 [E]

            } else {

                for (var i in resultData) { // for문
                    // [S]
                    var geometry = resultData[i].geometry;
                    var properties = resultData[i].properties;

                    if (geometry.type == "LineString") {
                        for (var j in geometry.coordinates) {
                            // 경로들의 결과값들을 포인트 객체로 변환
                            var latlng = new Tmapv2.Point(
                                geometry.coordinates[j][0],
                                geometry.coordinates[j][1]);
                            // 포인트 객체를 받아 좌표값으로 변환
                            var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                                latlng);
                            // 포인트객체의 정보로 좌표값 변환 객체로
                            // 저장
                            var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
                            // 배열에 담기
                            
                            drawInfoArr.push(convertChange);
                        }
                        drawLine(drawInfoArr, "0");
                    } else {

                        var markerImg = "";
                        var pType = "";

                        if (properties.pointType == "S") { // 출발지
                            // 마커
                            markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
                            pType = "S";
                        } else if (properties.pointType == "E") { // 도착지
                            // 마커
                            markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                            pType = "E";
                        } else { // 각 포인트 마커
                            markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                            pType = "P"
                        }

                        // 경로들의 결과값들을 포인트 객체로 변환
                        var latlon = new Tmapv2.Point(
                            geometry.coordinates[0],
                            geometry.coordinates[1]);
                        // 포인트 객체를 받아 좌표값으로 다시 변환
                        var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

                        var routeInfoObj = {
                            markerImage: markerImg,
                            lng: convertPoint._lng,
                            lat: convertPoint._lat,
                            pointType: pType
                        };

                        // Marker 추가
                        addMarkers(routeInfoObj);
                    }
                } //for문 [E]
            }
        },
        error: function(request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" +
                request.responseText + "\n" + "error:" + error);
        }
    });
    
    map.setZoom(16);
    
  //2. api 사용요청
	var lon, lat;
	var markerPosition;
	var arrResult;

	map.addListener("click", function onClick(evt) {//클릭을 하였을 때의 일어나는 경우를 담은 함수
		var mapLatLng = evt.latLng;//mapLatLng이라는 변수는 클릭 이벤트를 한 위치의 latLng정보를 가지고 있다.
		
		if(marker1) {
			marker1.setMap(null);//기존의 마커 삭제
		}

		markerPosition = new Tmapv2.LatLng(mapLatLng._lat, mapLatLng._lng);

		//마커 올리기
		marker1 = new Tmapv2.Marker(
			{
				position : markerPosition,
				icon : "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_p.png",
				iconSize : new Tmapv2.Size(24, 38),
				map : map
			});

		reverseGeo(mapLatLng._lng, mapLatLng._lat);//클릭한 이벤트 위치의 경도, 위도를 ajax통신을 이용한 메소드인 reverseGeo에 대입
	});

	$("#selectSP").click(function() {
		marker1.setMap(null);
		if (marker_s) {
			marker_s.setMap(null);
		}

		marker_s = new Tmapv2.Marker(
			{
				position : markerPosition,
				icon : "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_s.png",
				iconSize : new Tmapv2.Size(24, 38),
				map : map
			});

		document.getElementById("CP_startPoint").value = result;
	});

	$("#selectEP").click(function() {
		marker1.setMap(null);
		if (marker_e) {
			marker_e.setMap(null);
		}
		marker_e = new Tmapv2.Marker(
			{
				position : markerPosition,
				icon : "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_e.png",
				iconSize : new Tmapv2.Size(24, 38),
				map : map
		});

		document.getElementById("CP_endPoint").value = result;
	});

	function reverseGeo(lon, lat) {
		
		$.ajax({
			method : "GET",
			url : "https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result",
			//요url을 이용해 sk로 전송하면 그 주소에 대한 정보를 sk가 나한테 서버 전송해줌.
			async : false,
			data : {
				"appKey" : "AppKey",
				"coordType" : "WGS84GEO",
				"addressType" : "A10",
				"lon" : lon,
				"lat" : lat
			},
			success : function(response) {
				//3. json에서 주소 파싱
				arrResult = response.addressInfo;//ajax통신을 통해 얻은 주소 정보를 변수 arrResult에 넣는다.
				console.log(arrResult);
						/*
						//단위..? 법정동 마지막 문자, 예시로는 방화'동', 화곡'동', 서천'읍', 종천'면'
						var lastLegal=arrResult.legalDong.charAt(arrResult.legalDong.length-1);
						//lastLegal에는 동, 읍, 면을 대입
						
						//새주소, 서울시 구로구 이런 형식
						newRoadAddr=arrResult.city_do+' '+arrResult.gu_gun+ ' ';
						
						//읍면이 아니고 읍면으로 주소가 존재하면 읍, 면이라는 단위를 newRoadAddr이라는 변수에 추가
						if(arrResult.eup_myun == ' ' &&(lastLegal=="읍"||lastLegal=="면")){
						    newRoadAddr +=arrResult.legalDong;
						}
						else {//아니면 읍면이라는 단위를 추가로 붙여줌
						    newRoadAddr+=arrResult.eup_myun;
						}
						//읍면 조사이후에 도로명 주소와 건물번호를 추가
						newRoadAddr+=' '+arrResult.roadName+' '+arrResult.buildingIndex;
						
						//새주소 법정동&건물명 체크, 시골이 아닌 도시로서 읍이나 면이 아니라 '동'으로 끝난다면
						if(arrResult.legalDong!= ' ' && (lastLegal !="읍" && lastLegal!="면")){
						
						if(arrResult.buildingName!=' '){//만약 빌딩명이 존재를 한다면
						    newRoadAddr += (' ('+arrResult.legalDong+', '+arrResult.buildingName+') ');
						}
						else {
						    newRoadAddr += (' ('+arrResult.legalDong +') ');
						}    
						}
						else if (arrResult.buildingName!=' '){
						newRoadAddr += (' ('+arrResult.buildingName + ') ');
						}
						
						//구주소
						jibunAddr = arrResult.city_do + ' '+ arrResult.gu_gun + ' ' + arrResult.legalDong + ' '+arrResult.ri + ' '+arrResult.bunji;
						
						//구주소 빌딩명만 존재하는 경우
						if(arrResult.buildingName != ' '){
						jibunAddr += (' '+arrResult.buildingName);
						}
						
						result = "새주소 : " + newRoadAddr + "</br>";
						result += "지번주소 : " + jibunAddr + "</br>";*/
						//result += "위경도좌표 : " +ㅓ lat + ", " + lon+"</br>"; 

						/*  result = "fullAddress :" +'"'+ arrResult.fullAddress+'"'+"</br>";
						 result += "addressType :" +'"'+ arrResult.addressType+'"'+"</br>";
						 result += "city_do: " + '"'+ arrResult.city_do+'"'+"</br>";
						 result += "gu_gun: " + '"'+ arrResult.gu_gun+'"'+"</br>";
						 result += "eup_myun: " + '"'+ arrResult.eup_myun+'"'+"</br>";
						  result += "adminDong: " + '"'+ arrResult.adminDong+'"'+"</br>";
						 result += "adminDongCode: " + '"'+ arrResult.adminDongCode+'"'+"</br>";
						 result += "legalDong: " + '"'+ arrResult.legalDong+'"'+"</br>";
						 result += "legalDongCode: " + '"'+ arrResult.legalDongCode+'"'+"</br>";
						 result += "ri: " + '"'+ arrResult.ri+'"'+"</br>";
						 result += "bunji: " + '"'+ arrResult.bunji+'"'+"</br>";
						 result += "roadName: " + '"'+ arrResult.roadName+'"'+"</br>";
						 result += "buildingName: " + '"'+ arrResult.buildingName+'"'+"</br>";
						 result += "mappingDistance: " + '"'+ arrResult.mappingDistance+'"'+"</br>";
						 result += "roadCode: " + '"'+ arrResult.roadCode+'"'+"</br>"; */

				/*result = arrResult.city_do + ' ' + arrResult.gu_gun
						+ ' ' + arrResult.legalDong + ' ' + arrResult.bunji;*/
				result = arrResult.city_do + ' ' + arrResult.gu_gun
				+ ' ' + arrResult.roadName + ' ' + arrResult.buildingName;

				var resultDiv = document.getElementById("result");
				//				resultDiv.innerHTML = result;
			},
			error : function(request, status, error) {
				console.log("code:" + request.status + "\n"
						+ "message:" + request.responseText + "\n"
						+ "error:" + error);
			}
		});
	}
	
	// 3. 경로탐색 API 사용요청
	$("#btn_select").click(function() {
		
		alert("요금 정보를 참고하시길 바랍니다");
		//기존 맵에 있던 정보들 초기화
		resettingMap();
		
		var searchOption = $("#selectLevel").val();
		var trafficInfochk = $("#year").val();

		//JSON TYPE EDIT [S]
		$.ajax({
			type : "POST",
			url : "https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",
			async : false,
			data : {
				"appKey" : "AppKey",
				"startX" : marker_s.getPosition()._lng,
				"startY" : marker_s.getPosition()._lat,
				"endX" : marker_e.getPosition()._lng,
				"endY" : marker_e.getPosition()._lat,
				"reqCoordType" : "WGS84GEO",
				"resCoordType" : "EPSG3857",
				"searchOption" : searchOption,
				"trafficInfo" : trafficInfochk
			},
			success : function(response) {

				var resultData = response.features;

				var tDistance = "총 거리 : "
						+ (resultData[0].properties.totalDistance / 1000).toFixed(1) + "km,";
				var tTime = " 총 시간 : "
						+ (resultData[0].properties.totalTime / 60).toFixed(0) + "분,";
				var tFare = " 통행료 : "
						+ resultData[0].properties.totalFare + "원,";
				var taxiFare = " 예상 택시 요금 : "
						+ resultData[0].properties.taxiFare + "원";
				var duration = (resultData[0].properties.totalTime / 60).toFixed(0);

				$("#resultInfo").text(tDistance + tTime + tFare	+ taxiFare);
				$("#CP_duration").val(duration); //소요시간 값 전송

				//교통정보 표출 옵션값을 체크
				if (trafficInfochk == "Y") {
					for ( var i in resultData) { //for문 [S]
						var geometry = resultData[i].geometry;
						var properties = resultData[i].properties;
						if (geometry.type == "LineString") {
							//교통 정보도 담음
							chktraffic.push(geometry.traffic);
							var sectionInfos = [];
							var trafficArr = geometry.traffic;
							for ( var j in geometry.coordinates) {
								// 경로들의 결과값들을 포인트 객체로 변환 
								var latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
								// 포인트 객체를 받아 좌표값으로 변환
								var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);

								sectionInfos.push(convertPoint);
							}

							drawLine(sectionInfos, trafficArr);
						} else {

							var markerImg = "";
							var pType = "";

							if (properties.pointType == "S") { //출발지 마커
								markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
								pType = "S";
							} else if (properties.pointType == "E") { //도착지 마커
								markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
								pType = "E";
							} else { //각 포인트 마커
								markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
								pType = "P"
							}

							// 경로들의 결과값들을 포인트 객체로 변환 
							var latlon = new Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1]);
							// 포인트 객체를 받아 좌표값으로 다시 변환
							var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

							var routeInfoObj = {
								markerImage : markerImg,
								lng : convertPoint._lng,
								lat : convertPoint._lat,
								pointType : pType
							};
							// 마커 추가
							addMarkers(routeInfoObj);
						}
					}//for문 [E]

				} else {

					for ( var i in resultData) { //for문 [S]
						var geometry = resultData[i].geometry;
						var properties = resultData[i].properties;

						if (geometry.type == "LineString") {
							for ( var j in geometry.coordinates) {
								// 경로들의 결과값들을 포인트 객체로 변환 
								var latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
								// 포인트 객체를 받아 좌표값으로 변환
								var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
								// 포인트객체의 정보로 좌표값 변환 객체로 저장
								var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
								// 배열에 담기
								drawInfoArr.push(convertChange);
							}
							drawLine(drawInfoArr, "0");
						} else {

							var markerImg = "";
							var pType = "";

							if (properties.pointType == "S") { //출발지 마커
								markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
								pType = "S";
							} else if (properties.pointType == "E") { //도착지 마커
								markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
								pType = "E";
							} else { //각 포인트 마커
								markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
								pType = "P"
							}

							// 경로들의 결과값들을 포인트 객체로 변환 
							var latlon = new Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1]);
							// 포인트 객체를 받아 좌표값으로 다시 변환
							var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

							var routeInfoObj = {
								markerImage : markerImg,
								lng : convertPoint._lng,
								lat : convertPoint._lat,
								pointType : pType
							};

							// Marker 추가
							addMarkers(routeInfoObj);
						}
					}//for문 [E]
				}
			},
			error : function(request, status, error) {
				console.log("code:" + request.status + "\n" + "message:"
									+ request.responseText + "\n" + "error:" + error);
			}
		});
		//JSON TYPE EDIT [E]
	});
    
}

function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

//마커 생성하기
function addMarkers(infoObj) {
    var size = new Tmapv2.Size(24, 38); //아이콘 크기 설정합니다.

    if (infoObj.pointType == "P") { //포인트점일때는 아이콘 크기를 줄입니다.
        size = new Tmapv2.Size(8, 8);
    }

    marker_p = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(infoObj.lat, infoObj.lng),
        icon: infoObj.markerImage,
        iconSize: size,
        map: map
    });

    resultMarkerArr.push(marker_p);
}

//라인그리기
function drawLine(arrPoint, traffic) {
    var polyline_;

    if (chktraffic.length != 0) {

        // 교통정보 혼잡도를 체크
        // strokeColor는 교통 정보상황에 다라서 변화
        // traffic :  0-정보없음, 1-원활, 2-서행, 3-지체, 4-정체  (black, green, yellow, orange, red)

        var lineColor = "";

        if (traffic != "0") {
            if (traffic.length == 0) { //length가 0인것은 교통정보가 없으므로 검은색으로 표시

                lineColor = "#06050D";
                //라인그리기[S]
                polyline_ = new Tmapv2.Polyline({
                    path: arrPoint,
                    strokeColor: lineColor,
                    strokeWeight: 6,
                    map: map
                });
                resultdrawArr.push(polyline_);
                //라인그리기[E]
            } else { //교통정보가 있음

                if (traffic[0][0] != 0) { //교통정보 시작인덱스가 0이 아닌경우
                    var trafficObject = "";
                    var tInfo = [];

                    for (var z = 0; z < traffic.length; z++) {
                        trafficObject = {
                            "startIndex": traffic[z][0],
                            "endIndex": traffic[z][1],
                            "trafficIndex": traffic[z][2],
                        };
                        tInfo.push(trafficObject)
                    }

                    var noInfomationPoint = [];

                    for (var p = 0; p < tInfo[0].startIndex; p++) {
                        noInfomationPoint.push(arrPoint[p]);
                    }

                    //라인그리기[S]
                    polyline_ = new Tmapv2.Polyline({
                        path: noInfomationPoint,
                        strokeColor: "#06050D",
                        strokeWeight: 6,
                        map: map
                    });
                    //라인그리기[E]
                    resultdrawArr.push(polyline_);

                    for (var x = 0; x < tInfo.length; x++) {
                        var sectionPoint = []; //구간선언

                        for (var y = tInfo[x].startIndex; y <= tInfo[x].endIndex; y++) {
                            sectionPoint.push(arrPoint[y]);
                        }

                        if (tInfo[x].trafficIndex == 0) {
                            lineColor = "#06050D";
                        } else if (tInfo[x].trafficIndex == 1) {
                            lineColor = "#61AB25";
                        } else if (tInfo[x].trafficIndex == 2) {
                            lineColor = "#FFFF00";
                        } else if (tInfo[x].trafficIndex == 3) {
                            lineColor = "#E87506";
                        } else if (tInfo[x].trafficIndex == 4) {
                            lineColor = "#D61125";
                        }

                        //라인그리기[S]
                        polyline_ = new Tmapv2.Polyline({
                            path: sectionPoint,
                            strokeColor: lineColor,
                            strokeWeight: 6,
                            map: map
                        });
                        //라인그리기[E]
                        resultdrawArr.push(polyline_);
                    }
                } else { //0부터 시작하는 경우

                    var trafficObject = "";
                    var tInfo = [];

                    for (var z = 0; z < traffic.length; z++) {
                        trafficObject = {
                            "startIndex": traffic[z][0],
                            "endIndex": traffic[z][1],
                            "trafficIndex": traffic[z][2],
                        };
                        tInfo.push(trafficObject)
                    }

                    for (var x = 0; x < tInfo.length; x++) {
                        var sectionPoint = []; //구간선언

                        for (var y = tInfo[x].startIndex; y <= tInfo[x].endIndex; y++) {
                            sectionPoint.push(arrPoint[y]);
                        }

                        if (tInfo[x].trafficIndex == 0) {
                            lineColor = "#06050D";
                        } else if (tInfo[x].trafficIndex == 1) {
                            lineColor = "#61AB25";
                        } else if (tInfo[x].trafficIndex == 2) {
                            lineColor = "#FFFF00";
                        } else if (tInfo[x].trafficIndex == 3) {
                            lineColor = "#E87506";
                        } else if (tInfo[x].trafficIndex == 4) {
                            lineColor = "#D61125";
                        }

                        //라인그리기[S]
                        polyline_ = new Tmapv2.Polyline({
                            path: sectionPoint,
                            strokeColor: lineColor,
                            strokeWeight: 6,
                            map: map
                        });
                        //라인그리기[E]
                        resultdrawArr.push(polyline_);
                    }
                }
            }
        } else {

        }
    } else {
        polyline_ = new Tmapv2.Polyline({
            path: arrPoint,
            strokeColor: "#DD0000",
            strokeWeight: 6,
            map: map
        });
        resultdrawArr.push(polyline_);
    }

}

//초기화 기능
function resettingMap() {
    //기존마커는 삭제
    if (marker_s) {
        marker_s.setMap(null);
    }
    if (marker_e) {
        marker_e.setMap(null);
    }
    if (resultMarkerArr.length > 0) {
        for (var i = 0; i < resultMarkerArr.length; i++) {
            resultMarkerArr[i].setMap(null);
        }
    }

    if (resultdrawArr.length > 0) {
        for (var i = 0; i < resultdrawArr.length; i++) {
            resultdrawArr[i].setMap(null);
        }
    }

    chktraffic = [];
    drawInfoArr = [];
    resultMarkerArr = [];
    resultdrawArr = [];
}