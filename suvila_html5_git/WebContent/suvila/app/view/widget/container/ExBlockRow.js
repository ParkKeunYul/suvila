Ext.define('ExFrm.view.widget.container.ExBlockRow', {
    extend: 'Ext.container.Container',
    xtype:'exblockrow',
    bodyStyle:'background-color:blue',
	align:'center',
	exInitStr:"{    \n        xtype:'exblockrow',\n    }",
	cls:'exblockrow',
    margin:'0 0 0 0',
    padding:'0 0 0 0',
    layout:{
        type:'hbox',
        align:'center',   
        height:'100%'                 
    }
    /*    
    defaults:{                    
        margin:'0 0 0 0',
        layout:{
            type:'hbox',
            align:'center',   
            height:30                 
        }
    } 
    */   
})