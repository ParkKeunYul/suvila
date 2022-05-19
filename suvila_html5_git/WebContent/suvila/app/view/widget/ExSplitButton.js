Ext.define('ExFrm.view.widget.ExSplitButton', {
    extend: 'Ext.button.Split',
    xtype:'exsplitbutton',    
    cls:'exsplitbutton',
    exInitStr:"{xtype:'exsplitbutton', text:'버튼',\n         menu:[{text:'Menu Item 1'},{text:'Menu Item 2'},{text:'Menu Item 3'}]}"
})