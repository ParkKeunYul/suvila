/**
 * Application.js는 앱을 시작하는 기본 파일이므로 삭제할 수 없으며 Local과 클라우드 환경이 다르므로 그대로 다운로드 받을 수 없습니다.
 * 필요한 부분을 Copy하여 사용하십시요.
 */

// 아래 lbo로 시작하는 3개의 변수는 임의의 JSON 파일이므로 프로젝트에서 제거하고 실제 URL로 연동하여 사용하십시오.
// 호환을 위하여 남겨놓음.
/*
if(window.exCommon == undefined){
    lboUserResourcesPath = './resources';
    lboUserJsonPath = './json';
    lboMainScreenCls = "tabpanel";
}
*/

Ext.define('ExFrm.Application', {
    extend: 'Ext.app.Application',
    
    name: 'ExFrm',
    controllers:[
  //      'IdeController',   // PC에서 사용시 제거
        'AppController'
    ],
    models:[
        'CommonModel',
        'StipulcationModel'
    ],      
    stores: [
        'CommonStore',
        'StipulcationStore'
    ],
    //defaultToken:'ExFrm',  // URI Hash --> backspace 키 방지
    launch: function () {
        /*
        if(window.exCommon == undefined){
            //lboUserResourcesPath = './resources';
            //lboUserJsonPath = './json';
            //lboMainScreenCls = "tabpanel";
            Ext.Loader.loadScript({
                url:'./resources/js/common.js',
                onLoad:function(){
                    console.log('success js', arguments);
                },
                onError:function(){
                    console.log('fail js', arguments);                
                }
            });
            
        }
        else {
            console.log('else getMode()', exCommon.getMode(), exCommon.debugMode);
        }
        */

    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});