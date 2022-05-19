Ext.define('ExFrm.view.ser.ser026w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.ser026w_01',
	requires:[
		'ExFrm.view.ser.ser026w_01Controller',
        'ExFrm.view.ser.ser026w_01Model'
	],
	controller:'ser026w_01',
	viewModel:{
        type:'ser026w_01'
    },
    name:'ser026w_01',
    isRootView:true,
    title:'접수취소내역관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 15,
	    },{
    		layout : 'hbox',
    		height : 30,
        	items : [{
	    		xtype          : 'extextfield',
                fieldLabel     : '<span style="font-weight:700;">성(한글)</span>',
                reference      : 'txt_sung',
                name           : 'bon',
                labelAlign     : 'right',                        
                labelWidth     : 60,
                exLabel        : '검색어',
                enableKeyEvents: true,
                width          : 200,
                listeners:{
            	   keyup : 'onSearchEnter'
                }
	    	},{
        		width : 10
	    	},{
	    		xtype          : 'extextfield',
                fieldLabel     : '<span style="font-weight:700;">본(한글)</span>',
                reference      : 'txt_bon',
                name           : 'sung',
                labelAlign     : 'right',                        
                labelWidth     : 60,
                exLabel        : '본(한글)',
                enableKeyEvents: true,
                width          : 200,
                listeners:{
            	   keyup : 'onSearchEnter'
                }
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		handler   : 'onSelect',
          		text      : '조회',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'addBtn',
          		name      : 'addBtn',
          		handler   : 'onAdd',
          		text      : '추가',
	    	},{
        		width     : 5	    	
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'deleteBtn',
          		name      : 'deleteBtn',
          		handler   : 'onDelete',
          		text      : '취소',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'saveBtn',
          		name      : 'saveBtn',
          		handler   : 'onSave',
          		text      : '저장',
	    	},{
	    		layout    : 'hbox',
	    		hidden    : true,
	    		items     : [{
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
        	}]
	     },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{      
	        	width : '0.5%',
	        },{
	        	width : '99%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	        		exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'ser026w_01_a',
	                cls           : 'ser026w_01_a',
	                height        : 790,
	                plugins       : [{
	                    ptype        :'cellediting',
	                    clicksToEdit : 1
	                }],
	                bind:{
	                    store:'{ds_main}'
	                },
	                listeners:{
	                	beforeedit      : 'beforeedit' 
		            },
	                
	                columns:[{
	                	text      :'성(한글)',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    flex      : 1,	   
	                    sortable  : true,
	                    editor    : {
	                        xtype:'extextfield'
	                    }
	                },{
	                	text      :'성(한문)',
	                	xtype     :'excolumn',
	                    dataIndex :'ETC1',                    
	                    exAlign   :'left',
	                    flex      : 1,
	                    sortable  : true,
	                    editor    : {
	                        xtype:'extextfield'
	                    }
	                },{
	                	text      :'본(한글)',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME',                    
	                    exAlign   :'left',
	                    flex      : 1,
	                    sortable  : true,
	                    editor    : {
	                        xtype:'extextfield'
	                    }
	                },{
	                	text      :'본(한문)',
	                	xtype     :'excolumn',
	                    dataIndex :'ETC2',                    
	                    exAlign   :'left',
	                    flex      : 1,
	                    sortable  : true,
	                    editor    : {
	                        xtype:'extextfield'
	                    }
	                }]
	            },{
	            	height : 10
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});