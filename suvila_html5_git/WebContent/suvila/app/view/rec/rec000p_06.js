Ext.define('ExFrm.view.rec.rec000p_06',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec000p_06Controller',
    	'ExFrm.view.rec.rec000p_06Model'
    ],
    controller:'rec000p_06',
    viewModel:{
        type:'rec000p_06'
    },
    isModal:true,
    name:'rec000p_06',
    title:'수납현황',
    closable:true,
    width:1300,
    height:885,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype  : 'exformmain',
        width  : '99.8%',
        cls    : 'exformmain',
        layout : {
            type:'vbox',
            align:'stretch'
        },
        items  :[{
        	height : 5
        },{
        	layout : 'hbox',
        	items  : [{
                width : '0.5%'
            },{
            	layout : 'vbox',
            	width  : '99%',
            	items  :[{
            		layout : 'hbox',
                	items  : [{
                		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">가족인등수납</div>',
                	},{
                		xtype        : 'extextfield',
                    	fieldLabel   : '<span style="font-weight: 700;">납부금액</span>',
                        reference    : 'me_totPaymentAmt',
                        name         : 'me_totPaymentAmt',
                        labelWidth   : 70,
                        width        : 200,
                        exReadOnly   : true,
                        exAlign      : 'right',
                        value        : 0,
                        exNumberComma: true
                	},{
                		width : 5
                	},{
                		xtype        : 'extextfield',
                        reference    : 'me_month',
                        name         : 'V_AGE',
                        width        : 30,
                        exFormat     : 'num',
                        exAlign      : 'right',
                        value        : 1,
                	},{
                		html  : '<div style="padding-right:3px;padding-left:5px;line-height:24px;font-weight:700;">개월<div>'
                	},{
                		xtype     : 'exbutton',
                  		text      : '적용',
                  		handler   : 'inSetinitMonth',
                	},{
                		width : 5
                	},{
                		xtype     :'radiogroup',
            			reference : 'Trdo_ApprovalGbn',
            			name      : 'Trdo_ApprovalGbn',
            			items     :[{
            				boxLabel   : '현금', 
    	                	inputValue : 1,    
    	                	width      : 60,
    	                	checked    : true
            			},{
            				boxLabel   : '카드', 
    	                	inputValue : 2,    
    	                	width      : 60,
            			},{
            				boxLabel   : '무통장', 
    	                	inputValue : 4,    
    	                	width      : 60,
            			}]
                	},{
                		width : 3
                	},{
                		xtype     : 'exbutton',
                  		text      : '전체취소',
                  		handler   : 'onTopCancel',
                	},{
                		width : 3
                	},{
                		xtype     : 'exbutton',
                  		text      : '저장',
                  		handler   : 'onTopSave',
                	},{
                		width : 3
                	},{
                		xtype     : 'exbutton',
                  		text      : '닫기',
                  		handler   : 'onClose',
                	}]
            	},{
            		height : 1
            	},{
            		width      : '100%',
             		exGroupRef :true,
                    xtype      :'exgrid',
                    reference  :'rec000p_06_a',
                    cls        : 'rec000p_06_a',
                    height     : 250,
                    align      : 'center',                    
                    bind:{
                        store:'{ds_main}'
                    },                 
                    listeners      : {
                    	selectionchange : 'onSelectionChange',
                    	beforeedit   : 'onBeforeedit_all',	    
	                	edit         : 'onEdit_all'
                    },
                    features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
                    columns:[{                   
                    	text        : 'No',
                        xtype       : 'rownumberer',
                        width       : 45,
                        align       : 'center',                    
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'TEMP_APPROVAL_GBN',
                     	text        : 'PPP',
                        width       : 30,
                        exAlign     : 'left',
                        exHidden    : true,
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'ACCEPT_DATE',
                     	text        : '접수일',
                        width       : 90,
                        exAlign     : 'center',
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("SUNAB_YN") == 'T'){
                        		meta.tdCls = 'suvila_grid_bg';
                        	}else if(record.get("SUNAB_YN") == '1'){
                        		meta.tdCls = 'suvila_green_bg';
                        	}else {
                        		meta.tdCls = 'suvila_error_bg';
                        	}
                        	return exCommon.getGridDateFormat(value,'/', 8 );
                        }
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'LIGHT_NM',
                     	text        : '등명',
                        width       : 170,
                        exAlign     : 'left',
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'LIGHT_NO',
                     	text        : '등번호',
                        width       : 65,
                        exAlign     : 'center',
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'START_MONTH',
                     	text        : '시작월',
                        width       : 70,
                        exAlign     : 'left',
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'END_MONTH',
                     	text        : '종료월',
                        width       : 70,
                        exAlign     : 'left',
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'INDEUNG_PERIOD',
                     	text        : '기간',
                        width       : 50,
                        exAlign     : 'center',
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'PAYMENT_PLAN_AMT',
                     	text        : '접수금액',
                        width       : 85,
                        exAlign     : 'right',
                        exType       : 'number',
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'AMOUNTS',
                     	text        : '총납입금',
                        width       : 85,
                        exAlign     : 'right',
                        exType       : 'number',                       
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'BASE_AMT',
                     	text        : '월납입금',
                        width       : 85,
                        exAlign     : 'left',
                        exAlign     : 'right',
                        exType       : 'number',
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'SUNAP_MONTH',
                     	text        : '개월',
                        width       : 60,
                        exAlign     : 'center',
                        editor      : {
	                        xtype    : 'extextfield',
                        },
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'PAYMENT_AMT',
                     	text        : '납부금액',
                        width       : 90,
                        exAlign     : 'right',
                        exType       : 'number',
                        /*
                        summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                    */
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'REMARK',
                     	text        : '수납비고',
                        width       : 100,
                        exAlign     : 'left',
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'REMARK_DETAIL',
                     	text        : '인등비고',
                        width       : 100,
                        exAlign     : 'left',
                    },{
                     	xtype       : 'excolumn',
                     	dataIndex   : 'MEMO',
                     	text        : '접수메모',
                        width       : 100,
                        exAlign     : 'left',
                    }],
                    viewConfig: {
	                	getRowClass: function(record, index) {
	                		if(record.get("SUNAB_YN") == 'T'){
	                			return 'suvila_grid_bg';
                        	}else if(record.get("SUNAB_YN") == '1'){
                        		return 'suvila_green_bg';
                        	}else {
                        		return 'suvila_error_bg';
                        	}
	                    }
	                }
            	},{
            		height : 3
            	},{
            		layout : 'hbox',
            		width  : '100%',
            		items  : [{
            			flex : 1,
            			html : '<div style="color:red;">[소등,접수취소]된 접수내용은 표시하지 않습니다. / CMS 접수의 경우는 수납이 불가능합니다.</div>'
            		},{
            			html : '<img src="./resources/img/rec/rec000p_02.png" height="31px" width="432px" >',
            		}]
            	},{
            		//html : '인등 버튼영역'
            		layout : 'hbox',
        			width  : '100%',
        			height : 35,
        			items  : [{
        				flex : 1,
        				html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">수납현황</div>',
        			},{
        				reference : 'unLimitBtnArea',
        				layout    : 'hbox',
        				hidden    : true,
        				items     : [{
        					xtype     :'radiogroup',
                			reference : 'Mrdo_ApprovalGbn',
                			name      : 'Mrdo_ApprovalGbn',
                			items     :[{
                				boxLabel   : '현금', 
        	                	inputValue : 1,    
        	                	width      : 60,
        	                	reference  : 'Mrdo_ApprovalGbn1',
        	                	checked    : true
                			},{
                				boxLabel   : '카드', 
        	                	inputValue : 2,    
        	                	width      : 60,
        	                	reference  : 'Mrdo_ApprovalGbn2',
                			},{
                				boxLabel   : '무통장', 
        	                	inputValue : 4,    
        	                	width      : 60,
        	                	reference  : 'Mrdo_ApprovalGbn3',
                			}]
        				},{
        					xtype     : 'exbutton',
                      		reference : 'addBtn',
                      		name      : 'addBtn',
                      		text      : '수납',
                      		handler   : 'onAdd',
        				},{
            				width : 3
        				},{
        					xtype     : 'exbutton',
                      		reference : 'saveBtn1',
                      		name      : 'saveBtn1',
                      		text      : '저장',
                      		handler   : 'onSave',
        				},{
            				width : 3
        				}]
        			},{
        				xtype     : 'exbutton',
                  		reference : 'canCelBtn1',
                  		name      : 'canCelBtn1',
                  		text      : '취소',
                  		handler   : 'on_cancel',
        			},{
        				width : 3
        			},{
    					xtype     : 'exbutton',
                  		reference : 'lightOutBtn',
                  		name      : 'lightOutBtn',
                  		text      : '소등',
                  		handler   : 'onLightOut',
        			},{
        				width : 0,
        				items : [{
            				xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'newData',
        	       	 		name      : 'newData',
        	        	},{
        	       	 		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'uptData',
        	       	 		name      : 'uptData',
        	        	},{
        	       	 		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'delData',
        	       	 		name      : 'delData',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'ds_main',
        	       	 		name      : 'ds_main',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'ds_misuRec',
        	       	 		name      : 'ds_misuRec',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'ds_misuRecUpt',
        	       	 		name      : 'ds_misuRecUpt',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'ds_sms',
        	       	 		name      : 'ds_sms',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'ds_pgCardInfo',
        	       	 		name      : 'ds_pgCardInfo',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'v_bunga',
        	       	 		name      : 'v_bunga',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'v_bud_no',
        	       	 		name      : 'v_bud_no',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'MOBILE_TELNO1',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'MOBILE_TELNO2',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'MOBILE_TELNO3',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'BUYER_NAME',
        	        	},{
        	        		xtype     : 'extextfield',
        	       	 		inputType : 'hidden',
        	       	 		reference : 'PROPOSAL_BUD_NO',
        	    		}]
        			}]
            	},{
            		// html : '수납현황'
            		layout     : 'vbox',
        			width      : '100%',
        			reference  : 'tr_sunab3',
        			items  :[{
        				exGroupRef :true,
                        xtype      :'exgrid',
                        reference  :'tr_sunab3_a',
                        cls        : 'tr_sunab3_a',
                        height     : 180,
                        width      : '100%',
                        align      : 'center',                    
                        bind:{
                            store:'{ds_misuRec}'
                        },
                        plugins     : [{
    	                	ptype:'cellediting'
    	                }],
    	                listeners      : {
    	                	beforeedit  : 'onBeforeedit',	    
    	                	celldblclick : 'onCellDbClick',
                        },
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
                        },{
                        	xtype       : 'excolumn',
                            text        : '취소',
                            dataIndex   : 'CANCELGBN ',
                            exAlign     : 'left',
                            flex        : 1.8,
                            exHidden    : true,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	
                            	if(record.get("SQL_MODE") != "I" && record.get("APPROVAL_GBN") == "2" && record.get("AMOUNT") > 0){
                            		return '<div style="width:100%;text-align:center;cursor:pointer;">[카드-취소]</div>';
                            	}
                            	return value;
                            }
                        }]
        			}]
            	},{
            		height : 5
            	},{
            		layout 	   : 'hbox',
    				width  	   : '100%',
    				reference  : 'limitBtn',
    				height : 31,
    				items  :[{
    					html : '<img src="./resources/img/rec/rec000p_02.png" height="31px" width="432px" >',
    					flex : 1
    				},{
    					xtype     : 'radiogroup',
            			reference : 'Brdo_ApprovalGbn',
            			name      : 'Brdo_ApprovalGbn',
            			items     :[{
            				boxLabel   : '현금', 
    	                	inputValue : 1,    
    	                	width      : 60,
    	                	checked    : true
            			},{
            				boxLabel   : '카드', 
    	                	inputValue : 2,    
    	                	width      : 60,
            			},{
            				boxLabel   : '무통장', 
    	                	inputValue : 4,    
    	                	width      : 60,
            			}]
    				},{
    					xtype     : 'exbutton',
                  		reference : 'canCelBtn2',
                  		name      : 'canCelBtn2',
                  		text      : '수납',
                  		handler   : 'onSunab2',
    				},{
    					width : 3
    				},{
        				xtype     : 'exbutton',
                  		reference : 'canCelBtn3',
                  		name      : 'canCelBtn3',
                  		text      : '추가',
                  		handler   : 'onAddYear',
        			},{
        				width : 3
        			},{
        				xtype     : 'exbutton',
                  		reference : 'recCancelBtn',
                  		name      : 'recCancelBtn',
                  		text      : '취소',
                  		handler   : 'onCancel',
        			},{
        				width : 3
        			},{
        				xtype     : 'exbutton',
                  		reference : 'saveBtn2',
                  		name      : 'saveBtn2',
                  		text      : '저장',
                  		handler   : 'onSave',
    				}]
            	},{
            		//html  : '무한인등영역',
            		exGroupRef :true,
                    xtype      : 'exgrid',
                    reference  : 'tr_sunab3_b',
                    cls        : 'tr_sunab3_b',
                    height     : 180,
                    width      : '100%',
                    align      : 'center',                    
                    bind:{
                        store:'{ds_payMonth}'
                    },
                    /*selModel      : 'cellmodel',
                    multiSelect   : true,
                    allowDeselect : true,*/
                    selModel: {
                        type: 'spreadsheet',
                        columnSelect: true,
                        pruneRemoved: false,
                        rowNumbererHeaderWidth    : 0

                    },
                    listeners:{
                    	celldblclick:'onCellDbClickSunap3',
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
                        	
                        	if(record.get("A_STATUS_01") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_01"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_02") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_02"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_03") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_03"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_04") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_04"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_05") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_05"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_06") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_06"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_07") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_07"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_08") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_08"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_09") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_09"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_10") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_10"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_11") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_11"))+" </div>";
                        	}
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
                        	
                        	if(record.get("A_STATUS_12") == "2"){
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>CARD</div>";
                        	}else{
                        		return "<div style='display:block;height:14px;width:100%;cursor:pointer'>"+exCommon.getRepVal(record.get("amount_12"))+" </div>";
                        	}
                        }
                    }]
            	},{
            		//html : '유한인등영역'
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
            	width : '0.5%'
            }]
        }]
        
    }]
})