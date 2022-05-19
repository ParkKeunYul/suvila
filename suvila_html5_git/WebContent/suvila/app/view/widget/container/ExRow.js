Ext.define('ExFrm.view.widget.container.ExRow', {
    extend: 'Ext.container.Container',
    xtype:'exrow',
	align:'center',
	exInitStr:"{    \n        xtype:'exrow',\n    }",
	cls:'exrow',
    margin:'0 0 0 0',
    padding:'0 0 0 0',
    minHeight:30,
    layout:{
        type:'hbox',
        align:'center',   
        height:'100%',
        labelAlign:'right'                
    }
})