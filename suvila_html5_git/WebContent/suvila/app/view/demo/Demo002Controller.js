Ext.define('ExFrm.view.demo.Demo002Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.demo002',
    onCalled:function(params){
         //this.lookupReference('custNameSrch').setValue(params.name);
         this.onSearchItems();
    },
    onMainInfo:function(params){
        var me = this;
        
        me.callStore(me, 'mainInfo', '', params, me.onMainInfoCallback)
    },
    onMainInfoCallback:function(me, success, records, operation){
        if(success == true){
        }
    },
    onDetailInfo:function(params){
        var me = this;
        
        me.callStore(me, 'detailInfo', 'detailGridArrows', params, me.onDetailInfoCallback)
    },
    onDetailInfoCallback:function(me, success, records, operation){
        if(success == true){
        }
    },
    onSearchItems:function(){
        this.callAjax(this,'./extra/json/view/demo/demo002_treedata.json',{}, this.onTreeDataCallback);
    },
    onTreeDataCallback:function(me, success, res, record){
        console.log('record', arguments);
        var data = record.data.info;
       // me.lookupReference('extreepanelajax').setData(data);
    },
    onHelp:function(){},
    onMainGridClick:function( tablepanel, record, item, index, e, eOpts ){
        var me = this;
    var params = {};
         me.callStore(me, 'detailInfo', '', params, me.detailInfoCallback);
    },
    detailInfoCallback:function(me, success, records, operation){
    },
    // 여러건도 가능 multi
    onSelectGrid1:function(){
        var selection = this.lookupReference('selectGrid1').getView().getSelectionModel().getSelection();
        console.log(selection[0]);

    },
    onDeleteGrid1:function(){
        console.log('삭제');
        var me = this;
        var selection = this.lookupReference('selectGrid1').getView().getSelectionModel().getSelection();
        me.lookupReference('selectGrid1').getStore().remove(selection[0]);
    },
    onAddGrid1:function(){
        var me = this;
        var selection = this.lookupReference('selectGrid1').getView().getSelectionModel().getSelection();
        var data = {
            custNo:999,
            custName:'홍길동'
        };
        me.lookupReference('selectGrid1').getStore().add(data);
    },
    onInsertGrid1:function(){
        var me = this;
        console.log('insert');
        //var selection = this.lookupReference('selectGrid1').getView().getSelectionModel().getSelection();
        var data = {
            custNo:999,
            custName:'홍길동'
        };
        me.lookupReference('selectGrid1').getStore().insert(0,Ext.data.Record.create(data));
        //console.log(selection);
    },
    onUpdateGrid1:function(){
        var me = this;
        var selection = this.lookupReference('selectGrid1').getView().getSelectionModel().getSelection();
        selection[0].set('custName', '변경');

    },
    onSelectGrid2:function(){
        var selection = this.lookupReference('selectGrid2').getView().getSelectionModel().getSelection();
        console.log(selection);
    }
})