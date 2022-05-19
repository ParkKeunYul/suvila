Ext.define('ExFrm.view.demo.Demo004PopController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.demo004pop',
    onCalled:function(params){
        var me = this;
        console.log('onCalled', params);
        me.lookupReference('searchInput').setValue(params.custId);
        me.callStore(me, 'popInfo', '', params);
    },
    onGridClick:function(grid, record, item, index, e){
        var params = {
            custName:record.get('custName')
        };
        this.receiveTo(params, true);
    }
})