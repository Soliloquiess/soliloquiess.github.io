var moduleVersion = '20.11.14.3';// YYMMDD. version
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


// var changeYMD = function(날짜) {
//     var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
//     var day = currentDate.getDate()
//     var month = currentDate.getMonth() + 1
//     var year = currentDate.getFullYear()
//     YYMMDD = year+month+day;
//     return YYMMDD;
// }

function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

var 날씨 = function(){
    this.errorMsg = "";
    this.host = "https://weather.naver.com";

    this.userAgent = '{';
    this.userAgent += '"Accept":"image/webp,image/apngimage/*,*/*;q=0.8"';
    this.userAgent += '"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"';
    this.userAgent += '}';
};

날씨.prototype = Object.create(iSASObject.prototype);

날씨.prototype.날씨정보조회 = function(aInput){
    this.log(WeatherName + "날씨 날씨정보조회 호출[" + aInput + "]");
    try {
        system.setStatus(IBXSTATE_CHECKPARAM, 10);

        var input = dec(aInput.Input);


        var 지역명 = input.지역명;
        
        if(!지역명){
            this.setError(E_IBX_PARAMETER_NOTENTER);
            this.iSASInOut.Output.ErrorMessage = "지역명이 미입력입니다. 확인 후 거래하시기 바랍니다.";
            return E_IBX_PARAMETER_NOTENTER;
        }

        var region = httpRequest.URLEncodeAll(지역명);


        if(!httpRequest.postWithUserAgent(this.userAgent, this.host + '/search/api/searchResult', 'keyword=' + region)) {
            // 오류처리
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }

        var searchInput = httpRequest.result;
        this.log('지역검색결과 [ ' + searchInput + ' ]');

        // if(StrGrab(searchInput, '<strong class="tit">', '</strong>') != '') {
        //     this.iSASInOut.Output.ErrorMessage = "일시적인 서비스 장애 입니다.";
        //     this.setError(E_IBX_SITE_INTERNAL);
        //     return E_IBX_SITE_INTERNAL;
        // }

        if(StrGrab(searchInput, '</strong>', '</p>') == '에 대한 검색결과가 없습니다.') {
            this.setError(I_IBX_RESULT_NOTPRESENT);
            this.iSASInOut.Output.ErrorMessage = "검색결과가 없습니다."; 

            return I_IBX_RESULT_NOTPRESENT;
        }  
        
        // if(StrGrab(searchInput, '"mark">', '</span>') != "") {    // 검색 리스트 중에 제일 첫번째 (태그는 반복, 자동완성에서 검색과 제일 유사한 값)
        //     검색어 = StrGrab(searchInput, '"mark">', '</span>');
     
        // }

        // if(StrGrab(searchInput, '<span class="main">', '</span>') != "") {    // 검색 리스트 중에 제일 첫번째 (태그는 반복, 자동완성에서 검색과 제일 유사한 값)
        //     검색어 = StrGrab(searchInput, '<span class="main">', '</span>');
        // } else {
        //     검색어 = StrGrab(searchInput, '<span class="main">', '</span>');
        // }

        this.url = '/ac?';
        this.param  = 'q_enc='      + 'utf-8';
        this.param += '&r_format='  + 'json';
        this.param += '&r_enc='     + 'utf-8';
        this.param += '&r_lt='      + '1';
        this.param += '&st='        + '1';
        //    지역명 인코딩 해서 통신
        this.param += '&q='         + httpRequest.URLEncodeAll(지역명);

        if (!httpRequest.getWithUserAgent(userAgent, `https://ac.weather.naver.com` + this.url + this.param)){
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }

        var searchResult = httpRequest.result;
        var searchJSON = JSON.parse(searchResult);
        // 지역명 = searchJSON.items[0][0][1]  // 구조 [[['지역명' : '지역코드']]]
        // this.log('지역명 [ ' + 지역명 + ' ]');

        var userAgent = '{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"}';
        
          //    지역 정보 통신    
       
 
        var ResultStr = httpRequest.result;        
        this.log("지역명"+ ResultStr);
      //로그 찍을 떄 앞에 부연설명 있어야 하는지.
        this.log("지역명"+ ResultStr);
      
       
        try {
            var regionSerial = JSON.parse(ResultStr).items[0][0][1];
            this.log("regionSerial"+regionSerial);

        } catch (error) {
            this.log("error.message:::" + error.message);
            this.setError(E_IBX_SITE_INVALID + 1);
            return E_IBX_SITE_INVALID + 1;
        }

        if(!regionSerial){
            
            this.setError(E_IBX_PARAMETER_INVALID);
            return E_IBX_PARAMETER_INVALID;
        }
        
        if (!httpRequest.getWithUserAgent(this.userAgent, this.host +`/today/`+ regionSerial)){
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
        }; 


        ResultStr = httpRequest.result; 
        this.log(""+ResultStr);
        
        var _지역명= StrGrab(ResultStr, 'location_name">', '<');;
        var 현재날씨 = StrGrab(ResultStr, '"weather">', '</span>');

        var 현재기온 = StrGrab(ResultStr, '현재 온도</span>', '<');
     
        var frm = StrGrab(ResultStr, '"box_color">', '</ul>');

        // var 오늘날짜 = StrGrab(frm, '"date">', '</span>');
        var 오늘날짜 = new Date();
        오늘날짜 = getFormatDate(오늘날짜);

        // this.log(typeof(오늘날짜))
        // 오늘날짜.replace(/./g,'');
        // this.log(typeof("오늘날짜:::"+오늘날짜))
        // this.log("오늘날짜:::"+오늘날짜)
        // 오늘날짜 = changeYMD(오늘날짜);
        
        this.log("오늘날짜:::"+ 오늘날짜);
        var 최저기온 = StrGrab(frm, '최저기온</span>', '<');

        var 최고기온 =  StrGrab(frm, '최고기온</span>', '<');
       
        
        var 오전날씨 = StrGrab(frm,'weather_text">', '</span>');
        var 오후날씨 = StrGrab(frm,'weather_text">', '</span>',2);

        if(!현재날씨||!현재기온||!오늘날짜||!최저기온 || !최고기온){
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }


        if (!httpRequest.getWithUserAgent(this.userAgent, this.host +`/air/` + regionSerial)){
            this.setError(E_IBX_FAILTOGETPAGE);
            return E_IBX_FAILTOGETPAGE;
      
        };

        var ResultStr = httpRequest.result;

        var 미세먼지등급 =  StrGrab(ResultStr, 'grade _cnPm10Grade">', '<');
        var 초미세먼지등급 = StrGrab(ResultStr, 'grade _cnPm25Grade">', '<');
        if(!미세먼지등급 || !초미세먼지등급 ){
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }


        var 날씨정보조회 = {};


        날씨정보조회.오늘 = {};
        

        날씨정보조회.오늘.지역명 = _지역명;
        날씨정보조회.오늘.오늘날짜 = 오늘날짜;
        날씨정보조회.오늘.현재날씨 = 현재날씨;
        날씨정보조회.오늘.현재기온 = 현재기온;
        날씨정보조회.오늘.오전날씨 = 오전날씨;
        날씨정보조회.오늘.오후날씨 = 오후날씨;
        날씨정보조회.오늘.최저기온= 최저기온+"C";
        날씨정보조회.오늘.최고기온= 최고기온+"C";
        날씨정보조회.오늘.미세먼지등급= 미세먼지등급;
        날씨정보조회.오늘.초미세먼지등급=초미세먼지등급;


       

///////////내일////////

        // var 내일날짜 = StrGrab(frm, '"date">', '<',2);
        // 내일날짜 = changeYMD(내일날짜)

        var 내일날짜 = new Date();
        내일날짜.setDate(내일날짜.getDate() + 1);

        내일날짜 = getFormatDate(내일날짜);
        
        // var 내일날짜 = date.setDate(date.getDate() + 1);
        // 내일날짜 = getFormatDate(내일날짜);

        // var 내일날짜 = 내일날짜.setDate(오늘날짜.getDate()+1);
        // 내일날짜.setDate(오늘날짜.getDate()+1);
        this.log("내일날짜:::"+ 내일날짜);
        if(!내일날짜){
            this.setError(E_IBX_RESULT_FAIL);
            this.iSASInOut.Output.ErrorMessage = "없는 날짜입니다.";
            return E_IBX_RESULT_FAIL;
        }

  

       var 내일오전날씨 = StrGrab(frm,'weather_text">', '</span>',3);
       var 내일오후날씨 = StrGrab(frm,'weather_text">', '</span>',4);

       if(!내일오전날씨|| !내일오후날씨  ){
            this.setError(E_IBX_RESULT_FAIL);
            return E_IBX_RESULT_FAIL;
        }

        날씨정보조회.내일 = {};
        
        날씨정보조회.내일.내일날짜 = 내일날짜;

        날씨정보조회.내일.내일오전날씨 = 내일오전날씨;
        날씨정보조회.내일.내일오후날씨 = 내일오후날씨;



        // OUTPUT
        this.iSASInOut.Output ={};
        this.iSASInOut.Output.ErrorCode = "00000000";
        this.iSASInOut.Output.ErrorMessage = "";
        this.iSASInOut.Output.Result = {};
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

            // console.log("결과 테스트 [" + obj.iSASInOut + "]");

            if (obj.iSASInOut != "")
                iSASObj = obj.iSASInOut;
        }
    } catch (e) {
        console.log("exception:[" + e.message + "]");
    } finally {
        return JSON.stringify(iSASObj);
    }
}



// {"Module":"naverweather_feedback","Class":"날씨","Job":" 날씨정보조회","Input":{"지역명":"서울특별시 강남구"}}

// var ul_str  = StrGrab(Result오늘날짜Str, 'class="box_color">', '</ul>');
// var li_tmr = StrGrab(ul_str, '<li', '</li>', 2);
