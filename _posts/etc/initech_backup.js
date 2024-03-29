var moduleVersion = '20.10.21.1';
var WeatherName = "샘플소스";
console.log(WeatherName + " 스크립트 호출됨.");
console.log('Version: ' + moduleVersion);

function iSASObject(){
    console.log("iSASObject 생성자 호출");
    this.iSASOut = {};
}

// const regex = /^[ㄱ-ㅎ|가-힣]+$/;
// function check(parameter){
    
//     if (parameter == '')
//     {
//         return false;

//     }
//     if(regex.test(parameter)){
//         return false;
//     }

//     // 자리수 체크
//     if (parameter.length > 15)
//     {
//         return false;
//     }    
// }


function validateJumin(jumin1, jumin2)
{
    var jumin1    = jumin1,
        jumin2    = jumin2,
        jumin     = jumin1+''+jumin2;

    if (jumin1 == ''||jumin2 == '')
    {
        return false;
    }

    // // 입력값 체크
    if (jumin1.match('[^0-9]')||jumin2.match('[^0-9]'))
    {
        return false;

    }
 
    // 자리수 체크
    if (jumin.length != 13)
    {
        return false;

    }    
 
    return jumin;
}
 
function validate(name) {
    var re = /^[가-힣]{2,15}$/; 
    return re.test(String(name))
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePw(name) {
    var re = /^[0-9]{4,4}$/;    //최소4자, 최대4자
    return re.test(String(name))
}

// input.value.match( /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/ )

function validatePN(name) {
    var re = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/;   
    return re.test(String(name))
}

function validateCurrency(value) {
    var regex = /^(?!0\.00)[1-9]\d{0,2}(,\d{3})*(\.\d\d)?$/;
    if (regex.test(value))
    {
        var twoDecimalPlaces = /\.\d{2}$/g;
        var oneDecimalPlace = /\.\d{1}$/g;
        var noDecimalPlacesWithDecimal = /\.\d{0}$/g;
        
        if(value.match(twoDecimalPlaces ))
        {
            return value;
        }
        if(value.match(noDecimalPlacesWithDecimal))
        {
            //add two decimal places
            return value+'00';
        }
        if(value.match(oneDecimalPlace ))
        {
            return value+'0';
        }
        return value+".00";
    }
    return null;
};


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




iSASObject.prototype.maskAcctNo = function(strAcctNo) {
    if (!strAcctNo) return strAcctNo;
    var begin = strAcctNo.substring(0, 3);
    var end = strAcctNo.substring(strAcctNo.length - 1);
    var mid = "";
    for (var i = 0; i < strAcctNo.length - 4; i++) {
        mid += "*";
    }
    strAcctNo = begin + mid + end;
    return strAcctNo;
};

iSASObject.prototype.maskPassNo = function(maskPassNo) {    			
    var begin = 0;
    var end = 4;
    strPassNo = this.maskString(maskPassNo, begin, end);
    return strPassNo;
};



iSASObject.prototype.maskString = function(str, begin, end) {
    if (str == null || str == "") {
        str = "";
        return str;
    }
        
    var mask = '';
    var str2 = '';
    for ( var i=0; i < (end-begin); i++ ) {
        mask += '*';
    }
    str = StrTrim(str);
    str2 = str.substring(begin, str.length-end)
    str2 = str2.replace( str2, mask );
//        str = str.substring(0, begin) + str2 + str.substring(str.length-3);
        str = str.replace( str.substring(begin, end), mask );
    return str;
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

         //    인증서 정보 저장
        var input = dec(aInput.Input);
        //  사이트 내 서명 정보 입력
        var certInfo = input.인증서;



        //    client 정보  저장    // 
        var person = input.서명정보;

        var 성명 = person.성명;

        var 주민등록번호 = person.주민등록번호;
        
        var jumin1 = 주민등록번호.substr(0, 6);
        var jumin2 = 주민등록번호.substr(7, 7);
        
        this.log("jumin1:::"+jumin1);
        this.log("jumin2:::"+jumin2);
        
        주민등록번호 = validateJumin(jumin1,jumin2);

        // this.log("주민등록번호>>>>"+주민등록번호)
        
		// var 주민등록번호 = StrTrim(input.서명정보.주민등록번호);
        // 주민등록번호.replace(/^(\d{6})-?(\d{7})$/g, '$1*******');

        var 이메일주소 = person.이메일주소;
        
        var 집전화번호 = person.집전화번호;
        var 주소 = person.주소;
        this.log("주소:::"+주소);
        var 핸드폰번호 =person.핸드폰번호;
        var 신청금액 = person.신청금액;
        var 담보계좌번호 = person.담보계좌번호;
        var 대출금입금계좌 = person.대출금입금계좌;
        var 입금계좌비밀번호 = person.입금계좌비밀번호;


        this.log("주민등록번호:::"+주민등록번호);
        
        //    인증서 정보 Valid & 로그처리    // 

        
        this.log("성명:::"+성명);

        if(!validate(성명)){
            this.setError(E_IBX_P00222_INCORRECT_INFOMATION)
            return E_IBX_P00222_INCORRECT_INFOMATION;
        }
        var r = new RegExp(/\d{6}(\-|)[1-4]\d{6}$/);

        // if(성명.length>15){
        //     this.setError(E_IBX_P00222_INCORRECT_INFOMATION)
        //     return E_IBX_P00222_INCORRECT_INFOMATION;
        // }
        if (r.test(주민등록번호) ==false) {
        
            this.setError(E_IBX_REGNO_RESIDENT_INVALID);
			return E_IBX_REGNO_RESIDENT_INVALID;
        
        }

        if (!validateEmail(이메일주소)) {
            this.setError(E_IBX_EMAIL_INVALID);
            return E_IBX_EMAIL_INVALID;
        }


        // this.log("주소.length"+주소.length);
        // 주소길이 = 주소.length
        
        // this.log("주소길이"+주소길이);
        // if(!(주소)|| !validatecheck(주소길이)){
        //     this.setError(E_IBX_A97XX1_ADDRESS_NOTENTER)
        //     return E_IBX_A97XX1_ADDRESS_NOTENTER;
        // }

        if((!핸드폰번호)){
            this.setError(E_IBX_K2006X_PHONE_NUMBER_INVALID)
            return E_IBX_K2006X_PHONE_NUMBER_INVALID;
        }


        
        if(!(주소)){
            this.setError(E_IBX_A97XX1_ADDRESS_NOTENTER)
            return E_IBX_A97XX1_ADDRESS_NOTENTER;
        }

        if(!신청금액){
            this.setError(E_IBX_REMIT_AMOUNT_NOTENTER)
            return E_IBX_REMIT_AMOUNT_NOTENTER;
        }

        this.log("신청금액<<<<<<"+신청금액);
        // validateCurrency
        if(!validateCurrency(신청금액)){
            this.setError(E_IBX_REMIT_AMOUNT_NOTENTER)
            return E_IBX_REMIT_AMOUNT_NOTENTER;
        }
 
        if(!대출금입금계좌 || !담보계좌번호){
            this.setError(E_IBX_ACCOUNT_NO_NOTENTER)
            return E_IBX_ACCOUNT_NO_NOTENTER;
        }

        if(!입금계좌비밀번호){
            this.setError(E_IBX_ACCOUNT_PASSWORD_NOTENTER)
            return E_IBX_ACCOUNT_PASSWORD_NOTENTER;
        }

        if(!validatePw(입금계좌비밀번호)){
            this.setError(E_IBX_ACCOUNT_NO_INVALID)
            return E_IBX_ACCOUNT_NO_INVALID;
        }

        
        성명 = httpRequest.URLEncodeAll(person.성명, "EUC-KR");

        이메일주소 =httpRequest.URLEncodeAll(person.이메일주소, "EUC-KR");
        
        집전화번호 = httpRequest.URLEncodeAll(person.집전화번호, "EUC-KR");
        주소 = httpRequest.URLEncodeAll(person.주소, "EUC-KR");
        핸드폰번호 = httpRequest.URLEncodeAll(person.핸드폰번호, "EUC-KR");
        신청금액 = httpRequest.URLEncodeAll(person.신청금액, "EUC-KR");
        담보계좌번호 = httpRequest.URLEncodeAll(person.담보계좌번호, "EUC-KR");
        대출금입금계좌 = httpRequest.URLEncodeAll(person.대출금입금계좌, "EUC-KR");
        입금계좌비밀번호 = httpRequest.URLEncodeAll(person.입금계좌비밀번호, "EUC-KR");


        //인증서 valid 검증 여부
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

        //scert를 통해 사이트 
        var SCert = StrGrab(httpRequest.result, 'SCert += "', 'SCert += "-----END CERTIFICATE-----\\n";');
        SCert = StrReplace(SCert, 'SCert += "', '');
        SCert = StrReplace(SCert, '\\n";', '');

        this.log("scert"+SCert);
        //eval = 코드 줄이기 위한 함수..?

        eval("SCert=SCert");


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


        var ResultStr = httpRequest.result;
        this.log("ResultStr [" + ResultStr + "]");

        var frm = StrGrab(ResultStr, 'name="formName"', '</form>');
        var SignTitle = StrGrab(StrGrab(frm, 'name="PKCS7SignTitle"', '>'), 'value="', '"'); 
            SignTitle = httpRequest.URLEncodeAll(SignTitle, 'EUC-KR'); 

        var SignInfo = StrGrab(StrGrab(frm, 'name="PKCS7SignInfo"', '>'), 'value="', '"');
            SignInfo = httpRequest.URLEncodeAll(SignInfo, 'EUC-KR');

        var SignInfo2 = StrGrab(StrGrab(frm, 'name="PKCS7SignInfo"', '>',2), 'value="', '"');
            SignInfo2 = httpRequest.URLEncodeAll(SignInfo2, 'EUC-KR');

        var name = StrGrab(StrGrab(frm, 'name="name"', '>'), 'value="', '"');
            name = httpRequest.URLEncodeAll(name, 'EUC-KR');
    
        var jumin = StrGrab(StrGrab(frm, 'name="jumin"', '>'), 'value="', '"');
            jumin = httpRequest.URLEncodeAll(jumin, 'EUC-KR');
        
        var addr = StrGrab(StrGrab(frm, 'name="addr"', '>'), 'value="', '"');
            addr = httpRequest.URLEncodeAll(addr, 'EUC-KR');            
        
        var amount = StrGrab(StrGrab(frm, 'name="amount"', '>'), 'value="', '"');
            amount = httpRequest.URLEncodeAll(amount, 'EUC-KR');

        var account = StrGrab(StrGrab(frm, 'name="account"', '>',1), 'value="', '"');
            account = httpRequest.URLEncodeAll(account, 'EUC-KR');

        var account2 = StrGrab(StrGrab(frm, 'name="account2"', '>',2), 'value="', '"');
            account2 = httpRequest.URLEncodeAll(account2, 'EUC-KR');

        var inputaccount = StrGrab(StrGrab(frm, 'name="inputaccount"', '>'), 'value="', '"');
            inputaccount = httpRequest.URLEncodeAll(inputaccount, 'EUC-KR');
                
        var inputaccount2 = StrGrab(StrGrab(frm, 'name="inputaccount2"', '>'), 'value="', '"');
            inputaccount2 = httpRequest.URLEncodeAll(inputaccount2, 'EUC-KR');


        var pass = StrGrab(StrGrab(frm, 'name="pass"', '>'), 'value="', '"');
            pass = httpRequest.URLEncodeAll(pass, 'EUC-KR');


        var SearchCondition =  StrGrab(StrGrab(frm, 'name="SearchCondition"', '>'), 'value="', '"');
            SearchCondition = httpRequest.URLEncodeAll(SearchCondition, 'EUC-KR');
            // jumin = this.maskJumin(jumin);
            // // account = this.maskAcctNo(account);
            // pass =this.maskPassNo(pass);
            
        //valid 검증
        if(!SignTitle||!SignInfo){
            this.setError(E_IBX_DESC_INVALID);
            return E_IBX_DESC_INVALID;
        }

        if(!name){
            this.setError(E_IBX_P00012_NAME_NOENTER);
            return E_IBX_P00012_NAME_NOENTER;
        }
        
        if(!jumin ){
            this.setError(E_IBX_REGNO_RESIDENT_NOTENTER);
            return E_IBX_REGNO_RESIDENT_NOTENTER;
        }
    
        if(!addr){
            this.setError(E_IBX_A97XX1_ADDRESS_NOTENTER);
            return E_IBX_A97XX1_ADDRESS_NOTENTER;
        }


        if(!amount||!account||!inputaccount){
            this.setError(E_IBX_REMIT_AMOUNT_NOTENTER)
            return E_IBX_REMIT_AMOUNT_NOTENTER;
        }

        if(!pass){
            this.setError((E_IBX_ACCOUNT_PASSWORD_NOTENTER))
            return (E_IBX_ACCOUNT_PASSWORD_NOTENTER);
        }

///// postdata2 에 적용


        //${} 제거
        postData =  '성명='+ name;
        postData += '&주민등록번호='+ jumin;
        postData += '&주소=' + addr;
        postData = httpRequest.URLEncodeAll(postData, "EUC-KR");

        this.log('postData2'+postData2)
        
        //PC용
        var PKCS7SignData = certManager.PKCS7SignData(postData2, certInfo.비밀번호);

        
        this.log('PKCS7SignData'+PKCS7SignData);

        //2차 인증서 사용을 위한 postdata2
        var postData2 = '__INIts__=' + (new Date().getTime()).toString().substring(0, 10);
        
        postData2 += '&PKCS7SignedData='+ httpRequest.URLEncodeAll(PKCS7SignData, 'EUC-KR');
        postData2 += '&PKCS7SignTitle=' + SignTitle;
        postData2 += '&PKCS7SignInfo=' + SignInfo;
        postData2 += '&PKCS7SignInfo=' + SignInfo2;
        postData2 += '&name=' + name;
        postData2 += '&jumin=' + jumin;
        postData2 += '&addr=' + addr;
        postData2 += '&amount=' + amount;
        postData2 += '&account=' + account;
        postData2 += '&account=' + account2;
        postData2 += '&inputaccount=' + inputaccount;
        postData2 += '&inputaccount2=' + inputaccount2;
        postData2 += '&pass=' + pass;
        postData2 += '&SearchCondition=' + SearchCondition;

        this.log("postData2"+postData2);

        
        var INIpluginData = certManager.MakeINIpluginData(10, postData2, certInfo.비밀번호,  this.host+ "/initech/plugin64/tools/Time.jsp");

        this.log('postData2 [ ' + postData2 + ']');

        this.log("INIpluginData"+INIpluginData);
        if(!httpRequest.post(this.host+'/initech/demo/sign64/Sign2_Result.jsp', 'INIpluginData=' + httpRequest.URLEncodeAll(INIpluginData, 'UTF-8'))) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        ResultStr = httpRequest.result;
        this.log('ResultStr [ ' + ResultStr + ' ]');

        ////// 로그 찍히는 거 확인
        // var ResultStr = httpRequest.result;
        // this.log("ResultStr [" + ResultStr + "]");


        //ResultStr 출력
        var 개인정보 ={}

        var frm = StrGrab(ResultStr, 'name="formName"', '</form>'); //primary key 

        개인정보.이름 = StrGrab(StrGrab(frm, 'name="name"', '>'), 'value="', '"');

        개인정보.주민등록번호 = StrGrab(StrGrab(frm, 'name="jumin"', '>'), 'value="', '"');

        개인정보.주소 = StrGrab(StrGrab(frm, 'name="addr"', '>'), 'value="', '"');
    
        개인정보.대출금액 =  StrGrab(StrGrab(frm, 'name="amount"', '>'), 'value="', '"');
        개인정보.대출금액 = 개인정보.대출금액.replace(/,/g, "");

        개인정보.담보계좌번호 = StrGrab(StrGrab(frm, 'name="account"', '>'), 'value="', '"'); 

        개인정보.대출금입금계좌 = StrGrab(StrGrab(frm, 'name="inputaccount"', '>'), 'value="', '"');

        개인정보.비밀번호 = StrGrab(StrGrab(frm, 'name="pass"', '>'), 'value="', '"');

        this.log("개인정보.대출금액"+개인정보.대출금액);
        
        this.log(typeof(개인정보.대출금액));
        // this.log("typeof"+typeof 개인정보.비밀번호);

//         "123" (o)
// 123 (x)
        this.iSASInOut.Output={};
        this.iSASInOut.Input.인증서.비밀번호 = input.인증서.비밀번호.replace(/./g, "*"); //input
        // this.iSASInOut.Input.서명정보.주민등록번호 = 주민등록번호;
        this.iSASInOut.Input.서명정보.주민등록번호 = 주민등록번호.replace(/^(\d{6})-?(\d{7})$/g, '$1*******');



        // if (!isJuminValid(주민등록번호)) {
        //     this.setError(E_IBX_REGNO_RESIDENT_INVALID);
        //     return E_IBX_REGNO_RESIDENT_INVALID;
        // }
        this.iSASInOut.Input.서명정보.입금계좌비밀번호 = 입금계좌비밀번호.replace(/./g, "*");
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


//      {"Module":"initech","Class":"전자서명","Job":"전자서명조회","Input":{"인증서":{"이름":"cn=박성용(park sungyong)0004047H000190474,ou=KMB,ou=personal4IB,o=yessign,c=kr","만료일자":"20230116","비밀번호":"pncsoft1"},"서명정보":{"성명":"홍길동","주민등록번호":"941219-1823916","이메일주소":"hong@initech.com","집전화번호":"02-1234-5678","주소":"서울시 송파구 거여동 559-23 현대아파트 3동 10호","핸드폰번호":"017-740-5455","신청금액":"50,000,000","담보계좌번호":"396-54-456611","대출금입금계좌":"345-85-451466", "입금계좌비밀번호":"1111"}}}


//       {"Module":"initech","Class":"전자서명","Job":"전자서명조회","Input":{"인증서":{"이름":"cn=박성용(park sungyong)0004047H000190474,ou=KMB,ou=personal4IB,o=yessign,c=kr","만료일자":"20230116","비밀번호":"pncsoft1"},"서명정보":{"성명":"홍길동","주민등록번호":"760830-2245544","이메일주소":"hong@initech.com","집전화번호":"02-1234-5678","주소":"서울시 송파구 거여동 559-23 현대아파트 3동 10호","핸드폰번호":"017-740-5455","신청금액":"50,000,000","담보계좌번호":"396-54-456611","대출금입금계좌":"345-85-451466", "입금계좌비밀번호":"1111"}}}
//         {"Module":"initech","Class":"전자서명","Job":"전자서명조회","Input":{"인증서":{"이름":"cn=박성용(park sungyong)0004047H000190474,ou=KMB,ou=personal4IB,o=yessign,c=kr","만료일자":"20230116","비밀번호":"pncsoft1"},"서명정보":{"성명":"홍길동","주민등록번호":"760830-2245544","이메일주소":"hong@initech.com","집전화번호":"02-1234-5678","주소":"서울시 송파구 거여동 559-23 현대아파트 3동 10호","핸드폰번호":"017-740-5455","신청금액":"50,000,000","담보계좌번호":"396-54-456611","대출금입금계좌":"345-85-451466", "입금계좌비밀번호":"1111"}}}