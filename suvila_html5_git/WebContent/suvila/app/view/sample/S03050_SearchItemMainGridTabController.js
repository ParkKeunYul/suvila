Ext.define('ExFrm.view.sample.S03050_SearchItemMainGridTabController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.s03050_searchitemmaingridtab',
    onMainInfo:function(params){
        var me = this;
        
        me.callStore(me, 'mainInfo', 'mainGridArrows', params, me.onMainInfoCallback)
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
    onHelp:function(){}
})