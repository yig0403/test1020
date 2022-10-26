// 페이지가 로딩이 된 후 호출하는 함수입니다.
var map;
var markerInfo;
var marker_s, marker_e, marker_p;
//경로그림정보
var drawInfoArr = [];
var drawInfoArr2 = [];

var chktraffic = [];
var resultdrawArr = [];
var resultMarkerArr = [];

function initTmap() {
	// map 생성
	// Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
	map = new Tmapv2.Map("map_div", { // 지도가 생성될 div
		center : new Tmapv2.LatLng(37.566481622437934, 126.98502302169841), // 지도 초기 좌표
		width : "100%", // 지도의 너비
		height : "400px", // 지도의 높이
		zoom: 15,
	    zoomControl: true,
	    scrollwheel: true
	});

	//마커 초기화
	marker1 = new Tmapv2.Marker(
		{
			icon : "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_a.png",
			iconSize : new Tmapv2.Size(24, 38),
			map : map
		});

	//2. api 사용요청
	var lon, lat;
	var markerPosition;
	var arrResult;

	map.addListener("click", function onClick(evt) {//클릭을 하였을 때의 일어나는 경우를 담은 함수
		var mapLatLng = evt.latLng;//mapLatLng이라는 변수는 클릭 이벤트를 한 위치의 latLng정보를 가지고 있다.

		marker1.setMap(null);//기존의 마커 삭제

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
	
	$("#clear").click(function () {	// 경로, 마커 모두 초기화
		resettingMap();
		$("#CP_startPoint").val("");
		$("#CP_endPoint").val("");
		$("#CP_duration").val("");
	});
	
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
						+ (resultData[0].properties.totalDistance / 1000).toFixed(1) + "km,ㅤ";
				var tTime = " 총 시간 : "
						+ (resultData[0].properties.totalTime / 60).toFixed(0) + "분,ㅤ";
				var tFare = " 통행료 : "
						+ resultData[0].properties.totalFare + "원,ㅤ";
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
	var size = new Tmapv2.Size(24, 38);//아이콘 크기 설정합니다.

	if (infoObj.pointType == "P") { //포인트점일때는 아이콘 크기를 줄입니다.
		size = new Tmapv2.Size(8, 8);
	}

	marker_p = new Tmapv2.Marker({
		position : new Tmapv2.LatLng(infoObj.lat, infoObj.lng),
		icon : infoObj.markerImage,
		iconSize : size,
		map : map
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
					path : arrPoint,
					strokeColor : lineColor,
					strokeWeight : 6,
					map : map
				});
				resultdrawArr.push(polyline_);
				//라인그리기[E]
			} else { //교통정보가 있음

				if (traffic[0][0] != 0) { //교통정보 시작인덱스가 0이 아닌경우
					var trafficObject = "";
					var tInfo = [];

					for (var z = 0; z < traffic.length; z++) {
						trafficObject = {
							"startIndex" : traffic[z][0],
							"endIndex" : traffic[z][1],
							"trafficIndex" : traffic[z][2],
						};
						tInfo.push(trafficObject)
					}

					var noInfomationPoint = [];

					for (var p = 0; p < tInfo[0].startIndex; p++) {
						noInfomationPoint.push(arrPoint[p]);
					}

					//라인그리기[S]
					polyline_ = new Tmapv2.Polyline({
						path : noInfomationPoint,
						strokeColor : "#06050D",
						strokeWeight : 6,
						map : map
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
							path : sectionPoint,
							strokeColor : lineColor,
							strokeWeight : 6,
							map : map
						});
						//라인그리기[E]
						resultdrawArr.push(polyline_);
					}
				} else { //0부터 시작하는 경우

					var trafficObject = "";
					var tInfo = [];

					for (var z = 0; z < traffic.length; z++) {
						trafficObject = {
							"startIndex" : traffic[z][0],
							"endIndex" : traffic[z][1],
							"trafficIndex" : traffic[z][2],
						};
						tInfo.push(trafficObject);
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
							path : sectionPoint,
							strokeColor : lineColor,
							strokeWeight : 6,
							map : map
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
			path : arrPoint,
			strokeColor : "#DD0000",
			strokeWeight : 6,
			map : map
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