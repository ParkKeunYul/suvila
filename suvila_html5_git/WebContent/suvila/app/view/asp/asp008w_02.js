Ext.define('ExFrm.view.asp.asp008w_02',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp008w_02',
	requires:[
		'ExFrm.view.asp.asp008w_02Controller',
        'ExFrm.view.asp.asp008w_02Model'
	],
	controller:'asp008w_02',
	viewModel:{
        type:'asp008w_02'
    },
    name:'asp008w_02',
    isRootView:true,
    title:'사찰회계 관리',
    closable:true,
    scrollable:true,
    items:[{
    	height : 10,
    },{    	
        xtype:'exformmain',       
        items:[{
        	xtype:'container',
	    	layout:'hbox',
	    	items:[{
	    		xtype:'excombobox',
            	fieldLabel:'일반회계',
            	labelWidth:60,
                valueField:'CODE',
                displayField:'NAME',
                reference:'lc_AcctGbn',
                name:'lc_AcctGbn',                    
                value : '1',
                width : 240,
                bind:{
                 	store:'{ds_AcctGbn}'
                },
                listeners : {
                	change : 'onKhmChange'
                }
	    	},{
	    		xtype     : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'txt_acct_gbn_nm',
       	 		name      : 'V_ACCT_GBN_NM',
       	 		value     : '일반회계',
       	 		width : 0
	    	},{
	    		width : 15
	    	},{
	    		xtype:'excombobox',
            	fieldLabel:'세출구분',
            	labelWidth:60,
                valueField:'CODE',
                displayField:'NAME',
                reference:'lc_IeGbn',
                name:'lc_IeGbn',                    
                value : 'I',
                width : 140,
                bind:{
                 	store:'{ds_IeGbn}'
                },
                listeners : {
                	change : 'onKhmChange'
                }
	    	},{
	    		width : 30
	    	},{
	    		xtype:'extextfield',
	    		fieldLabel:'변경할 회계명',
            	labelWidth:100,
            	reference:'txt_change_acct_gbn_nm',
            	enableKeyEvents: true,
            	width : 240,
            	listeners:{
             	   keyup : 'onSearchEnter'
                }
	    	},{
	    		width : 5
	    	},{
            	xtype : 'exbutton',
          		reference : 'topSaveBtn',
          		name : 'topSaveBtn',
          		handler : 'onTopSave',
          		text:'저장'  
	    	/*},{
	    		width : 5
	    	},{
            	xtype : 'exbutton',
          		reference : 'topSelectBtn',
          		name : 'topSelectBtn',
          		handler : 'onTopSelect',
          		text:'조회'  */
	    	}]
        },{
        	height : 10,        
        },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{        	
	        	width : '29.5%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout:'hbox',
	                xtype:'container',
	                height : '30',
	                items:[{                 
	                	flex : 1,
	                	html : '관',
	                },{
	                	xtype : 'exbutton',
	              		reference : 'addLeftBtn',
	              		name : 'addLeftBtn',
	              		handler : 'onAddLeft',
	              		text:'추가',  
	              		margin : '0 0 5 0'
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'delLeftBtn',
	              		name : 'delLeftBtn',
	              		handler : 'onDelLeft',
	              		text:'삭제',  
	              		margin : '0 0 5 0'
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'saveLeftBtn',
	              		name : 'saveLeftBtn',
	              		handler : 'onSaveKwan',
	              		text:'저장',  
	              		margin : '0 0 5 0'
	                 		 
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'addData',
               	 		name      : 'addData',
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
	                reference:'asp008w_02_a',
	                height:410,              
	                bind:{
	                    store:'{ds_kwan}'
	                },
	                listeners: {
	                	selectionchange : 'onSelectionChangeKwan',
	                	beforeedit      : 'beforeeditKwan'
	                	/*beforeedit: function(e, editor){
	                		console.log('editor', editor);
	                		
	                        if (editor.value != "" && editor.field == "KWAN_NAME"){
	                        	return false;
	                        }
	                    }*/
	                },
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                cls : 'asp008w_02_a',	                
	                columns:[{	                	
	                	text:'관',                        
	                    xtype:'excolumn',
	                    exAlign:'center',
	                    dataIndex: 'KWAN',
	                    flex : 1,
	                },{
	                	text:'관명',
	                	xtype:'excolumn',
	                    dataIndex:'KWAN_NAME',                    
	                    exAlign:'left',
	                    flex : 4,	    
	                    editor:{
                            xtype:'extextfield'
                        }
	                },{
	                	text:'건수',                        
	                    xtype:'excolumn',
	                    exAlign:'right',
	                    dataIndex: 'CNT',
	                    flex : 2,
	                },{
	                	text:'수비라',                        
	                    xtype:'excolumn',
	                    exAlign:'center',
	                    dataIndex: 'SUVILA_YN',
	                    flex : 2,
	                }]
	            },{     
	            	height:10,
	            },{
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp008w_02_d',
	                height:410,              
	                bind:{
	                    store:'{ds_kwan_detail}'
	                },
	                listeners: {},
	                cls : 'asp008w_02_d',	                
	                columns:[{	                	
	                	text:'사찰',                        
	                    xtype:'excolumn',
	                    exAlign:'center',
	                    dataIndex: 'TEMPLE_CD',
	                    flex : 1.5,
	              
	                },{
	                	text:'사찰명',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_NM',                    
	                    exAlign:'left',
	                    flex : 4,	    
	                }]
	            }]
	        },{
	        	width : '0.5%'
	        },{
	        	width : '29.5%',
        		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout:'hbox',
	                xtype:'container',
	                height : '30',
	                items:[{    
	                	flex : 1,
	                	html : '항',
	                },{
	                	xtype : 'exbutton',
	              		reference : 'addCenterBtn',
	              		name : 'addCenterBtn',	              		
	              		text:'추가',  
	              		margin : '0 0 5 0',
	              		handler : 'onAddHang',
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'delCenterBtn',
	              		name : 'delCenterBtn',	              		
	              		text:'삭제',  
	              		margin : '0 0 5 0',
	              		handler : 'onDelHang',
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'saveCenterBtn',
	              		name : 'saveCenterBtn',
	              		handler : 'onSaveCenter',
	              		text:'저장',  
	              		margin : '0 0 5 0',
	              		handler : 'onSaveHang',
	                }]
	            },{            	
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp008w_02_b',
	                height:410,              
	                bind:{
	                    store:'{ds_hang}'
	                },
	                listeners: {
	                	selectionchange : 'onSelectionChangeHang',
	                	beforeedit: 'beforeeditHang'
	                },
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                cls : 'asp008w_02_b',	                
	                columns:[{	                	
	                	text:'항',                        
	                    xtype:'excolumn',
	                    exAlign:'center',
	                    dataIndex: 'HANG',
	                    flex : 1,
	                },{
	                	text:'항명',
	                	xtype:'excolumn',
	                    dataIndex:'HANG_NAME',                    
	                    exAlign:'left',
	                    flex : 4,	    
	                    editor:{
                            xtype:'extextfield'
                        }
	                },{
	                	text:'건수',                        
	                    xtype:'excolumn',
	                    exAlign:'right',
	                    dataIndex: 'CNT',
	                    flex : 2,
	                },{
	                	text:'수비라',                        
	                    xtype:'excolumn',
	                    exAlign:'center',
	                    dataIndex: 'SUVILA_YN',
	                    flex : 2,
	                }]
	            },{     
	            	height:10,
	            },{	
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp008w_02_e',
	                height:410,              
	                bind:{
	                    store:'{ds_hang_detail}'
	                },
	                listeners: {
	                	/*selectionchange : 'onSelectionChange',
	                	beforeedit: function(e, editor){
	                        if (editor.value != "" && editor.field == "KWAN_NAME"){
	                        	return false;
	                        }
	                    }*/
	                },
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                cls : 'asp008w_02_e',	                
	                columns:[{	                	
	                	text:'사찰',                        
	                    xtype:'excolumn',
	                    exAlign:'center',
	                    dataIndex: 'TEMPLE_CD',
	                    flex : 1.5,
	              
	                },{
	                	text:'사찰명',
	                	xtype:'excolumn',
	                    dataIndex:'TEMPLE_NM',                    
	                    exAlign:'left',
	                    flex : 4	                    
	                }]
	            }]
	        },{
	        	width : '0.5%'
	        		
	        },{
	        	width : '39.5%',
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{            	
	        		layout:'hbox',
	                xtype:'container',
	                height : '30',
	                items:[{
	                	html : '목',
	                	flex : 1 ,
	                },{
	                	xtype : 'exbutton',
	              		reference : 'addRightBtn',
	              		name : 'addRightBtn',
	              		handler : 'onAddMok',
	              		text:'추가',  
	              		margin : '0 0 5 0'
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'saveRightBtn',
	              		name : 'saveRightBtn',
	              		handler : 'onSaveMok',
	              		text:'저장',  
	              		margin : '0 0 5 0'
	                /*},{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'txt_prompt_k',
               	 		name      : 'PROMPT_K',
               	 		width     : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'txt_prompt_h',
               	 		name      : 'PROMPT_H',
               	 		width     : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'txt_prompt_m',
               	 		name      : 'PROMPT_M',
               	 		width     : 0*/
	                }]
	            },{
	            	layout:{
		                type:'vbox',
		                align:'stretch'
		            },
		            items:[{
		            	exGroupRef:true,
		                xtype:'exgrid',
		                reference:'asp008w_02_c',                
		                height:410,
		                width : '70%',
		                bind:{
		                    store:'{ds_mok}'
		                },
		                plugins:[{
		                    ptype:'cellediting'
		                }],
		                listeners: {	
		                	selectionchange : 'onSelectionChangeMok',
		                	beforeedit: 'beforeeditMok',
		                	cellclick:'onMoveKhm'
		                },
		                columns:[{
		                	text:'목',                        
		                    xtype:'excolumn',
		                    exAlign:'center',
		                    dataIndex: 'MOK',
		                    flex : 1,
		                },{
		                	text:'목명',
		                	xtype:'excolumn',
		                    dataIndex:'MOK_NAME',                    
		                    exAlign:'left',
		                    flex : 3,
		                    editor:{
	                            xtype:'extextfield'
	                        }
		                },{
		                	text:'건수',                        
		                    xtype:'excolumn',
		                    exAlign:'center',
		                    dataIndex: 'CNT',
		                    flex : 1.5,
		                },{
		                	text:'수비라',                        
		                    xtype:'excolumn',
		                    exAlign:'center',
		                    dataIndex: 'SUVILA_YN',
		                    flex : 1.8,
		                },{
		                	xtype:'excolumn',
		                	dataIndex: 'CHANGE',		                    
		                    renderer: 'underLine',
		                    flex : 1.4,
		                    editor:{
	                            xtype:'extextfield',	                            
		                    },
		                },{
		                	text:'과목설명일괄변경',
		                	xtype:'excolumn',
		                    dataIndex:'REMARK',                    
		                    exAlign:'left',
		                    flex : 3.5,
		                    editor:{
	                            xtype:'extextfield'
		                    }
		                }]
		            },{
		            	height : 35,
		            	layout:{
			                type:'hbox'			              
			            },			            
			            items:[{
			            	flex : 1
			            },{
			            	xtype     : 'exbutton',
		              		reference : 'delAllBotBtn',
		              		name      : 'delAllBotBtn',
		              		handler   : 'onAllDelBot',
		              		text      : '전체삭제',  
		              		margin    : '10 0 0 0',
		              		handler   : 'onAllTableDel'
			            },{
			            	width : 5
			            },{
			            	xtype     : 'exbutton',
		              		reference : 'delBotBtn',
		              		name      : 'delBotBtn',
		              		handler   : 'onDelBot',
		              		text      : '삭제',  
		              		margin    : '10 0 0 0',
		              		handler   : 'onOneTableDel'
			            },{
			            	width : 5
			            },{
			            	xtype     : 'exbutton',
		              		reference : 'saveBotBtn',
		              		name      : 'saveBotBtn',
		              		handler   : 'onSaveBot',
		              		text      : '저장',  
		              		margin    : '10 0 0 0',
		              		handler   : 'onOneTableSave'
			            }]
		            },{
		            	exGroupRef:true,
		                xtype:'exgrid',
		                reference:'asp008w_02_f',                
		                height:190,
		                bind:{
		                    store:'{ds_mok_detail}'
		                },
		                plugins:[{
		                    ptype:'cellediting'
		                }],
		                listeners: {
		                	beforeedit: 'beforeeditMokDetail'
		                },
		                columns:[{
		                	text:'사찰',                        
		                    xtype:'excolumn',
		                    exAlign:'center',
		                    dataIndex: 'TEMPLE_CD',
		                    flex : 1
		                },{
		                	text:'사찰명',                        
		                    xtype:'excolumn',
		                    exAlign:'left',
		                    dataIndex: 'TEMPLE_NM',
		                    flex : 1
		                },{
		                	text:'목명',                        
		                    xtype:'excolumn',
		                    exAlign:'left',
		                    dataIndex: 'MOK_NAME',
		                    editor:{
	                            xtype:'extextfield'
	                        },
		                	flex : 1.5
		                },{
		                	text:'설명',
		                	xtype:'excolumn',
		                    dataIndex:'REMARK',                    
		                    exAlign:'left',		                 
		                    editor:{
	                            xtype:'extextfield'
	                        },
	                        flex : 3
		                }]
		            },{
		            	height : 5
		            },{
		            	exGroupRef:true,
		                xtype:'exgrid',
		                reference:'asp008w_02_g',                
		                height:190,
		                bind:{
		                    store:'{ds_mok_use}'
		                },
		                plugins:[{
		                    ptype:'cellediting'
		                }],
		                listeners: {
		                	beforeedit: function(e, editor){
		                        if (editor.value != "" && editor.field == "HANG_NAME"){
		                        	return false;
		                        }
		                    }
		                },
		                columns:[{
		                	text:'사찰',                        
		                    xtype:'excolumn',
		                    exAlign:'center',
		                    dataIndex: 'TEMPLE_CD',
		                    flex : 1.5
		                },{
		                	text:'사찰명',                        
		                    xtype:'excolumn',
		                    exAlign:'left',
		                    dataIndex: 'TEMPLE_NM',
		                    flex : 2
		                },{
		                	text:'사용테이블명',                        
		                    xtype:'excolumn',
		                    exAlign:'left',
		                    dataIndex: 'TABLE_NAME',
		                	flex : 3
		                },{
		                	text:'최종사용일',
		                	xtype:'excolumn',
		                    dataIndex:'LAST_DATE',                    
		                    exAlign:'left',
	                        flex : 1.8
		                },{
		                	text:'건수',                        
		                    xtype:'excolumn',
		                    exAlign:'center',
		                    dataIndex: 'CNT',
		                    flex : 1
		                }]
		            }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});