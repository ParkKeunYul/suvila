Ext.define('ExFrm.view.demo.Demo006Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.demo006',
    onInit:function(){
        this.getViewModel().getStore('testInfo').load();
        this.getViewModel().getStore('menuAdmInfo').load();
        this.getViewModel().getStore('menuAdmInfo').sort([{
            property: 'sortNo',
            direction: 'ASC'
        },{
            property: 'divName',
            direction: 'ASC'
        }]);
    },
    openContextMenu:function(){
       this.openPopup('ExFrm.view.demo.Demo006Pop',  {}, this.onReceivePopup);
    },
    onReceivePopup:function(params, me){
        console.log('onReceived',params);
        //me.lookupReference('targetInput').setValue(params.custName);
    },
    selectedRecord:{},
    selectedIndex:-1,
    onGridClick:function(grid, record, item, index, e){
        this.selectedRecord = record;
        this.selectedIndex = index;
    },
    onDivUp:function(){
        //var selection = this.lookupReference('selectGrid1').getView().getSelectionModel().getSelection();
        var me = this;
        if(me.selectedIndex > 0){
            var prevRecord = me.getViewModel().getStore('menuAdmInfo').getAt(me.selectedIndex-1);
            prevRecord.set('sortNo', Number(prevRecord.get('sortNo'))+1);
            me.selectedRecord.set('sortNo', Number(me.selectedRecord.get('sortNo')) -1);
            me.selectedIndex--;
        }
    },
    onDivDown:function(){
        var me = this;
        if(me.selectedIndex < me.getViewModel().getStore('menuAdmInfo').getRange().length-1){
            var nextRecord = me.getViewModel().getStore('menuAdmInfo').getAt(me.selectedIndex+1);
            nextRecord.set('sortNo', Number(nextRecord.get('sortNo'))-1);
            me.selectedRecord.set('sortNo', Number(me.selectedRecord.get('sortNo'))+1);
            me.selectedIndex++;
        }
    },
    onDivAdd:function(){
        var me = this;
        var records = me.getViewModel().getStore('menuAdmInfo').getRange();
        var sortNo = records[records.length-1].get('sortNo');
        sortNo = Number(sortNo) + 1;
        me.getViewModel().getStore('menuAdmInfo').add({
            sortNo:sortNo,
            useYn:'Y',
            divName:''
        })
    },
    onDivDel:function(){
        var me = this;
        if(me.selectedIndex != -1 ){
            me.getViewModel().getStore('menuAdmInfo').remove(me.selectedRecord);
        }
    },
    onDivSave:function(){
        var me = this;
        var records = me.getViewModel().getStore('menuAdmInfo').getRange();
        var arrayAll = [];
        for(var i=0; i< records.length; i++){
            arrayAll.push(records[i].data);
        }
        console.log(arrayAll);
        this.lookupReference('arrayAll').setValue(Ext.encode(arrayAll));
    },

})