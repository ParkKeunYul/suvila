Ext.define('ExFrm.view.menu.LeftMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.leftmenu',
	onMenuClick:function(obj, selObj){
		
		if(selObj.data.leaf == true){
			ExFrm.app.getController('AppController').openWindow(selObj.data.code, selObj.data.name, null, null, null , selObj.data.nav_text);  
		}
   	}
});