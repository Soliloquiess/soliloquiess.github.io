var moduleVersion = '20.10.21.1';
var initech = "샘플소스";
console.log(initech + " 스크립트 호출됨.");
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

var 전자서명 = function(){
    console.log(전자서명 + " 전자서명 생성자 호출");
    this.errorMsg = "";
    this.host = "http://demo.initech.com/";
    this.userAgent = '{';
    this.userAgent += '"Accept":"image/webp,image/apngimage/*,*/*;q=0.8"';
    // this.userAgent += '"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"';
    this.userAgent += '"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"';
    this.userAgent += '}';//User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko
};

전자서명.prototype = Object.create(iSASObject.prototype);

전자서명.prototype.전자서명조회 =function(aInput){
    this.log(전자서명 + " 전자서명 호출[" + aInput + "]");
    try{
        system.setStatus(IBXSTATE_CHECKPARAM, 10);
        
        var certInfo = dec(aInput.Input.인증서);
        var personInfo = dec(aInput.Input.개인정보);
    
        var 성명 = parseInfo.성명;
        var 주민등록번호 = parseInfo.주민등록번호;
        var 이메일주소 = parseInfo.이메일주소;
        var 집전화번호 = parseInfo.집전화번호;
        var 주소 = parseInfo.주소;
        var 핸드폰번호 = parseInfo.핸드폰번호;
        var 직장명 = parseInfo.직장명;
        var 직위 = parseInfo.직위;
        var 근무년수 = parseInfo.근무년수;
        var 전화번호 = parseInfo.전화번호
        var 급여소득 = parseInfo.급여소득;
        var 급여외소득 = parseInfo.급여외소득;
        var 직장주소 = parseInfo.직장주소;
        var 신청금액 = parseInfo.신청금액
        var 담보계좌번호 = parseInfo.담보계좌번호;
        var 대출금입금계좌 = parseInfo.대출금입금계좌;
        var 비밀번호 = parseInfo.비밀번호;
        
        if(!성명|| !주민등록번호||!이메일주소||!집전화번호||!주소||!핸드폰번호|| !신청금액 || !담보계좌번호 ||!대출금입금계좌
            || !비밀번호){
                this.log("errorpersonInfo"+ JSON.stringify(personInfo)+"]");
                this.setError(E_IBX_RESULT_FAIL);

                return E_IBX_RESULT_FAIL;
        }
        

        // var input = dec(aInput.Input);
        // var certInfoinput = input.인증서;
        // var regionName = input.regionName;
        // var Signature = dec(aInput.Input);
        // var certInfo = {};
        // certInfo.이름= certInfo.이름;
        // certInfo.만료일자= certInfo.만료일자;
        // certInfo.비밀번호= certInfo.비밀번호;

    this.log("certInfo" +certInfo+"]");
    this.log("certInfo" +certInfo.이름+"]");
    this.log("certInfo" +certInfo.만료일자+"]");
    this.log("certInfo" +certInfo.비밀번호+"]");

    
    if(!certInfo){
        this.setError(E_IBX_RESULT_FAIL);
        this.log("errorcertInfo["+JSON.stringify(certInfo)+"]")
        return E_IBX_RESULT_FAIL;
    }
    this.log("인증서 입력값 정보["+JSON.stringify(certInfo)+"]")    //잘 나옴

    if(!personInfo){
        this.setError(E_IBX_RESULT_FAIL);
        this.log("errorPersonInfo["+JSON.stringify(personInfo)+"]")
        return E_IBX_RESULT_FAIL;
    }
    this.log("서명 입력값 정보["+JSON.stringify(personInfo)+"]")    //잘 나옴
    
    if(!certManager.findCert(JSON.stringify(certInfo))) {
        //실패
        this.log("인증서를 찾을 수 없습니다.");
        this.setError(E_IBX_CERTIFY_NOT_FOUND);
        return E_IBX_CERTIFY_NOT_FOUND;
    } else {
        //성공
        this.log("인증서 찾음.");   //잘 나옴
    }
    

    if(!certManager.verifyPassword(certInfo.비밀번호)) {
        //실패
        this.log("인증서 검증 실패.");  //비밀번호 틀렸다는 얘기
        this.setError(E_IBX_KEY_ACCOUNT_PASSWORD_1_INVALID);
        return E_IBX_KEY_ACCOUNT_PASSWORD_1_INVALID;
    } else {
        //성공
        this.log("인증서 검증 성공.");
    }

    
    var 개인정보  ={}

    //아래 성명~핸드폰을 postdata에 +=로 붙여도 들어가던데 이래도 되는 건지 궁금합니다.
    
    // var 성명 =  personInfo.성명;
    // var 주민등록번호 = personInfo.주민등록번호;
    // var 이메일주소 =personInfo.이메일주소;
    // var 집전화번호 = person.집전화번호;
    // var 주소 = person.주소;
    // var 핸드폰번호 =  person.핸드폰번호
    
    if(httpRequest.get(this.host) == false) {
        //실패
        this.log("통신 실패");
        this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
    }

    var postData = "__INIts__=1667465568";
    postData += "&name=" + personInfo.성명
    postData += "&jumin=" + personInfo.주민등록번호;
    postData += "&email=" + personInfo.이메일주소;
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
    // httpRequest.URLEncodeAll(plain, charset); // UTF-8, EUC-KR


    //plain = 암호화 할 데이터
    //password = 입력할 패스워드
    //timeURL = 서버와 통신할 url
    var plain = "";
    var password = certInfo.비밀번호;  //입력
    var timeUrl ="https://demo.initech.com/initech/plugin64/tools/Time.jsp?" ;
    var pluginData = certManager.MakeINIpluginData(11, postData, password, timeUrl);

    if(httpRequest.post(this.host+"/initech/demo/sign64/Sign2.jsp", pluginData) == false) {
        //실패
        this.setError(E_IBX_FAILTOGETPAGE);
        this.log("인증서 post 통신 검증 실패.");
            return E_IBX_FAILTOGETPAGE;
    }else {
        //성공
        this.log("인증서 post 통신 검증 성공.");    //통신 성공
    }



    개인정보.pluginData = pluginData;
    this.log(pluginData);
        
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
        return E_IBX_UNKNOWN;
    } finally{
        system.setStatus(IBXSTATE_DONE, 100);
        this.log(전자서명 + " 전자서명 finally");
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