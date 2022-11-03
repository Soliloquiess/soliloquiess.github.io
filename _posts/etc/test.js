var BankName = "카드";
var moduleVersion = '22.8.5.1';
console.log(BankName+ " 스크립트 호출됨.");
console.log("moduleVersion: " + moduleVersion);

function iSASObject() {
    console.log("iSASObject 생성자 호출");
    this.iSASInOut = {};
}

iSASObject.prototype.log = function (logMsg)
{
    try{
        SASLog("iSASObject.Log(" + logMsg + "\")");
    }catch(e){
       console.log("iSASObject.Log(" + logMsg + "\")");
    }
};

iSASObject.prototype.setError = function (errcode) {
    this.iSASInOut.Output = {};
    this.iSASInOut.Output.ErrorCode = errcode.toString(16).toUpperCase();
    this.iSASInOut.Output.ErrorMessage = getCooconErrMsg(errcode.toString(16).toUpperCase());
};

iSASObject.prototype.checkError = function () {
    this.errorMsg = StrGrab(httpRequest.result, "\"errMsg\":\"", "\",\"");
    if(this.errorMsg != ""){
        this.log("Juryu ErrorLog [" + this.errorMsg + "]");
        return true;
    } else {
        return false;
    }
};

///////////////////////////////////////////////////////////////////////////////
var 법인카드 = function() {
    console.log(BankName + " 법인카드 생성자 호출");
    this.errorMsg       = "";
    this.host           = "https://ebank.busanbank.co.kr";
    this.url            = "";
    this.turl           = "https://ebank.busanbank.co.kr/product/install/INISAFE/plugin/tools/Time.jsp";
    this.rurl           = "https://ebank.busanbank.co.kr/product/install/INISAFE/plugin/tools/Random.jsp";
    this.logourl        = "https://ebank.busanbank.co.kr/product/install/INISAFE/plugin/site/img/busan_plugin.gif";
    this.postData       = "";
    this.cipher         = "SEED-CBC";
    this.bLogIn = false;
};

법인카드.prototype = Object.create(iSASObject.prototype);

법인카드.prototype.onCertLogin = function (input, password) {
    this.log(BankName + " onCertLogin");
    system.setStatus(IBXSTATE_LOGIN, 30);
    
    if (!certManager.findCert(JSON.stringify(input.인증서))) {
        this.log("인증서를 찾을 수 없습니다.");
        this.setError(E_IBX_CERTIFY_NOT_FOUND);
        return E_IBX_CERTIFY_NOT_FOUND;
    } else {
        this.log("인증서 찾음.");
    }

    if (!certManager.verifyPassword(password)) {
        this.log("certManager.verifyPassword 실패");
        this.setError(E_IBX_KEY_ACCOUNT_PASSWORD_1_INVALID);
        return E_IBX_KEY_ACCOUNT_PASSWORD_1_INVALID;
    } else {
        this.log("certManager.verifyPassword 성공");
    }

    // Get Certificate SCert
    this.url = "/product/install/INISAFE/plugin/cw_pref_AX.js";
    if (!httpRequest.get(this.host + this.url)) {
        this.setError(E_IBX_FAILTOGETPAGE);
        return E_IBX_FAILTOGETPAGE;
    }
    this.log("Cert:[" + httpRequest.result + "]");
    
    var SCert;
    SCert = StrGrab(httpRequest.result, 'var SCert = "', '-----END CERTIFICATE-----');
    SCert = SCert.replace(/";\s+SCert\s+\+?=\s+"/g, '')+ '-----END CERTIFICATE-----';
    SCert = StrReplace(SCert, "\\n", "\n");
    this.log("aaaa:[" + SCert + "]");
    certManager.LoadCert(SCert);
   
    this.url = "/ib20/mnu/PEBLIN0020001?NEXT_PAGE=ECBMPG000000000" +
                "&NEXT_PARAMETER=b_page_id%3D%26selectmenuid%3DECBMPG000000000%26ib20.persistent.lang.code%3D" +
                "&ib20_redirect_org_mnu=ECBMPG000000000";
    if(httpRequest.get(this.host + this.url) == false){
        this.setError(E_IBX_FAILTOGETPAGE);
        return E_IBX_FAILTOGETPAGE;
    }
    
    // Get PKCS7SignedData
    var TimeURL = "https://ebank.busanbank.co.kr/product/install/INISAFE/extension/common/tools/Random.jsp?";
    var pkcs7 = certManager.PKCS7SignData("dummy=dummy", password);
    this.log("pkcs7:[" + pkcs7 + "]");

    this.postData = "action_type=mnu";
    this.postData += "&ib20_action=/ib20/mnu/PEBLIN0020001";
    this.postData += "&ib20_wc="+ httpRequest.URLEncodeAll("ECBCMN001LGIV00M:ECBCMN001LGIV10M", "UTF-8");
    this.postData += "&LOGIN_TYPE=1";
    this.postData += "&ipinsideData=";
    this.postData += "&ipinsideNAT=";
    this.postData += "&ipinsideCOMM=";
    this.postData += "&IPINSIDE_TRX_CODE=2000000101";
    this.postData += "&formelement=on";
    this.postData += "&PKCS7SignedData=" + httpRequest.URLEncodeAll(pkcs7, "UTF-8");
    
    var iniPluginData = certManager.MakeINIpluginData(11, this.postData, password, TimeURL);
    this.log("iniPluginData:[" + iniPluginData + "]");

    pkcs7 = httpRequest.URLEncodeAll(pkcs7, "UTF-8");
    pkcs7 = StrReplace(pkcs7, "%0a", "%0D%0A");
    
    this.postData = "action_type=mnu";
    this.postData += "&ib20_action=" + httpRequest.URLEncodeAll("/ib20/mnu/PEBLIN0020001", "UTF-8");
    this.postData += "&ib20_wc="     + httpRequest.URLEncodeAll("ECBCMN001LGIV00M:ECBCMN001LGIV10M", "UTF-8");
    this.postData += "&LOGIN_TYPE=1";
    this.postData += "&ipinsideData=";
    this.postData += "&ipinsideNAT=";
    this.postData += "&ipinsideCOMM=";
    this.postData += "&IPINSIDE_TRX_CODE=2000000101";
    this.postData += "&formelement=on";
    this.postData += "&PKCS7SignedData="+ pkcs7;
    this.postData += "&INIpluginData=" + StrReplace(httpRequest.URLEncodeAll(iniPluginData, "UTF-8"), "/", "%2F");
    this.postData += "&NEXT_PAGE=ECBMPG000000000";
    this.postData += "&NEXT_PARAMETER=" + httpRequest.URLEncodeAll("b_page_id=&selectmenuid=ECBMPG000000000&ib20.persistent.lang.code=","UTF-8") ;
    this.log("loginPostData:[" + this.postData + "]");
    
    // 로그인 페이지 처리....
    system.setStatus(IBXSTATE_LOGIN, 45);
    this.url = "/ib20/mnu/PEBLIN0020001";
    if(httpRequest.post(this.host + this.url, this.postData) == false){
        this.setError(E_IBX_FAILTOGETPAGE);
        return E_IBX_FAILTOGETPAGE;
    }
    this.log("httpReq3:[" + httpRequest.result + "]");

    var rslt3 = httpRequest.result;
    
    // 에러처리
    if ((rslt3.indexOf("타 공인인증서를 사용하십니다") >= 0) || 
        (rslt3.indexOf("사용자등록을 하십시요") >= 0) || 
        (rslt3.indexOf("등록되지 않은 공인인증서입니다") >= 0) || 
        (rslt3.indexOf("타행인증서가 등록되지 않았습니다.") >= 0) || 
        (rslt3.indexOf("먼저 타행 인증서를 등록바랍니다.") >= 0) ||
        (rslt3.indexOf("제출하신 인증서는 등록되지 않은 인증서입니다.") >= 0) ||
        (rslt3.indexOf("BSIB110079") >= 0)){
        this.setError(E_IBX_CERTIFY_NOT_REGISTER);
        return E_IBX_CERTIFY_NOT_REGISTER;
    }
    if ((rslt3.indexOf("로그인시 서명값 데이타가 일치하지 않습니다") >= 0) || 
        (rslt3.indexOf("999 spConnCheckGI") >= 0) || 
        (rslt3.indexOf("인증서 검증 중 오류가 발생하였습니다") >= 0)){
        this.setError(E_IBX_CERTIFY_UNKNOWN);
        return E_IBX_CERTIFY_UNKNOWN;
    }
    if ((rslt3.indexOf("인터넷뱅킹 이용신청 후 사용바랍니다") >= 0) ||
        (rslt3.indexOf("미등록된 사용자입니다") >= 0) || 
        (rslt3.indexOf("가까운 영업점에서 개인인터넷뱅킹 가입신청 후 사용바랍니다") >= 0) || 
        (rslt3.indexOf("인터넷뱅킹 사용자등록부터 하세요") >= 0)) {
        this.setError(E_IBX_KEY_ACCOUNT_INFO_1_INVALID);
        return E_IBX_KEY_ACCOUNT_INFO_1_INVALID;
    }
    if ((rslt3.indexOf("<b>[M055]</b>") >= 0) || 
        (rslt3.indexOf("기업인터넷뱅킹 고객이십니다") >= 0) || 
        (rslt3.indexOf("사용자정보가 존재하지 않습니다") >= 0) || 
        (rslt3.indexOf("기업인터넷뱅킹에서 발급받은 인증서 정보가 있습니다") >= 0)) {
        this.setError(E_IBX_CUSTOMER_CLASS_INVALID);
        return E_IBX_CUSTOMER_CLASS_INVALID;
    }
    if ((rslt3.indexOf("[A001]") >= 0) || 
        (rslt3.indexOf("폐기된 인증서 입니다") >= 0) ||
        (rslt3.indexOf("사용할 수 없는 인증서 입니다") >= 0)) {
        this.setError(E_IBX_CERTIFY_DISUSE);
        return E_IBX_CERTIFY_DISUSE;
    }
    if (rslt3.indexOf("유효기간이 지난 인증서입니다") >= 0) {
        this.setError(E_IBX_CERTIFY_EXCEED_DATE);
        return E_IBX_CERTIFY_EXCEED_DATE;
    }
    if (rslt3.indexOf("서비스 가능시간이 아닙니다") >= 0) {
        this.setError(E_IBX_SERVICE_NOTIME);
        return E_IBX_SERVICE_NOTIME;
    }
    if ((rslt3.indexOf("서버 오류가 있습니다") >= 0) || 
        (rslt3.indexOf("시스템 장애가 발생하였습니다") >= 0) || 
        (rslt3.indexOf("상호연동인증센터 통신실패") >= 0) || 
        (rslt3.indexOf("통신장애가 발생") >= 0)) {
        this.setError(E_IBX_SITE_INTERNAL);
        return E_IBX_SITE_INTERNAL;
    }
    if (rslt3.indexOf("연결된 구성원으로부터 응답이 없어 연결하지 못했거나, 호스트로부터 응답이 없어 연결이 끊어졌습니다") >= 0) {
        this.setError(E_IBX_SERVICE_MISC);
        return E_IBX_SERVICE_MISC;
    }
    if ((rslt3.indexOf("해지된　고객  ID입니다") >= 0) || 
        (rslt3.indexOf("１년이내　거래가없어　고객님의  ID가　사용정지　되었읍니다") >= 0)) {
        this.setError(E_IBX_KEY_ACCOUNT_INFO_1_DENIED);
        return E_IBX_KEY_ACCOUNT_INFO_1_DENIED;
    }
    if ((rslt3.indexOf("[0003]") >= 0) || 
        (rslt3.indexOf("이미로그인된 사용자ID입니다") >= 0)) {
        this.setError(E_IBX_SESSION_REMAINED);
        return E_IBX_SESSION_REMAINED;
    }
    if (rslt3.indexOf("장시간 사용하지않아 접속이 종료되었습니다") >= 0) {
        this.setError(E_IBX_SESSION_CLOSED);
        return E_IBX_SESSION_CLOSED;
    }
    this.bLogIn = true;
    return S_IBX_OK;  
};

법인카드.prototype.로그인 = function (aInput) {
    this.log(BankName + " 로그인 호출[" + aInput + "]");
    this.bLogIn = false;
    try{
        system.setStatus(IBXSTATE_CHECKPARAM, 10);

        var input = dec(aInput.Input);
        if (input.인증서 && input.인증서.비밀번호) this.iSASInOut.Input.인증서.비밀번호 = input.인증서.비밀번호.replace(/./g, '*');

        if (input.로그인방식 == "CERT") {
            this.log("인증서 로그인");
            var certpath = input.인증서.이름;
            var password = input.인증서.비밀번호;
            
            if (!password) {
                this.setError(E_IBX_KEY_ACCOUNT_PASSWORD_1_NOTENTER);
                return E_IBX_KEY_ACCOUNT_PASSWORD_1_NOTENTER;
            }
            if (!certpath) {
                // PC 모듈 전환용 
                if (!input.인증서.인증서명){
                    this.setError(E_IBX_KEY_ACCOUNT_INFO_1_NOTENTER);
                    return E_IBX_KEY_ACCOUNT_INFO_1_NOTENTER;
                }
            }
            var rtn = this.onCertLogin(input, password);
            if (rtn != S_IBX_OK) {
                return rtn;
            }
        } else {
            this.log("알수 없는 로그인 타입");
            this.setError(E_IBX_LOGIN_TYPE_ERROR);
            return E_IBX_LOGIN_TYPE_ERROR;
        }

        this.bLogIn = true;
        this.iSASInOut.Output = {};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
        return S_IBX_OK;
    } catch(e) {
        this.log("exception " + e.message);
        this.setError(E_IBX_UNKNOWN);
        return E_IBX_UNKNOWN;
    } finally {
        system.setStatus(IBXSTATE_DONE, 100);
        this.log(BankName + " 로그인 finally");
    }
};

법인카드.prototype.보유카드조회 = function (aInput) {
    this.log(BankName + " 보유카드조회 호출[" + aInput + "]");
    try{
		if (this.bLogIn != true) {
			this.log("로그인 후 실행해주세요.");
			this.setError(E_IBX_AFTER_LOGIN_SERVICE);			
			return E_IBX_AFTER_LOGIN_SERVICE;
        }
        
        var input = dec(aInput.Input);
        var 조회구분 = input.조회구분;            
		if (조회구분) 조회구분 = 조회구분.toUpperCase();

        if ( 조회구분 && ( 조회구분.toUpperCase() !== 'F') )
        {
            this.setError(E_IBX_A124X1_INQUIRY_TYPE_INVALID);
            return E_IBX_A124X1_INQUIRY_TYPE_INVALID;
        } 
        
        // 카드 > 조회 > 보유카드현황
        system.setStatus(IBXSTATE_ENTER, 50);
        this.url = "/ib20/mnu/ECBCRD001002001";
        this.postData = "selectmenuid=ECBCRD001002001&ib20.persistent.lang.code=&b_page_id=";
        if (!httpRequest.post(this.host + this.url, this.postData)) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        var rslt = httpRequest.result;
        this.log("보유카드현황: [" + rslt + "]");

        if (rslt.indexOf(">로그아웃<") == -1 || 
            rslt.indexOf('ib20_redirect_org_mnu=ECBCRD001003003">here') > -1) {
            this.log("중복 로그인");
            this.setError(E_IBX_AFTER_LOGIN_SERVICE);
            return E_IBX_AFTER_LOGIN_SERVICE;
        }
        
        if(rslt.indexOf("<title>보유카드현황>") < 0 ){
            this.setError(E_IBX_SITE_INVALID);
            return E_IBX_SITE_INVALID;
        }

        var _table = StrGrab(rslt, "var resultData", "');");
        if(_table==""){
            this.setError(E_IBX_SITE_INVALID);
            return E_IBX_SITE_INVALID;
        }
        var jsonObj = StrGrab(_table, "JSON.parse('", "");
        if(jsonObj.indexOf('"CRD12RMB40600350V00_REC1_FMT":[]') >= 0 ){
            this.setError(I_IBX_RESULT_NOTPRESENT);
            return I_IBX_RESULT_NOTPRESENT;
        }
        try {
            jsonObj = JSON.parse(jsonObj);
        } catch(e) {
            this.setError(E_IBX_SITE_INVALID +2);
            return E_IBX_SITE_INVALID + 2;
        }
        
        // 카드 > 조회 > 보유카드현황 (결과)
        system.setStatus(IBXSTATE_EXECUTE, 80);
        var 보유카드조회 = [];
        for(var i = 0; i < jsonObj.CRD12RMB40600350V00_REC1_FMT.length; i++) {
            var jsonArray = jsonObj.CRD12RMB40600350V00_REC1_FMT[i];
            var item = {};
            
            item.카드명 = jsonArray.CARD_NM;
            item.회원사 = "";
            
            item.카드번호 = jsonArray.CDNO_FMT;
            item.카드번호 = StrReplace(item.카드번호, "*", "");
            item.카드번호 = StrReplace(item.카드번호, "-", "");
            
            item.결제일 = jsonArray.STLDT_FMT;
            item.결제일 = StrReplace(item.결제일, "일", "");
            
            item.당월결제액 = "";
            
            item.카드번호형식 = jsonArray.CDNO_FMT;
            item.카드번호형식 = StrReplace(item.카드번호형식, "-", "");
            item.카드번호형식 = GetCardNoType(item.카드번호형식);

            if ( 조회구분 === 'F' )
            {
                item.결제일 = '';
                item.카드번호 = jsonArray.CDNO;
                item.카드번호형식 = GetCardNoType(item.카드번호);
            }
    
            보유카드조회.push(item);
        }

        this.iSASInOut.Output = {};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
        this.iSASInOut.Output.Result.계정권한 = '';
        this.iSASInOut.Output.Result.보유카드조회 = 보유카드조회;
        
        return S_IBX_OK;
    } catch(e) {
        this.log("exception " + e.message);
        this.setError(E_IBX_UNKNOWN);
        return E_IBX_UNKNOWN;
    } finally {
        system.setStatus(IBXSTATE_DONE, 100);
        this.log(BankName + " 보유카드조회 finally");
    }
};

법인카드.prototype.승인내역 = function (aInput) {
    this.log(BankName + " 승인내역 호출[" + aInput + "][" + moduleVersion + "]");
    try{
		if (this.bLogIn != true) {
			this.log("로그인 후 실행해주세요.");
			this.setError(E_IBX_AFTER_LOGIN_SERVICE);			
			return E_IBX_AFTER_LOGIN_SERVICE;
		}

        var input = dec(aInput.Input);
        var 조회구분 = input.조회구분;
        var 카드번호 = input.카드번호;
        var 조회시작일 = input.조회시작일;
        var 조회종료일 = input.조회종료일;
        var 페이지별건수 = input.페이지별건수;
        
        system.setStatus(IBXSTATE_CHECKPARAM, 10);
        if (!조회구분) {
            this.setError(E_IBX_A124X1_INQUIRY_TYPE_NOTENTER);
            return E_IBX_A124X1_INQUIRY_TYPE_NOTENTER;
        }
        if (!/^[12]$/.test(조회구분)) {
            this.setError(E_IBX_A124X1_INQUIRY_TYPE_INVALID);
            return E_IBX_A124X1_INQUIRY_TYPE_INVALID;
        }
        if (조회구분 == "2"){
            if (!카드번호) {
                this.setError(E_IBX_CARD_NO_NOTENTER);
                return E_IBX_CARD_NO_NOTENTER;
            }
            if (!/^\d{16}$/.test(카드번호)) {
                this.setError(E_IBX_CARD_NO_INVALID);
                return E_IBX_CARD_NO_INVALID;
            }
        }
        if (!조회시작일) {
            this.setError(E_IBX_ENUM_DATE_BEGIN_NOTENTER);
            return E_IBX_ENUM_DATE_BEGIN_NOTENTER;
        }
        if (!조회종료일) {
            this.setError(E_IBX_ENUM_DATE_END_NOTENTER);
            return E_IBX_ENUM_DATE_END_NOTENTER;
        }
        if (!/^\d{8}$/.test(조회시작일)) {
            this.setError(E_IBX_ENUM_DATE_BEGIN_INVALID);
            return E_IBX_ENUM_DATE_BEGIN_INVALID;
        }
        if (조회시작일 != (new Date(조회시작일.replace(/^(\d{4})(\d{2})(\d{2})$/, "$2/$3/$1")).yyyymmdd())) {
            this.setError(E_IBX_ENUM_DATE_BEGIN_INVALID);
            return E_IBX_ENUM_DATE_BEGIN_INVALID;
        }
        if (!/^\d{8}$/.test(조회종료일)) {
            this.setError(E_IBX_ENUM_DATE_END_INVALID);
            return E_IBX_ENUM_DATE_END_INVALID;
        }
        if (조회종료일 != (new Date(조회종료일.replace(/^(\d{4})(\d{2})(\d{2})$/, "$2/$3/$1")).yyyymmdd())) {
            this.setError(E_IBX_ENUM_DATE_END_INVALID);
            return E_IBX_ENUM_DATE_END_INVALID;
        }
        if (parseInt(조회시작일) > parseInt(조회종료일)) {
            this.setError(E_IBX_ENUM_DATE_BEGIN_GREATTHENEND);
            return E_IBX_ENUM_DATE_BEGIN_GREATTHENEND;
        }
        if (parseInt(조회종료일) > parseInt(new Date().yyyymmdd())) {
            this.setError(E_IBX_ENUM_DATE_END_FUTURE);
            return E_IBX_ENUM_DATE_END_FUTURE;
        }

        var 제한된시작일 = new Date();
        제한된시작일.setMonth(제한된시작일.getMonth() - 8);
        제한된시작일.setDate(제한된시작일.getDate() + 1);
        if (parseInt(조회시작일) < parseInt(제한된시작일.yyyymmdd())) {
            this.setError(E_IBX_ENUM_DATE_BEGIN_DENIED);
            return E_IBX_ENUM_DATE_BEGIN_DENIED;
        }
        
        // 카드 > 조회 > 이용내역조회 > 이용내역조회
        system.setStatus(IBXSTATE_ENTER, 50);
        this.url = "/ib20/mnu/ECBCRD001003002";
        this.postData = "selectmenuid=ECBCRD001003002&ib20.persistent.lang.code=&hid_key_data=&hid_enc_data=&b_page_id=";
        if (!httpRequest.post(this.host + this.url, this.postData)) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        var rslt = httpRequest.result;
        this.log("이용내역조회: [" + rslt + "]");

        if (rslt.indexOf(">로그아웃<") == -1 || 
            rslt.indexOf('ib20_redirect_org_mnu=ECBCRD001003003">here') > -1) {
            this.log("중복 로그인");
            this.setError(E_IBX_AFTER_LOGIN_SERVICE);
            return E_IBX_AFTER_LOGIN_SERVICE;
        }
        
        var 카드선택 = StrGrab(rslt, "카드선택</th>", "</select>");

        if (카드선택.indexOf("보유카드가 없습니다") > -1) {
            this.setError(E_IBX_CARD_NOT_FOUND);
            return E_IBX_CARD_NOT_FOUND;
        }

        if (조회구분 == "2"){
            if (카드선택.indexOf("value=\"" + 카드번호 + "\"") < 0) {
                this.setError(E_IBX_CARD_NO_INVALID);
                return E_IBX_CARD_NO_INVALID;
            }
        }
        
        this.iSASInOut.Output = {};
		this.iSASInOut.Output.ErrorCode = "00000000";
		this.iSASInOut.Output.ErrorMessage = "";
		this.iSASInOut.Output.Result = {};

        // 결과처리시 입력된 "페이지별건수"씩 system.setResult 호출.
        var sPageNumber = 1;

        var 승인내역 = [];
        for (var bLocation = 1; bLocation <= 2; bLocation++) { // Loop for Location (1: 국내| 2 :해외)
            system.setStatus(IBXSTATE_EXECUTE, 70);
            this.log("bLocation:[" + bLocation + "]");
            
            // 카드 > 조회 > 이용내역조회 > 이용내역조회 (거래조회)
            this.url = "/ib20/wgt/ECBCRD200INQV1AM?ib20_cur_mnu=ECBCRD001003002";
            this.postData = "action_type=" + "wgt";
            this.postData+= "&ib20_action=" + "%2Fib20%2Fwgt%2FECBCRD200INQV1AM";
            this.postData+= "&ib20_cur_mnu=" + "ECBCRD001003002";
            this.postData+= "&ib20_cur_wgt=" + "ECBCRD200INQV1AM";
            this.postData+= "&ib20_change_wgt=";
            this.postData+= "&selCDNO=" + (조회구분=="2"?카드번호:"");
            this.postData+= "&from=" + 조회시작일;
            this.postData+= "&to=" + 조회종료일;
            this.postData+= "&APVL_DVCD_0=04";
            this.postData+= "&INQ_DV_0="  + (bLocation==1?"1":"2");
            this.postData+= "&GRAM_COTI_INFO_CNTN=";
            this.postData+= "&searchFlag=Y";
            this.postData+= "&VIEW_FLAG=Y";
            this.postData+= "&CDNO=" + (조회구분=="2"?카드번호:"");
            this.postData+= "&APVL_DVCD=" + "04";
            this.postData+= "&INQ_DV=" + (bLocation==1?"1":"2");
            this.postData+= "&b_page_id=";
            if (!httpRequest.post(this.host + this.url, this.postData)) {
                this.setError(E_IBX_FAILTOGETPAGE);
                return E_IBX_FAILTOGETPAGE;
            }
            rslt = httpRequest.result;
            this.log("거래조회 " + bLocation + ": [" + rslt + "]");
            
            if (rslt.indexOf('CURRENT_WIDGET_NAME="') < 0) {
                this.setError(E_IBX_SESSION_CLOSED);
                return E_IBX_SESSION_CLOSED;
            }

            var _table = StrGrab(rslt, "var resultData", "');");
            if(_table==""){
                this.setError(E_IBX_SITE_INVALID);
                return E_IBX_SITE_INVALID;
            }
            var jsonObj = StrGrab(_table, "JSON.parse('", "");
            try {
                jsonObj = JSON.parse(jsonObj);
            } catch(e) {
                this.setError(E_IBX_SITE_INVALID);
                return E_IBX_SITE_INVALID;
            }
            
            // 카드 > 조회 > 보유카드현황 (결과)            
            while (true) { // loop next page
                system.setStatus(IBXSTATE_EXECUTE, 80);
                for(var i=0; i<jsonObj.CRD12RAZ40010101V00_REC1_FMT.length;i++) {
                    var jsonArray = jsonObj.CRD12RAZ40010101V00_REC1_FMT[i];
                    var item = {};
                    
                    item.승인일자 = StrTrim(jsonArray.BC_APVL_DT);
                    item.승인시간 = StrTrim(jsonArray.BC_APVL_HR);
                    item.승인번호 = StrTrim(jsonArray.APRNO_FMT);
                    if (item.승인번호 == "") {continue;}
                    
                    item.카드종류 = "";
                    
                    item.카드번호 = jsonArray.CDNO_FMT;
                    item.카드번호 = StrGrab(item.카드번호, "", "</br>");
                    item.카드번호 = StrReplace(item.카드번호, "-", "");
                    item.카드번호 = StrTrim(StrReplace(item.카드번호, "*", ""));
                    
                    item.가맹점명 = jsonArray.USE_PLCE_NM_FMT;
                    item.가맹점명 = item.가맹점명.replace(/\(\d{1,5}-\d{1,5}-\d{1,5}\)/g, "");
                    item.가맹점명 = StrTrim(item.가맹점명);
                    
                    item.매출종류 = StrTrim(jsonArray.DV_NM);
                    item.매출종류 = (item.매출종류 == "일시불"? "1":
                                   (item.매출종류 == "할부"  ? "2":"0"));
                    
                    item.할부기간 = StrTrim(jsonArray.ISTM_PRID_FMT);
                    if (!item.할부기간) { item.할부기간 = "0" }
                    
                    item.승인금액 = jsonArray.BC_NTWK_APVL_AMT_FMT;
                    item.승인금액 = StrTrim(StrReplace(item.승인금액, ",", ""));

                    item.취소년월일 = StrTrim(jsonArray.BC_APVL_CANDT_FMT);
                    
                    item.결제예정일 = "";

                    item.매입상태 = jsonArray.SALE_RCP_YN;
                    
                    // Location Search Type
                    if (bLocation == 1){
                        this.url = "/ib20/wgt/ECBCRD200INQV1AP?ib20_cur_mnu=ECBCRD001003002";
                        this.postData = "BC_NTWK_MCNO=" + jsonArray.BC_NTWK_MCNO;
                        this.postData+= "&USE_PLCE_NM_FMT=" + httpRequest.URLEncodeAll(jsonArray.USE_PLCE_NM_FMT , "UTF-8");
                        this.postData+= "&load_layer=Y";
                        this.postData+= "&action_type=act";
                        this.postData+= "&ib20_action=" + httpRequest.URLEncodeAll(this.url, "UTF-8");
                        this.postData+= "&b_page_id=";
                        if (!httpRequest.post(this.host + this.url, this.postData)) {
                            this.setError(E_IBX_FAILTOGETPAGE);
                            return E_IBX_FAILTOGETPAGE;
                        }
                        if (httpRequest.result.indexOf('CURRENT_WIDGET_NAME="') < 0) {
                            this.setError(E_IBX_SESSION_CLOSED);
                            return E_IBX_SESSION_CLOSED;
                        }
                        item.가맹점코드 = StrGrab(StrGrab(httpRequest.result, "가맹점번호</th>", "</tr>"), "<td>", "</td>");
                        
                        item.가맹점사업자번호 = jsonArray.USE_PLCE_NM_FMT;
                        item.가맹점사업자번호 = item.가맹점사업자번호.replace(/.*?\((\d{1,5})-(\d{1,5})-(\d{1,5})\).*/g, "$1$2$3");
                        item.가맹점사업자번호 = StrTrim(item.가맹점사업자번호);
                        
                        item.가맹점업종 = StrGrab(StrGrab(httpRequest.result, "업종</th>", "</tr>"), "<td>", "</td>");
                        item.국내외구분 = "1";
                    } else {
                        item.가맹점사업자번호 = "";
                        item.가맹점코드 = "";
                        item.가맹점업종 = "";
                        item.국내외구분 = "2";
                    }
                    item.통화코드 = "";
                    
                    item.카드번호형식 = jsonArray.CDNO_FMT;
                    item.카드번호형식 = StrGrab(item.카드번호형식, "", "</br>");
                    item.카드번호형식 = StrTrim(StrReplace(item.카드번호형식, "-", ""));
                    item.카드번호형식 = GetCardNoType(item.카드번호형식);
            
                    승인내역.push(item);

                    if (페이지별건수 && Number(페이지별건수)) {
                        if (승인내역.length == parseInt(페이지별건수)) {
                            this.iSASInOut.Output.Result = {};
                            this.iSASInOut.Output.Result.페이지번호 = "" + sPageNumber;
                            this.iSASInOut.Output.Result.내역정렬순서 = "0"; // 0 최근거래순, 1 과거거래순
                            this.iSASInOut.Output.Result.승인내역 = 승인내역;
        
                            system.setResult(sPageNumber, JSON.stringify(this.iSASInOut.Output.Result));
                            승인내역 = [];
                            sPageNumber++;
                        }
                    }
                } // End Table Row

                var GRAM_COTI_INFO_CNTN = '';

                // 다음페이지 처리.....
                if (rslt.indexOf('"NEXT_PGE_REU_CD_YN":"') < 0){
                    //첫번째 페이지는 html형식.
                    var strBlock = StrGrab(rslt, "id=\"btnArea\"", ">더보기<");
                    if(strBlock.indexOf("display:none")> 0) {break;}

                    GRAM_COTI_INFO_CNTN = StrGrab(StrGrab(strBlock, "\"GRAM_COTI_INFO_CNTN\"", ">"), "value=\"", "\"");
                    if (GRAM_COTI_INFO_CNTN == ""){break;}
                }
                else {
                    //두번째 페이지 부터는 json형식.
                    if( StrGrab(rslt, '"NEXT_PGE_REU_CD_YN":"', '"') == '1' ) {break;}
                    GRAM_COTI_INFO_CNTN = StrGrab(rslt, '"GRAM_COTI_INFO_CNTN":"', '"');
                    if (GRAM_COTI_INFO_CNTN == ""){break;}
                }
                
                this.url = "/ib20/act/ECBCRD200INQA1AM?ib20_cur_mnu=ECBCRD001003002&ib20_cur_wgt=ECBCRD200INQV1AM";
                this.postData = "action_type=" + "act";
                this.postData+= "&ib20_action=" + "%2Fib20%2Fact%2FECBCRD200INQA1AM";
                this.postData+= "&ib20_cur_mnu=" + "ECBCRD001003002";
                this.postData+= "&ib20_cur_wgt=" + "ECBCRD200INQV1AM";
                this.postData+= "&ib20_change_wgt=";
                this.postData+= "&selCDNO=" + (조회구분=="2"?카드번호:"");
                this.postData+= "&from=" + 조회시작일;
                this.postData+= "&to=" + 조회종료일;
                this.postData+= "&APVL_DVCD_0=04";
                this.postData+= "&INQ_DV_0=" + (bLocation==1?"1":"2");
                this.postData+= "&GRAM_COTI_INFO_CNTN=" + GRAM_COTI_INFO_CNTN;
                this.postData+= "&searchFlag=Y";
                this.postData+= "&VIEW_FLAG=Y";
                this.postData+= "&CDNO=" + (조회구분=="2"?카드번호:"");
                this.postData+= "&APVL_DVCD=04";
                this.postData+= "&INQ_DV=" + (bLocation==1?"1":"2");
                this.postData+= "&b_page_id=";
                if (!httpRequest.post(this.host + this.url, this.postData)) {
                    this.setError(E_IBX_FAILTOGETPAGE);
                    return E_IBX_FAILTOGETPAGE;
                }
                rslt = httpRequest.result;
                rslt = httpRequest.URLDecode(rslt, "UTF-8");
                this.log("다음페이지 처리 URLDecoded:[" + rslt + "]");

                jsonObj = rslt;
                try {
                    jsonObj = JSON.parse(jsonObj);
                    jsonObj = jsonObj._msg_;
                    jsonObj = jsonObj._body_;
                } catch(e) {
                    this.setError(E_IBX_SITE_INVALID + 4);
                    return E_IBX_SITE_INVALID + 4;
                }
            } // End Next Page
        } // End Location
        
        if (!페이지별건수 && 승인내역.length == 0) {
            this.setError(I_IBX_RESULT_NOTPRESENT);
            return I_IBX_RESULT_NOTPRESENT;
        }

        // "페이지별건수" 수만큼 차지 않거나 남은 내역 있을 경우
		if (페이지별건수 && Number(페이지별건수)) {
			if (승인내역.length > 0) {
				this.iSASInOut.Output.Result = {};
				this.iSASInOut.Output.Result.페이지번호 = '' + sPageNumber;
				this.iSASInOut.Output.Result.내역정렬순서 = '0';
				this.iSASInOut.Output.Result.승인내역 = 승인내역;
			}
		} else {
			this.iSASInOut.Output.Result = {};
			this.iSASInOut.Output.Result.내역정렬순서 = '0';
			this.iSASInOut.Output.Result.승인내역 = 승인내역;
		}

        return S_IBX_OK;
    } catch(e) {
        this.log("exception " + e.message);
        this.setError(E_IBX_UNKNOWN);
        return E_IBX_UNKNOWN;
    } finally {
        system.setStatus(IBXSTATE_DONE, 100);
        this.log(BankName + " 승인내역 finally");
    }
};

법인카드.prototype.청구내역 = function (aInput) {
    this.log(BankName + " 청구내역 호출[" + aInput + "][" + moduleVersion + "]");
    try{
		if (this.bLogIn != true) {
			this.log("로그인 후 실행해주세요.");
			this.setError(E_IBX_AFTER_LOGIN_SERVICE);			
			return E_IBX_AFTER_LOGIN_SERVICE;
		}

        var input = dec(aInput.Input);
        if (input.카드비밀번호) this.iSASInOut.Input.카드비밀번호 = input.카드비밀번호.replace(/./g, '*');

        var 조회구분 = input.조회구분;
        var 카드번호 = input.카드번호;
        var 결제일 = input.결제일;
        var 페이지별건수 = input.페이지별건수;

        system.setStatus(IBXSTATE_CHECKPARAM, 10);
        if (조회구분 && 조회구분 != "2") {
            this.setError(E_IBX_A124X1_INQUIRY_TYPE_INVALID);
            return E_IBX_A124X1_INQUIRY_TYPE_INVALID;
        }
        if (!카드번호) {
            this.setError(E_IBX_CARD_NO_NOTENTER);
            return E_IBX_CARD_NO_NOTENTER;
        }
        if (!/^\d{16}$/.test(카드번호)) {
            this.setError(E_IBX_CARD_NO_INVALID);
            return E_IBX_CARD_NO_INVALID;
        }
        if (!input.카드비밀번호) {
            this.setError(E_IBX_CARD_PASSWORD_NOTENTER);
            return E_IBX_CARD_PASSWORD_NOTENTER;
        }
        // SASSecureData 적용
        var 카드비밀번호 = sas.SecureData.create(input.카드비밀번호);
        if (카드비밀번호.isSecurData()) {
            this.log('카드비밀번호 SASSecurData 포맷!');
        } else {
            this.log('카드비밀번호 일반 포맷!');
        }
        if (!/^\d{4}$/.test(카드비밀번호.getPlainText())) {
            this.setError(E_IBX_CARD_PASSWORD_INVALID);
            return E_IBX_CARD_PASSWORD_INVALID;
        }

        if (!결제일) {
            this.setError(E_IBX_DATE_PAYMENT_NOTENTER);
            return E_IBX_DATE_PAYMENT_NOTENTER;
        }
        if (!/^\d{8}$/.test(결제일)) {
            this.setError(E_IBX_DATE_PAYMENT_INVALID);
            return E_IBX_DATE_PAYMENT_INVALID;
        }
        if (결제일 != (new Date(결제일.replace(/^(\d{4})(\d{2})(\d{2})$/, "$2/$3/$1")).yyyymmdd())) {
            this.setError(E_IBX_DATE_PAYMENT_INVALID);
            return E_IBX_DATE_PAYMENT_INVALID;
        }
        if (parseInt(결제일.substr(0, 6)) > parseInt(js_yyyy_mm_dd().substr(0, 6))) {
            this.setError(E_IBX_DATE_PAYMENT_INVALID);
            return E_IBX_DATE_PAYMENT_INVALID;
        }
        
        var 제한된결제일 = new Date();
        제한된결제일.setMonth(제한된결제일.getMonth() - 36);
        제한된결제일.setDate(제한된결제일.getDate() + 1);
        if (parseInt(결제일) < parseInt(제한된결제일.yyyymmdd())) {
            this.setError(E_IBX_DATE_PAYMENT_INVALID);
            return E_IBX_DATE_PAYMENT_INVALID;
        }

        // 카드 > 조회 > 이용내역조회 > 이용대금명세서조회
        system.setStatus(IBXSTATE_ENTER, 30);
        this.url = "/ib20/mnu/ECBCRD001003001";
        this.postData = "selectmenuid=ECBCRD001003001&ib20.persistent.lang.code=&hid_key_data=&hid_enc_data=&b_page_id=";
        if (!httpRequest.post(this.host + this.url, this.postData)) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        var rslt = httpRequest.result;
        this.log("이용대금명세서조회: [" + rslt + "]");

        if (rslt.indexOf(">로그아웃<") == -1 || 
            rslt.indexOf('ib20_redirect_org_mnu=ECBCRD001003003">here') > -1) {
            this.log("중복 로그인");
            this.setError(E_IBX_AFTER_LOGIN_SERVICE);
            return E_IBX_AFTER_LOGIN_SERVICE;
        }
        
        var 카드선택 = StrGrab(rslt, "카드번호</th>", "</select>");
        if (카드선택.indexOf("value=\"" + 카드번호 + "\"") < 0) {
            this.setError(E_IBX_CARD_NO_INVALID);
            return E_IBX_CARD_NO_INVALID;
        }
        
        // 카드 > 조회 > 이용내역조회 > 이용대금명세서조회 (조회)
        system.setStatus(IBXSTATE_EXECUTE, 70);
        this.url = "/ib20/wgt/ECBCRD198INQV1AM?ib20_cur_mnu=ECBCRD001003001";
        this.postData = "STL_DT_DV=";
        this.postData+= "&lPopupStartMenu=";
        this.postData+= "&action_type=wgt";
        this.postData+= "&ib20_action=%2Fib20%2Fwgt%2FECBCRD198INQV1AM";
        this.postData+= "&ib20_cur_mnu=ECBCRD001003001";
        this.postData+= "&ib20_cur_wgt=ECBCRD198INQV1AM";
        this.postData+= "&ib20_change_wgt=";
        this.postData+= "&selCDNO=" + 카드번호;
        this.postData+= "&cdPwd=" + 카드비밀번호.getPlainText();
        this.postData+= "&cdPwd_nfilter_sec=";
        this.postData+= "&pSTLDT=" + 결제일;
        this.postData+= "&GRAM_COTI_INFO_CNTN=";
        this.postData+= "&SEARCH_YN=Y";
        this.postData+= "&STLM_ACNO_selected=";
        this.postData+= "&b_page_id=";
        if (!httpRequest.post(this.host + this.url, this.postData)) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        rslt = httpRequest.result;
        this.log("이용대금명세서조회2: [" + rslt + "]");
        if (rslt.indexOf("error.customer.message") > 0) {
            rslt = StrReplace(httpRequest.URLDecode(rslt, "UTF-8"), '+', ' ');
        }
        if (rslt.indexOf('CURRENT_WIDGET_NAME="') < 0 || 
            rslt.indexOf('이용대금명세서조회>이용내역조회>조회') < 0) {
            this.log("중복 로그인");
            this.setError(E_IBX_SESSION_CLOSED);
            return E_IBX_SESSION_CLOSED;
        }
        if (rslt.indexOf("서비스 가능시간이 아닙니다") > 0){
            this.setError(E_IBX_SERVICE_NOTIME);
            return E_IBX_SERVICE_NOTIME;
        }
        if (rslt.indexOf("비밀번호　오류횟수가　３회　이상입니다") > 0){
            this.setError(E_IBX_CARD_PASSWORD_DENIED);
            return E_IBX_CARD_PASSWORD_DENIED;
        }
        if (rslt.indexOf("비밀번호 [2번째] 오류횟수") > 0){
            this.setError(E_IBX_CARD_PASSWORD_JUSTBEFOREDENY);
            return E_IBX_CARD_PASSWORD_JUSTBEFOREDENY;
        }
        if ((rslt.indexOf("[BECMM01277]에러발생됨") > 0) ||
            (rslt.indexOf("비밀번호 [1번째] 오류횟수") > 0)) {
            this.setError(E_IBX_CARD_PASSWORD_INVALID);
            return E_IBX_CARD_PASSWORD_INVALID;
        } 
        if (rslt.indexOf("카드원장없슴") > 0 ){
            this.setError(E_IBX_CARD_NO_INVALID);
            return E_IBX_CARD_NO_INVALID;
        }
        if (rslt.indexOf("\"error.customer.message\":\"") > 0){
            this.setError(E_IBX_UNKNOWN);
            return E_IBX_UNKNOWN;
        }
        
        var _table = StrGrab(rslt, "var resultData", "');");
        if(_table==""){
            this.setError(E_IBX_SITE_INVALID);
            return E_IBX_SITE_INVALID;
        }
        var jsonObj = StrGrab(_table, "JSON.parse('", "");
        try {
            jsonObj = JSON.parse(jsonObj);
        } catch(e) {
            this.setError(E_IBX_SITE_INVALID);
            return E_IBX_SITE_INVALID;
        }

        system.setStatus(IBXSTATE_RESULT, 90);

        this.iSASInOut.Output = {};
		this.iSASInOut.Output.ErrorCode = "00000000";
		this.iSASInOut.Output.ErrorMessage = "";
		this.iSASInOut.Output.Result = {};

        // 결과처리시 입력된 "페이지별건수"씩 system.setResult 호출.
        var sPageNumber = 1;

        var 청구내역 = [];
        while (true) { // loop next page
            for(var i=0; i<jsonObj.CRD12RBA40380100V00_REC1_FMT.length;i++) {
                var jsonArray = jsonObj.CRD12RBA40380100V00_REC1_FMT[i];
                var item = {};
                
                item.카드번호 = jsonArray.CDNO_FMT;
                item.카드번호 = StrGrab(item.카드번호, "", "<");
                item.카드번호 = StrReplace(item.카드번호, "-", "");
                item.카드번호 = StrReplace(item.카드번호, "*", "");
                
                item.카드종류 = "";
                
                item.결제일 = 결제일.substr(6, 2);
                 
                item.이용일자 = jsonArray.SALE_DT_FMT;
                item.이용일자 = StrReplace(item.이용일자, "-", "");
                
                item.가맹점명 = StrTrim(jsonArray.JOIN_BRNM);
                
                item.할부개월 = StrTrim(jsonArray.ISTM_PRID);
                
                item.입금회차 = "";
                item.이용대금 = "";
                
                item.청구금액 = StrTrim(jsonArray.TOTAL_AMT_FMT);
                item.청구금액 = StrReplace(item.청구금액, ",", "");
                
                item.수수료 = StrTrim(jsonArray.BIL_FE_AMT_FMT);
                item.수수료 = StrReplace(item.수수료, ",", "");
                
                item.결제후잔액 = StrTrim(jsonArray.PYMT_AFT_BAMT_FMT);
                item.결제후잔액 = StrReplace(item.결제후잔액, ",", "");
                
                item.가맹점사업자번호 = "";
                item.가맹점업종 = "";
                
                item.카드번호형식 = jsonArray.CDNO_FMT;
                item.카드번호형식 = StrGrab(item.카드번호형식, "", "<");
                item.카드번호형식 = StrReplace(item.카드번호형식, "-", "");
                item.카드번호형식 = GetCardNoType(item.카드번호형식);
                
                if (!(IsCurrency(item.결제후잔액) && IsCurrency(item.청구금액) && IsCurrency(item.수수료))) {
                    this.setError(E_IBX_CURRENCY_NOT_CONVERT);
                    return E_IBX_CURRENCY_NOT_CONVERT;
                }

                청구내역.push(item);

                if (페이지별건수 && Number(페이지별건수)) {
                    if (청구내역.length == parseInt(페이지별건수)) {
                        this.iSASInOut.Output.Result = {};
                        this.iSASInOut.Output.Result.페이지번호 = "" + sPageNumber;
                        this.iSASInOut.Output.Result.내역정렬순서 = "0"; // 0 최근거래순, 1 과거거래순
                        this.iSASInOut.Output.Result.청구내역 = 청구내역;
    
                        system.setResult(sPageNumber, JSON.stringify(this.iSASInOut.Output.Result));
                        청구내역 = [];
                        sPageNumber++;
                    }
                }

            } // End Table Row

            var strBlock = StrGrab(rslt, "id=\"btnArea\"", ">더보기<");
            if(strBlock.indexOf("display:none")> 0) {
                break;
            }
            else {
                //다음페이지 처리 미확인 오류처리
                this.setError(E_IBX_SITE_INVALID + 2);
                return E_IBX_SITE_INVALID + 2;
            }
        } // End Next Page
        
        if (!페이지별건수 && 청구내역.length == 0) {
            this.setError(I_IBX_RESULT_NOTPRESENT);
            return I_IBX_RESULT_NOTPRESENT;
        }
        var 월청구금액 = StrReplace(StrGrab(StrGrab(rslt, '<td class="tit">합계</td>', '</tr>'),'<td>','<',3),',','');
        if(월청구금액 == "") 월청구금액 = "0";
        if (!(IsCurrency(월청구금액))) {
            this.setError(E_IBX_CURRENCY_NOT_CONVERT);
            return E_IBX_CURRENCY_NOT_CONVERT;
        }
        
        // "페이지별건수" 수만큼 차지 않거나 남은 내역 있을 경우
        if (페이지별건수 && Number(페이지별건수)) {
            if (청구내역.length > 0) {
                this.iSASInOut.Output.Result = {};
                this.iSASInOut.Output.Result.페이지번호 = "" + sPageNumber;
                this.iSASInOut.Output.Result.내역정렬순서 = "0";
                this.iSASInOut.Output.Result.월청구금액 = 월청구금액;
                this.iSASInOut.Output.Result.청구내역 = 청구내역;
            }
        } else {
            this.iSASInOut.Output.Result = {};
            this.iSASInOut.Output.Result.내역정렬순서 = "0";
            this.iSASInOut.Output.Result.월청구금액 = 월청구금액;
            this.iSASInOut.Output.Result.청구내역 = 청구내역;
        }

        return S_IBX_OK;
    } catch(e) {
        this.log("exception " + e.message);
        this.setError(E_IBX_UNKNOWN);
        return E_IBX_UNKNOWN;
    } finally {
        system.setStatus(IBXSTATE_DONE, 100);
        this.log(BankName + " 청구내역 finally");
    }
};

법인카드.prototype.이용한도조회 = function (aInput) {
    this.log(BankName + " 이용한도조회 호출[" + aInput + "]");
    try{
        system.setStatus(IBXSTATE_CHECKPARAM, 10);

        if (!this.bLogIn) {
            this.log("로그인 후 실행해주세요.");            
            this.setError(E_IBX_AFTER_LOGIN_SERVICE);
            return E_IBX_AFTER_LOGIN_SERVICE;
        }

        var input = dec(aInput.Input);
        if (input.카드비밀번호) this.iSASInOut.Input.카드비밀번호 = input.카드비밀번호.replace(/./g, '*');

        var 조회구분 = input.조회구분;
        var 카드번호 = input.카드번호;

        if (조회구분 && 조회구분 != "2") {
            this.setError(E_IBX_A124X1_INQUIRY_TYPE_INVALID);
            return E_IBX_A124X1_INQUIRY_TYPE_INVALID;
        }
        if (!카드번호) {
            this.setError(E_IBX_CARD_NO_NOTENTER);
            return E_IBX_CARD_NO_NOTENTER;
        }
        if (!/^\d{16}$/.test(카드번호)) {
            this.setError(E_IBX_CARD_NO_INVALID);
            return E_IBX_CARD_NO_INVALID;
        }
        if (!input.카드비밀번호) {
            this.setError(E_IBX_CARD_PASSWORD_NOTENTER);
            return E_IBX_CARD_PASSWORD_NOTENTER;
        }
        // SASSecureData 적용
        var 카드비밀번호 = sas.SecureData.create(input.카드비밀번호);
        if (카드비밀번호.isSecurData()) {
            this.log('카드비밀번호 SASSecurData 포맷!');
        } else {
            this.log('카드비밀번호 일반 포맷!');
        }
        if (!/^\d{4}$/.test(카드비밀번호.getPlainText())) {
            this.setError(E_IBX_CARD_PASSWORD_INVALID);
            return E_IBX_CARD_PASSWORD_INVALID;
        }

        // 카드 > 조회 > 이용내역조회 > 이용한도조회
        system.setStatus(IBXSTATE_ENTER, 30);
        this.url = "/ib20/mnu/ECBCRD001003003";
        this.postData = "selectmenuid=ECBCRD001003003&ib20.persistent.lang.code=&hid_key_data=&hid_enc_data=&b_page_id=";
        if (!httpRequest.post(this.host + this.url, this.postData)) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        var rslt = httpRequest.result;
        this.log("이용한도조회: [" + rslt + "]");

        if (rslt.indexOf(">로그아웃<") == -1 || 
            rslt.indexOf('ib20_redirect_org_mnu=ECBCRD001003003">here') > -1) {
            this.log("중복 로그인");
            this.setError(E_IBX_AFTER_LOGIN_SERVICE);
            return E_IBX_AFTER_LOGIN_SERVICE;
        }
        
        var 카드선택 =  StrGrab(rslt, "카드번호</th>", "</select>");
        if (카드선택.indexOf("value=\"" + 카드번호 + "\"") < 0) {
            this.setError(E_IBX_CARD_NO_INVALID);
            return E_IBX_CARD_NO_INVALID;
        }
        
        // 카드 > 조회 > 이용내역조회 > 이용한도조회2
        system.setStatus(IBXSTATE_ENTER, 50);
        this.url = "/ib20/wgt/ECBCRD231UPDV1AM?ib20_cur_mnu=ECBCRD001003003";
        this.postData = "action_type=wgt";
        this.postData+= "&ib20_action=%2Fib20%2Fwgt%2FECBCRD231UPDV1AM";
        this.postData+= "&ib20_cur_mnu=ECBCRD001003003";
        this.postData+= "&ib20_cur_wgt=ECBCRD231UPDV1AM";
        this.postData+= "&ib20_change_wgt=";
        this.postData+= "&selCDNO=" + 카드번호;
        this.postData+= "&cdPwd=" + 카드비밀번호.getPlainText();
        this.postData+= "&cdPwd_nfilter_sec=";
        this.postData+= "&SEARCH_YN=Y";
        this.postData+= "&b_page_id=";
        if (!httpRequest.post(this.host + this.url, this.postData)) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        rslt = httpRequest.result;
        this.log("이용한도조회2: [" + rslt + "]");

        if (rslt.indexOf("error.customer.message") > 0) {
            rslt = StrReplace(httpRequest.URLDecode(rslt, "UTF-8"), '+', ' ');
        }
        if (rslt.indexOf('CURRENT_WIDGET_NAME="') < 0 || 
            rslt.indexOf('카드_이용한도조회>이용한도조회/변경신청>이용내역조회>조회') < 0) {
            this.setError(E_IBX_SESSION_CLOSED);
            return E_IBX_SESSION_CLOSED;
        }
        
        if (rslt.indexOf("서비스 가능시간이 아닙니다") > 0){
            this.setError(E_IBX_SERVICE_NOTIME);
            return E_IBX_SERVICE_NOTIME;
        }
        if (rslt.indexOf("비밀번호　오류횟수가　３회　이상입니다") > 0){
            this.setError(E_IBX_CARD_PASSWORD_DENIED);
            return E_IBX_CARD_PASSWORD_DENIED;
        }
        if (rslt.indexOf("비밀번호 [2번째] 오류횟수") > 0){
            this.setError(E_IBX_CARD_PASSWORD_JUSTBEFOREDENY);
            return E_IBX_CARD_PASSWORD_JUSTBEFOREDENY;
        }
        if ((rslt.indexOf("[BECMM01277]에러발생됨") > 0) ||
            (rslt.indexOf("비밀번호 [1번째] 오류횟수") > 0)) {
            this.setError(E_IBX_CARD_PASSWORD_INVALID);
            return E_IBX_CARD_PASSWORD_INVALID;
        } 
        if (rslt.indexOf("카드원장없슴") > 0){
            this.setError(E_IBX_CARD_NO_INVALID);
            return E_IBX_CARD_NO_INVALID;
        }
        if (rslt.indexOf("\"error.customer.message\":\"") > 0){
            this.setError(E_IBX_UNKNOWN);
            return E_IBX_UNKNOWN;
        }
        
        var _table = StrGrab(rslt, "이용한도조회내역</caption>", "</table"); 
        if (StrTrim(_table) == "") {
            this.setError(E_IBX_SITE_INVALID);
            return E_IBX_SITE_INVALID;
        }
        
        system.setStatus(IBXSTATE_RESULT, 90);
        
        var 한도조회 = [];
        var item = {};
        
        item.카드번호 = StrGrab(rslt, 'value="' + 카드번호 + '"', "</option>");
        item.카드번호 = StrGrab(item.카드번호, ">", " ");
        item.카드번호 = StrReplace(item.카드번호, "-", "");
        item.카드번호 = StrReplace(item.카드번호, "*", "");
        
        item.카드종류 = ""; //
        
        if ((_table.indexOf("카드이용한도") > 0) &&
            (_table.indexOf("카드미결제잔액") > 0) &&
            (_table.indexOf("카드사용가능액") > 0)) {
            item.카드사용_한도금액 = StrGrab(StrGrab(_table, "카드이용한도</th>", "</tr> "), "<td>", "</td>");
            item.카드사용_한도금액 = StrReplace(item.카드사용_한도금액, ",", "");
            
            item.카드사용한도_사용금액 = StrGrab(StrGrab(_table, "카드미결제잔액</th>", "</tr> "), "<td>", "</td>");
            item.카드사용한도_사용금액 = StrReplace(item.카드사용한도_사용금액, ",", "");
            
            item.카드사용한도_잔여금액 = StrGrab(StrGrab(_table, "카드사용가능액</th>", "</tr> "), "<td>", "</td>");
            item.카드사용한도_잔여금액 = StrReplace(item.카드사용한도_잔여금액, ",", "");
            
            item.일시불_한도금액 = ""; //
            item.일시불_사용금액 = ""; //
            item.일시불_한도잔여금액 = ""; //
            item.할부_한도금액 = ""; //
            item.할부_사용금액 = ""; //
            item.할부_한도잔여금액 = ""; //
            item.해외_한도금액 = ""; //
            item.해외_사용금액 = ""; //
            item.해외_한도잔여금액 = ""; //
            
            item.현금서비스_한도금액 = StrGrab(StrGrab(_table, "카드이용한도</th>", "</tr> "), "<td>", "</td>", 2);
            item.현금서비스_한도금액 = StrReplace(item.현금서비스_한도금액, ",", "");
            
            item.현금서비스_사용금액 = StrGrab(StrGrab(_table, "카드미결제잔액</th>", "</tr> "), "<td>", "</td>", 2);
            item.현금서비스_사용금액 = StrReplace(item.현금서비스_사용금액, ",", "");
            
            item.현금서비스_한도잔여금액 = StrGrab(StrGrab(_table, "카드사용가능액</th>", "</tr> "), "<td>", "</td>", 2);
            item.현금서비스_한도잔여금액 = StrReplace(item.현금서비스_한도잔여금액, ",", "");
        } else {
            item.카드사용_한도금액 = StrGrab(StrGrab(_table, "회원이용한도</th>", "</tr> "), "<td>", "</td>");
            item.카드사용_한도금액 = StrReplace(item.카드사용_한도금액, ",", "");
            
            item.카드사용한도_사용금액 = StrGrab(StrGrab(_table, "회원미결제한도</th>", "</tr> "), "<td>", "</td>");
            item.카드사용한도_사용금액 = StrReplace(item.카드사용한도_사용금액, ",", "");
            
            item.카드사용한도_잔여금액 = StrGrab(StrGrab(_table, "회원사용가능액</th>", "</tr> "), "<td>", "</td>");
            item.카드사용한도_잔여금액 = StrReplace(item.카드사용한도_잔여금액, ",", "");
            
            item.일시불_한도금액 = ""; //
            item.일시불_사용금액 = ""; //
            item.일시불_한도잔여금액 = ""; //
            item.할부_한도금액 = ""; //
            item.할부_사용금액 = ""; //
            item.할부_한도잔여금액 = ""; //
            item.해외_한도금액 = ""; //
            item.해외_사용금액 = ""; //
            item.해외_한도잔여금액 = ""; //
            
            item.현금서비스_한도금액 = StrGrab(StrGrab(_table, "회원이용한도</th>", "</tr> "), "<td>", "</td>", 2);
            item.현금서비스_한도금액 = StrReplace(item.현금서비스_한도금액, ",", "");
            
            item.현금서비스_사용금액 = StrGrab(StrGrab(_table, "회원미결제한도</th>", "</tr> "), "<td>", "</td>", 2);
            item.현금서비스_사용금액 = StrReplace(item.현금서비스_사용금액, ",", "");
            
            item.현금서비스_한도잔여금액 = StrGrab(StrGrab(_table, "회원사용가능액</th>", "</tr> "), "<td>", "</td>", 2);
            item.현금서비스_한도잔여금액 = StrReplace(item.현금서비스_한도잔여금액, ",", "");
        }
        item.통화코드 = "";
        
        item.카드번호형식 = StrGrab(rslt, 'value="' + 카드번호 + '"', "</option>");
        item.카드번호형식 = StrGrab(item.카드번호형식, ">", " ");
        item.카드번호형식 = StrReplace(item.카드번호형식, "-", "");
        item.카드번호형식 = GetCardNoType(item.카드번호형식);
        
        한도조회.push(item);

        this.iSASInOut.Output = {};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
        this.iSASInOut.Output.Result.한도조회 = 한도조회;
        return S_IBX_OK;
    } catch(e) {
        this.log("exception " + e.message);
        this.setError(E_IBX_UNKNOWN);
        return E_IBX_UNKNOWN;
    } finally {
        system.setStatus(IBXSTATE_DONE, 100);
        this.log(BankName + " 이용한도조회 finally");
    }
};

법인카드.prototype.로그아웃 = function (aInput) {
    this.log(BankName + " 로그아웃 호출[" + aInput + "]");
    try{
        system.setStatus(IBXSTATE_CHECKPARAM, 10);
		if (this.bLogIn != true) {
			this.log("로그인 후 실행해주세요.");
			this.setError(E_IBX_AFTER_LOGIN_SERVICE);			
			return E_IBX_AFTER_LOGIN_SERVICE;
		}

        this.url  = "/ib20/mnu/PEBLGO0020001";
        this.postData = "action_type=mnu" + 
                        "&ib20_action=%2Fib20%2Fmnu%2FPEBLGO0020001" +
                        "&NEXT_PAGE=PEBLIN0020001" +
                        "&autoLogout=1" +
                        "&b_page_id=" + 
                        "&ib20_wc=ECBCMN001LGOV00M%3AECBCMN001LGOV00M";
        if (!httpRequest.post(this.host + this.url, this.postData)) {
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }
        var resStr = httpRequest.result;
        
        if (resStr.indexOf("<title>로그아웃>부산은행") == -1){
            this.setError(E_IBX_SERVICE_LOGOUT_FAIL);
            return E_IBX_SERVICE_LOGOUT_FAIL;
        }
        this.bLogIn = false;

        this.iSASInOut.Output = {};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
        return S_IBX_OK;
    } catch(e) {
        this.log("exception " + e.message);
        this.setError(E_IBX_UNKNOWN);
        return E_IBX_UNKNOWN;
    } finally {
        system.setStatus(IBXSTATE_DONE, 100);
        this.log(BankName + " 로그아웃 finally");
    }
};

///////////////////////////////////////////////////////////////////////////////////////////
//include 등등 필요한거 설정.
function OnInit() {
    console.log("OnInit()");
    try {
        //필요한거 로드
        system.include("iSASTypes");
        system.include("sas/sas");
        system.setStatus(IBXSTATE_BEGIN, 0);
    } catch (e) {
        console.log("Exception OnInit:[" + e.message + "]");
    } finally {
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
        var errCode;
        var ClassName = iSASObj.Class;
        var ModuleName = iSASObj.Module;

        //[2019.07.22] 엔진문제로 인하여, 임시처리.
        if (ClassName == '개인카드'){
            console.log('개인카드class 존재하지 않음');
            iSASObj = setError(iSASObj, E_IBX_SERVICE_INVALID);
            iSASObj.Output.ErrorMessage = "현재 해당 기관에서 서비스를 제공하지 않아 거래에 실패하였습니다(이용불가 서비스). 해당 기관 홈페이지에 접속하셔서 확인 후 거래해 주십시오.";

            return JSON.stringify( iSASObj );
        }

        if (Failed(SetClassName(ClassName, ModuleName))) {
            iSASObj.Output = {};
            iSASObj.Output.ErrorCode = E_IBX_FAILTOSETCLASS.toString(16).toUpperCase(); // or '800033E0';
            iSASObj.Output.ErrorMessage = "class명과 job명을 확인해주시기 바랍니다.";
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
