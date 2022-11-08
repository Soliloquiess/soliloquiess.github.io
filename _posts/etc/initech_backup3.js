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

var 전자서명 = function () {
    console.log(WeatherName + " 샘플구조체 생성자 호출");
    this.errorMsg = "";
    this.host = "http://demo.initech.com";
    this.userAgent = '{';
    this.userAgent += '"Accept":"image/webp,image/apngimage/*,*/*;q=0.8"';
    this.userAgent += '"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"';
    this.userAgent += '}';
};

전자서명.prototype = Object.create(iSASObject.prototype);

전자서명.prototype.전자서명조회 =function(aInput){
    this.log(WeatherName + " 샘플함수 호출[" + aInput + "]");
    try{
        system.setStatus(IBXSTATE_CHECKPARAM, 10);
        var input = dec(aInput.Input);
        var certInfo = input.인증서;


        // var certInfo = "{\"이름\":\"" + input.인증서.이름 + "\"" +
        //     ",\"만료일자\":\"\"" + 만료일자+"\""+
        //     ",\"비밀번호\":\"" + 비밀번호 + "\"}";



        var person = input.서명정보;

        var 성명 = httpRequest.URLEncodeAll(person.성명, "EUC-KR");
        var 주민등록번호 = httpRequest.URLEncodeAll(person.주민등록번호, "EUC-KR");
        var 이메일주소 =httpRequest.URLEncodeAll(person.이메일주소, "EUC-KR");
        var 집전화번호 = httpRequest.URLEncodeAll(person.집전화번호, "EUC-KR");
        var 주소 = httpRequest.URLEncodeAll(person.주소, "EUC-KR");
        var 핸드폰번호 = httpRequest.URLEncodeAll(person.핸드폰번호, "EUC-KR");
        var 신청금액 = httpRequest.URLEncodeAll(person.신청금액, "EUC-KR");
        var 담보계좌번호 = httpRequest.URLEncodeAll(person.담보계좌번호, "EUC-KR");
        var 대출금입금계좌 = httpRequest.URLEncodeAll(person.대출금입금계좌, "EUC-KR");
        var 입금계좌비밀번호 = httpRequest.URLEncodeAll(person.입금계좌비밀번호, "EUC-KR");


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
        if(!입금계좌비밀번호){
            this.setError(E_IBX_ACCOUNT_PASSWORD_NOTENTER)
            return E_IBX_ACCOUNT_PASSWORD_NOTENTER;
        }


        this.log("인증서 개인정보 정보 [" + JSON.stringify(person) + "]")
        
        if(!certInfo) {
            this.log("errorCertInfo [" + JSON.stringify(certInfo) + "]");
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }
        this.log("인증서 입력값 정보 [" + JSON.stringify(certInfo) + "]")
        
        if(!certManager.findCert(JSON.stringify(certInfo))) {
            this.log("인증서를 찾을 수 없습니다.");
            this.setError(E_IBX_CERTIFY_NOT_FOUND);
            return E_IBX_CERTIFY_NOT_FOUND;
        } else {
            this.log("인증서 찾음.");
        }

        if(!certManager.verifyPassword(certInfo.비밀번호)) {
            this.log('인증서 검증 실패.');
            this.setError(E_IBX_KEY_ACCOUNT_PASSWORD_1_INVALID);
            return E_IBX_KEY_ACCOUNT_PASSWORD_1_INVALID;
        } else {
            this.log("인증서 검증 성공.");
        }

        if(!httpRequest.get('http://demo.initech.com/initech/plugin64/cert.js')) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }

        
        
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

        this.log("sCert:[" +SCert);
        SCert = StrReplace(SCert, "\\n", "");
        this.log("sCert:[" +SCert);
        SCert = StrReplace(SCert, "-----BEGIN CERTIFICATE-----", "");
        SCert = StrReplace(SCert, "-----END CERTIFICATE-----", "");
        this.log("sCert:[" + SCert + "]");

        certManager.LoadCert(SCert);

        var postData = "__INIts__="+(new Date().getTime()).toString().substring(0,10);
        postData += "&name=" + 성명;
        postData += "&jumin=" + 주민등록번호;
        postData += "&email=" + 이메일주소;
        postData += "&tel=" + 집전화번호;
        postData += "&addr=" + 주소;
        postData += "&hand=" + 핸드폰번호;
        
        postData += "&amount=" + 신청금액;
        postData += "&account=" + 담보계좌번호;
        postData += "&inputaccount=" + 대출금입금계좌;
        postData += "&pass=" + 입금계좌비밀번호;
        this.log("postdata1"+ postData);
        
        // 인코딩함수
        // httpRequest.URLEncodeAll(postData, charset); // UTF-8, EUC-KR
    

        var INIpluginData = certManager.MakeINIpluginData(11, postData, certInfo.비밀번호, this.host+ "/initech/plugin64/tools/Time.jsp");
        this.log('INIpluginData [ ' + INIpluginData + ']');

        if(!httpRequest.post('http://demo.initech.com/initech/demo/sign64/Sign2.jsp', 'INIpluginData=' + httpRequest.URLEncodeAll(INIpluginData, 'EUC-KR'))) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }

////////////////////////////2번쨰 인증


// var SignTitle = httpRequest.URLEncodeAll(StrGrab(ResultStr, '<input type="hidden" name="PKCS7SignTitle" value="', '">'), 'EUC-KR');
        
        var ResultStr = httpRequest.result;
        this.log("ResultStr [" + ResultStr + "]");

        var frm = StrGrab(ResultStr, 'name="formName"', '</form>'); //primary key 
        var SignTitle = StrGrab(frm, 'name="PKCS7SignTitle"', '>'); //  value="이니텍은행 전자서명" mainkey 
            SignTitle = StrGrab(SignTitle, 'value="', '"');// 이니텍은행 전자서명
            SignTitle = httpRequest.URLEncodeAll(SignTitle, 'EUC-KR'); 

        var SignInfo = StrGrab(frm, 'name="PKCS7SignInfo"', '>');
            SignInfo = StrGrab(SignInfo, 'value="', '"');
            SignInfo = httpRequest.URLEncodeAll(SignInfo, 'EUC-KR');

        // var SignInfo = httpRequest.URLEncodeAll(StrGrab(ResultStr, '<input type="hidden" name="PKCS7SignInfo" value="', '">'), 'EUC-KR');
        var SignInfo2 = StrGrab(frm, 'name="PKCS7SignInfo"', '>',2);
            SignInfo2 = StrGrab(SignInfo2, 'value="', '"');
            SignInfo2 = httpRequest.URLEncodeAll(SignInfo2, 'EUC-KR');

        var name = StrGrab(frm, 'name="name"', '>');
            name = StrGrab(name, 'value="', '"');
            name = httpRequest.URLEncodeAll(name, 'EUC-KR');
        
        var jumin = StrGrab(frm, 'name="jumin"', '>');
            jumin = StrGrab(jumin, 'value="', '"');
            jumin = httpRequest.URLEncodeAll(jumin, 'EUC-KR');
            
        var addr = StrGrab(frm, 'name="addr"', '>');
            addr = StrGrab(addr, 'value="', '"');
            addr = httpRequest.URLEncodeAll(addr, 'EUC-KR');            
            
        var amount = StrGrab(frm, 'name="amount"', '>');
            amount = StrGrab(amount, 'value="', '"');
            amount = httpRequest.URLEncodeAll(amount, 'EUC-KR');

        var account = StrGrab(frm, 'name="account"', '>',1);
            account = StrGrab(account, 'value="', '"');
            account = httpRequest.URLEncodeAll(account, 'EUC-KR');

        var account2 = StrGrab(frm, 'name="account2"', '>',2);
            account2 = StrGrab(account2, 'value="', '"');
            account2 = httpRequest.URLEncodeAll(account2, 'EUC-KR');

        var inputaccount = StrGrab(frm, 'name="inputaccount"', '>');
            inputaccount = StrGrab(inputaccount, 'value="', '"');
            inputaccount = httpRequest.URLEncodeAll(inputaccount, 'EUC-KR');
                
        var inputaccount2 = StrGrab(frm, 'name="inputaccount2"', '>');
            inputaccount2 = StrGrab(inputaccount2, 'value="', '"');
            inputaccount2 = httpRequest.URLEncodeAll(inputaccount2, 'EUC-KR');

        var pass = StrGrab(frm, 'name="pass"', '>');
            pass = StrGrab(pass, 'value="', '"');
            pass = httpRequest.URLEncodeAll(pass, 'EUC-KR');


        var SearchCondition = StrGrab(frm, 'name="SearchCondition"', '>');
            SearchCondition = StrGrab(SearchCondition, 'value="', '"');
            SearchCondition = httpRequest.URLEncodeAll(SearchCondition, 'EUC-KR');


        // if(!SignTitle){
        //     this.setError(E_IBX_DESC_INVALID)
        //     return E_IBX_DESC_INVALID;
        // }

        // if(!SignInfo){
        //     this.setError(E_IBX_DESC_INVALID)
        //     return E_IBX_DESC_INVALID;
        // }

        // if(!SignInfo2){
        //     this.setError(E_IBX_DESC_INVALID)
        //     return E_IBX_DESC_INVALID;
        // }

        // if(!name){
        //     this.setError(E_IBX_P00012_NAME_NOENTER)
        //     return E_IBX_P00012_NAME_NOENTER;
        // }

        
        // if(!jumin ){
        //     this.setError(E_IBX_REGNO_RESIDENT_NOTENTER)
        //     return E_IBX_REGNO_RESIDENT_NOTENTER;
        // }
        
    
        // if(!addr){
        //     this.setError(E_IBX_A97XX1_ADDRESS_NOTENTER)
        //     return E_IBX_A97XX1_ADDRESS_NOTENTER;
        // }
        // if(!amount){
        //     this.setError(E_IBX_REMIT_AMOUNT_NOTENTER)
        //     return E_IBX_REMIT_AMOUNT_NOTENTER;
        // }


///// postdata2 에 적용

        postData2 = httpRequest.URLEncodeAll(`성명=${name}&주민등록번호=${jumin}&주소=${addr}`, 'EUC-KR'); //데이터 맞추기
        this.log('postData2'+postData2)
        
        //PC용
        var PKCS7SignData = certManager.PKCS7SignData(postData2, certInfo.비밀번호);
        // PKCS7SignData = httpRequest.URLEncodeAll(PKCS7SignData, "UTF-8");

        
        this.log('PKCS7SignData'+PKCS7SignData);

        var postData2 = '__INIts__=' + (new Date().getTime()).toString().substring(0, 10);
        
        postData2 += '&PKCS7SignedData='+ httpRequest.URLEncodeAll(PKCS7SignData, 'EUC-KR');
        postData2 += '&PKCS7SignTitle=' + SignTitle
        postData2 += '&PKCS7SignInfo=' + SignInfo
        postData2 += '&PKCS7SignInfo=' + SignInfo2
        postData2 += '&name=' + name
        postData2 += '&jumin=' + jumin
        postData2 += '&addr=' + addr
        postData2 += '&amount=' + amount
        postData2 += '&account=' + account
        postData2 += '&account=' + account2
        postData2 += '&inputaccount=' + inputaccount
        postData2 += '&inputaccount2=' + inputaccount2
        postData2 += '&pass=' + pass
        postData2 += '&SearchCondition=' + SearchCondition

        this.log("postData2"+postData2);

        
        var INIpluginData = certManager.MakeINIpluginData(10, postData2, certInfo.비밀번호,  this.host+ "/initech/plugin64/tools/Time.jsp");
        

        this.log('postData22 [ ' + postData2 + ']');

        this.log("INIpluginData"+INIpluginData);
        if(!httpRequest.post(this.host+'/initech/demo/sign64/Sign2_Result.jsp', 'INIpluginData=' + httpRequest.URLEncodeAll(INIpluginData, 'UTF-8'))) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        ResultStr = httpRequest.result;
        this.log('ResultStr [ ' + ResultStr + ' ]');

        ////// 로그 찍히는 거 확인
        var ResultStr = httpRequest.result;
        this.log("ResultStr [" + ResultStr + "]");

        var frm = StrGrab(ResultStr, 'name="formName"', '</form>'); //primary key 
    

        //출력
        var 개인정보 ={}

        var frm = StrGrab(ResultStr, 'name="formName"', '</form>'); //primary key 
            개인정보.이름 = StrGrab(frm, 'name="name"', '>'); 
            개인정보.이름 = StrGrab(개인정보.이름, 'value="', '"');

            개인정보.주민등록번호 = StrGrab(frm, 'name="jumin"', '>'); 
            개인정보.주민등록번호 = StrGrab(개인정보.주민등록번호, 'value="', '"');

            개인정보.주소 = StrGrab(frm, 'name="addr"', '>'); 
            개인정보.주소 = StrGrab(개인정보.주소, 'value="', '"');
        
            개인정보.대출금액 = StrGrab(frm, 'name="amount"', '>'); 
            개인정보.대출금액 = StrGrab(개인정보.대출금액, 'value="', '"');

            개인정보.담보계좌번호 = StrGrab(frm, 'name="account"', '>'); 
            개인정보.담보계좌번호 = StrGrab(개인정보.담보계좌번호, 'value="', '"');

            개인정보.대출금입금계좌 = StrGrab(frm, 'name="inputaccount"', '>'); 
            개인정보.대출금입금계좌 = StrGrab(개인정보.대출금입금계좌, 'value="', '"');

            개인정보.비밀번호 = StrGrab(frm, 'name="pass"', '>'); 
            개인정보.비밀번호 = StrGrab(개인정보.비밀번호, 'value="', '"');



        this.iSASInOut.Output ={};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
        this.iSASInOut.Output.Result.개인정보 = 개인정보;
        
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


//input : 
//       {"Module":"initech","Class":"전자서명","Job":"전자서명조회","Input":{"인증서":{"이름":"cn=박성용(park sungyong)0004047H000190474,ou=KMB,ou=personal4IB,o=yessign,c=kr","만료일자":"20230116","비밀번호":"pncsoft1"},"서명정보":{"성명":"홍길동","주민등록번호":"760830-2245544","이메일주소":"hong@initech.com","집전화번호":"02-1234-5678","주소":"서울시 송파구 거여동 559-23 현대아파트 3동 10호","핸드폰번호":"017-740-5455","신청금액":"50,000,000","담보계좌번호":"396-54-456611","대출금입금계좌":"345-85-451466", "입금계좌비밀번호":"1111"}}}
