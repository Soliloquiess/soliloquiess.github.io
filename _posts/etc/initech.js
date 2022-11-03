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

var 인증 = function(){
    console.log(인증 + " 인증 생성자 호출");
    this.errorMsg = "";
    this.host = "http://demo.initech.com/";
    this.userAgent = '{';
    this.userAgent += '"Accept":"image/webp,image/apngimage/*,*/*;q=0.8"';
    // this.userAgent += '"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"';
    this.userAgent += '"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"';
    this.userAgent += '}';//User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko
};

인증.prototype = Object.create(iSASObject.prototype);

인증.prototype.전자서명 =function(aInput){
    this.log(인증 + " 전자서명 호출[" + aInput + "]");
    try{
        system.setStatus(IBXSTATE_CHECKPARAM, 10);
        
        var certInfo = dec(aInput.Input.인증서);
        var personInfo = dec(aInput.Input.서명정보);
        // var input = dec(aInput.Input);
        // var certInfoinput = input.인증서;
        // var regionName = input.regionName;
        // var Signature = dec(aInput.Input);
        // var certInfo = {};
        // certInfo.이름= certInfoinput.이름;
        // certInfo.만료일자= certInfoinput.만료일자;
        // certInfo.비밀번호= certInfoinput.비밀번호;

    // this.log("certInfo" +certInfo+"]");
    // this.log("certInfo" +certInfo.이름+"]");
    // this.log("certInfo" +certInfo.만료일자+"]");
    // this.log("certInfo" +certInfo.비밀번호+"]");
    
    if(!certInfo){
        this.setError(E_IBX_RESULT_FAIL);
        this.log("errorcertInfo["+JSON.stringify(certInfo)+"]")
        return E_IBX_RESULT_FAIL;
    }
    this.log("인증서 입력값 정보["+JSON.stringify(certInfo)+"]")

    if(!personInfo){
        this.setError(E_IBX_RESULT_FAIL);
        this.log("errorPersonInfo["+JSON.stringify(personInfo)+"]")
        return E_IBX_RESULT_FAIL;
    }
    this.log("서명 입력값 정보["+JSON.stringify(personInfo)+"]")
    
    if(!certManager.findCert(JSON.stringify(certInfo))) {
        //실패
        this.log("인증서를 찾을 수 없습니다.");
        this.setError(E_IBX_CERTIFY_NOT_FOUND);
        return E_IBX_CERTIFY_NOT_FOUND;
    } else {
        //성공
        this.log("인증서 찾음.");
    }
    

    if(!certManager.verifyPassword(JSON.stringify(certInfo.비밀번호))) {
        //실패
        this.log("인증서 검증 실패.");
        this.setError(E_IBX_KEY_ACCOUNT_PASSWORD_1_INVALID);
        return E_IBX_KEY_ACCOUNT_PASSWORD_1_INVALID;
    } else {
        //성공
        this.log("인증서 검증 성공.");
    }
    
    if(httpRequest.get(this.host) == false) {
        //실패
        this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
    }
    
    var 개인정보  ={}

    if(!개인정보.성명){
        this.setError(E_IBX_RESULT_FAIL);
        return E_IBX_RESULT_FAIL;
    }

    var postData = "__INIts__=1667450334";
    postData += "&name=" + httpRequest.URLEncodeAll(personInfo.성명, 'EUC-KR');
    postData += "&jumin=" + httpRequest.URLEncodeAll(personInfo.주민등록번호, 'EUC-KR');
    postData += "&email=" + httpRequest.URLEncodeAll(personInfo.이메일주소, 'EUC-KR');
    postData += "&tel=" + httpRequest.URLEncodeAll(personInfo.집전화번호, 'EUC-KR');
    postData += "&addr=" + httpRequest.URLEncodeAll(personInfo.주소, 'EUC-KR');
    postData += "&hand=" + httpRequest.URLEncodeAll(personInfo.핸드폰번호, 'EUC-KR');
    // postData += "&cname=" + personInfo.직장명;
    // postData += "&grade=" + personInfo.직위;
    // postData += "&jobyear=" + personInfo.근무년수;
    // postData += "&ctel=" + personInfo.전화번호;
    // postData += "&money=" + personInfo.급여소득;
    // postData += "&money2=" + personInfo.급여외소득;
    // postData += "&caddr=" + personInfo.직장주소;
    postData += "&amount=" + httpRequest.URLEncodeAll(personInfo.신청금액, 'EUC-KR');
    postData += "&account=" + httpRequest.URLEncodeAll(personInfo.담보계좌번호, 'EUC-KR');
    postData += "&inputaccount=" + httpRequest.URLEncodeAll(personInfo.대출금입금계좌, 'EUC-KR');
    postData += "&pass=" + httpRequest.URLEncodeAll(personInfo.입금계좌비밀번호, 'EUC-KR');
    
    // 인코딩함수
    httpRequest.URLEncodeAll(plain, charset); // UTF-8, EUC-KR


    //plain = 암호화 할 데이터
    //password = 입력할 패스워드
    //timeURL = 서버와 통신할 url
    var plain = "";
    var password = certInfo.비밀번호;  //입력
    var timeUrl ="" ;
    PostData = certManager.MakeINIpluginData(11, plain, password, timeUrl);

    if(httpRequest.post(this.host+"/initech/demo/sign64/Sign2.jsp", this.PostData) == false) {
        //실패
        this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
    }else {
        //성공
        this.log("인증서 검증 성공.");
    }
        
////////////////
        this.iSASInOut.Output ={};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
        // this.iSASInOut.Output.Result = {};
        return S_IBX_OK;
        
    } catch(e){
        this.log("Exception " + e.message);
        this.setError(E_IBX_UNKNOWN);
        return E_IBX_UNKNOWN;ㄹ
    } finally{
        system.setStatus(IBXSTATE_DONE, 100);
        this.log(인증 + " 전자서명 finally");
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