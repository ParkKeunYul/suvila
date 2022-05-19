Ext.define('ExFrm.view.main.MainDesktopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.maindesktop',
    init:function(){        
        var me = this;
        setTimeout(function(){
            me.onTimer(me);
        },500);
        try{
            me.lookupReference('userId').setText(' ' + exCommon.user.userName);
        }catch(e){}
    },
    onCallTest:function(paramMe){
        ExFrm.app.getController('AppController').setMainBar('ExFrm.view.statistics.Test02','테스트');
    },
    onMenuSelect:function(obj){
        try{
        	ExFrm.app.getController('AppController').openWindow(obj.url, obj.text, null, null , null , obj.nav_text);
        }catch (e) {}
        
        this.onLeftMenu(obj);

    },
    onLeftMenu:function(obj){
    	
    	var me = this;
    	
    	if( me.lookupReference('mainDeskLeft').hidden )  me.lookupReference('mainDeskLeft').expand();
    	
    	console.log('onLeftMenu = ', obj);
    	console.log('onLeftMenu.leftMenu = ', obj.leftMenu);
        if(obj.leftMenu != null && obj.leftMenu != undefined){
            setTimeout(function(){
            	ExFrm.app.getController('AppController').setLeftMenu(obj.leftMenu);
        	},20);
        }
    },
    test : function(){
    	console.log('test');
    	console.log('test');
    	console.log('test');
    	console.log('test');
    	console.log('test');
    },
    onActiveMenuList:function(btn){
    	
        if(Ext.getCmp(btn.panelWindowId).hidden== true){
            Ext.getCmp(btn.panelWindowId).show();
            Ext.getCmp(btn.panelWindowId).focus();

        }
        else {
            Ext.getCmp(btn.panelWindowId).focus();
        }
    },
 
    onTimer:function(paramMe){
        var me = paramMe;
        me.lookupReference('currentTime').setText(exCommon.getNowTimePmAm(':'));
        setTimeout(function(){
            me.onTimer(me);
        }, 500);
    },

    onShow: function () {
        var onWindow = ExFrm.app.getController('AppController').showOnWindow();
        for(var i = 0; i < onWindow.openWindow.id.length; i++) {
            Ext.getCmp(onWindow.openWindow.id[i]).show();
        }
    },
    onClear: function() {
        Ext.WindowMgr.hideAll();
    },
    onClose: function (btn, eOpts) {
        var onWindow = ExFrm.app.getController('AppController').showOnWindow();
        for(var i = 0; i < onWindow.openWindow.id.length; i++) {
            Ext.getCmp(onWindow.openWindow.id[i]).closeMe = true;
            Ext.getCmp(onWindow.openWindow.id[i]).close();
        }
    },
    onResizeMainView:function(me, width, height, bfWidth){
        var windowList = Ext.ComponentQuery.query('exwindowmain');
        for(var i=0; i< windowList.length; i++){

                var widthCalc = windowList[i].getWidth() + width - bfWidth;
                if(widthCalc > me.getWidth()){
                    widthCalc = me.getWidth();
                }
                windowList[i].setWidth(widthCalc);
        }
    },
    onRemoveAllWindow:function(){
        var windowList = Ext.ComponentQuery.query('exwindowmain');
        Ext.Msg.confirm('확인', '모든 윈도우 창을 닫으시겠습니까?', function(btn,msg,obj){
            if(btn == 'yes'){
                for(var i=0; i< windowList.length; i++){
                    windowList[i].destroy();
                }
            }
        });
    },
    onRemoveAllWindowOk:function(){
    	 for(var i=0; i< windowList.length; i++){
             windowList[i].destroy();
         }
    },
    onClick:function(comp){
        ExFrm.app.getController('AppController').openWindow(comp.url,comp.title);
    },
    onAfterrender : function(){
    	var me = this;
    },
    onLogout : function(){
    	
    	Ext.Msg.confirm('확인', '로그아웃 하시겠습니까?', function(btn,msg,obj){
            if(btn == 'yes'){
            	console.log('onLogout');
            	location.href='/login/logout.suvila';
            }
        });
    },
    onSupport  : function(){
    	
    	var popupWidth = 1024;
    	var popupHeight = 780;

    	var popupX = (window.screen.width / 2) - (popupWidth / 2);

    	var popupY= (window.screen.height / 2) - (popupHeight / 2);
    	
    	window.open('http://www.startsupport.com/topscom','원격지원서비스', 'status=no, height=' + popupHeight  + ', width=' + popupWidth  + ', left='+ popupX + ', top='+ popupY);
    }
});