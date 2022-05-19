Ext.define('ExFrm.view.rec.rec002w_31Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_31',
    onShow:function(btn){
    	//console.log('rec024w_01 onShow');
        if(btn.text=='접수'){
            this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_32'));
        }
        else if(btn.text=='조회'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_33'));
        }
        else if(btn.text=='미수'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_34'));
        }    
        else if(btn.text=='통계'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_35'));
        }
        else if(btn.text=='출력'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_36'));
        }
        else if(btn.text=='관리'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec002w_37'));
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
