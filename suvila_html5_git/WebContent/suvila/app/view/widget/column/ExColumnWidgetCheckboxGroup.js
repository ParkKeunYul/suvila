Ext.define('ExFrm.view.widget.column.ExColumnWidgetCheckboxGroup', {
    extend: 'Ext.grid.column.Widget',
    xtype:'excolumnwidgetcheckboxgroup',    
    style: 'text-align:center',
    exDisplayField:'',
    exValueField:'',
    exBindStore:'',
    setExValues:function(arry){
        this.widget.setExValues(arry);
    },
    getExValues:function(){
        return this.widget.getExValues();
    },
    onWidgetAttachUser:function(me,col, widget, rec){
        console.log('여기는 아님2');
    },
    onWidgetAttachStore:function(store, col, widget, rec){
        var records = store.getData().getRange();
        console.log('records>>>>>', store, col, widget, rec) ;
        widget.record = rec;
        widget.col = col;
        //console.log('recordssss', records);
        for(var i=0; i < records.length; i++){
            //console.log('...', records[i]);
            widget.htmlContent = widget.htmlContent + 
                '<input type="checkbox" value="' + records[i].data[widget.exValueField] + '"> ' + records[i].data[widget.exDisplayField] + ' ';
        }
        widget.setHtml(widget.htmlContent);  
            //widget.setExValues(widget.record.get(me.exValueField)); 
        //me.addListener('afterrender', function(){
        setTimeout(function(){
           // console.log('afterrender widget');
            var obj = Ext.query('input[type=checkbox]', true, widget.getEl().dom);
            //console.log('obj', obj);
            if(obj != null && obj != undefined){
                for(var i=0; i < obj.length; i++){
                    obj[i].onchange = function(event){
                        //console.log('arguments', arguments);
                        //event.target.name
                        me.fireEvent('select', widget, obj, event);
                    };
                }
            }
            //debugger; 
            //console.log('widget.record.get(me.exValueField)',me.exValueField, widget.record.get(me.exValueField));
            if(col.dataIndex == null || col.dataIndex == ''){
                return;
            }
            console.log('widget.record.get(col.dataIndex)', col.dataIndex, widget.record.get(col.dataIndex));
            widget.setExValues(widget.record.get(col.dataIndex));
        }, 100);
    },
    onWidgetAttach:function(col, widget, rec){
        var me = this;
        console.log('attach', arguments);
        widget.record = rec;
        widget.col = col;  
        //console.log('widget.exDataColumn ', widget.exDataColumn );
        if(widget.exDataColumn != null && widget.exDataColumn != ''){
            //var store = this.up('[isRootView=true]').getViewModel().getStore(me.exBindStore);
            //console.log('store', store);
            //debugger;
            //var records = store.getData().getRange();
           // widget.getStore().setData(rec.get(me.exDataColumn));
            //var records = store.getData().getRange();
            //rec.get(me.exDataColumn)
            //console.log('records--------------->', rec);
            var columnObj = rec.data[widget.exDataColumn];
            //console.log('records--------------->', columnObj);
            for(var i=0; i < columnObj.length; i++){
                //console.log('...', columnObj[i]);
                var temp = columnObj[i];
                widget.htmlContent = widget.htmlContent + 
                    '<input type="checkbox" value="' + temp[widget.exValueField] + '"> ' + temp[widget.exDisplayField] + ' ';
            }
            widget.setHtml(widget.htmlContent);  
 
                //widget.setExValues(widget.record.get(me.exValueField)); 
            //me.addListener('afterrender', function(){
            setTimeout(function(){
                //console.log('afterrender widget');
                var obj = Ext.query('input[type=checkbox]', true, widget.getEl().dom);
                //console.log('obj', obj);
                if(obj != null && obj != undefined){
                    for(var i=0; i < obj.length; i++){
                        obj[i].onchange = function(event){
                            //console.log('arguments', arguments);
                            //event.target.name
                            me.fireEvent('select', widget, obj, event);
                        };
                    }
                }
                //console.log('widget.record.get(me.exValueField)', me.exValueField, widget.record.get(me.exValueField));
                //console.log('widget.record.get(col.dataIndex)', col.dataIndex, widget.record.get(col.dataIndex));
                widget.setExValues(widget.record.get(col.dataIndex));
            }, 100);
        }
        else if(me.exBindStore != null && me.exBindStore != ''){
            var store = this.up('[isRootView=true]').getViewModel().getStore(me.exBindStore);
            //console.log('store', store);
            //debugger;
            var records = store.getData().getRange();
            //console.log('records', records);
            for(var i=0; i < records.length; i++){
                //console.log('...', records[i]);
                widget.htmlContent = widget.htmlContent + 
                    '<input type="checkbox" value="' + records[i].data[widget.exValueField] + '"> ' + records[i].data[widget.exDisplayField] + ' ';
            }
            widget.setHtml(widget.htmlContent);  
                //widget.setExValues(widget.record.get(me.exValueField)); 
            //me.addListener('afterrender', function(){
            setTimeout(function(){
                //console.log('afterrender widget');
                var obj = Ext.query('input[type=checkbox]', true, widget.getEl().dom);
                //console.log('obj', obj);
                if(obj != null && obj != undefined){
                    for(var i=0; i < obj.length; i++){
                        obj[i].onchange = function(event){
                            //console.log('arguments', arguments);
                            //event.target.name
                            me.fireEvent('select', widget, obj, event);
                        };
                    }
                }
                //console.log('widget.record.get(me.exValueField)', me.exValueField, widget.record.get(me.exValueField));
                //console.log('widget.record.get(col.dataIndex)', col.dataIndex, widget.record.get(col.dataIndex));
                widget.setExValues(widget.record.get(col.dataIndex));
            }, 100);
        }
        else {
            widget.onWidgetAttachAfter(col, widget, rec);
        }
        //});    
        
        //                     
        //}
    },
    initComponent:function(){
        var me = this;
        this.widget = {
            xtype:'container',
            record:{},
            col:-1,
            exDataColumn:me.exDataColumn,
            exDisplayField:this.exDisplayField,
            store:new Ext.data.Store(),
            html:'', 
            htmlContent:'',
            listeners:{
                /*
                afterrender:function(){
                    console.log('init afterrender');
                    var obj = Ext.query('input[type=checkbox]', true, me.getEl().dom);
                    console.log('obj', obj);
                    if(obj != null && obj != undefined){
                        for(var i=0; i < obj.length; i++){
                            obj[i].onchange = function(event){
                                console.log('arguments', arguments);
                                //event.target.name
                                me.fireEvent('exClick', event);
                            };
                        }
                    }
                    console.log(me.widget);
                    me.widget.setExValues(me.widget.record.get(me.exValueField));             
                },
                select:function(){
                    me.widget.record.set(me.exValueField, me.widget.getValue());
                    me.fireEvent('select', me, me.widget.getValue(), me.widget.record, col)
                }
                */
            },
            onWidgetAttachAfter:function(col, widget, rec){
                //console.log('onWidgetAttachAfter>>')
                me.onWidgetAttachUser(me,col, widget, rec )
            },
            onWidgetAttachUser:function(me,col, widget, rec){
                //console.log('여기는 아님');
            },
            getExValues:function(option){
                //console.log(this.getEl().dom);
                //debugger;
                //console.log(Ext.query('input[type=checkbox]', true, this.getEl().dom));
                var comp = Ext.query('input[type=checkbox]', true, this.getEl().dom);
                if(option != null && option == ','){
                    var ret = '';
                    var retCnt = 0;
                    for(var i=0; i < comp.length; i++){
                        //console.log(comp[i]);
                        if(comp[i].checked == true){
                            if(retCnt == 0)
                                ret = comp[i].value;
                            else
                                ret = ret + ',' + comp[i].value;
                            retCnt++;
                        }
                    }
                    //console.log(ret);
                    return ret;
                }
                else if(option == null){
                    var ret = [];
                    var retCnt = 0; 
                    for(var i=0; i < comp.length; i++){
                        //console.log(comp[i]);
                        if(comp[i].checked == true){
                            ret.push(comp[i].value);
                        }
                    }
                    //console.log(ret);
                    return ret;
                }
            },
            setExValues:function(arry){
                // 콤마(,) 와 arry 모두 처리
                var arryChg = '';
                if( Object.prototype.toString.call( arry ) === '[object Array]' ){
                    for(var i=0; i < arry.length; i++){
                        if(i==0){
                            arryChg = arry[i];
                        }
                        else {
                            arryChg = arryChg + ',' + arry[i];
                        }
                    }
                }
                //console.log('arry', arry);
                var input = arry.split(',');
                //console.log(input);
                var obj = Ext.query('input[type=checkbox]', true, this.getEl().dom);
            
                for(var i=0; i < obj.length; i++){
                    for(var j=0; j < input.length; j++){
                        //console.log(obj[i].value, input[j]);
                        if(obj[i].value == input[j]){	
                            obj[i].checked=true;
                        }
                    }
                }
            },            
        };        
        this.callParent(arguments);
    },
    renderer: function (value, meta, record, rowIndex, colIndex, store, view) {
        var headerCt = this.getHeaderContainer();
        var column = headerCt.getHeaderAtIndex(colIndex);        
        if(view.grid.exGroupFields != null && view.grid.exGroupFields.length > 0){
            meta.tdCls = 'exspanline';
        }
		value = column.onRenderer(value, value, meta, record, rowIndex, colIndex, store, view);
        return value;
    },
	onRenderer:function (orgValue, value, meta, record, rowIndex, colIndex, store, view){
		return value;
	},      
})