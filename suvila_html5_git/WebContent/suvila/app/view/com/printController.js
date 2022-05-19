Ext.define('ExFrm.view.com.printController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.print',
    onCalled:function(params){
    	
       
        AP_FILE_PATH  = params.FILE_PATH;
        AP_PRINT_DATA = Ext.encode(params.PRINT_DATA);
        
    	setTimeout(function(){
    		start_ozjs("OZViewer","http://183.111.230.154:8080/oz80/ozhviewer/");
       	},1300);
        
    	
    },
    onInit:function(){
    	var  width = Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].getWidth();
    	var  height = Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].getHeight() - 37;

    	var me = this;
    	
    	me.getView().width   = width;
    	me.getView().height  = height;
    	
    },
    onAfterRender:function(){
    	var  width = Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].getWidth();
    	var  height = Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].getHeight() - 37;
    	
    	$('#OZViewer').width(width-10);
    	$('#OZViewer').height( height-110);
    	
    },    
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
})
