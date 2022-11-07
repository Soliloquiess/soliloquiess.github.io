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

var getServerCert = function() {
    
}

var 인증 = function () {
    console.log(WeatherName + " 샘플구조체 생성자 호출");
    this.errorMsg = "";
    this.host = "http://demo.initech.com";
    this.userAgent = '{';
    this.userAgent += '"Accept":"image/webp,image/apngimage/*,*/*;q=0.8"';
    this.userAgent += '"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"';
    this.userAgent += '}';
};

인증.prototype = Object.create(iSASObject.prototype);

인증.prototype.전자서명 =function(aInput){
    this.log(WeatherName + " 샘플함수 호출[" + aInput + "]");
    try{
        system.setStatus(IBXSTATE_CHECKPARAM, 10);

        var certInfo = dec(aInput.Input.인증서);
        var personInfo = dec(aInput.Input.서명정보);

        certInfo.이름;
        certInfo.만료일자;
        certInfo.비밀번호;
    
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


        var 성명 = httpRequest.URLEncodeAll(personInfo.성명, "EUC-KR");
        var 주민등록번호 = httpRequest.URLEncodeAll(personInfo.주민등록번호, "EUC-KR");
        var 이메일주소 =personInfo.이메일주소;
        var 집전화번호 = personInfo.집전화번호;
        var 주소 = httpRequest.URLEncodeAll(personInfo.주소, "EUC-KR");
        var 신청금액 = httpRequest.URLEncodeAll(personInfo.신청금액, "EUC-KR");
        var 담보계좌번호 = httpRequest.URLEncodeAll(personInfo.담보계좌번호, "EUC-KR");
        var 대출금입금계좌 = httpRequest.URLEncodeAll(personInfo.대출금입금계좌, "EUC-KR");
        var 입금계좌비밀번호 = httpRequest.URLEncodeAll(personInfo.입금계좌비밀번호, "EUC-KR");


        if(!성명){
            this.setError(E_IBX_P00012_NAME_NOENTER)
            return E_IBX_P00012_NAME_NOENTER;
        }
    
        if(!주민등록번호){
            this.setError(E_IBX_REGNO_RESIDENT_NOTENTER)
            return E_IBX_REGNO_RESIDENT_NOTENTER;
        }
    
        if(!주소){
            this.setError(E_IBX_A97XX1_ADDRESS_NOTENTER)
            return E_IBX_A97XX1_ADDRESS_NOTENTER;
        }
    
        if(!신청금액){
            this.setError(E_IBX_REMIT_AMOUNT_NOTENTER)
            return E_IBX_REMIT_AMOUNT_NOTENTER;
        }
    
        
        if(!담보계좌번호 ){
            this.setError(E_IBX_ACCOUNT_NO_NOTENTER)
            return E_IBX_ACCOUNT_NO_NOTENTER;
        }
        
     
        if(!대출금입금계좌 || !담보계좌번호){
            this.setError(E_IBX_ACCOUNT_NO_NOTENTER)
            return E_IBX_ACCOUNT_NO_NOTENTER;
        }
        if(!비밀번호){
            this.setError(E_IBX_ACCOUNT_PASSWORD_NOTENTER)
            return E_IBX_ACCOUNT_PASSWORD_NOTENTER;
        }

        
        this.log("인증서 개인 정보 [" + JSON.stringify(personInfo) + "]")
        


  
        
        this.url = "/initech/plugin64/cert.js'";
        if (httpRequest.get(this.host + this.url) == false) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        
    //2. Get sCert
        
        var SCert = StrGrab(httpRequest.result, 'SCert = "', '";', 2);
        var i = 1;
        while(true) {
            var tempStr = StrGrab(httpRequest.result, 'SCert += "', '";', i++);
            if(tempStr != "") {
                SCert += tempStr;
            } else {
                break;
            }
        }
        SCert = StrReplace(SCert, "\\n", "\n");
        this.log("SCert:[" + SCert + "]");

        certManager.LoadCert(SCert);

        var plain = '__INIts__=' + (new Date().getTime()).toString().substring(0, 10);
        plain += '&name=' + 성명;
        plain += '&jumin=' + 주민등록번호;
        plain += "&email=" + httpRequest.URLEncodeAll(이메일주소, 'EUC-KR');
        plain += "&tel=" + httpRequest.URLEncodeAll(집전화번호, 'EUC-KR');
        plain += '&addr=' + 주소;
        plain += '&amount=' + 신청금액;
        plain += '&account=' + 담보계좌번호;
        plain += '&inputaccount=' + 대출금입금계좌;
        plain += '&pass=' + 입금계좌비밀번호;
        this.log('plain [ ' + plain + ']');

        var INIpluginData = certManager.MakeINIpluginData(11, plain, certInfo.비밀번호, "http://demo.initech.com/initech/plugin64/tools/Time.jsp");
        this.log('INIpluginData [ ' + INIpluginData + ']');

        if(!httpRequest.post('http://demo.initech.com/initech/demo/sign64/Sign2.jsp', 'INIpluginData=' + httpRequest.URLEncodeAll(INIpluginData, 'EUC-KR'))) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        var INIpluginResult = httpRequest.result;
        this.log("INIpluginResult [" + INIpluginResult + "]");

        var PKCS7SignTitle = StrGrab(INIpluginResult, '<input type="hidden" name="PKCS7SignTitle" value="', '">');
        var PKCS7SignInfo = StrGrab(INIpluginResult, '<input type="hidden" name="PKCS7SignInfo" value="', '">');
        var PKCS7SignInfo2 = StrGrab(INIpluginResult, '<input type="hidden" name="PKCS7SignInfo" value=', '>');
        var name = StrGrab(INIpluginResult, '<input type="hidden" name="name"          value="', '">');
        var jumin = StrGrab(INIpluginResult, '<input type="hidden" name="jumin"         value="', '">');
        var addr = StrGrab(INIpluginResult, '<input type="hidden" name="addr"          value="', '">');
        var amount = StrGrab(INIpluginResult, '<input type="hidden" name="amount"        value="', '">');
        var account = StrGrab(INIpluginResult, '<input type="hidden" name="account"       value="', '">', 1);
        var account2 = StrGrab(INIpluginResult, '<input type="hidden" name="account"       value="', '">', 2);
        var inputaccount = StrGrab(INIpluginResult, '<input type="hidden" name="inputaccount"  value="', '">');
        var inputaccount2 = StrGrab(INIpluginResult, '<input type="hidden" name="inputaccount2"  value="', '">');
        var pass = StrGrab(INIpluginResult, '<input type="hidden" name="pass"          value="', '">');
        var SearchCondition = StrGrab(INIpluginResult, '<option value="UserID">', '</option>');

        if(!PKCS7SignTitle || !PKCS7SignInfo || !PKCS7SignInfo || !name || !jumin || !addr || !amount ||
            !account || !account2 || !inputaccount || !inputaccount2 || !pass) {
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }

        plain = httpRequest.URLEncodeAll(`성명=${name}&주민등록번호=${jumin}&주소=${addr}`, 'EUC-KR');
        this.log('plain [ ' + plain + ']');

        var PKCS7SignData = certManager.PKCS7SignData(plain, certInfo.비밀번호, "UTF-8");
        this.log('PKCS7SignData [ ' + PKCS7SignData + ']');

        if(!certManager.findCert(JSON.stringify(certInfo))) {
            this.log("인증서를 찾을 수 없습니다.");
            this.setError(E_IBX_CERTIFY_NOT_FOUND);
            return E_IBX_CERTIFY_NOT_FOUND;
        } else {
            this.log("인증서 찾음.");
        }

        if(!certManager.verifyPassword(certInfo.비밀번호)) {
            this.log("인증서 검증 실패.");
            this.setError(E_IBX_KEY_ACCOUNT_PASSWORD_1_INVALID);
            return E_IBX_KEY_ACCOUNT_PASSWORD_1_INVALID;
        } else {
            this.log("인증서 검증 성공.");
        }

        plain = '__INIts__=' + (new Date().getTime()).toString().substring(0, 10);
        plain += '&PKCS7SignedData=' + httpRequest.URLEncodeAll(PKCS7SignData, 'EUC-KR');
        plain += '&PKCS7SignTitle=' + httpRequest.URLEncodeAll(PKCS7SignTitle, 'EUC-KR');
        plain += '&PKCS7SignInfo=' + httpRequest.URLEncodeAll(PKCS7SignInfo, 'EUC-KR');
        plain += '&PKCS7SignInfo=' + httpRequest.URLEncodeAll(PKCS7SignInfo2, 'EUC-KR');
        plain += '&name=' + httpRequest.URLEncodeAll(name, 'EUC-KR');
        plain += '&jumin=' + httpRequest.URLEncodeAll(jumin, 'EUC-KR');
        plain += '&addr=' + httpRequest.URLEncodeAll(addr, 'EUC-KR');
        plain += '&amount=' + httpRequest.URLEncodeAll(amount, 'EUC-KR');
        plain += '&account=' + httpRequest.URLEncodeAll(account, 'EUC-KR');
        plain += '&account=' + httpRequest.URLEncodeAll(account2, 'EUC-KR');
        plain += '&inputaccount=' + httpRequest.URLEncodeAll(inputaccount, 'EUC-KR');
        plain += '&inputaccount2=' + httpRequest.URLEncodeAll(inputaccount2, 'EUC-KR');
        plain += '&pass=' + httpRequest.URLEncodeAll(pass, 'EUC-KR');
        plain += '&SearchCondition=' + httpRequest.URLEncodeAll(SearchCondition, 'EUC-KR');
        this.log('plain [ ' + plain + ']');

        var INIpluginData = certManager.MakeINIpluginData(10, plain, certInfo.비밀번호, this.host+"/initech/plugin64/tools/Time.jsp");
        this.log('INIpluginData [ ' + INIpluginData + ']');

        if(!httpRequest.post('http://demo.initech.com/initech/demo/sign64/Sign2_Result.jsp', 'INIpluginData=' + httpRequest.URLEncodeAll(PKCS7SignData, 'UTF-8'))) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        INIpluginResult = httpRequest.result;
        this.log('INIpluginResult [ ' + INIpluginResult + ' ]');
        
        this.iSASInOut.Output ={};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
        // this.iSASInOut.Output.Result.서명정보 = 서명정보;
        
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