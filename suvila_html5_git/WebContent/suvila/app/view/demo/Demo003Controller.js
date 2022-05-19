Ext.define('ExFrm.view.demo.Demo003Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.demo003',
    onInit:function(){
        this.getViewModel().getStore('sourceInfo').load();
        this.getViewModel().getStore('cellSelectInfo').load();
    },
    onMove:function(){
        var selection = this.lookupReference('selectGrid1').getView().getSelectionModel().getSelection();
        if(selection != null && selection.length > 0){
            for(var i=0; i< selection.length; i++)
                this.getViewModel().getStore('targetInfo').add(selection[i].data);
        }
    },
    onAdded:function(){
        // 호출메소드
        var me = this;
        var jsonData = [];
        var records = this.getViewModel().getStore('targetInfo').getNewRecords();
        for (var i=0; i < records.length; i++){
            // 데이터를 사용하려면 console.log(records[i].data.custNo);
            jsonData.push(records[i].data);
       }
       console.log(Ext.encode(jsonData));

    },
    onUpdated:function(){
        // 호출메소드
        var me = this;
        var jsonData = [];
        var records = this.getViewModel().getStore('targetInfo').getUpdatedRecords();
        for (var i=0; i < records.length; i++){
            // 데이터를 사용하려면 console.log(records[i].data.custNo);
            jsonData.push(records[i].data);
       }
       console.log(Ext.encode(jsonData));

    },
    onModified:function(){
        // 호출메소드
        var me = this;
        var jsonData = [];
        var records = this.getViewModel().getStore('targetInfo').getModifiedRecords();
        for (var i=0; i < records.length; i++){
            // 데이터를 사용하려면 console.log(records[i].data.custNo);
            jsonData.push(records[i].data);
       }
       console.log(Ext.encode(jsonData));

    },
    onRemoved:function(){
        // 호출메소드
        var me = this;
        var jsonData = [];
        var records = this.getViewModel().getStore('targetInfo').getRemovedRecords();
        for (var i=0; i < records.length; i++){
            // 데이터를 사용하려면 console.log(records[i].data.custNo);
            jsonData.push(records[i].data);
       }
       console.log(Ext.encode(jsonData));

    },
    selectedCellList:[],
    onCellClick:function( tablepanel, td, cellIndex, record, tr, rowIndex, e, eOpts ){
        console.log('cellclick', arguments);
        var me = this;
        //if(eOpts.shiftKey==true){
        //    me.selectedCellList.splice(0,me.selectedCellList.length);
        //}
        //else {
            var isExist = false;
            for(var i=0; i< me.selectedCellList.length; i++){
                if(td == me.selectedCellList[i]){
                    me.selectedCellList.splice(i,1);
                    td.style.background='white';
                    isExist = true;
                    break;
                }
            }
            if(isExist == false){
                me.selectedCellList.push(td);
                td.style.background='yellow';
            }
        //}
    },
    onSelectedCellList:function(arg0,arg1, arg2, arg3, arg4, arg5, eOpt){
        var me = this;
        for(var i=0; i< me.selectedCellList.length; i++){
            console.log(me.selectedCellList[i].textContent);
        }
    }
})