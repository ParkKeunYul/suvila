Ext.define('ExFrm.view.acc.acc001w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc001w_01',
	requires:[
		'ExFrm.view.acc.acc001w_01Controller',
        'ExFrm.view.acc.acc001w_01Model'
	],
	controller:'acc001w_01',
	viewModel:{
        type:'acc001w_01'
    },
    name:'acc001w_01',
    isRootView:true,
    title:'재무결산',
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
        		width : 10
        	},{
        		html : '<span style="font-weight: 700;line-height:25px;">일자 : </span>'
        	},{
        		width : 3
        	},{
	    		xtype          : 'exdatefield',
	    		//fieldLabel     : '<span style="font-weight: 700;">일자</span>',
	    		//labelAlign     : 'right',
	    		//labelWidth     : 60,	    		            	
                reference      : 'me_ActDate',
                name           : 'V_ACT_DATE',                                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
        		width     : 20
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		handler   : 'onSelect',
          		text      : '가져오기',	    	
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
          		text      : '삭제',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'saveBtn',
          		name      : 'saveBtn',
          		handler   : 'onSave',
          		text      : '결산처리',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'excelBtn',
          		name      : 'excelBtn',
          		handler   : 'onExcel',
          		text      : '파일저장및 출력',
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
	    	  layout : 'hbox',
	    	  height : 30,
	    	  items : [{
	    		  layout : 'hbox',
	    		  flex   : 1,
		    	  items  : [{
		    		  xtype          : 'extextfield',
		 	    	  fieldLabel     : '<span style="font-weight: 700;">총 세입</span>',
		 	    	  labelAlign     : 'right',
		 	    	  labelWidth     : 80,	    		            	
		              reference      : 'me_acctGbnIn',
		              name           : 'me_acctGbnIn',
		              exReadOnly     : true,
		              exType         : 'number',
		              exAlign        : 'right'
		    	  },{
		    		  xtype          : 'extextfield',
		 	    	  fieldLabel     : '<span style="font-weight: 700;">총 세출</span>',
		 	    	  labelAlign     : 'right',
		 	    	  labelWidth     : 80,	    		            	
		              reference      : 'me_acctGbnOut',
		              name           : 'me_acctGbnOut',
		              exReadOnly     : true,
		              exType         : 'number',
		              exAlign        : 'right'
		    	  },{
		    		  xtype          : 'extextfield',
		 	    	  fieldLabel     : '<span style="font-weight: 700;">이전 누적금액</span>',
		 	    	  labelAlign     : 'right',
		 	    	  labelWidth     : 120,	    		            	
		              reference      : 'me_Amount',
		              name           : 'me_Amount',
		              exReadOnly     : true,
		              exType         : 'number',
		              exAlign        : 'right'
		    	  }]
	    	  },{
	    		  layout : 'hbox',
	    		  items : [{
	    			    xtype     : 'exbutton',
	            		reference : 'upBtn',
	            		name      : 'upBtn',
	            		handler   : 'onUpRow',
	            		iconCls   : 'fa fa-angle-up',
	    		  },{
	    			  width : 5
	    		  },{
	    			    xtype     : 'exbutton',
	            		reference : 'downBtn',
	            		name      : 'downBtn',
	            		handler   : 'onDownRow',	            		
	            		iconCls   : 'fa fa-angle-down',
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
	        		exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'acc001w_01_a',
	                height      : 820,              
	                plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                },{
	                	ptype: 'gridexporter'
	                }],
	                bind:{
	                    store:'{ds_main}'
	                },
	                features      : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  
                    }],
	                listeners      : {
	                	celldblclick : 'onCellDbClick',
	                	edit         : 'onEdit',
	                	beforeedit   : 'onBeforeedit',	
                    },
	                cls : 'acc001w_01_a',
	                columns:[{	                	
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'IE_GBN',                    
	                    exAlign   :'center',	                    
	                    width     : 100,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_iegbn');
	                    	return exCommon.getComboVal(value,store, '' );
	                    }
	                },{
	                	text      :'작성일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_DATE',                    
	                    exAlign   :'center',
	                    width     : 120,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	return exCommon.getGridDateFormat(value , ' / ');
	                    }
	                },{
	                	text      :'결의서번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_NO',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    exAlign   : 'center',
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	return value;
	                    }
	                },{
	                	text      :'계정과목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    width     : 220,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("OLD_YN") == "T"){
	                    		meta.style = 'background-color:#F6F9FD;';
	                    	}else{
	                    		meta.style = 'background-color:#FFFFFF;';
	                    	}
	                    	
	                    	return value;
	                    }
	                },{
	                	text      :'금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT',                    
	                    exAlign   :'right',
	                    width     : 130,
	                    exType    : 'number',
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	if(record.get("SQL_MODE") != "I"){
	                    		meta.style = 'background-color:#F6F9FD;';
	                    	}else{
	                    		meta.style = 'background-color:#FFFFFF;';
	                    	}
	                    	return exCommon.setNumberFormat(value);
	                    },
	                    editor    : {
	                    	xtype         : 'extextfield',
	                    	/*listeners : {
		                        change : function(field, newValue,o ,e) {
		                            console.log(field);
		                        }
		                    }*/
	                    },
	                    summaryType  : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
                        },
	                },{
	                	text      :'누적금액',
	                	xtype     :'excolumn',
	                    dataIndex :'SUM_AMOUNT',                    
	                    exAlign   :'right',
	                    width     : 130,
	                    exType    : 'number',
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	return exCommon.setNumberFormat(value);
	                    }
	                },{
	                	text      :'영수인',
	                	xtype     :'excolumn',
	                    dataIndex :'USER_ID',                    
	                    exAlign   :'left',
	                    width     : 150,
	                    exAlign   : 'left',
	                    editor    : {
	                        xtype         : 'excombobox',
	                        valueField    : 'USER_ID',
	                        displayField  : 'USER_NM',
	                        exAlign       : 'center',
	                        bind          : {
	                            store:'{ds_templeUser}'
	                        }
                        },
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	meta.style = 'background-color:#FFFFFF;';
	                        
	                        var store = this.up('[isRootView=true]').getViewModel().getStore('ds_templeUser');
	                    	return exCommon.getComboVal(value,store, 'user' , 'USER_ID' , 'USER_NM' );
	                        
	                    }
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    width     : 300,
	                    editor:{
	                        xtype    : 'extextfield',
                        },
                        renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.style = 'background-color:#FFFFFF;';
	                    	
	                    	return value;
	                    },
	                }]
	            }]	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});