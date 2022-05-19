Ext.define('ExFrm.view.ide.TmplLeftMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tmplleftmenu',
	onMenuClick:function(obj, selObj){
		console.log(arguments);
    	console.log('>>>>', selObj.data.url, selObj.data.name);
		var gController = ExFrm.app.getController('IdeController');
 		//gController.setTmplMainBar(selObj.data.url,selObj.data.name,selObj.data.path);
 		//테스트용
 		gController.setTmplMainStep2Bar(selObj.data.url,selObj.data.name,selObj.data.path);
 		
   	},
    onNewTmpl:function(){
    	ExFrm.app.getController('IdeController').setTmplMainStep2Bar('ExFrm.view.ide.TmplMakeStep2','',''); 
    },   	
});