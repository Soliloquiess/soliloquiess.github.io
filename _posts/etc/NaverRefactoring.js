var moduleVersion = '20.10.21.1';
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

//비 오면 우산 챙겨
function rainy(currentWeather){
    if (currentWeather == '비'){
        umbrella =  "\n\t *비 온대요. 우산 챙겨요\n\n"
        return umbrella;
    }
    else{
        umbrella =  "\n\t 우산은 필요 없을거 같스빈다!\n\n"
        return umbrella;
    }
}

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

    var _clothesArr = JSON.parse(JSON.stringify(clothesArr));
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
        // cloth = _clothesArr[4];
        console.log("TEST["+ aplTm +"]:["+ cloth +"]");
        console.log("TEST["+ aplTm +"]:["+ JSON.stringify(cloth) +"]");

        return cloth;

        // return clothesArr[4];
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


    this.log("TEST["+ avr_temp +"]:["+ cloth +"]");
    this.log("TEST["+ avr_temp +"]:["+ JSON.stringify(cloth) +"]");

    //return cloth

}

var 날씨 = function(){
    console.log(WeatherName + " 샘플구조체 생성자 호출");
    this.errorMsg = "";
    this.host = "https://weather.naver.com";
    this.userAgent = '{';
    this.userAgent += '"Accept":"image/webp,image/apngimage/*,*/*;q=0.8"';
    this.userAgent += '"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"';
    this.userAgent += '}';
};

날씨.prototype = Object.create(iSASObject.prototype);

날씨.prototype.날씨정보조회 =function(aInput){
    this.log(WeatherName + " 날씨정보조회 호출[" + aInput + "]");
    try{
        system.setStatus(IBXSTATE_CHECKPARAM, 10);

        var input = dec(aInput.Input);


        var regionName = input.regionName;
        
////////////////////
                //오류처리

        if(regionName==""){
            this.log(regionName);
            // console.log(regionSerial);
            this.setError(E_IBX_PARAMETER_INVALID);
            this.iSASInOut.Output.ErrorMessage = "지역명을 입력해주세요.";
            return E_IBX_PARAMETER_INVALID;
            
        }

        if(regionName.length<=1){
            this.log(regionName);
            this.setError(E_IBX_RESULT_LENGTH_OVER);
            this.iSASInOut.Output.ErrorMessage = "잘못된 입력입니다.";
            return E_IBX_RESULT_LENGTH_OVER;
        }

        //http 호출
        if (!httpRequest.getWithUserAgent(this.userAgent, this.host +`/today/${regionSerial}`)){
            //E_IBX_FAILTOGETPAGE = 0x8000E200;  http 호출 실패/서버 응답 없음 시작
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        
        //http 호출
        if (!httpRequest.getWithUserAgent(this.userAgent, this.host +`/air/${regionSerial}`)){
            //E_IBX_FAILTOGETPAGE = 0x8000E200;  http 호출 실패/서버 응답 없음 시작
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
////////////////

        // 스크래핑 개발 기본
        // 1. 통신 (요청) // Request
        //httpRequest.get(url); Header 새팅 불필요 시
        //httpRequest.getWithUserAgent(userAgent, url); Header 새팅 필요 시
        var userAgent = '{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"}';
        
        httpRequest.getWithUserAgent(userAgent, 'https://ac.weather.naver.com/ac?q_enc=utf-8&r_format=json&r_enc=utf-8&r_lt=1&st=1&q=' + httpRequest.URLEncodeAll(regionName));
        //URIENCODING을 해야 %127839712bas1278이런 코드들 한글로 가져옴
       
        var ResultStr = httpRequest.result;
        var regionSerial = JSON.parse(ResultStr).items[0][0][1];
        
        httpRequest.getWithUserAgent(userAgent, `https://weather.naver.com/today/${regionSerial}`); 

        var ResultTodayStr = httpRequest.result; //통신 결과처리 응답 결국 이 변수 있어야 함.
        httpRequest.getWithUserAgent(userAgent, `https://weather.naver.com/air/${regionSerial}`);

        var ResultAirStr = httpRequest.result;

        // 2. 결과 (응답) // Response
        // this.log ==> console.log
        this.log("Main1: ["+ ResultStr +"]");

        // 3. 결과처리 (결과포맷)
        //var ResTem = StrGrab(ResultStr, '<div class="email MY_EMAIL">', '</div>');

        this.log('regionSerial  : '+regionSerial);
        this.log('regionName  : '+regionName);

        var 날씨정보조회 = [];

///////////////////

            // var regionName = StrGrab(ResultStr, '"fullAreaName":"', '"');
            var mareaNm = StrGrab(ResultTodayStr, '"mareaNm":"', '"');
            if(mareaNm==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.iSASInOut.Output.ErrorMessage = "없는 지역구입니다.";
                this.log(mareaNm);
                return E_IBX_RESULT_FAIL;
            }

            var today = StrGrab(ResultTodayStr, '<strong class="day">오늘</strong><span class="date">', '</span>');

            if(today==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.iSASInOut.Output.ErrorMessage = "없는 날짜입니다.";
                this.log(today);
                return E_IBX_RESULT_FAIL;
            }

            var ul_str  = StrGrab(ResultTodayStr, 'class="box_color">', '</ul>');
            var li_tmr = StrGrab(ul_str, '<li', '</li>', 2);
        

            var wetrTxt = StrGrab(ResultTodayStr, '<span class="weather">', '</span>');
            if(wetrTxt==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(wetrTxt);
                return E_IBX_RESULT_FAIL;
            }
            var currentWeather  = rainy(wetrTxt);

            var aplTm = StrGrab(ResultTodayStr, '<span class="blind">현재 온도</span>', '<span class="degree">');
            if(aplTm==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(aplTm);
                return E_IBX_RESULT_FAIL;
            }
            // console.log("circuit" +circuit );
            // var aplTm = StrGrab(ResultTodayStr, '"stationO3Legend1":"', '"');
            // var rainfall = StrGrab(ResultTodayStr, '<dl><dt class="blind">강수확률</dt><dd>', '</dd>');
            var rainfall_mor = StrGrab(ResultTodayStr, '<span class="blind">강수확률</span>', '</span>',  1);
            
            if(rainfall_mor==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(rainfall_mor);
                return E_IBX_RESULT_FAIL;
            }
            var rainfall_eve = StrGrab(ResultTodayStr, '<span class="blind">강수확률</span>', '</span>',  2);
            if(rainfall_eve==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(rainfall_eve);
                return E_IBX_RESULT_FAIL;
            }
            var lowest = StrGrab(ResultTodayStr, '<span class="lowest"><span class="blind">최저기온</span>', '</span>');
            if(lowest==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(lowest);
                return E_IBX_RESULT_FAIL;
            }
            var highest =  StrGrab(ResultTodayStr, '<span class="highest"><span class="blind">최고기온</span>', '</span>');
            if(highest==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(highest);
                return E_IBX_RESULT_FAIL;
            }
            
            var avr_temp = parseFloat((parseFloat(highest) + parseFloat(lowest))/2);
            if(avr_temp==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(avr_temp);
                return E_IBX_RESULT_FAIL;
            }

            var todayclothes = clothesRecommand(clothesArr, aplTm);
            if(todayclothes==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(todayclothes);
                return E_IBX_RESULT_FAIL;
            }
            console.log("todayclothes:::" + JSON.stringify(todayclothes));


///////////////////

            var cnPm10Value =  StrGrab(ResultAirStr, '<span class="value _cnPm10Value">', '</span>');
            if(cnPm10Value==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(cnPm10Value);
                return E_IBX_RESULT_FAIL;
            }
            var cnPm10Grade =  StrGrab(ResultAirStr, '<span class="grade _cnPm10Grade">', '</span>');
            if(cnPm10Grade==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(cnPm10Grade);
                return E_IBX_RESULT_FAIL;
            }
            var cnPm25Value = StrGrab(ResultAirStr, '<span class="value _cnPm25Value">', '</span>');
            if(cnPm25Value==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(cnPm25Value);
                return E_IBX_RESULT_FAIL;
            }

            var cnPm25Grade = StrGrab(ResultAirStr, '<span class="grade _cnPm25Grade">', '</span>');

            if(cnPm25Grade==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(cnPm25Grade);
                return E_IBX_RESULT_FAIL;
            }
            var item = {};


            var tommorow_item = {};

            item.regionSerial= regionSerial;
            item.regionName = regionName;
            item.mareaNm = mareaNm;
            item.today = today;
            item.wetrTxt = wetrTxt;

            item.avr_temp = avr_temp + '';
            item.todayclothes = todayclothes;


            item.aplTm = aplTm;
            item.rainfall_mor= rainfall_mor;
            item.rainfall_eve= rainfall_eve;
            item.lowest= lowest+"C";
            item.highest= highest+"C";
            item.cnPm10Value= cnPm10Value;
            item.cnPm10Grade= cnPm10Grade;
            item.cnPm25Value=cnPm25Value;
            item.cnPm25Grade=cnPm25Grade;

            // item.tommorow_mor =tommorow_mor;

            item.currentWeather=currentWeather;
            날씨정보조회.push(item);

///////////내일////////

            var tommorow_date = StrGrab(ResultTodayStr, '<strong class="day">내일</strong><span class="date">', '</span>');
            if(tommorow_date==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.iSASInOut.Output.ErrorMessage = "없는 날짜입니다.";
                this.log(tommorow_date);
                return E_IBX_RESULT_FAIL;
            }

            var rainfall_nextmorning = StrGrab(ResultTodayStr, '<span class="blind">강수확률</span>', '</span>',  3);
            if(rainfall_nextmorning==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(rainfall_nextmorning);
                return E_IBX_RESULT_FAIL;
            }
            var rainfall_nextevening = StrGrab(ResultTodayStr, '<span class="blind">강수확률</span>', '</span>',  4);
            if(rainfall_nextevening==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.log(rainfall_nextevening);
                return E_IBX_RESULT_FAIL;
            }

            var tommorow_morning = StrGrab(li_tmr,'<span class="weather_text">', '</span>',1);
            if(tommorow_morning==""){
                this.setError(E_IBX_RESULT_FAIL);
                this.iSASInOut.Output.ErrorMessage = "없는 날짜입니다.";
                this.log(tommorow_morning);
                return E_IBX_RESULT_FAIL;
            }

           var tommorow_evening = StrGrab(li_tmr,'<span class="weather_text">', '</span>',2)
           if(tommorow_evening==""){
            this.setError(E_IBX_RESULT_FAIL);
            this.iSASInOut.Output.ErrorMessage = "없는 날짜입니다.";
            this.log(tommorow_evening);
            return E_IBX_RESULT_FAIL;
            }
            // var 오전 =  StrGrab();

            tommorow_item.tommorow_date =tommorow_date;
            tommorow_item.rainfall_nextmorning=rainfall_nextmorning;
            tommorow_item.rainfall_nextevening=rainfall_nextevening;


            tommorow_item.tommorow_morning = tommorow_morning;
            tommorow_item.tommorow_evening = tommorow_evening;
            // tommorow_item.tommorow_wetrTxt = tommorow_wetrTxt;

            날씨정보조회.push(tommorow_item);

        // var 날씨정보조회 = [];
        // var item = {};

        // item.지역명 = '서울';
        // item.온도 = '12.1';
        // item.상태 = '맑음';
        // 날씨정보조회.push(item);

        // var item = {};

        // item.지역명 = '부산';
        // item.온도 = '12.2';
        // item.상태 = '맑음';
        // 날씨정보조회.push(item);

        // OUTPUT
        this.iSASInOut.Output ={};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
        // this.iSASInOut.Output.Result.이메일 = ResTem;
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

            console.log("결과 테스트 [" + obj.iSASInOut + "]");

            if (obj.iSASInOut != "")
                iSASObj = obj.iSASInOut;
        }
    } catch (e) {
        console.log("exception:[" + e.message + "]");
    } finally {
        return JSON.stringify(iSASObj);
    }
}



// var json = `{
//     "query" : ["당진시"],
//     "items" : [
//     [[["충청남도 당진시"],["15270510"]],[["충청남도 당진시 송산면"],["15270390"]],[["충청남도 당진시 면천면"],["15270350"]],[["충청남도 당진시 고대면"],["15270310"]],[["충청남도 당진시 구룡동"],["15270111"]],[["충청남도 당진시 당진1동"],["15270510"]],[["충청남도 당진시 당진2동"],["15270520"]],[["충청남도 당진시 당진3동"],["15270530"]],[["충청남도 당진시 대덕동"],["15270107"]],[["충청남도 당진시 대호지면"],["15270330"]]]
//     ]
//     }`

//     var regionSerial = JSON.parse(ResultStr).items[0][0][1];

//     console.log(regionSerial)