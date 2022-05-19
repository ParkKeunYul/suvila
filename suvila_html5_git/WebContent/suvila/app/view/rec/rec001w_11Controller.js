Ext.define('ExFrm.view.rec.rec001w_11Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec001w_11',
    onShow:function(btn){
        if(btn.text=='접수'){
            this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec001w_12'));
        }
        else if(btn.text=='조회'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec001w_13'));
        }
        else if(btn.text=='미수'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec001w_14'));
        }    
        else if(btn.text=='통계'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec001w_15'));
        }
        else if(btn.text=='출력'){
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec001w_16'));
            
            if(exCommon.user.death_type != '2'){
            	console.log('1111111111111111111111111111');
            	this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec001w_16'));
    		}else{
    			console.log('2222222222222222222222222222');
    			this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec001w_16_000031'));
    		}
            
        }
        else if(btn.text=='관리'){
        	console.log('과아아아앙ㄴ리');
        	this.lookupReference('content').removeAll();
            this.lookupReference('content').add(Ext.create('ExFrm.view.rec.rec001w_17'));
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
