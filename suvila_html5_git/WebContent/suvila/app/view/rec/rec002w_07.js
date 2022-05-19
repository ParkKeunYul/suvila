Ext.define('ExFrm.view.rec.rec002w_07',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_07',
    requires:[
    	'ExFrm.view.rec.rec002w_07Controller',
        'ExFrm.view.rec.rec002w_07Model',
        ,'ExFrm.view.rec.rec002w_08'
        ,'ExFrm.view.rec.rec002w_09'
        ,'ExFrm.view.rec.rec002w_11'
    ],
    controller:'rec002w_07',
    viewModel:{
        type:'rec002w_07'
    },
    name:'rec002w_07',
    isRootView:true,
    //title:'상시접수조회',
    header:false,
    //closable:true,
    closable:false,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{           
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items :[{
        	width : '0.5%'
        },{
        	width  : '99%',
        	layout : 'vbox',
        	items  : [{
        		height : 5
        	},{
        		hidden : true,
        		width : '100%',
        		items :[{
        			xtype        : 'radiogroup',
        			reference    : 'rdo_ApprovalGbn_r02_07',
        			name         : 'rdo_ApprovalGbn_r02_07',
        			width        : 210,
        			listeners    : {
        				change : 'onMenuChange'
        			},
            		items     :[{
        				boxLabel   : '기도/법회', 
                    	inputValue : 'rec002w_09',    
                    	width      : 90,
                    	reference  : 'rdo_ApprovalGbn1',
                    	checked    : true                    	
        			},{
        				boxLabel   : '불사', 
        				inputValue : 'rec002w_11',    
                    	width      : 60,
                    	reference  : 'rdo_ApprovalGbn3',
                    	
        			}]
        		}]
        		
        	},{
        		height : 5,
        	},{
        		reference:'content_manage',        
                flex    : 1,
                layout  :'fit',
                width   : '100%',
                height  : 810,
                items   :[{
                    xtype:'rec002w_09'
                }]
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
