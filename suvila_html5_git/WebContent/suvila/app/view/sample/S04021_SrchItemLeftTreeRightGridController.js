Ext.define('ExFrm.view.sample.S04021_SrchItemLeftTreeRightGridController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.s04021_srchitemlefttreerightgrid',
    onLeftInfo:function(params){
        var me = this;
        
        me.callStore(me, 'leftInfo', '', params, me.onLeftInfoCallback)
    },
    onLeftInfoCallback:function(me, success, records, operation){
        if(success == true){
           /*
			
        this.lookupReference('code').setValue(record.data.info1.code);  //코드
        this.lookupReference('name').setValue(record.data.info1.name);  //이름
            
           */
        }
    },
    onRightInfo:function(params){
        var me = this;
        
        me.callStore(me, 'rightInfo', 'rightGridArrows', params, me.onRightInfoCallback)
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
    onLeftTreeClick:function( tablepanel, record, item, index, e, eOpts ){
        var me = this;
    var params = {};
         me.callStore(me, 'rightInfo', '', params, me.rightInfoCallback);
    },
    rightInfoCallback:function(me, success, records, operation){
        // add your code
    },
    onLeftTreeClick:function( tablepanel, record, item, index, e, eOpts ){
        var me = this;
    var params = {};
         me.callStore(me, 'rightInfo', 'rightGridArrows', params, me.rightInfoCallback);
    },
    rightInfoCallback:function(me, success, records, operation){
        // add your code
    }
})