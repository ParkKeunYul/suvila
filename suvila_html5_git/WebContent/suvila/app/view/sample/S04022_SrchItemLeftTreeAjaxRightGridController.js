Ext.define('ExFrm.view.sample.S04022_SrchItemLeftTreeAjaxRightGridController', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.s04022_srchitemlefttreeajaxrightgrid',
    onLeftInfo:function(params){
        var me = this;
        
        me.callAjax(me, lboUserJsonPath + '/view/demo/demo002_treedata.json', params, me.onLeftInfoCallback)
    },
    onLeftInfoCallback:function(me, success, res, record){
        if(success == true){
            console.log(arguments);
            me.lookupReference('leftTree').setData(record.data.info);
           /*
			
        this.lookupReference('custNo').setValue(record.data.info1.custNo);  //고객번호
        this.lookupReference('custName').setValue(record.data.info1.custName);  //고객명
            
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
    onSearchItems:function( button, e, eOpts ){
        var me = this;
        var params = {
            custNameSrch: this.lookupReference('custNameSrch').getExValue(),
            birthSrch: this.lookupReference('birthSrch').getExValue(),
        };
     	me.onLeftInfo(params);
    }
})