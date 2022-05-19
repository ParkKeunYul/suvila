Ext.define('ExFrm.view.demo.Demo004Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.demo004',
    onInit:function(){
        this.getViewModel().getStore('testInfo').load();
    },
    onPop:function(){
        var params = {
            custId:this.lookupReference('sourceInput').getValue()
        };
        this.openPopup('ExFrm.view.demo.Demo004Pop',  params, this.onReceivePopup);
    },
    onReceivePopup:function(params, me){
        console.log('onReceived',params);
        me.lookupReference('targetInput').setValue(params.custName);
    },
    selectedRecord:{},
    onPopupWidget:function(btn,e){
        var me = this;
        console.log(arguments);
        var params = {
            custId:btn.record.get('custNo')
        };
        me.selectedRecord = btn.record;
        this.openPopup('ExFrm.view.demo.Demo004Pop',  params, this.onReceivePopupWidget);
    },
    onReceivePopupWidget:function(params, me){
        me.selectedRecord.set('custName', '변경' + params.custName);
    }
})