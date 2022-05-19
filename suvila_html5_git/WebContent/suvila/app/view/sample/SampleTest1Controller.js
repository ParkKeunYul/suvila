Ext.define('ExFrm.view.sample.SampleTest1Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sampletest1',
    onMainInfo:function(params){
        var me = this;
        
        me.callStore(me, 'mainInfo', '', params, me.onMainInfoCallback)
    },
    onMainInfoCallback:function(me, success, records, operation){
        if(success == true){
           /*
			
           */
        }
    },
    onCalled:function(params){
    },
    onInit:function(me){
    },
    onHelp:function(){},
    onSearchItem:function( button, e, eOpts ){
        var me = this;
        var params = {
            custNameSrch: this.lookupReference('custNameSrch').getExValue(),
            birthSrch: this.lookupReference('birthSrch').getExValue(),
        };
     	me.callStore(me, 'mainInfo', '', params, me.mainInfoCallback);
    },
    mainInfoCallback:function(me, success, records, operation){
        if(success == true){
            // add your code
        }
    }
})