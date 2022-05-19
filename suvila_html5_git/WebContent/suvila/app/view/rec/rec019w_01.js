Ext.define('ExFrm.view.rec.rec019w_01',{
    extend: 'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec019w_01',
    requires:[
    	'ExFrm.view.rec.rec019w_01Controller'
       ,'ExFrm.view.rec.rec019w_01Model'       
    ],
    controller:'rec019w_01',
    viewModel:{
        type:'rec019w_01'
    },
    name:'rec019w_01',
    isRootView:true,
    title:'불전함수거',
    closable:true,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
    	height : 10
    },{
    	xtype  :'exformmain',
        layout : 'hbox',
    	items  : [{
    		width : '0.5%'
    	},{
    		width  : '64%',
    		layout : 'vbox',
    		items  :[{
    			layout : 'hbox',
    			items  :[{
    				html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">수거현황</span>',
    			},{
    				width          : 20,
    			},{
    				html           : '<div style="font-weight: 700;line-height:25px;">수거기간</div>',
    			},{
    				width          : 10
    			},{
        			xtype          : 'exdatefield',        			
        			labelWidth     : 60,        			
                    reference      : 'me_AcceptSDate',
                    name           : 'ACCEPT_S_DATE',                                                   
                    format         : 'Y-m-d',
        		},{
        			html :'<div style="text-align:center;width:20px;line-height:25px;">~</div>',
        			width : 20
        		},{
        			xtype          : 'exdatefield',
                    reference      : 'me_AcceptEDate',
                    name           : 'ACCEPT_E_DATE',                                                   
                    format         : 'Y-m-d',
        		},{
        			width : 10,
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 50,
                    fieldLabel   : '<span style="font-weight: 700;">접수자</span>',
                    width        : 200,
                    valueField   : 'USER_ID',
                    displayField : 'USER_NM',     
                    reference    :'lc_templeUser',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_templeUser}'
                	}
        		},{
        			width     : 10
        		},{
        			xtype     : 'exbutton',
              		reference : 'selectBtn',
              		name      : 'selectBtn',
              		text      : '조회',
              		handler   : 'onSelect',
        		},{
        			width     : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'addBtn',
              		name      : 'addBtn',
              		text      : '추가',
              		handler   : 'onAdd',
        		},{
        			width     : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'saveBtn',
              		name      : 'saveBtn',
              		text      : '저장',
              		handler   : 'onSave',
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'excelBtn',
              		name      : 'excelBtn',
              		text      : '엑셀',
              		handler   : 'onExcel',
        		},{
        			width : 0,
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
        	         },{
                     	xtype     : 'extextfield',
            	 		inputType : 'hidden',
            	 		reference : 'ds_user',
            	 		name      : 'ds_user',
            	 		width     : 0
        			}]
    			}]
    		},{
    			height : 5
    		},{
    			exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec019w_01_a',
                cls           : 'rec019w_01_a none-dirty-grid',
                height        : 820,
                width         : '100%',
                bind          : {
                    store:'{ds_detail}'
                },
                plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                },{
                	ptype: 'gridexporter'
                }],
                listeners      : {
                	 beforeedit      : 'onBeforeEdit'
                	,selectionchange : 'onSelectionChange'
                },
                features      : [{
                	ftype : 'summary',
                	dock  : 'bottom'  // 하단 잠금
                }],
                columns:[{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    width       : 60,
                    align       : 'center',
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = "recCellNotEdit";
                    	return (rowIndex+1);
                    }
                },{
                	text        : '접수번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'ACCEPT_SEQ',                    
                    exAlign     : 'center',
                    width       : 160,
                    sortable    : true,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = "recCellNotEdit";
                    	return value;
                    }
                },{
                	text        : '접수일',
                	xtype       : 'excolumn',
                    dataIndex   : 'ACCEPT_SEQ',                    
                    exAlign     : 'center',
                    width       : 100,
                    sortable    : true,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = "recCellNotEdit";
                    	
                    	var ACCEPT_SEQ = exCommon.getRepVal(value+"" , '');
                    	if(ACCEPT_SEQ == ''){
                    		return;
                    	}
                    	
                    	ACCEPT_SEQ = ACCEPT_SEQ.substring(0, 8);
                    	//return ACCEPT_SEQ;
                    	return exCommon.getGridDateFormat(ACCEPT_SEQ, '/' , 8);
                    }
                },{
                	text        : '불전함명',
                	xtype       : 'excolumn',
                    dataIndex   : 'SEQ_NO',                    
                    exAlign     : 'left',
                    width       : 90,
                    sortable    : true,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	
                    	if(record.get("SQL_MODE") == 'I'){
                    		meta.tdCls = "recCellEdit";
                    	}else{
                    		meta.tdCls = "recCellNotEdit";
                    	}
                    	
                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_mgt');
                    	return exCommon.getComboVal(value,store, 'user', 'SEQ_NO' , 'BUD_BOX_NM');
                    },
                    editor        : {
                    	xtype        : 'excombobox',
                        valueField   : 'SEQ_NO',
                        displayField : 'BUD_BOX_NM',
                        emptyText    : '선택',
                        bind:{
                            store:'{ds_mgt}'
                        }
                    },
                },{
                	text         :'금액',
                    xtype        :'excolumn',
                    dataIndex    :'AMOUNT',
                    width        : 100,
                    exAlign      : 'right',
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("SQL_MODE") == 'I'){
                    		meta.tdCls = "recCellEdit";
                    	}else{
                    		meta.tdCls = "recCellNotEdit";
                    	}
                       	 return exCommon.setNumberFormat(value);
                    },
                    editor        : {
                    	xtype         : 'extextfield',
                    },
                },{
                	text         :'비고',
                    xtype        :'excolumn',
                    dataIndex    :'REMARK',
                    flex         : 1,
                    exAlign      : 'left',
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("SQL_MODE") == 'I'){
                    		meta.tdCls = "recCellEdit";
                    	}else{
                    		meta.tdCls = "recCellNotEdit";
                    	}
                       	 return value;
                    },
                    editor        : {
                    	xtype         : 'extextfield',
                    },
                }]
    		}]
    	},{
    		width : '1%'
    	},{
    		width  : '34%',
    		layout : 'vbox',
    		items  : [{
    			layout : 'hbox',
    			width  : '100%',
    			items  : [{
        			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">수거동참자</span>',
        			flex : 1
        		},{
        			xtype     : 'exbutton',
              		reference : 'confirmBtn',
              		name      : 'confirmBtn',
              		text      : '수거확인',
              		handler   : 'onConfirm',
        		}]
    		},{
    			height : 5
    		},{
    			exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec019w_01_b',
                cls           : 'rec019w_01_b none-dirty-grid',
                height        : 392,
                width         : '100%',
                bind          : {
                    store:'{ds_user}'
                },
                columns:[{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    width       : 60,
                    align       : 'center',
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("CLOSE_YN") == "T"){
                    		meta.tdCls = 'useYnBack'
                    	}
                    	return (rowIndex+1);
                    }
                },{
                	text        : '성명',
                	xtype       : 'excolumn',
                    dataIndex   : 'USER_NM',                    
                    exAlign     : 'left',
                    width       : 150,
                    sortable    : true,
                }]
    		},{
    			height : 5
    		},{
    			layout : 'hbox',
    			width  : '100%',
    			items  : [{
        			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">항목관리</span>',
        			flex : 1
    			},{
        			xtype     : 'exbutton',
              		reference : 'mgtAddBtn',
              		name      : 'mgtAddBtn',
              		text      : '추가',
              		handler   : 'onMgtAdd',
        		},{
        			width     : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'mgtBtn',
              		name      : 'mgtBtn',
              		text      : '저장',
              		handler   : 'onMgtSave',
        		}]
    		},{
    			height : 5
    		},{
    			exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec019w_01_c',
                cls           : 'rec019w_01_c none-dirty-grid',
                height        : 392,
                width         : '100%',
                plugins       : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                }],
                bind          : {
                    store:'{ds_mgt}'
                },
                columns:[{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    width       : 60,
                    align       : 'center',
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("CLOSE_YN") == "T"){
                    		meta.tdCls = 'useYnBack'
                    	}
                    	return (rowIndex+1);
                    }
                },{
                	text        : '불전함명',
                	exType      : 'excolumn',
                    dataIndex   : 'BUD_BOX_NM',                    
                    exAlign     : 'center',
                    flex        : 1,
                    editor      : {
                    	xtype      : 'extextfield',
                    },
                },{
                	text        : '사용유무',
                    xtype       : 'excheckcolumn',
                    dataIndex   : 'USE_YN',
                    width       : 120,
                    exAlign     : 'center',
                }]
    		}]
    		
    	},{
    		width : '0.5%'
    	}]
    }]
});
