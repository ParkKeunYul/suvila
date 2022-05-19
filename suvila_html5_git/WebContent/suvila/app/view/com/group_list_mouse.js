Ext.define('ExFrm.view.com.group_list_mouse',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.com.group_list_mouseController',
    	'ExFrm.view.com.group_list_mouseModel'
    ],
    controller:'group_list_mouse',
    viewModel:{
        type:'group_list_mouse'
    },
    isModal:true,
    name:'group_list_mouse',
    title:'그룹명 선택',
    closable:true,
    width:280,
    height:380,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype  : 'exformmain',
        width  : '99.8%',
        cls    : 'exformmain',
        layout : {
            type:'vbox',
            align:'center'
        },
        items  :[{
        	height : 5
        },{
        	exGroupRef : true,
            xtype      :'exgrid',
            reference  :'group_list_mouse_a',
            cls        :'group_list_mouse_a',
            height     : 280,
            width      : '100%',
            bind       : {
                store:'{ds_classMgt}'
            },            
            listeners:{
               // selectionchange : 'onSelectionChange'
            },
            columns:[{
            	text       : '그룹명',
            	xtype      : 'excolumn',
                dataIndex  : 'CLASS_NAME',	                    
                exAlign    : 'left',
                flex       : 5,                     
            }]
    	},{
    		hidden : true,
    		layout : 'hbox',
    		items  : [{
    			xtype     : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'newData',
       	 		name      : 'newData',	       	 		
        	},{
       	 		xtype     : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'uptData',
       	 		name      : 'uptData',
        	},{
       	 		xtype     : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'delData',
       	 		name      : 'delData',
    		}]
    	},{
    		height : 5
    	},{
    		width  : '100%',
    		layout :{
    			 type : 'hbox',
    			 pack : 'center'
    		},
    		items  : [{
    			xtype     : 'exbutton',
                handler   : 'onGroupListSave',
                text      : '선택그룹에  추가',
    		},{
    			width : 5
    		},{
    			xtype     : 'exbutton',
                handler   : 'onClose',
                text      : '닫기',
    		}]
        },{
        	height : 5
        }]
        
    }]
})