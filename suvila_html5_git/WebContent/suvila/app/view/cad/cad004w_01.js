Ext.define('ExFrm.view.cad.cad004w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.cad004w_01',
	requires:[
		'ExFrm.view.cad.cad004w_01Controller',
        'ExFrm.view.cad.cad004w_01Model'
	],
	controller:'cad004w_01',
	viewModel:{
        type:'cad004w_01'
    },
    name:'cad004w_01',
    isRootView:true,
    title:'신규등록',
    closable:true,
    scrollable:true,
    items:[{    	    
        xtype:'exformmain',
	    items:[{
	    	height : 15,
	    },{
    		layout : 'hbox',
    		width  : '100%',
    		items  : [{
    			width : 10
    		},{
    			//flex   : 1,
    			layout : 'vbox',
    			items  : [{
    				layout  : 'hbox', 
    				items   : [{
    					xtype      :'extextfield',
    	                fieldLabel :'<span style="font-weight: 700;">성명</span>',
    	                reference  :'txt_keyword',
    	                name       :'V_NAME_KOR',
    	                labelAlign :'right',                        
    	                labelWidth :45,
    	                enableKeyEvents: true,                
    	                width : 150,
    	                listeners:{
    	            	   keyup : 'onSearchEnter'
    	                }
    		    	},{
    		    		width : 10
    		    	},{
    		    		html:'<div style="text-align:left;padding-left:5px;font-weight:700;margin-top:3px;">발송구분 : </div>',
    		    		width : 70,
    		    	},{
    		    		xtype:'radiogroup',
    		    		name :'tb_Radio',
    					reference : 'tb_Radio',
    					items :[{
    						boxLabel: '발송', 
    	                	inputValue: 1,    
    	                	width : 60,
    	                	checked: true
    					},{
    						boxLabel: '미발송', 
    	                	inputValue: 2,    
    	                	width : 60,
    		    		}]
    		    	},{
    		    		width : 10
    		    	},{
    		    		xtype       : 'exdatefield',
    		    		fieldLabel  : '<span style="font-weight: 700;">발송일</span>',
    		    		labelWidth  : 60,	    		            	
    	                reference   :'em_sDate',
    	                name        : 'em_sDate',                                                   
    	                exFormat    : 'Y/m/d',
    	                exSubmitFormat : 'Ymd',
    		    	},{
    		    		width : 20,
    		    		html : '<div style="text-align:center;font-wegiht:700;line-height:25px;">~</div>' 
    		    	},{
    		    		xtype:'exdatefield',
    	                reference:'em_eDate',
    	                name:'em_eDate',                                   
    	                width : 170,
    	                exFormat : 'Y/m/d',
    	                exSubmitFormat : 'Ymd',
    		    	},{
    		    		width : 10
    		    	},{
    	    			xtype     : 'exbutton',
    	          		reference : 'onSelectBtn',
    	          		name      : 'onSelectBtn',
    	          		handler   : 'onSelect',
    	          		text      : '조회',
    	    		},{
    	    			width : 3
    	    		},{
    	    			xtype     : 'exbutton',
    	          		reference : 'onExcelBtn',
    	          		name      : 'onExcelBtn',
    	          		handler   : 'onExcel',
    	          		text      : '엑셀',
    	    		},{
    	            	xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'newData',
    	       	 		name      : 'newData',
    	       	 		width : 0
    				}]
    			},{
    				height : 10
    			},{
    				
    				items:[{
            		    exGroupRef:true,
    	                xtype:'exgrid',
    	                reference:'cad004w_01_a',
    	                height:720,
    	                width:'100%',
    	                bind:{
    	                    store:'{ds_main}'
    	                },
    	                listeners:{
    	                    selectionchange : 'onSelectionChange'
    		            },
    	                plugins:[{	                
    	                	ptype: 'gridexporter'	               
    	                }],
    	                columnLines: true,
    	                cls : 'grid-group',		               
    	                columns:[{
    	                	text:'발송일',
    	                	xtype:'excolumn',
    	                    dataIndex:'TR_SENDDATE',	                    
    	                    exAlign:'center',
    	                    width : 110,     
    	                    sortable : true,
    	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
    	                    	return exCommon.getFormat(value , 'dateYMD');
    	                    }
    	                },{
    	                	text:'성명',
    	                	xtype:'excolumn',
    	                    dataIndex:'NAME_KOR',	                    
    	                    exAlign:'left',
    	                    width : 120,
    	                    sortable : true
    	                },{
    	                	text:'전화번호',
    	                	xtype:'excolumn',
    	                    dataIndex:'TR_PHONE',	                    
    	                    exAlign:'center',
    	                    width : 120,
    	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
    	                    	return exCommon.getFormat(value , 'cell');
    	                    	
    	                    }
    	                },{
    	                	text:'상태',
    	                	xtype:'excolumn',
    	                    dataIndex:'TR_SENDSTAT',	                    
    	                    exAlign:'left',
    	                    width : 150,
    	                    sortable : true
    	                },{
    	                	text:'구분',
    	                	xtype:'excolumn',
    	                    dataIndex:'TR_MSG_GB',	                    
    	                    exAlign:'center',
    	                    width : 80,
    	                    sortable : true,
    	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
    	                    	if(value == 'SMS'){
    	                    		return "단문"
    	                    	}else{
    	                    		return "장문"
    	                    	}
    	                    }
    	                },{
    	                	text:'내용',
    	                	xtype:'excolumn',
    	                    dataIndex:'TR_MSG',	                    
    	                    exAlign:'left',
    	                    flex : 1,
    	                    width : 350,
    	                    sortable : true
    	                }]
    	             }]
    			}]
    		},{
    			width : 10,
    		},{
    			width  : 300,
    			layout : 'vbox',
	        	items  : [{
	        		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">SMS 내용</div>',
	        	},{
	        		height : 5
	        	},{
	        		 xtype:'extextarea',
        			 reference:'ta_msg',
                     name:'TR_MESSAGE',
                     height : 395,
                     width : 285,
	        	}]
    		}]
			
    	}]
    }]/*exformmain*/ 
});