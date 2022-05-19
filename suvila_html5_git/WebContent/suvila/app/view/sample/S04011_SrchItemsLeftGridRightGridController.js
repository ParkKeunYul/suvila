Ext.define('ExFrm.view.sample.S04011_SrchItemsLeftGridRightGridController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.s04011_srchitemsleftgridrightgrid',
    onLeftInfo:function(params){
        var me = this;
        
        me.callStore(me, 'leftInfo', '', params, me.onLeftInfoCallback)
    },
    onLeftInfoCallback:function(me, success, records, operation){
        if(success == true){
           /*
			
           */
        }
    },
    onRightInfo:function(params){
        var me = this;
        
        me.callStore(me, 'rightInfo', '', params, me.onRightInfoCallback)
    },
    onRightInfoCallback:function(me, success, records, operation){
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
        var params = {
            custNameSrch: this.lookupReference('custNameSrch').getExValue(),
            birthSrch: this.lookupReference('birthSrch').getExValue(),
        };
     	me.onLeftInfo(params);
    },
    onLeftGridClick:function( tablepanel, record, item, index, e, eOpts ){
        var me = this;
        if(me.lookupReference('leftGrid').getSelectionModel()== null ||
            me.lookupReference('leftGrid').getSelectionModel().getSelection().length ==0){
            Ext.Msg.alert('Error','Select Grid');
        }
        var record = me.lookupReference('leftGrid').getSelectionModel().getSelection()[0];
        var row = me.lookupReference('leftGrid').store.indexOf(record);
        var params = {
            custNo:record.data.custNo
        };
     	me.onRightInfo(params);
    }
})