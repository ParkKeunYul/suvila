Ext.define('ExFrm.view.widget.container.ExBlockLabel', {
    extend: 'Ext.container.Container',
    xtype:'exblocklabel',
    bodyStyle:'background-color:blue',
	align:'center',
	exInitStr:"{    \n        xtype:'exblocklabel',\n        html:'아이템'\n    }",
	cls:'exblocklabel',
	width:100,
	//bodyStyle:'top:5px',
	padding:'5 0 0 0',
    //style:'top:5px;valign:middle;display:inline-block;text-align:center;background-color:lightblue;border-right-color:black;border-right-width:1px;border-right-style:solid;',
    //style:'display:inline-block;text-align:center;background-color:lightblue;border-right-color:black;border-right-width:1px;border-right-style:solid;border-bottom-color:black;border-bottom-width:1px;border-bottom-style:solid;',
	style:'display:inline-block;text-align:center;background-color:#f6f9fd;border-right-color:#ced9ec;border-right-width:1px;border-right-style:solid;border-bottom-color:#ced9ec;border-bottom-width:1px;border-bottom-style:solid;',
	//style:'display:inline-block;text-align:center;background-color:#3892d4;border-right-color:black;border-right-width:1px;border-right-style:solid;border-bottom-color:black;border-bottom-width:1px;border-bottom-style:solid;',
	
	height:'100%',
    //minHeight:30,
	layout:{
		type:'hbox',
		align:'center'
	}
	
})