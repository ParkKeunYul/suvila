Ext.define('ExFrm.view.com.msgBox',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.msgBox',
    requires:[
    	'ExFrm.view.com.msgBoxController',
    	'ExFrm.view.com.msgBoxModel'
    ],
    controller:'msgBox',
    viewModel:{
        type:'msgBox'
    },
    isModal:true,
    name:'msgBox',
    title:'경고창',
    closable:true,
    width:300,
    height:200,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{        
        layout:{
            type:'vbox',
            align:'stretch'
        },
        items:[
        {
            layout:'hbox',
            items:[{
                flex:1,
                layout:{
                    type:'vbox',
                    align:'stretch'
                },                
                items:[{
                    layout:'vbox',
                    items:[{
                        html:'팝업리스트'
                    },{
                    	xtype : 'exbutton',                		
                		name : 'confirmBtn',
                		handler : 'confirmBtn',
                		text:'확인',                		
                    }]                
                }]
            }]
        }]
    }]
        
    
})