Ext.define('ExFrm.view.rec.RecHeaderController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.recheader',
    onSearch:function(){
        var me = this;
        var params = {
        };
        me.callAjax(me, './json/daeju.json', params, me.onSearchDeajuCallback);
        me.callStore(me, 'familyList', '', params);
        me.callStore(me, 'younggaList', '', params);
        me.callStore(me, 'recpList', '', params);
        me.getView().up('[isRootView=true]').getController().onSearch(params);
    },
    onSearchDeajuCallback:function(me, success, response, record, opt ){
        console.log('arguments', arguments);
        if(success == true){
            console.log('arguments2', record.data.info.daejuBudNo);
            me.lookupReference('daejuBudNo').setValue(record.data.info.daejuBudNo);
        }
    },
    onCalled:function(params){
    },
    onInit:function(me){
    },
})
