Ext.define('ExFrm.view.asp.asp012w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp012w_01',
	requires:[
		'ExFrm.view.asp.asp012w_01Controller',
        'ExFrm.view.asp.asp012w_01Model'
	],
	controller:'asp012w_01',
	viewModel:{
        type:'asp012w_01'
    },
    name:'asp012w_01',
    isRootView:true,
    title:'기부금영수증관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
	    	items:[{
	    		flex : 1
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'saveBtn',
          		name      : 'saveBtn',
          		handler   : 'onSave',
          		text      : '저장',
	    	},{
	    		width : '0.5%'
	    	}]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{        	
	        	width : '36%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout:'hbox',
	                xtype:'container',
	                height : 0,
	                items:[{                 
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'newData',
               	 		name      : 'newData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'uptData',
               	 		name      : 'uptData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'delData',
               	 		name      : 'delData',
               	 		width : 0
	                }]
	            },{            	
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp012w_01_a',
	                height:820,              
	               bind:{
	                    store:'{ds_templeCd}'
	                },
	               /* selModel: {
	                    mode: 'MULTI'
	                },*/
	                cls : 'asp012w_01_a',
	                listeners: {
	                	selectionchange : 'onSelectionChange'
	                },
	                columns:[{
	                	text:'순번',                        
	                    xtype:'rownumberer',
	                    align:'center',
	                    flex : 1,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.data.USE_YN_CHAR == 'F'){
	                    		meta.style = 'background-color:#C8C8C8;';
	                    	}
	                    	return (rowIndex+1);
	                    }
	                },{
	                	text:'사찰코드',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_CD',                    
	                    exAlign:'left',
	                    flex : 2,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.data.USE_YN_CHAR == 'F'){
	                    		meta.style = 'background-color:#C8C8C8;';
	                    	}
	                    	return value;
	                    }
	                },{
	                	text:'사찰명',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_NM',                    
	                    exAlign:'left',
	                    flex : 3,
	                    editor:{
	                        xtype:'extextfield',
	                    },
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.data.USE_YN_CHAR == 'F'){
	                    		meta.style = 'background-color:#C8C8C8;';
	                    	}
	                    	return value;
	                    }
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        },{
	        	width : '63%',
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{            	
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp012w_01_b',                
	                height:820,
	                bind:{
	                    store:'{ds_main}'
	                },
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                listeners: {
	                	itemdblclick : 'onCellDbClick'
	                },
	                columns:[{
	                	text:'순번',                        
	                    xtype:'rownumberer',
	                    align:'center',
	                    flex : 1,
	                },{
	                	text:'접수구분',
	                	xtype:'excolumn',
	                    dataIndex:'NAME',                    
	                    exAlign:'left',
	                    flex : 1
	                },{
	                	text:'출력내용',
	                	xtype:'excolumn',
	                    dataIndex:'HANG_NAME',                    
	                    exAlign:'left',
	                    flex : 6,
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});