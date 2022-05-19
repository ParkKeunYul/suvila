Ext.define('ExFrm.view.rec.rec003w_21Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec003w_21',
    onShow:function(btn){
        if(btn.text=='접수'){
            this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec003w_22'));
        }
        else if(btn.text=='조회'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec003w_23'));
        }
        else if(btn.text=='미수'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec003w_24'));
        }    
        else if(btn.text=='통계'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec003w_25'));
        }
        else if(btn.text=='출력'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec003w_26'));
        }
        else if(btn.text=='관리'){
        	console.log('과아아아앙ㄴ리');
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec003w_27'));
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
