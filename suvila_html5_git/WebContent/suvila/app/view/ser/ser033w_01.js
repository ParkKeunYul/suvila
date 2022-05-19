Ext.define('ExFrm.view.ser.ser033w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.ser033w_01',
	requires:[
		'ExFrm.view.ser.ser033w_01Controller',
        'ExFrm.view.ser.ser033w_01Model'
	],
	controller:'ser033w_01',
	viewModel:{
        type:'ser033w_01'
    },
    name:'ser033w_01',
    isRootView:true,
    title:'기부금출력관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10,
	    },{
	    	height : 5
	    },{
	    	layout : 'hbox',
	    	items  : [{
	    		flex : 1,
	    		html  : '<div style="padding-left:10px;">출력내용에 내용이 없는 경우 <span style="color:red;">기부금</span>으로 출력됩니다</div>',
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		text      : '조회',
          		handler   : 'onSelect',
	    	},{
    			width : 5
    		},{
    			xtype     : 'exbutton',
          		reference : 'saveBtn',
          		name      : 'saveBtn',
          		text      : '저장',
          		handler   : 'onSave',
    		},{
    			width : 0,
    			heigth: 0,
    			items : [{
    				xtype     : 'extextfield',
	       	 		inputType : 'hidden',
	       	 		reference : 'newData',
	       	 		name      : 'newData',
	       	 		width     : 0
	        	},{
	       	 		xtype     : 'extextfield',
	       	 		inputType : 'hidden',
	       	 		reference : 'uptData',
	       	 		name      : 'uptData',
	       	 		width     : 0
	        	},{
	       	 		xtype     : 'extextfield',
	       	 		inputType : 'hidden',
	       	 		reference : 'delData',
	       	 		name      : 'delData',
	       	 		width     : 0
	    		}]
	    	}]
	    },{
	    	height : 10,
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
	        		exGroupRef : true,
	                xtype      : 'exgrid',
	                reference  : 'ser033w_01_a',
	                height     : 620,              
	                plugins    :[{
	                	 ptype        :'cellediting'
	                	,clicksToEdit : 1
	                }],
	                bind      : {
	                    store:'{ds_main}'
	                },
	                cls       : 'ser033w_01_a  none-dirty-grid',
	                columns   : [{
	                	text      :'발송자',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME',                    
	                    exAlign   :'left',
	                    width     : 200,
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellNotEdit';
	                    	return value;
	                    }
	                },{
	                	text      :'발송내역',
	                	xtype     :'excolumn',
	                    dataIndex :'DONATION_NM',                    
	                    exAlign   :'left',
	                    width     : 270,
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellEdit';
	                    	return value;
	                    },
	                    editor       : {
	                    	xtype         : 'extextfield',
	                    },
	                },{
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    width     : 350,
	                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'recCellEdit';
	                    	return value;
	                    },
	                    editor       : {
	                    	xtype         : 'extextfield',
	                    },
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546