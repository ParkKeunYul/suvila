Ext.define('ExFrm.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    init:function(){
        try{
           console.log('loginPanel', this.lookupReference('loginPanel'));
           console.log(Number(Ext.getBody().getViewSize().height)/2 - 200/2)
           this.lookupReference('loginPanel').y = Number(Ext.getBody().getViewSize().height)/2 - 400/2;
           this.lookupReference('loginPanel').x = Number(Ext.getBody().getViewSize().width)/2 - 400/2;
        }
       catch(e){
            console.log('error', e);
        }
    },    
    afterRender:function(cmp){
        console.log(cmp, this);
        console.log(exCommon);
        exCommon.user.userId = '0001';
        exCommon.user.userName = '홍길동';
        exCommon.user.addr = '';
        exCommon.user.tel = '';
        exCommon.user.brcd = '0001'; 
        exCommon.user.brcdName = ''; 
        ExFrm.app.getController('AppController').loginAfter(this.getView());   
    },
    onLogin:function(){
        var me = this;
        var form = this.getView().getForm();
        form.url = './extra/json/login/login.json';
        form.submit({
            scope:me,
            success:function(form, action){
                console.log('store arguments', arguments);
                exCommon.user.userId = action.result.data.info.userId;
                exCommon.user.userName = action.result.data.info.userName;
                exCommon.user.addr = action.result.data.info.addr;
                exCommon.user.tel = action.result.data.info.tel;
                exCommon.user.brcd = action.result.data.info.brcd;
                exCommon.user.brcdName = action.result.data.info.brcdName;
                ExFrm.app.getController('AppController').loginAfter(this.getView());    
            },
            failure:function(form, action){
                console.log('store arguments', form, arguments);
                Ext.Msg.alert('오류', '로그인 아이디, 암호를 확인하십시오');
            }
        });        
        
                        
    }
});