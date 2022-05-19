Ext.define('ExFrm.view.widget.column.ExColumnWidgetCombo', {
    extend: 'Ext.grid.column.Widget',
    xtype:'excolumnwidgetcombo',    
    style: 'text-align:center',
    cls : 'excolumnwidgetcomboWidth',
    exDisplayField:'',
    exValueField:'',
    exBindStore:'',
    /*width : '100%',*/
    /*
    widget: {
        record:{},
        xtype:'combo',
        displayField:this.exDisplayField,
        valueField:this.exValueField,
        bind:{
            store:this.exBindStore
        },
        listeners:{
            select:function(){
                this.record.set(this.exValueField, this.getValue());
            }
        }
    },
    */
    onWidgetAttach:function(col, widget, rec){
        widget.record = rec;
        widget.col = col;
        //widget.setValue(rec.get(col.dataIndex));
        widget.onWidgetAttachAfter(col, widget, rec);
        
    },
    onWidgetAttachUser:function(me, col, widget, rec){
        //console.log('..');
    },
    initComponent:function(){
        var me = this;
        if(me.exBindStore != null && me.exBindStore !== ''){
            me.widget = {
                record:{},
                xtype:'combo',
                col:{},
                displayField:me.exDisplayField,
                valueField:me.exValueField,
                bind:{
                    store:'{' + me.exBindStore + '}',
                },
                onWidgetAttachAfter:function(col, widget, rec){
                    widget.setValue(rec.get(col.dataIndex));
                    me.onWidgetAttachUser(me, col,widget, rec);
                },
                getDisplayText:function(param){
                    var store = this.getStore();
                    var index = -1;
                    index = store.find(me.exValueField,param);
                    if(index != -1){
                        var record = store.getAt(index);
                        return record.data[me.exDisplayField];
                    }
                    return '';    	
                },
                listeners:{
                    select:function(){
                //        console.log('select:::', this.col.dataIndex, this.getValue());
                        this.record.set(this.col.dataIndex, this.getValue());
                        me.fireEvent('select', me, this.getValue(), this.getDisplayText(this.getValue()), this.record, this.col)
                    }
                }
            };        
            this.callParent(arguments);
        }
        else if(me.exDataColumn != null && me.exDataColumn != ''){
            me.widget = {
                record:{},
                xtype:'combo',
                col:{},
                store:{
                    field:['display', 'value'],
                    data:[
                    ]
                },
                displayField:me.exDisplayField,
                valueField:me.exValueField,
                onWidgetAttachAfter:function(col, widget, rec){
                    console.log('after', rec.get(me.exDataColumn));
                    widget.getStore().setData(rec.get(me.exDataColumn));
                    widget.setValue(rec.get(col.dataIndex));
                    me.onWidgetAttachUser(me, col,widget, rec);
                },
                getDisplayText:function(param){
                    var store = this.getStore();
                    var index = -1;
                    index = store.find(me.exValueField,param);
                    if(index != -1){
                        var record = store.getAt(index);
                        return record.data[me.exDisplayField];
                    }
                    return '';    	
                },
                listeners:{
                    select:function(){
                        console.log('select:::', this.col.dataIndex, this.getValue());
                        this.record.set(this.col.dataIndex, this.getValue());
                        me.fireEvent('select', me, this.getValue(), this.getDisplayText(this.getValue()), this.record, this.col)
                    }
                }
            };        
            this.callParent(arguments);  
        }
        else {
            me.widget = {
                record:{},
                xtype:'combo',
                col:{},
                //store:new Ext.data.Store(),
                displayField:me.exDisplayField,
                valueField:me.exValueField,

                onWidgetAttachAfter:function(col, widget, rec){
                    widget.setValue(rec.get(col.dataIndex));
                    me.onWidgetAttachUser(me, col,widget, rec);
                },
                getDisplayText:function(param){
                    var store = this.getStore();
                    var index = -1;
                    index = store.find(me.exValueField,param);
                    if(index != -1){
                        var record = store.getAt(index);
                        return record.data[me.exDisplayField];
                    }
                    return '';    	
                },
                listeners:{
                    select:function(){
                        console.log('select:::', this.col.dataIndex, this.getValue());
                        this.record.set(this.col.dataIndex, this.getValue());
                        me.fireEvent('select', me, this.getValue(), this.getDisplayText(this.getValue()), this.record, this.col)
                    }
                }
            };        
            this.callParent(arguments);  
        }
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