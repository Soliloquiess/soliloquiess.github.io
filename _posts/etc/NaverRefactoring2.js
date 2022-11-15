var moduleVersion = '20.11.14.1';// YYMMDD. version
var WeatherName = "샘플소스";
console.log(WeatherName + " 스크립트 호출됨.");
console.log('Version: ' + moduleVersion);

function iSASObject(){
    console.log("iSASObject 생성자 호출");
    this.iSASOut = {};
}

iSASObject.prototype.log = function(logMsg){
    try{
        SASLOG("iSASOBject.Log(" + logMsg + "\")");
    } catch(e){
        console.log("iSASObject.LOG(" + logMsg + "\")");
    }
};

iSASObject.prototype.setError = function(errcode){
    this.iSASInOut.Output = {};
    this.iSASInOut.Output.ErrorCode = errcode.toString(16).toUpperCase();
    this.iSASInOut.Output.ErrorMessage = getCooconErrMsg(errcode.toString(16).toUpperCase());
};

var umbrella;

var clothesArr = [
    ["민소매", "반팔", "짧은 치마", "린넨"],
    ["반팔", "얇은 셔츠", "반바지", "면바지"],
    ["블라우스", "긴팔 티", "면바지", "슬랙스"],
    ["얇은 가디건", "니트", "맨투맨", "후드", "긴바지"],
    ["자켓", "가디건", "청자켓", "니트", "스타킹", "청바지"],
    ["트랜치 코트", "야상", "점퍼", "스타킹", "기모바지"],
    ["울 코트", "히트텍", "가죽 옷", "기모"],
    ["패딩", "두꺼운 코트", "누빔 옷", "기모", "목도리"]
];

var cloth= [];
function clothesRecommand(clothesArr,aplTm){

    console.log("clothesArr: ["+ JSON.stringify(clothesArr) +"]");

    if (aplTm >= parseInt(28)){
        cloth.push(clothesArr[0]);
        return cloth;
    }
    else if (aplTm >= 27){
        cloth.push(clothesArr[1]);
        return cloth;
    }
    else if (aplTm >= 20){
        cloth.push(clothesArr[2]);
        return cloth;
    }
    else if (aplTm >= 17){
        cloth.push(clothesArr[3]);
        return cloth;
    }
    else if  (aplTm >= 12){

        cloth.push(clothesArr[4]);
        console.log("TEST["+ aplTm +"]:["+ JSON.stringify(cloth) +"]");

        return cloth;
    }
    else if (aplTm >= 9){
        cloth.push(clothesArr[5]);
        return cloth;
    }
    else if (aplTm >= 5){
        cloth.push(clothesArr[6]);
        return cloth;
    }
    else if (aplTm <= 4){
        cloth.push(clothesArr[7]);
        return cloth;
    }


    this.log("TEST["+ avr_temp +"]:["+ JSON.stringify(cloth) +"]");

}

var 날씨 = function(){
    // console.log(WeatherName + " 샘플구조체 생성자 호출");
    this.errorMsg = "";
    this.host = "https://weather.naver.com";

    this.userAgent = '{';
    this.userAgent += '"Accept":"image/webp,image/apngimage/*,*/*;q=0.8"';
    this.userAgent += '"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"';
    this.userAgent += '}';
};

날씨.prototype = Object.create(iSASObject.prototype);

날씨.prototype.날씨정보조회 = function(aInput){
    this.log(WeatherName + "날씨 날씨정보조회 호출[" + aInput + "]");
    try {
        system.setStatus(IBXSTATE_CHECKPARAM, 10);

        var input = dec(aInput.Input);


        var regionName = input.regionName;
        
////////////////////
        //  피드백1 오류처리

        if(!regionName){
            this.setError(E_IBX_PARAMETER_NOTENTER);
            this.iSASInOut.Output.ErrorMessage = "지역명이 미입력입니다. 확인 후 거래하시기 바랍니다.";
            return E_IBX_PARAMETER_NOTENTER;
        }

        
        if (!httpRequest.getWithUserAgent(this.userAgent, this.host +`/today/`+ regionSerial)){
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }

        var ResultStr = httpRequest.result;
        this.log("today" + ResultStr);

        if (!httpRequest.getWithUserAgent(this.userAgent, this.host +`/air/` + regionSerial)){
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }

        ResultStr = httpRequest.result + "";    //위 httpRequest를 할 떄마다 다시 이 라인을 새로 넣어준다.
        this.log("air" + ResultStr);

////////////////

        // 스크래핑 개발 기본
        // 1. 통신 (요청) // Request
        //httpRequest.get(url); Header 새팅 불필요 시
        //httpRequest.getWithUserAgent(userAgent, url); Header 새팅 필요 시
        var userAgent = '{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"}';
        
        //httpRequest.getWithUserAgent ==> true/false
        //http 호출(통신오류 검증)

        // 피드백 3. 통신 오류 검증은 반드시 해야한다
        // 통신 오류 검증 !http . 통신 실패시 E_IBX_FAILTOGETPAGE

        // 피드백 4. 그외 과도한 공백 제거 및 비슷한 내용의 예외처리 하나로 해서 코드 양 줄이기
         
        // this.host = 'https://ac.weather.naver.com';
        this.url = '/ac?';
        this.param  = 'q_enc='      + 'utf-8';
        this.param += '&r_format='  + 'json';
        this.param += '&r_enc='     + 'utf-8';
        this.param += '&r_lt='      + '1';
        this.param += '&st='        + '1';
        this.param += '&q='         + httpRequest.URLEncodeAll(regionName);

        if (!httpRequest.getWithUserAgent(userAgent, `https://ac.weather.naver.com` + this.url + this.param)){
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        var ResultStr = httpRequest.result;
        
        //피드백2. 응답값 로그 출력
        // this.log("main1: ["+ ResultStr +"]");
        //URIENCODING을 해야 %127839712bas1278이런 코드들 한글로 가져옴
       
        try {
            var regionSerial = JSON.parse(ResultStr).items[0][0][1];
            this.log("regionSerial"+regionSerial);

        } catch (error) {
            this.log("error.message:::" + error.message);
            this.setError(E_IBX_SITE_INVALID + 1);
            return E_IBX_SITE_INVALID + 1;
        }
        
        //http 호출(통신오류 검증)
        if (!httpRequest.getWithUserAgent(this.userAgent, this.host +`/today/`+ regionSerial)){
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }; 

        ResultStr = httpRequest.result + ""; 
        // var ResultTodayStr = httpRequest.result; //통신 결과처리 응답 결국 이 변수 있어야 함.
        // this.log(ResultStr);
        
        //http 호출(통신오류 검증)

        // if (!httpRequest.getWithUserAgent(this.userAgent, this.host +`/air/` + regionSerial)){
        //     this.setError(E_IBX_FAILTOAOSCHECK);
        //     return E_IBX_FAILTOGETPAGE;
      
        // };

        // var ResultAirStr = httpRequest.result;
        // this.log(ResultAirStr);

        
        // 3. 결과처리 (결과포맷)
        //var ResTem = StrGrab(ResultStr, '<div class="email MY_EMAIL">', '</div>');
        // this.log('ResultTodayStr  : '+ResultTodayStr);
        // this.log('regionName  : '+regionName);


///////////////////


        // var 날씨정보조회 = [];

        var wetrTxt = StrGrab(ResultStr, 'class="weather">', '</span>');

        if(!wetrTxt){
            this.setError(E_IBX_DESC_INVALID)
            return E_IBX_DESC_INVALID;
        }
        // var currentWeather  = rainy(wetrTxt);

        var aplTm = StrGrab(ResultStr, 'class="blind">현재 온도</span>', '<',1);
        if(!aplTm){
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }

        var frm = StrGrab(ResultStr, 'ul class="box_color">', '</ul>');
        // var regionName = StrGrab(ResultStr, '"fullAreaName":"', '"');


        var today = StrGrab(frm, 'class="date">', '</span>',1);
        
        if(!today){
            this.setError(E_IBX_DESC_INVALID)
            return E_IBX_DESC_INVALID;
        }

        var rainfall_mor = StrGrab(frm, 'class="blind">강수확률</span>', '<',  1);
        
        var rainfall_eve = StrGrab(frm, ' class="blind">강수확률</span>', '<',  2);
        if(!rainfall_eve || !rainfall_mor){
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }
        var lowest = StrGrab(frm, 'class="blind">최저기온</span>', '<',1);

        var highest =  StrGrab(frm, 'class="blind">최고기온</span>', '<',1);
        if(!highest || !lowest){
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }

        
       var morning = StrGrab(frm,'class="weather_text">', '</span>',1);
       var evening = StrGrab(frm,'class="weather_text">', '</span>',2);
        
        var avr_temp = parseFloat((parseFloat(highest) + parseFloat(lowest))/2);

        var todayclothes = clothesRecommand(clothesArr, aplTm);
        if(!todayclothes|| !avr_temp){
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }
        // console.log("todayclothes:::" + JSON.stringify(todayclothes));


///////////////////

        if (!httpRequest.getWithUserAgent(this.userAgent, this.host +`/air/` + regionSerial)){
            this.setError(E_IBX_FAILTOAOSCHECK);
            return E_IBX_FAILTOGETPAGE;
      
        };

        var ResultAirStr = httpRequest.result;

        var cnPm10Value =  StrGrab(ResultAirStr, 'class="value _cnPm10Value">', '<');
        var cnPm10Grade =  StrGrab(ResultAirStr, 'class="grade _cnPm10Grade">', '<');
        
        if(!cnPm10Grade || !cnPm10Value){
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }

        var cnPm25Value = StrGrab(ResultAirStr, 'class="value _cnPm25Value">', '<');
        var cnPm25Grade = StrGrab(ResultAirStr, 'class="grade _cnPm25Grade">', '<');

        if(!cnPm25Grade || !cnPm25Value){
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }
        var 날씨정보조회 = {};


        날씨정보조회.오늘 = {};
        

        날씨정보조회.오늘.regionName = regionName;
        // item.mareaNm = mareaNm;
        날씨정보조회.오늘.today = today;
        날씨정보조회.오늘.wetrTxt = wetrTxt;

        날씨정보조회.오늘.avr_temp = avr_temp + '';
        날씨정보조회.오늘.todayclothes = todayclothes;


        날씨정보조회.오늘.aplTm = aplTm;
        날씨정보조회.오늘.morning = morning;
        날씨정보조회.오늘.evening = evening;
        날씨정보조회.오늘.rainfall_mor= rainfall_mor;
        날씨정보조회.오늘.rainfall_eve= rainfall_eve;
        날씨정보조회.오늘.lowest= lowest+"C";
        날씨정보조회.오늘.highest= highest+"C";
        날씨정보조회.오늘.cnPm10Value= cnPm10Value;
        날씨정보조회.오늘.cnPm10Grade= cnPm10Grade;
        날씨정보조회.오늘.cnPm25Value=cnPm25Value;
        날씨정보조회.오늘.cnPm25Grade=cnPm25Grade;

        // 날씨정보조회.tommorow_mor =tommorow_mor;

       

///////////내일////////

        var tommorow_date = StrGrab(frm, 'class="date">', '<',2);

        if(!tommorow_date){
            this.setError(E_IBX_RESULT_FAIL);
            this.iSASInOut.Output.ErrorMessage = "없는 날짜입니다.";
            return E_IBX_RESULT_FAIL;
        }

        var rainfall_nextmorning = StrGrab(frm, 'class="blind">강수확률</span>', '</span>',  3);
        var rainfall_nextevening = StrGrab(frm, 'class="blind">강수확률</span>', '</span>',  4);


       var tommorow_morning = StrGrab(frm,'class="weather_text">', '</span>',3);
       var tommorow_evening = StrGrab(frm,'class="weather_text">', '</span>',4);

       if(!tommorow_evening|| !tommorow_morning || !rainfall_nextevening || !rainfall_nextmorning){
            this.setError(E_IBX_RESULT_FAIL);
            this.iSASInOut.Output.ErrorMessage = "없는 날짜입니다.";
            return E_IBX_RESULT_FAIL;
        }

        날씨정보조회.내일 = {};
        
        날씨정보조회.내일.tommorow_date = tommorow_date;
        날씨정보조회.내일.rainfall_nextmorning=rainfall_nextmorning;
        날씨정보조회.내일.rainfall_nextevening=rainfall_nextevening;


        날씨정보조회.내일.tommorow_morning = tommorow_morning;
        날씨정보조회.내일.tommorow_evening = tommorow_evening;



        // OUTPUT
        this.iSASInOut.Output ={};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
        this.iSASInOut.Output.Result.날씨정보조회 = 날씨정보조회;
        return S_IBX_OK;
    } catch(e){
        this.log("Exception " + e.message);
        this.setError(E_IBX_UNKNOWN);
        return E_IBX_UNKNOWN;
    } finally{
        system.setStatus(IBXSTATE_DONE, 100);
        this.log(WeatherName + " 샘플함수 finally");
    }
};


////



function OnInit() {
    console.log("OnInit()");
    var result = true;
    try {
        //필요한거 로드
        system.include("iSASTypes");
        system.setStatus(IBXSTATE_BEGIN, 0);
        result = false;
    } catch (e) {
        console.log("Exception OnInit:[" + e.message + "]");
    } finally {
        //flase 리턴
        return result;
    }
}

function Execute(aInput) {
    console.log("Execute[" + aInput + "]");
    try {
        console.log("Init Default Error");
        iSASObj = JSON.parse(aInput);
        iSASObj.Output = {};
        iSASObj.Output.ErrorCode = '8000F110';
        iSASObj.Output.ErrorMessage = "해당 모듈을 실행하는데 실패 했습니다.";

        OnInit();

        iSASObj = JSON.parse(aInput);
        var ClassName = iSASObj.Class;
        var ModuleName = iSASObj.Module;
        if (Failed(SetClassName(ClassName, ModuleName))) {
            iSASObj.Output = {};
            iSASObj.Output.ErrorCode = '8000F111';
            iSASObj.Output.ErrorMessage = "Class명과 Job명을 확인해주시기 바랍니다.";
        } else {
            obj.iSASInOut = "";
            OnExcute(0, JSON.stringify(iSASObj));

            // console.log("결과 테스트 [" + obj.iSASInOut + "]");

            if (obj.iSASInOut != "")
                iSASObj = obj.iSASInOut;
        }
    } catch (e) {
        console.log("exception:[" + e.message + "]");
    } finally {
        return JSON.stringify(iSASObj);
    }
}


// var ul_str  = StrGrab(ResultTodayStr, 'class="box_color">', '</ul>');
// var li_tmr = StrGrab(ul_str, '<li', '</li>', 2);
//output 에는 객체만 넣어준다