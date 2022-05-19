Ext.define('ExFrm.view.sample.S02011_SearchItemMainGridController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.s02011_searchitemmaingrid',
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
    onSearchItems:function( button, e, eOpts ){
        var me = this;
        var params = {
            custNameSrch: this.lookupReference('custNameSrch').getExValue(),
            birthSrch: this.lookupReference('birthSrch').getExValue(),
        };
     	me.onMainInfo(params);
    },
    mainInfoCallback:function(me, success, records, operation){
        if(success == true){
            // add your code
        }
    }
})