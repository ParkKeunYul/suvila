Ext.define('ExFrm.view.widget.column.ExWidgetColumn', {
    extend: 'Ext.grid.column.Widget',
    xtype:'exwidgetcolumn',
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
});