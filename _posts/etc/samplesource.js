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

var 샘플생성자 = function(){
    console.log(WeatherName + " 샘플구조체 생성자 호출");


    this.errorMsg = "";
    this.host = "";
    this.userAgent = '{';
    this.userAgent += '"Accept":"image/webp,image/apngimage/*,*/*;q=0.8"';
    this.userAgent += '"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"';
    this.userAgent += '}';
};

날씨.prototype = Object.create(iSASObject.prototype);

날씨.prototype.날씨정보함수 =function(aInput){
    this.log(WeatherName + " 샘플함수 호출[" + aInput + "]");
    try{
        system.setStatus(IBXSTATE_CHECKPARAM, 10);


        //tmzmfovld roqkf rlqhs
        
        //1.ㅅ통신( 요청) 리퀘스트
        
        httpRequest.get(""); //헤드 세팅 필요없음
        httpRequest.getWithUserAgent(userAgent,url);    //대부분얘로 씀
        //헤더 세팅 필요시 얘 씀
 
        var userAgent = `{"User-Agent":""}`;
        //얘는 제이슨 형태로 써야
        httpRequest.getWithUserAgent(userAgent, "https://www.naver.com/my.html");
        
        //2 결과(ㅇ반응) //리스폰
        //피들러는 통신만 잡는 애
        var ResultStr = httpRequest.result;
        this.log("main"+ResultStr);

        //3.결과처리
        var ResTem = StrGrab.rsultStr ",",");

        var 지역명 =  StrGrab.Class
        배열 형식이니까 안에 변수로 넣어야 한다.
        aIndex는 1부터 시작한데10 쓰면 10 반복

//어싱크 런테스트


        var 날씨정보조회 =[]
        var item = []
        
        item.지역명 = "서울";
        item.온도 ="12.1";
        item .싱테="맑음";
        날씨정보조회 .push.item

        var item = []
        
        item.지역명 = "서울";
        item.온도 ="12.1";
        item .싱테="맑음";
        날씨정보조회 .push.item
        

        // output
        this.iSASInOut.Output ={};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
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