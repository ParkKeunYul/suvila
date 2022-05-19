Ext.define('ExFrm.view.sample.S02002_SrchItemMainBlockController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.s02002_srchitemmainblock',
    onCalled:function(params){
    },
    onInit:function(me){
    },
    onHelp:function(){},
    searchItems:function( button, e, eOpts ){
        var me = this;
        var params = {
            custNameSrch: me.lookupReference('custNameSrch').getExValue(),
            birthSrch: me.lookupReference('birthSrch').getExValue()
        };
        me.callAjax(me,  lboUserJsonPath +  '/view/sample/S02001_AjaxData01.json', params, me.searchItemsCallback );
        //me.callAjax(me, './test/sampleOne.jsp', params, me.searchItemsCallback );
    },
    searchItemsCallback:function(me, success, res, record){
        if(success==true){
            me.lookupReference('custNo').setExValue(record.data.info.custNo);
            me.lookupReference('custName').setExValue(record.data.info.custName);
            me.lookupReference('birth').setExValue(record.data.info.birth);
            me.lookupReference('point').setExValue(record.data.info.point);
            me.lookupReference('addr').setExValue(record.data.info.addr);
        }
    }
})