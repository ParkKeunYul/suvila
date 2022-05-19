Ext.define('ExFrm.view.test.S03012Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.s03012',
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
    onDetailInfo:function(params){
        var me = this;
        
        me.callStore(me, 'detailInfo', 'detailGridArrows', params, me.onDetailInfoCallback)
    },
    onDetailInfoCallback:function(me, success, records, operation){
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
