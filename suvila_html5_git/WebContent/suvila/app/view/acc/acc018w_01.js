Ext.define('ExFrm.view.acc.acc018w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc018w_01',
	requires:[
		'ExFrm.view.acc.acc018w_01Controller',
        'ExFrm.view.acc.acc018w_01Model'
	],
	controller:'acc018w_01',
	viewModel:{
        type:'acc018w_01'
    },
    name:'acc018w_01',
    isRootView:true,
    title:'현금출납삭제',
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
        		width : '0.5%',
        	},{
        		html : '<span style="font-weight: 700;line-height:25px;">마감일 : </span>'
        	},{
        		width : 3
        	},{
	    		xtype          : 'exdatefield',
                reference      : 'me_ActDate',
                name           : 'V_ACT_DATE',                                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
        		width     : 20
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		handler   : 'onSelect',
          		text      : '조회',	    	
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'addBtn',
          		handler   : 'onAdd',
          		text      : '추가',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'addBtn',
          		handler   : 'onSave',
          		text      : '저장',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'excelBtn',
          		name      : 'excelBtn',
          		handler   : 'onExcel',
          		text      : '파일 저장 및 출력',
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
	        	width : '99%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	        		exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'acc018w_01_a',
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
	                listeners      : {
	                	///selectionchange : 'onSelectionChange'
	                	celldblclick : 'onCellDbClick',
	                	beforeedit   : 'onBeforeedit',	    
	                	//edit         : 'onEdit'
                    },
	                cls : 'acc018w_01_a',
	                columns:[{	                	
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'IE_GBN',                    
	                    exAlign   :'center',
	                    flex      : 1,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	// 세입, 세출은 계정과목 선택으로 작동되야함	                    	
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_iegbn');
	                    	return exCommon.getComboVal(value,store, '' );
	                    }
	                },{
	                	text      :'작성일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_DATE',                    
	                    exAlign   :'center',
	                    flex      : 2,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.style = 'background-color:#F6F9FD;';
	                    	
	                    	return exCommon.getGridDateFormat(value , ' / ');
	                    }
	                },{
	                	text      :'결의서번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_NO',                    
	                    exAlign   :'left',
	                    flex      : 2,
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
	                    flex      : 4,
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
	                    flex      : 2.4,
	                    exType    : 'number',
	                    editor    : {
	                        xtype    : 'extextfield',
                        },	         
                        renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("OLD_YN") == "T"){
	                    		meta.style = 'background-color:#F6F9FD;';
	                    	}else{
	                    		meta.style = 'background-color:#FFFFFF;';
	                    	}
	                    	
	                    	return exCommon.setNumberFormat(value);
	                    }
	                },{
	                	text      :'영수인',
	                	xtype     :'excolumn',
	                    dataIndex :'USER_ID',                    
	                    exAlign   :'left',
	                    flex      : 1.8,
	                    exAlign   : 'center',
	                    editor    : {
	                        xtype         : 'excombobox',
	                        valueField    : 'USER_ID',
	                        displayField  : 'USER_NM',
	                        exAlign       : 'center',
	                        bind          : {
	                            store:'{ds_templeUser}'
	                        },
	                        emptyText     : '선택'
                        },
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	if(record.get("OLD_YN") == "T"){
	                    		meta.style = 'background-color:#F6F9FD;';
	                    	}else{
	                    		meta.style = 'background-color:#FFFFFF;';
	                    	}
	                    	
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_templeUser');
	                        var index = store.find('USER_ID',value);
	                        if(index != -1){
	                            return store.getAt(index).get('USER_NM');
	                        } else {
	                        	
	                        	if(record.get("SQL_MODE") == "I" ){
	                        		return store.getAt(0).get('USER_NM');
	                        	}else{
	                        		return "";
	                        	}
	                        }                        	
	                    }
	                },{
	                	text      :'적요',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    flex      : 5.2,
	                    editor:{
	                        xtype    : 'extextfield',
                        },
                        renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("OLD_YN") == "T"){
	                    		meta.style = 'background-color:#F6F9FD;';
	                    	}else{
	                    		meta.style = 'background-color:#FFFFFF;';
	                    	}
	                    	
	                    	return value;
	                    },
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});