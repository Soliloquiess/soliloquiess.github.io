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

function regionFormat(region){
    var regionCode;

    switch(region){
        case "춘천":
            regionCode= '01110675';
            break;

        
        case "강릉":
            regionCode= '01150615';
            break;

            
        case "백령":
            regionCode= '11720330';
            break;

            
        case "청주":
            regionCode= '16111120';
            break;

        case "서울":
            regionCode= '09140104';
            break;  
            
        case "수원":
            regionCode= '02113128';
            break;

        default:
            regionCode='09140104';
            break;
    }
    return regionCode;
}


//////




var 날씨 = function(){
    console.log(WeatherName + " 샘플구조체 생성자 호출");
    this.errorMsg = "";
    this.host = "";
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


        var regionName = regionFormat(input.regionName);

        // 스크래핑 개발 기본

        // 1. 통신 (요청) // Request
        //httpRequest.get(url); Header 새팅 불필요 시
        //httpRequest.getWithUserAgent(userAgent, url); Header 새팅 필요 시
        var userAgent = '{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"}';
        // httpRequest.getWithUserAgent(userAgent, 'https://www.naver.com/my.html');


        httpRequest.getWithUserAgent(userAgent, `https://weather.naver.com/today/${regionName}`);

        // httpRequest.getWithUserAgent(userAgent, 'https://weather.naver.com/today/03310109');

        var ResultStr = httpRequest.result;


        httpRequest.getWithUserAgent(userAgent, `https://weather.naver.com/air/${regionName}`);


        // httpRequest.getWithUserAgent(userAgent, 'https://weather.naver.com/air/03310109');

        var ResultAirStr = httpRequest.result;


        // 2. 결과 (응답) // Response
        // this.log ==> console.log
        this.log("Main1: ["+ ResultStr +"]");

        // 3. 결과처리 (결과포맷)
        //var ResTem = StrGrab(ResultStr, '<div class="email MY_EMAIL">', '</div>');
        
        // "regionName":"춘천"

        //aIndex = 1부터 시작

        var 날씨정보조회 = [];
        
       

            var regionName = StrGrab(ResultStr, '"fullAreaName":"', '"');
            var mareaNm = StrGrab(ResultStr, '"mareaNm":"', '"');
            var today = StrGrab(ResultStr, '<strong class="day">오늘</strong><span class="date">', '</span>');
           
            var wetrTxt = StrGrab(ResultStr, '<span class="weather">', '</span>');   
            var aplTm = StrGrab(ResultStr, '<span class="blind">현재 온도</span>', '<span class="degree">');
            // console.log("circuit" +circuit );


            // var aplTm = StrGrab(ResultStr, '"stationO3Legend1":"', '"');


            // var rainfall = StrGrab(ResultStr, '<dl><dt class="blind">강수확률</dt><dd>', '</dd>');

            
            var rainfall = StrGrab(ResultStr, '<span class="blind">강수확률</span>', '</span>',  2);
            var lowest = StrGrab(ResultStr, '<span class="lowest"><span class="blind">최저기온</span>', '</span>');
            var highest =  StrGrab(ResultStr, '<span class="highest"><span class="blind">최고기온</span>', '</span>');
           
            var cnPm10Value =  StrGrab(ResultAirStr, '<span class="value _cnPm10Value">', '</span>');
            var cnPm10Grade =  StrGrab(ResultAirStr, '<span class="grade _cnPm10Grade">', '</span>');
            var cnPm25Value = StrGrab(ResultAirStr, '<span class="value _cnPm25Value">', '</span>');

            var cnPm25Grade = StrGrab(ResultAirStr, '<span class="grade _cnPm25Grade">', '</span>');

            var item = {};

            
            var tommorow_item = {};

            item.regionName = regionName;
            item.mareaNm = mareaNm;
            item.today = today;
            item.wetrTxt = wetrTxt;
            item.aplTm = aplTm;
            item.rainfall= rainfall;
            item.lowest= lowest+"C";
            item.highest= highest+"C";
            item.cnPm10Value= cnPm10Value;
            item.cnPm10Grade= cnPm10Grade;
            item.cnPm25Value=cnPm25Value;
            item.cnPm25Grade=cnPm25Grade;
            날씨정보조회.push(item);


            var tommorow_morning = StrGrab(ResultStr, '<strong class="day">내일</strong><span class="date">', '</span>');

            
            tommorow_item.tommorow_morning = tommorow_morning;
 
                        
            var rainfall_nextmorning = StrGrab(ResultStr, '<span class="blind">강수확률</span>', '</span>',  3);
            var rainfall_nextevening = StrGrab(ResultStr, '<span class="blind">강수확률</span>', '</span>',  4);
            // var tommorow_wetrTxt = StrGrab(ResultStr, '<span class="label tomorrow">내일</span><i class="ico _cnLazy" data-ico="ico_wt2"><span class="blind">', '</span>'); 
           
            var wetrTxt_nextmor =  StrGrab(ResultStr, '<span class="time tomorrow">7시</span><i class="ico _cnLazy" data-ico="ico_wt1"><span class="blind">', '</span>');
            var wetrTxt_nexteve = StrGrab(ResultStr, '<span class="weather">', '</span>',4);
            tommorow_item.rainfall_nextmorning=rainfall_nextmorning;
            tommorow_item.rainfall_nextevening=rainfall_nextevening;
            tommorow_item.wetrTxt_nextmor = wetrTxt_nextmor;
            tommorow_item.wetrTxt_nexteve = wetrTxt_nexteve
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