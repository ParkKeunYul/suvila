Ext.define('ExFrm.view.sample.S02001_SrchItemMainItemController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.s02001_srchitemmainitem',
    onCalled:function(params){
    },
    onInit:function(me){
    },
    onHelp:function(){},
    onSearchItems:function( button, e, eOpts ){
        var me = this;
        var params = {
            custNameSrch: me.lookupReference('custNameSrch').getValue(),
            birthSrch: me.lookupReference('birthSrch').getValue()
        };
        me.callAjax(me,  lboUserJsonPath +  '/view/sample/S02001_AjaxData01.json', params, me.onSearchItemsCallback );
        //me.callAjax(me, './test/sampleOne.jsp', params, me.onSearchItemsCallback );
    },
   onSearchItemsCallback:function(me, success, res, record){
       if(success == true){
            me.lookupReference('custNo').setValue(record.data.info.custNo);
            me.lookupReference('custName').setValue(record.data.info.custName);
            me.lookupReference('birth').setValue(record.data.info.birth);
            me.lookupReference('point').setValue(record.data.info.point);
            me.lookupReference('addr').setValue(record.data.info.addr);
       }
    }
})