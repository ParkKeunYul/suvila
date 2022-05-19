Ext.define('ExFrm.view.com.group_add_mouse',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.com.group_add_mouseController',
    	'ExFrm.view.com.group_add_mouseModel'
    ],
    controller:'group_add_mouse',
    viewModel:{
        type:'group_add_mouse'
    },
    isModal:true,
    name:'group_add_mouse',
    title:'',
    closable:true,
    width:280,
    height:170,
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
    		html : '<div>분류그룹명을 입력하세요.</div>'
    	},{
    		height : 5
    	},{
    		xtype      : 'extextfield',
    		width      : 200,
    		reference  : 'txt_group_nm',
    		name       : 'CLASS_NAME',
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
                handler   : 'onGroupSave',
                text      : '저장',
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