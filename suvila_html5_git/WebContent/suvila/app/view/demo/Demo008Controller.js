Ext.define('ExFrm.view.demo.Demo008Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.demo008',
    downloadRecord:[],
    onSearchItems:function(params){
        var me = this;
        me.callAjax(me, './json/demo008.json', '', me.onSearchItemsCallback)
    },
    onSearchItemsCallback:function(me, success, res, record){
        if(success == true){
            me.downloadRecord = record;
            var cols = Number(record.data.info.cols);
            var rows = Number(record.data.info.rows);
            me.setGridData(cols, rows);
        }
    },
    onChangeMatrix:function(){
        var cols = this.lookupReference('cols').getValue();
        var rows = this.lookupReference('rows').getValue();
        this.setGridData(cols, rows);
    },
    setGridData:function(cols, rows){
        var me = this;
        var grid = me.lookupReference('mygrid');
        if(grid.columnManager.columns != null){
            for(var i= grid.columnManager.columns.length-1; i> 0; i--){
                grid.headerCt.remove(grid.columnManager.columns[i]);
            }
        }
        me.getViewModel().getStore('testInfo').removeAll();
        for(var i=0; i< cols; i++){
            me.lookupReference('mygrid').headerCt.add({
                dataIndex:'num' + i,
                text:(i+1),
                renderer:function(value, meta, record,  rowIndex, colIndex){
                    console.log('renderer', arguments, (rowIndex * cols + i));
                    if(record.get('state' + (colIndex-1)) == '1'){  // 컬럼이 하나 있으므로
                        meta.style='background-color:yellow';
                    }
                    else if(record.get('state' + (colIndex-1))  == '2'){
                        meta.style='background-color:red';
                    }
                    else {
                        meta.style='background-color:white'; 
                    }
                    return value;
                }
            });
        }
        // 레코드 & 설정치 중 최소값.
        var strRecord = '{';
        for(var i=0; i< me.downloadRecord.data.list.length && i < (cols * rows); i++){
            var state = me.downloadRecord.data.list[i].state;
            strRecord += '"num' + (i % cols) + '":' + (i+1) + ', "state' + (i % cols) + '":"' + state + '", "cols":' + cols;
            if( (i != 0 && i % cols == cols-1 ) || i == me.downloadRecord.data.list.length -1 || i == (cols*rows)-1 ){
                console.log('>>>>>', i);
                // 데이터 넣기
                strRecord += '}';
                me.getViewModel().getStore('testInfo').add(Ext.decode(strRecord));
                strRecord = '{';
            }
            else {
                strRecord += ',';
            }
        }
        for(var i=me.downloadRecord.data.list.length; i< (cols * rows); i++){
            console.log('레코드 이외의 추가분');
            var state = '0';
            strRecord += '"num' + (i % cols) + '":' + (i+1) + ', "state' + (i % cols) + '":"' + state + '", "cols":' + cols;
            if( (i != me.downloadRecord.data.list.length && i % cols == cols-1 ) || i == (cols * rows) -1 ){
                console.log('>>>>>', i);
                // 데이터 넣기
                strRecord += '}';
                me.getViewModel().getStore('testInfo').add(Ext.decode(strRecord));
                strRecord = '{';
            }
            else {
                strRecord += ',';
            }
        }
    },

})