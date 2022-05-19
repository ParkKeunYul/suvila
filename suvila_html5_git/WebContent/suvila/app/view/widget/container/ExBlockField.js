Ext.define('ExFrm.view.widget.container.ExBlockField', {
    extend: 'Ext.container.Container',
    xtype:'exblockfield',
    bodyStyle:'background-color:blue',
	align:'center',
	exInitStr:"{    \n        xtype:'exblockfield',\n    }",
	cls:'exblockfield',
	flex:1,
    padding:'0 5 0 5',
    style:'background-color:white;border-right-color:#ced9ec;border-right-width:1px;border-right-style:solid;border-bottom-color:#ced9ec;border-bottom-width:1px;border-bottom-style:solid;',
    style:'background-color:white;border-right-color:#ced9ec;border-right-width:1px;border-right-style:solid;border-bottom-color:#ced9ec;border-bottom-width:1px;border-bottom-style:solid;',
    
    //
    minHeight:30,
    //height:'100%',
    //bodyStyle:'background-color:white',
    //style:'background-color:lightblue;border-right-color:black;border-right-width:1px;border-right-style:solid;',
    layout:{
        type:'hbox',
        align:'center',   
        //height:30                 
    }    
})