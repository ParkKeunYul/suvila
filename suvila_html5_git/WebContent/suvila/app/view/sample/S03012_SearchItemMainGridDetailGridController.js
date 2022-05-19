Ext.define('ExFrm.view.sample.S03012_SearchItemMainGridDetailGridController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.s03012_searchitemmaingriddetailgrid',
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
    onHelp:function(){},
    onSearchItems:function( button, e, eOpts ){
        var me = this;
    },
    onSearchItems:function( button, e, eOpts ){
        var me = this;
    var params = {};
         me.callStore(me, 'mainInfo', '', params, me.mainInfoCallback);
    },
    mainInfoCallback:function(me, success, records, operation){
        // add your code
    },
    onMainGridClick:function( tablepanel, record, item, index, e, eOpts ){
        var me = this;
    var params = {};
         me.callStore(me, 'detailInfo', '', params, me.detailInfoCallback);
    },
    detailInfoCallback:function(me, success, records, operation){
        // add your code
    }
})