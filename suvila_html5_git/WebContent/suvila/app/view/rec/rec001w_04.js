Ext.define('ExFrm.view.rec.rec001w_04',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec001w_04',
    requires:[
    	'ExFrm.view.rec.rec001w_04Controller',
        'ExFrm.view.rec.rec001w_04Model'
    ],
    controller:'rec001w_04',
    viewModel:{
        type:'rec001w_04'
    },
    name:'rec001w_04',
    isRootView:true,
    title:'인/연등 미수조회',
    header:false,
    //closable:true,
    closable:false,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',     
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items :[{
        	width : '0.5%'
        },{
        	width  : '99%',
        	layout : 'vbox',
        	items  : [{
        		layout : 'hbox',
        		width  : '100%',
        		//style  : 'background:#e3e3e3;',
        		items  : [{
        			hidden  : true,
        			xtype        :'radiogroup',
        			reference    : 'rd_acceptGbn',
        			name         : 'rd_acceptGbn',
        			labelStyle   : 'width:70px',
        			fieldLabel   : '<span style="font-weight: 700;">접수상태</span>',
        			width        : 170,
        			listeners    : {
                    	change:'onRecSearch'
                    },
        			items        :[{
        				boxLabel   : '인등', 
	                	inputValue : "ID",    
	                	width      : 50,
	                	reference  : 'rd_acceptGbn1',
	                	checked    : true
	                	
        			}]
        		},{
        			width : 10
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">납부구분</span>',
                    width        : 140,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'lc_payState',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_payState}'
                    },
        		},{
        			width : 10,
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">접수구분</span>',
                    width        : 180,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    :'lc_approv',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_approv}'
                	}
        		},{
        			width : 10,
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 50,
                    fieldLabel   : '<span style="font-weight: 700;">접수자</span>',
                    width        : 250,
                    valueField   : 'USER_ID',
                    displayField : 'USER_NM',     
                    reference    :'lc_templeUser',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_templeUser}'
                	}
        		},{
        			width : 10,
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">신도분류</span>',
                    width        : 300,
                    valueField   : 'CLASS_CD',
                    displayField : 'CLASS_NAME',     
                    reference    : 'lc_classMgt',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_classMgt}'
                	}
        		},{
        			width : 10,
        		},{
        			xtype     : 'exbutton',
              		reference : 'selectBtn',
              		name      : 'selectBtn',
              		text      : '조회',
              		handler   : 'onSelect',
              		iconCls   : 'fa fa-search'
        		},{
        			width : 5
        		},{
        			xtype     : 'exbutton',
              		reference : 'excelBtn',
              		name      : 'excelBtn',
              		text      : '엑셀',
              		handler   : 'onExcel',
              		iconCls   : 'fa fa-file'
        		}]
        	},{
        		height : 10
        	},{
        		layout : 'hbox',
        		items  :[{
        			xtype       : 'excheckbox',
                	reference   : 'cb_setBudNo',
                	listeners   : {
                		change : 'setBudNo'
                    }
        		},{
        			width : 5
        		},{
        			xtype           : 'excombobox',                		
            		labelAlign      : 'left',
                    reference       : 'cb_Stipulation',
                    displayField    : 'name',
                    valueField      : 'code',
                    exCommonDmnCode : '001',    
                    width           : 100,
                    store           : {},
                    listeners       : {
                    	change:'onSearchTypeChange'
                    }
        		},{
        			width : 10
        		},{
                	xtype           : 'extextfield',
                    reference       : 'txt_stipulation',
                   // value           : '',
                    enableKeyEvents : true,
                    width           : 130 ,
                    listeners       : {
                 	   keyup : 'onSearchEnter',
                 	   blur  : 'onSearchBlur'
                    },
        		},{
        			width : 5
        		},{
               	 	xtype    : 'exbutton',
                    iconCls  : 'fa fa-search',
                    text     : '검색',
                    handler  : 'onBudSearch',
                    reference: 'budSearchBtn',
        		},{
                	width            : 0,
            		height           : 0,
            		items            :[{
            			xtype            : 'extextfield',
                        reference        : 'hid_bud_no',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_BUD_NO'
            		},{
            			xtype            : 'extextfield',
                        reference        : 'txt_budNo',
            		},{
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
            		},{
    	        		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'ds_sms',
    	       	 		name      : 'ds_sms',
            		},{
            			xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'ds_misuRec',
               	 		name      : 'ds_misuRec',
               	 		width     : 0
            		},{
            			xtype            : 'extextfield',
                        reference        : 'id_index_select',
                        value            : 0,
                        inputType        : 'hidden',
                        name             : 'id_index_select'
            		},{
            			xtype            : 'extextfield',
                        reference        : 'yd_index_select',
                        value            : 0,
                        inputType        : 'hidden',
                        name             : 'yd_index_select'
            		}]
        		},{
        			width : 10
        		},{
        			layout     : 'hbox',
        			items      : [{
        				xtype        :'excombobox',
                        width        : 80,
                        valueField   : 'CODE',
                        displayField : 'NAME',     
                        reference    : 'cb_dateGD',
                        value        : 1,
                    	bind         : {
                        	store:'{ds_dateGD}'
                    	},
        			},{
            			width : 10
            		},{
            			xtype          : 'exdatefield',
                        reference      : 'me_AcceptSDateID',
                        format         : 'Y-m-d',
            		},{
            			html :'<div style="text-align:center;width:20px;">~</div>',
            			width : 20
            		},{
            			xtype          : 'exdatefield',
                        reference      : 'me_AcceptEDateID',
                        format         : 'Y-m-d',            		
            		},{
            			width : 10
            		},{
            			xtype        :'excombobox',
                    	labelWidth   : 50,
                        fieldLabel   : '<span style="font-weight: 700;">전각명</span>',
                        width        : 200,
                        valueField   : 'JUNGAK_CD',
                        displayField : 'JUNGAK_NM',     
                        reference    : 'lc_IDJungakInfo',
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_IDJGKindInfo}'
                    	}
            		},{
            			width : 10
            		},{
            			xtype        :'excombobox',
                    	labelWidth   : 50,
                        fieldLabel   : '<span style="font-weight: 700;">인등명</span>',
                        width        : 170,
                        valueField   : 'LIGHT_CODE',
                        displayField : 'LIGHT_NM',     
                        reference    : 'lc_IDKindInfo',
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_IDKindInfo}'
                    	}
            		},{
            			width : 10
            		},{
            			xtype        :'excombobox',
                    	labelWidth   : 40,
                        fieldLabel   : '<span style="font-weight: 700;">마감</span>',
                        width        : 120,
                        valueField   : 'CODE',
                        displayField : 'NAME',     
                        reference    : 'lc_IDCloseYn',
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_IDCloseYn}'
                    	}
        			}]
        		}]
        	
        	},{
        		height : 5,
        	},{
        		layout : 'vbox',
        		height : 770,
        		width  : '100%',
        		items  :[{        	        			
            		exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec001w_04_a',
                    cls           : 'none-dirty-grid rec001w_04_a',
                    height        : 300,
                    width         : '100%',
                    bind          : {
                        store:'{ds_IDRec}'
                    },                 
                    plugins     : [{
                    	ptype: 'gridexporter'
                    }],
                    listeners      : {
                    	selectionchange : 'onSelectionChangeID'	    
                    },
                    features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    columns:[{
                    	text        : '순번',
                        xtype       : 'rownumberer',
                        width       : 70,
                        align       : 'center',                    
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	
                        	return (rowIndex+1);
                        }                    
                    },{
                    	text        : '접수번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ACCEPT_SEQ',                    
                        exAlign     : 'center',
                        width       : 160,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '접수일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ACCEPT_DATE',                    
                        exAlign     : 'left',
                        width       : 110,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return exCommon.getFormat(value,'dateYMD' );
                        }
                    },{
                    	text        : '신도번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PROPOSAL_BUD_NO',                    
                        exAlign     : 'center',
                        width       : 120,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '신청자',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PROPOSAL_NAME_KOR',                    
                        exAlign     : 'left',
                        width       : 105,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	//return exCommon.getFormat(value,'dateYMD' );
                        	return value;
                        }
                    },{
                    	text        : '인등종류',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NM',                    
                        exAlign     : 'center',
                        width       : 120,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '신도명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'left',
                        width       : 90,
                        exType      : 'number',
                    	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '인등번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'LIGHT_NO',                    
                        exAlign     : 'center',
                        width       : 90,
                    	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '마감여부',
                    	xtype       : 'excolumn',
                        dataIndex   : 'CLOSE_YN',                    
                        exAlign     : 'center',
                        width       : 100,
                    	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_IDCloseYn');
                        	return exCommon.getComboVal(value,store, '' );
                        }
                    },{
                    	text        : '인등위치',
                    	xtype       : 'excolumn',
                        dataIndex   : 'JUNGAK_NM',                    
                        exAlign     : 'left',
                        width       : 120,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '년',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_YEAR',                    
                        exAlign     : 'center',
                        width       : 60,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '월',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_MONTH',                    
                        exAlign     : 'center',
                        width       : 60,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '기간',
                    	xtype       : 'excolumn',
                        dataIndex   : 'INDEUNG_PERIOD',                    
                        exAlign     : 'center',
                        width       : 60,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    },{
                    	text        : '동참금',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PAYMENT_PLAN_AMT',                    
                        exAlign     : 'right',
                        width       : 110,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        summaryType    : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        },
                    },{
                    	text        : '납부금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PAYMENT_AMT',                    
                        exAlign     : 'right',
                        width       : 110,
                        sortable    : true,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        summaryType    : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        },
                    },{
                    	text        : '미수금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'MISU_AMT',                    
                        exAlign     : 'right',
                        width       : 110,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
                        summaryType    : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        },                                                                 
                    },{
                    	text        : '비고',
                    	xtype       : 'excolumn',
                        dataIndex   : 'REMARK',                    
                        exAlign     : 'left',
                        width       : 300,
                        sortable    : true,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("APPROVAL_GBN") == 3){
                        		meta.tdCls = 'cmsline'
                        	}else{
                        		meta.tdCls = 'recCellNotEdit'
                        	}
                        	return value;
                        }
                    }]
        		},{
        			height     : 5,
        			reference  : 'id_space',
        		},{
        			width      : '100%',
        			layout     : 'vbox',
        			items      : [{        				
        				layout :'hbox',
        				width  : '100%',
        				height : 31,
	        			items  : [{
	        				html : '<div style="height : 30px;width: 90px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;">수납현황</div>',	        				
	        				flex : 1,	        				
	        			},{
	        				hidden     : true,
	        				layout     :'hbox',
	        				reference  : 'limit_paymonth_btn_top',
	        				items      : [{
	        					html       : '<img src="./resources/img/rec/rec000p_02.png" height="31px" width="432px" >',
	        				},{
	        					xtype     : 'exbutton',
	                    		handler   : 'onSunab2',	            		
	                    		text      : '현금수납',
	                    		iconCls   : 'fa fa-plus'
	            		    },{
	            			    width : 5
	            		    },{
	            			    xtype     : 'exbutton',
	                    		handler   : 'onCancelLimit',	            		
	                    		text      : '수납취소',
	                    		iconCls   : 'fa fa-ban',
	            		    },{
	            			    width : 5
	            		    },{
	            			    xtype     : 'exbutton',
	                    		handler   : 'onAddYear',	            		
	                    		text      : '년도추가',
	                    		iconCls   : 'fa fa-plus'
	            		    },{
	            			    width : 5
	            		    },{
	            			    xtype     : 'exbutton',
	                    		handler   : 'onSave',	            		
	                    		text      : '저장',
	                    		iconCls   : 'fa fa-save',
	        				}]
	        			},{	  
	        				hidden     : true,
	        				reference  : 'unlimit_paymonth_btn_top',
	        				html       : '<img src="./resources/img/rec/sunab.gif" height="19px" width="188px" >',
	        			}]
        			},{
        				width      : '100%',
            			layout     : 'vbox',
            			height     : 180,
            			items      : [{
	        				/*무한 유한 납부 그리드*/
	        				exGroupRef : true,
	                        xtype      : 'exgrid',
	                        reference  : 'mg_payMonth',
	                        cls        : 'mg_payMonth',
	                        height     : 180,
	                        width      : '100%',
	                        align      : 'center',                    
	                        bind:{
	                            store:'{ds_payMonth}'
	                        },
	                        selModel: {
	                            type                    : 'spreadsheet',
	                            columnSelect            : true,
	                            pruneRemoved            : false,
	                            rowNumbererHeaderWidth  : 0
	
	                        },
	                        listeners:{
	                        //	celldblclick:'onCellDbClickSunap3',
	                        },
	                        columns:[{                   
	                        	xtype       : 'excolumn',
	                            text        : '년도',
	                            dataIndex   : 'YEAR',
	                            exAlign     : 'center',
	                            flex        : 1.5,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	meta.style = 'background-color:#ffffff;';
	                            	return value;
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '1월',
	                            dataIndex   : 'M_STATUS_01',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_01"))+" </div>";
	                            },
	                            listeners:{
	                            	focus : 'onFocus'
	                            },
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '2월',
	                            dataIndex   : 'M_STATUS_02',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_02"))+" </div>";
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '3월',
	                            dataIndex   : 'M_STATUS_03',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_03"))+" </div>";
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '4월',
	                            dataIndex   : 'M_STATUS_04',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_04"))+" </div>";
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '5월',
	                            dataIndex   : 'M_STATUS_05',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_05"))+" </div>";
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '6월',
	                            dataIndex   : 'M_STATUS_06',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_06"))+" </div>";
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '7월',
	                            dataIndex   : 'M_STATUS_07',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_07"))+" </div>";
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '8월',
	                            dataIndex   : 'M_STATUS_08',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_08"))+" </div>";
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '9월',
	                            dataIndex   : 'M_STATUS_09',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_09"))+" </div>";
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '10월',
	                            dataIndex   : 'M_STATUS_10',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_10"))+" </div>";
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '11월',
	                            dataIndex   : 'M_STATUS_11',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_11"))+" </div>";
	                            }
	                        },{
	                        	xtype       : 'excolumn',
	                            text        : '12월',
	                            dataIndex   : 'M_STATUS_12',
	                            exAlign     : 'center',
	                            flex        : 1,
	                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var TEMPLE_M_STATUS = exCommon.getRepNum( record.get("TEMPLE_M_STATUS_"+exCommon.addZero(colIndex)) );                            	
	                            	var color           = exCommon.payMonthLimitColor(value , TEMPLE_M_STATUS );
	                            	
	                            	meta.style = 'background-color:'+color+' !important;';
	                            	
	                            	return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_12"))+" </div>";
	                            }
	                        }]
            			},{
            				/*html       : '유한인등',*/
            				hidden     : true,
            				xtype      : 'exgrid',
            				reference  :'tr_sunab3_c',
        					exGroupRef :true,
                            cls        : 'tr_sunab3_C',
                            height     : 180,
                            width      : '100%',
                            align      : 'center',                    
                            bind:{
                                store:'{ds_payMonthBase}'
                            },
                            viewConfig    : {
        	                    enableTextSelection: true
        	                },
        	                exGroupFields : ['YEAR'],
        	                cls : 'grid-group',
                            columns:[{                   
                            	xtype       : 'excolumn',
                                text        : '년도',
                                dataIndex   : 'YEAR',
                                exAlign     : 'center',
                                flex        : 1.5,
                                /*renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	meta.style = 'background-color:#ffffff;';
                                	return value;
                                }*/
                            },{
                            	xtype       : 'excolumn',
                                text        : '1월',
                                dataIndex   : 'JANUARY',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '2월',
                                dataIndex   : 'FEBRUARY',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '3월',
                                dataIndex   : 'MARCH',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '4월',
                                dataIndex   : 'APRIL',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '5월',
                                dataIndex   : 'MAY',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '6월',
                                dataIndex   : 'JUNE',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '7월',
                                dataIndex   : 'JULY',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '8월',
                                dataIndex   : 'AUGUST',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '9월',
                                dataIndex   : 'SEPTEMBER',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '10월',
                                dataIndex   : 'OCTOBER',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '11월',
                                dataIndex   : 'NOVEMBER',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            },{
                            	xtype       : 'excolumn',
                                text        : '12월',
                                dataIndex   : 'DECEMBER',
                                exAlign     : 'center',
                                flex        : 1,
                                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                                	var color           = exCommon.payMonthColor(value);
                                	meta.style = 'background-color:'+color+' ;';
                                	return exCommon.payMonthText(value);
                                },
                            }]	
            			}]
        			},{
        				height : 5,
        			},{
        				layout : 'hbox',
        				width  : '100%',
        				height :30,
	        			items  : [{
	        				html : '<div style="height : 30px;width: 90px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;">납부내역</div>',
	        				flex : 1        				
	        			},{
	        				hidden    : true,
	        				reference : 'unlimit_btn_bot',	        				
	        				layout    : 'hbox',
	        				items :[{	        			
	        					xtype     : 'exbutton',
		                		handler   : 'onAdd',
		                		text      : '헌급수납',
		                		iconCls   : 'fa fa-plus'
		        		    },{
		        			    width : 5
		        		    },{
		        			    xtype     : 'exbutton',
		                		handler   : 'onCancel',
		                		text      : '취소',
		                		iconCls   : 'fa fa-ban',
		        		    },{
		        			    width : 5
		        		    },{
		        			    xtype     : 'exbutton',
		                		handler   : 'onExcelSunap',	            		
		                		text      : '엑셀',
		                		iconCls   : 'fa fa-plus'
		        		    },{
		        			    width : 5
		        		    },{
		        			    xtype     : 'exbutton',
		                		handler   : 'onSave',	            		
		                		text      : '저장',
		                		iconCls   : 'fa fa-save',
	        				}]
	        			}]
        			},{
        				exGroupRef :true,
                        xtype      :'exgrid',
                        reference  :'tr_sunab3_a',
                        cls        : 'tr_sunab3_a',
                        height     : 185,
                        width      : '100%',
                        align      : 'center',                    
                        bind:{
                            store:'{ds_misuRec}'
                        },
                        plugins     : [{
    	                	ptype:'cellediting'
    	                },{
    	                	ptype: 'gridexporter'
    	                }],
    	                listeners      : {
    	                	beforeedit   : 'onBeforeeditID',	    
    	                	edit         : 'onAftereditID'
                        },
                        features   : [{
                        	ftype : 'summary',
                        	dock  : 'bottom'  // 하단 잠금
                        }],
                        columns:[{                   
                        	text  :'No',
                            xtype :'rownumberer',
                            width : 60,
                            align : 'center',
                        },{
                        	xtype       : 'excolumn',
                            text        : '접수자',
                            dataIndex   : 'CRT_USER',
                            exAlign     : 'center',
                            flex        : 1.6,
                            editor      : {
    	                        xtype    : 'extextfield',
                            },
                        },{
                        	xtype       : 'excolumn',
                            text        : '수납일',
                            dataIndex   : 'SUB_DATE',
                            exAlign     : 'center',
                            flex        : 1.6, 
                            renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                            	return exCommon.getFormat(value,'dateYMD' );
                            },
                            editor      : {
    	                        xtype    : 'extextfield',
                            },
                        },{
                        	xtype       : 'excolumn',
                            text        : '납부월',
                            dataIndex   : 'PAYMENT_YYYYMM',
                            exAlign     : 'center',
                            flex        : 1.6, 
                            renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                            	return exCommon.getFormat(value,'dateYMD' );
                            },
                            editor      : {
    	                        xtype    : 'extextfield',
                            },
                        },{
                        	xtype       : 'excolumn',
                            text        : '납부금액',
                            dataIndex   : 'AMOUNT',
                            exAlign     : 'right',
                            exType      : 'number',
                            flex        : 1.8,
                            editor      : {
    	                        xtype    : 'extextfield',
                            },
                            renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                            	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                            },
                            summaryType    : 'sum',
                            summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                            	if(value > 0){
                            		return exCommon.setNumberFormat(value)+' 원';
                            	}                        
                            },
                        },{
                        	xtype       : 'excolumn',
                            text        : '결제방법',
                            dataIndex   : 'APPROVAL_GBN',
                            exAlign     : 'center',
                            flex        : 1.8,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_approvalGbn');
                            	return exCommon.getComboVal(value,store, '' );
                            },
                            editor      : {
    	                        xtype    : 'extextfield',
                            },                     
                        },{
                        	xtype       : 'excolumn',
                            text        : '비고',
                            dataIndex   : 'REMARK',
                            exAlign     : 'left',
                            flex        : 3,
                            editor      : {
    	                        xtype    : 'extextfield',
                            },                       
                        }]
        			}]
        		}]
        		
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
