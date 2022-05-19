Ext.define('ExFrm.view.sample.SKTestController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sktest',
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
    onHelp:function(){},
    onSearchItems2:function( button, e, eOpts ){
        var me = this;
        var params = {
            custNameSrch: this.lookupReference('custNameSrch').getExValue(),
            birthSrch: this.lookupReference('birthSrch').getExValue(),
        };
     	me.callStore(me, 'mainInfo', '', params, me.mainInfoCallback);
    },
    mainInfoCallback:function(me, success, records, operation){
        if(success == true){
            // add your code
        }
    },
    onMainGridClick:function( tablepanel, record, item, index, e, eOpts ){
        var me = this;
        this.lookupReference('custNo').setExValue(record.data.custNo);  // mapping field  
        this.lookupReference('custName').setExValue(record.data.custName);  // mapping field  
        this.lookupReference('birth').setExValue(record.data.birth);  // mapping field  
        this.lookupReference('point').setExValue(record.data.point);  // mapping field  
        this.lookupReference('addr').setExValue(record.data.addr);  // mapping field  
    }
})