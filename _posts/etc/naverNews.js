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


        // 스크래핑 개발 기본

        // 1. 통신 (요청) // Request
        //httpRequest.get(url); Header 새팅 불필요 시
        //httpRequest.getWithUserAgent(userAgent, url); Header 새팅 필요 시
        var userAgent = '{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"}';
        // httpRequest.getWithUserAgent(userAgent, 'https://www.naver.com/my.html');

        httpRequest.getWithUserAgent(userAgent, 'https://weather.naver.com/today/api/nation/20221024/now');


        // 2. 결과 (응답) // Response
        var ResultStr = httpRequest.result;
        // this.log ==> console.log
        this.log("Main1: ["+ ResultStr +"]");

        // 3. 결과처리 (결과포맷)
        //var ResTem = StrGrab(ResultStr, '<div class="email MY_EMAIL">', '</div>');
        
        // "regionName":"춘천"

        //aIndex = 1부터 시작

        var 날씨정보조회 = [];
        
        jsonLength= Object.keys(ResultStr).length;

        console.log(ResultStr && Object.keys(ResultStr).length === 0 && ResultStr.constructor === Object);
        
        for(var i = 1; i<jsonLength; i++){

                var 지역명 = StrGrab(ResultStr, '"regionName":"', '"', i);
                var 온도 = StrGrab(ResultStr, '"tmpr":', '"', i);

                var item = {};
                item.지역명 = 지역명;
                item.온도 = 온도;

                if(item.지역명 == ""){
                    continue;
                }
            
                날씨정보조회.push(item);
        }
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