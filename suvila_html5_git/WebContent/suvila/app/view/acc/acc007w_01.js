Ext.define('ExFrm.view.acc.acc007w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc007w_01',
	requires:[
		'ExFrm.view.acc.acc007w_01Controller',
        'ExFrm.view.acc.acc007w_01Model'
	],
	controller:'acc007w_01',
	viewModel:{
        type:'acc007w_01'
    },
    name:'acc007w_01',
    isRootView:true,
    title:'기간별결산',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10,
	    },{
    		layout : 'hbox',
    		height : 30,
        	items : [{
	    		xtype          : 'exdatefield',
	    		fieldLabel     : '<span style="font-weight: 700;">마감일자</span>',
	    		labelAlign     : 'right',
	    		labelWidth     : 70,	    		            	
                reference      : 'em_sDate',
                name           : 'V_SACT_DATE',                                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
        	},{
	    		width : 20,
	    		html : '<div style="text-align:center;">~</div>' 
	    	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_eDate',
                name           : 'V_EACT_DATE',                                   
                width          : 170,
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
        		width     : 5
	    	},{
            	xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_acctGbn',
                name         : 'V_ACCT_GBN',                    
                emptyText    : '전체',
                fieldLabel   : '<span style="font-weight: 700;">회계구분</span>',
                labelAlign   : 'right',
                labelWidth   : 70,
                width        : 230,
                value        : 1,
                bind         : {
                 	store:'{ds_acctGbn}'
                },
	    	},{
	    		width     : 10
	    	},{
	    		xtype     : 'exbutton',
          		handler   : 'onSelect',
          		text      : '조회',	    	
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		handler   : 'onSave',
          		text      : '저장',
        	}]
	      },{
	    	 height : 0,
	    	 items :[{
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
	     },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{      
	        	width : '0.5%',
	        },{
	        	width : '48%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">마감내역</div>',
	            },{
	        		exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'acc007w_01_a',
	                height      : 820,
	                selModel    : {
	                    mode: 'MULTI'
	                },
	                bind        :{
	                    store:'{ds_temple}'
	                },
	                cls : 'acc007w_01_a',
	                columns:[{	
	                	text      :'작성일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_DATE',                    
	                    exAlign   :'center',
	                    width     : 90,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("CHONGMU_GBN") == "2" || record.get("CHONGMU_GBN") == "1"){
	                    		meta.style = 'background-color:#b3cee3;';
	                    	}
	                    	return exCommon.getGridDateFormat(value , '-');
	                    }
	                },{
	                	text      :'결의서번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_NO',                    
	                    exAlign   :'center',
	                    width     : 110,	
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("CHONGMU_GBN") == "2" || record.get("CHONGMU_GBN") == "1"){
	                    		meta.style = 'background-color:#b3cee3;';
	                    	}
	                    	return value;
	                    }
	                },{
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'left',
	                    width     : 95,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("CHONGMU_GBN") == "2" || record.get("CHONGMU_GBN") == "1"){
	                    		meta.style = 'background-color:#b3cee3;';
	                    	}
	                    	return value;
	                    }
	                },{
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'IE_GBN_NM',                    
	                    exAlign   :'center',
	                    width     : 70,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("CHONGMU_GBN") == "2" || record.get("CHONGMU_GBN") == "1"){
	                    		meta.style = 'background-color:#b3cee3;';
	                    	}
	                    	return value;
	                    }
	                },{
	                	text      :'계정과목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("CHONGMU_GBN") == "2" || record.get("CHONGMU_GBN") == "1"){
	                    		meta.style = 'background-color:#b3cee3;';
	                    	}
	                    	return value;
	                    }
	                },{
	                	text      :'금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT',                    
	                    exAlign   :'left',
	                    width     : 110,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("CHONGMU_GBN") == "2" || record.get("CHONGMU_GBN") == "1"){
	                    		meta.style = 'background-color:#b3cee3;';
	                    	}
	                    	return exCommon.setNumberFormat(value);
	                    }
	                },{
	                	text      :'영수인',
	                	xtype     :'excolumn',
	                    dataIndex :'USER_NM',                    
	                    exAlign   :'left',
	                    width     : 80,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("CHONGMU_GBN") == "2" || record.get("CHONGMU_GBN") == "1"){
	                    		meta.style = 'background-color:#b3cee3;';
	                    	}
	                    	return value;
	                    }
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    width     : 100,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("CHONGMU_GBN") == "2" || record.get("CHONGMU_GBN") == "1"){
	                    		meta.style = 'background-color:#b3cee3;';
	                    	}
	                    	return value;
	                    }
	                }]
	            }]// 가운데	      
	        },{
	        	width : '3%',
	        	xtype:'container',
                layout: {
                    type: 'vbox',
                    pack :'center',
                    align: 'center',
                }, 
                height : '100%',
                items:[{
            		items:[{    
	                	xtype     : 'exbutton',
	              		handler   : 'onRightMoveOne',
	              		text      : '>',
	              		width     : 35,
	              		flex      : 1,
	              		exAlign   : 'center'
            		},{
            			height    : 20
            		},{
            			xtype     : 'exbutton',
	              		handler   : 'onLeftMoveOne',
	              		text      : '<',
	              		width     : 35,
	              		flex      : 1,
	              		exAlign   : 'center'
            		},{
            			height : 20
	                },{
	                	xtype     : 'exbutton',
	              		handler   : 'onRightMoveALL',
	              		text      : '>>',
	              		width     : 35,
	              		flex      : 1,         
	              		exAlign   : 'center'
	                },{
            			height : 20
	                },{
	                	xtype     : 'exbutton',
	              		reference : 'onLeftMoveAllBtn',
	              		name      : 'onLeftMoveOneAllBtn',
	              		handler   : 'onLeftMoveALL',
	              		text      : '<<',
	              		width     : 35,
	              		flex :      1,         
	              		exAlign   : 'center'
	                }]
                }]
	        },{
	        	width : '48%',
	        	layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout : 'hbox',
	            	items  : [{
	            		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">신청내역</div>',
	            	},{
	            		width : 10
	            	},{
	            		xtype     : 'exbutton',
	              		handler   : 'onAdd',
	              		text      : '추가',
	            	}]
	            	
	            },{
	        		exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'acc007w_01_b',
	                height      : 820,              
	                plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
	                selModel    : {
	                    mode: 'MULTI'
	                },
	                bind:{
	                    store:'{ds_chongmu}'
	                },
	                listeners      : {
	                	beforeedit   : 'onBeforeedit',	   
	                	celldblclick : 'onCellDbClick',
                    },
	                cls : 'acc007w_01_b',
	                columns:[{	
	                	text      :'작성일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_DATE',                    
	                    exAlign   :'center',
	                    width     : 90,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	try{
                        		return exCommon.getGridDateFormat(value );
                        	}catch (e) {
								return "";
							}
	                    },
	                    editor:{
	                        xtype    : 'exdatefield',
	                        exFormat : 'Y/m/d',
                            exSubmitFormat : 'Ymd',
                        },
	                },{
	                	text      :'결의서번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_NO',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	return value;
	                    }
	                },{
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'left',
	                    width     : 95,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	return value;
	                    }
	                },{
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'IE_GBN_NM',                    
	                    exAlign   :'left',
	                    width     : 70,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	return value;
	                    }
	                },{
	                	text      :'계정과목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	return value;
	                    }
	                },{
	                	text      :'금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT',                    
	                    exAlign   :'left',
	                    width     : 110,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#FFFFFF;';
	                    	
	                    	return exCommon.setNumberFormat(value);
	                    },
	                    editor:{
	                        xtype    : 'extextfield',
                        },
	                },{
	                	text      :'영수인',
	                	xtype     :'excolumn',
	                    dataIndex :'USER_NM',                    
	                    exAlign   :'left',
	                    width     : 80,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	return value;
	                    }
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    width     : 100,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	return value;
	                    }
	                }]
	            }]// 가운데	
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});