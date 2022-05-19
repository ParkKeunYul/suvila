Ext.define('ExFrm.view.sample.S02011_SrchItemMainGridDetailblockItemController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.s02011_srchitemmaingriddetailblockitem',
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
        console.log('onInit', me);
        me.setCommonCodeReal(me.lookupReference('exRadioGroup'), "001", "001");
        //me.setCommonCode(me.lookupReference('exRadioGroup'), "001", "001");
    },
    onHelp:function(){},
    onSearchItems:function( button, e, eOpts ){
        var me = this;
        var params = {

        };
        me.onMainInfo(params);
    }
})