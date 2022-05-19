Ext.define('ExFrm.view.demo.Demo009Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.demo009',
    onMainInfo:function(params){
        var me = this;
        
        me.callStore(me, 'mainInfo', 'mainGridArrows', params, me.onMainInfoCallback)
    },
    onMainInfoCallback:function(me, success, records, operation){
        if(success == true){
        }
    },
    onCalled:function(params){
    },
    onInit:function(me){
        console.log('onInit', me);
        me.setCommonCodeReal(me.lookupReference('exRadioGroup'), "002", "NAME_KOR");
        me.setCommonCodeReal(me.lookupReference('exCombobox'), "002", "NAME_KOR");
    },
    onHelp:function(){},
    onSearchItems:function( button, e, eOpts ){
        var me = this;
        var params = {

        };
        me.onMainInfo(params);
    },
    selectedRecord:{},
    onMainGridClick:function( tablepanel, record, item, index, e, eOpts ){
        var me = this;
        me.selectedRecord = record;
        this.lookupReference('custNo').setExValue(record.data.custNo);  
        this.lookupReference('custName').setExValue(record.data.custName);  
        this.lookupReference('birth').setExValue(record.data.birth);  
        this.lookupReference('point').setExValue(record.data.point);  
        this.lookupReference('addr').setExValue(record.data.addr);  
    },
    onUpdate:function(){
        var me = this;
        this.callForm(me, './json/demo009upd.json', me.onUpdateCallback);
    },
    onUpdateCallback:function(me, success, form, action){
        if(success==true){
            //둘중하나를 선택
            // 1. 다시조회  me.onSearchItems();만 호출하면 됨.
            // 2. 그리드의 레코드를 제설정.  2번으로 구현함
            me.selectedRecord.set('custName', me.lookupReference('custName').getExValue());
            me.selectedRecord.set('birth', me.lookupReference('birth').getExValue());
            me.selectedRecord.set('point', me.lookupReference('point').getExValue());
            me.selectedRecord.set('addr', me.lookupReference('addr').getExValue());
            me.getViewModel().getStore('mainInfo').commitChanges();
        }
    }
})