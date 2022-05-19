Ext.define('ExFrm.view.rec.rec002w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_01',
    onShow:function(btn){
        if(btn.text=='접수'){
            this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_02'));
        }
        else if(btn.text=='조회'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_03'));
        }
        else if(btn.text=='미수'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_04'));
        }    
        else if(btn.text=='통계'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_05'));
        }
        else if(btn.text=='출력'){
        	this.lookupReference('content').removeAll();
        	
        	console.log('rec002w_06 exCommon.user.death_type = ',exCommon.user.death_type);
        	this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_06'));
        	
        }
        else if(btn.text=='관리'){
        	this.lookupReference('content').removeAll();
        	this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_09'));
        }                
    },
    onSearch003:function(me, params){
    	console.log('onSearch004444 = '+ me);
    	console.log('onSearch00444 = '+ params);
    },
    onDestroy : function() {
        console.log('onSearch0044422Des');
    },
    onAfterRender:function(){
    	var me = this;
    },
    
})
