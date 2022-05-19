Ext.define('ExFrm.view.rec.rec021w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.rec021w_01',
	requires:[
		'ExFrm.view.rec.rec021w_01Controller',
        'ExFrm.view.rec.rec021w_01Model'
	],
	controller:'rec021w_01',
	viewModel:{
        type:'rec021w_01'
    },
    name:'rec021w_01',
    isRootView:true,
    title:'현금출납장',
    closable:true,
    scrollable:true,
    items:[{
        xtype  :'exformmain',
        layout : 'hbox',
	    items:[{
	    	width : '0.5%'
	    },{
	    	layout : 'vbox',
	    	width  : '99%',
	    	items  :[{
	    		height : 15,
	    	},{
	    		layout : 'hbox',
	    		height : 30,
	    		items : [{
	    			html :'<span style="font-weight: 700;display:inline-block;line-height:24px;width:40px;">일자 :</span>',
	    		},{
		    		xtype          : 'exdatefield',
		    		/*fieldLabel     : ',
		    		labelAlign     : 'right',
		    		labelWidth     : 40,*/	    		            	
	                reference      : 'em_act_date',
	                name           : 'V_ACT_DATE',                                                   
	                exFormat       : 'Y/m/d',
	                exSubmitFormat : 'Ymd',
	                width          : 180
	    		},{
	        		width     : 20
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
	          		text      : '삭제',
		    	},{
	        		width     : 5
		    	},{
		    		xtype     : 'exbutton',
	          		reference : 'excelBtn',
	          		name      : 'excelBtn',
	          		handler   : 'onExcel',
	          		text      : '엑셀',
		    	},{
	        		width     : 5
		    	},{
		    		xtype     : 'exbutton',
	          		reference : 'saveBtn',
	          		name      : 'saveBtn',
	          		handler   : 'onSave',
	          		text      : '저장',
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
			         },{
			        	 xtype     : 'extextfield',
		       	 		 inputType : 'hidden',
		       	 		 reference : 'select_actdate',
		       	 		 name      : 'select_actdate',
		       	 		 width     : 0
			         }]
		    	}]
	    	},{
	    		height : 10
	    	},{
	    		width : '100%',
	    		exGroupRef  : true,
                xtype       : 'exgrid',
                reference   : 'rec021w_01_a',
                height      : 720,              
                plugins     : [{
                	ptype:'cellediting'
                },{
                	ptype: 'gridexporter'
                }],
                bind:{
                    store:'{ds_main}'
                },	                
                listeners      : {
                	///selectionchange : 'onSelectionChange'
                	celldblclick : 'onCellDbClick',
                //	beforeedit   : 'onBeforeedit',	    
                //	edit         : 'onEdit'
                },
                cls : 'acc001w_01_a',
                columns:[{	                	
	                text      :'날짜',
	            	xtype     :'excolumn',
	                dataIndex :'ACT_DATE',                    
	                exAlign   :'center',
	                flex      : 2,
	                renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                	meta.tdCls = 'cmsline';
	                	
	                	return exCommon.getGridDateFormat(value , ' / ');
	                }
                },{
                	text      :'구분',
                	xtype     :'excolumn',
                    dataIndex :'IE_GBN',                    
                    exAlign   :'center',
                    flex      : 1,
                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
                    	// 세입, 세출은 계정과목 선택으로 작동되야함	                    	
                    	meta.tdCls = 'cmsline';
                    	
                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_iegbn');
                    	return exCommon.getComboVal(value,store, '' );
                    }
                },{
                	text      :'계정과목',
                	xtype     :'excolumn',
                    dataIndex :'MOK_NAME',                    
                    exAlign   :'left',
                    flex      : 4,
                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                    	
                    	meta.tdCls = 'recCellEdit';
                    	
                    	return value;
                    }
                },{
                	text      :'금액',
                	xtype     :'excolumn',
                    dataIndex :'AMOUNT',                    
                    exAlign   :'right',
                    flex      : 2.4,
                    exType    : 'number',
                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = 'recCellEdit';
                    	
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
                },{
                	text      :'결제구분',
                	xtype     :'excolumn',
                    dataIndex :'APPROVAL_GBN',                    
                    exAlign   :'left',
                    flex      : 1.8,
                    exAlign   : 'center',
                    editor    : {
                        xtype         : 'excombobox',
                        valueField    : 'CODE',
                        displayField  : 'NAME',
                        exAlign       : 'center',
                        bind          : {
                            store:'{ds_payType}'
                        }
                    },
                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = 'recCellEdit';
                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_payType');
                    	return exCommon.getComboVal(value,store);
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
                        }
                    },
                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = 'recCellEdit';
                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_templeUser');
                    	return exCommon.getComboVal(value,store);                      	
                    }
                },{
                	text      :'비고',
                	xtype     :'excolumn',
                    dataIndex :'REMARK',                    
                    exAlign   :'left',
                    flex      : 5.2,
                    editor:{
                        xtype    : 'extextfield',
                    },
                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = 'recCellEdit';
                    	
                    	return value;
                    },
                }]
	    	}]
	    },{
	    	width : '0.5%'
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546