Ext.define('ExFrm.view.rec.rec000p_02',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec000p_02Controller',
    	'ExFrm.view.rec.rec000p_02Model'
    ],
    controller:'rec000p_02',
    viewModel:{
        type:'rec000p_02'
    },
    isModal:true,
    name:'rec000p_02',
    title:'수납현황',
    closable:true,
    isRootView : true,
    width:1200,
    height:1000,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        width  : '99.8%',
        cls    : 'exformmain',
        xtype  : 'exformmain',
        layout : {
            type:'vbox',
            align:'stretch'
        },
        items  :[{
        	layout : 'hbox',
        	width  : '100%',
        	items  : [{
        		width : '0.5%'
        	},{
        		width  : '99%',
        		layout : 'vbox',
        		items  : [{
        			layout : 'hbox',
        			width  : '100%',
        			height : 25,
        			items  :[{
        				flex       : 1,
        				//html       : '<div style="text-align:left;padding-left:5px;font-weight:700;line-height:26px;">수납현황</div>',
        				html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">수납현황</div>',
        			},{
        				xtype     : 'exbutton',
        	          	reference : 'closeBtn',
        	          	name      : 'closeBtn',
        	          	handler   : 'onClose',
        	          	text      : '닫기',
        			}]
        		},{
        			layout : 'hbox',
        			width  : '100%',
        			height : 35,
        			items  : [{
        				xtype        : 'extextfield',
	                    reference    : 'txt_prodName',
	                    name         : 'txt_prodName',
	                    exReadOnly   : true,
	                    width        : 300,
        			},{
        				width : 10
        			},{
        				xtype     :'radiogroup',
            			reference : 'rdo_ApprovalGbn_p',
            			name      : 'rdo_ApprovalGbn_p',
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
        				reference : 'unLimitBtnArea',
        				layout    : 'hbox',
        				hidden    : true,
        				items     : [{
        					xtype     : 'exbutton',
                      		text      : '수납',
                      		handler   : 'onAdd',
        				},{
            				width : 3
        				},{
        					xtype     : 'exbutton',
                      		text      : '저장',
                      		handler   : 'onSave',
        				},{
            				width : 3
        				}]
        			},{
        				xtype     : 'exbutton',
                  		text      : '취소',
                  		handler   : 'on_cancel',
        			},{
        				width : 3
        			},{
        				xtype     : 'exbutton',
                  		text      : '접수취소',
                  		handler   : 'onRecCancel',
        			},{
        				width : 3
        			},{
        				xtype     : 'exbutton',
                  		reference : 'printBtn',
                  		name      : 'printBtn',
                  		text      : '인쇄',
                  		handler   : 'onPrint',
        			},{
        				reference : 'iDBtnArea',
        				layout    : 'hbox',
        				hidden    : true,
        				height    : 35,
        				items     : [{
        					width : 3
        				},{
        					xtype     : 'exbutton',
                      		reference : 'lightOutBtn',
                      		name      : 'lightOutBtn',
                      		text      : '소등',
                      		handler   : 'onLightOut',
        				}]
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
        	       	 		reference : 'ds_recCancel',
        	       	 		name      : 'ds_recCancel',
        	    		}]
        			}]
        		},{
        			layout     : 'vbox',
        			width      : '100%',
        			reference  : 'tr_sunab3',
        			items  :[{
        				exGroupRef :true,
                        xtype      :'exgrid',
                        reference  :'tr_sunab3_a',
                        cls        : 'tr_sunab3_a',
                        height     : 235,
                        width      : '100%',
                        align      : 'center',                    
                        bind:{
                            store:'{ds_misuRec}'
                        },
                        plugins     : [{
    	                	ptype:'cellediting'
    	                }],
    	                listeners      : {
    	                	beforeedit   : 'onBeforeedit',	    
    	                	edit         : 'onAfteredit',
    	                	celldblclick : 'onCellDbClick',
                        },
                        columns:[{                   
                        	text  :'No',
                            xtype :'rownumberer',
                            width : 60,
                            align : 'center',
                        },{
                        	xtype       : 'excolumn',
                            text        : '접수자33',
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
                       /* },{
                        	xtype       : 'excolumn',
                            text        : '상태',
                            dataIndex   : 'PAYMENT_STATE_CD',
                            exAlign     : 'center',
                            flex        : 1.4,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	var rtn = "정상";
                            	if(value == 1) rtn = "CMS요청중";
                            	return rtn;
                            }*/
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
                            dataIndex   : 'CANCELGBN',
                            exAlign     : 'left',
                            flex        : 1.8,
                            exHidden    : true,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	if(record.get("SQL_MODE") != "I" && record.get("APPROVAL_GBN") == "2" && new Number( record.get("AMOUNT") ) > 0){
                            		return '<div style="width:100%;text-align:center;cursor:pointer;">[카드-취소]</div>';
                            	}
                            	return value;
                            }
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
        					xtype     : 'exbutton',
                      		text      : '수납',
                      		handler   : 'onSunab2',
        				},{
        					width : 3
        				},{
            				xtype     : 'exbutton',
                      		text      : '추가',
                      		handler   : 'onAddYear',
            			},{
            				width : 3
            			},{
            				xtype     : 'exbutton',
                      		text      : '취소',
                      		handler   : 'onCancel',
            			},{
            				width : 3
            			},{
            				xtype     : 'exbutton',
                      		text      : '저장',
                      		handler   : 'onSave',
        				}]
        			},{
        				height : 5
        			},{
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
                            	
                            	meta.style = 'background-color:#ffffff; !important';
                            	
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
        			height : 10,
        		},{
        			layout : 'vbox',
        			width  : '100%',
        			items  :[{        				
        				layout : 'hbox',
        				width  : '100%',
        				items  : [{
        					//html : '<div style="font-weight: 700;">접수합계 비용 및 수납현황</div>',
        					html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">접수합계 비용 및 수납현황</div>',
        					flex : 1,
        				},{
        					hidden     : true,
        					xtype      : 'extextfield',
        					fieldLabel : '<span style="font-weight:700;">모연인</span>',        					
                            reference  : 'txt_whajubosalNm',
                            exReadOnly : true,
                            labelWidth : 55,
                            width      : 180,
                            inputType        : 'hidden',
                            
        				},{
        					width : 3
        				},{
        					hidden     : true,
        					xtype      : 'extextfield',
        					fieldLabel : '<span style="font-weight:700;">권선문번호</span>',
                            reference  : 'txt_kwonsunNo',
                            exReadOnly : true,
                            labelWidth : 75,
                            width      : 200,
                            inputType   : 'hidden',
        				},{
        					width : 3 
        				}]
        			}]
        		},{
        			xtype      : 'exfieldsetblockbox',
        			width      : '100%',
        			reference  : 'sunapArea',
        			items      : [{
        				reference  : 'iDArea',
        				hidden     : true,
        				items:[{
        					xtype:'exblockrow',
        					items:[{
        						xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">등번호</div>'
        					},{
        						xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'txt_lightNo',
    	                            exAlign    : 'right',
    	                            exReadOnly : true,
    	                            width      : 50,
    	                    	},{
    	                    		width : 5
    	                    	},{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'txt_donchamja',
    	                            exAlign    : 'right',
    	                            exReadOnly : true,
    	                            width      : 80,
    	                    	}]
        					},{
        						xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">소등여부</div>'
        					},{
        						xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'txt_closeYn',
    	                            exAlign    : 'left',
    	                            exReadOnly : true,
    	                            width      : 100,
    	                       }]
        					}]
        				}]
        			},{
        				reference : 'etc_area',
        				xtype:'exblockrow',
        				items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;" id="div_tot_txt">총 접수금액</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'me_totPaymentPlanAmt',
	                            exType     : 'number',
	                            exAlign    : 'right',
	                            exReadOnly : true,
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신청자</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'txt_proposalBudNm',
	                            exReadOnly : true,
	                    	}]
	                    }]
        			},{
        				xtype:'exblockrow',
        				items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">총 납부금액</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'me_totPaymentAmt',
	                            exType     : 'number',
	                            exAlign    : 'right',
	                            exReadOnly : true,
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">미수금액</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'me_misuAmt',
	                            exAlign    : 'right',
	                            exType     : 'number',
	                            exReadOnly : true,
	                    	}]
	                    }]
        			
        			},{
        				xtype:'exblockrow',
        				items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">결재구분</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'txt_approvalGbn',
	                            exReadOnly : true,
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">SMS설정</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            reference    : 'cb_smsYn',
	                            name         : 'cb_smsYn',	                            
	                            width        : 75,
	                            value        : '0',
	                            emptyText    : '선택',
	                            bind         : {
	                            	store:'{ds_smsYn}'
	                            },
	                            listeners:{
	                            	change:'onSmsChange',
	                            },
	                    	},{
	                    		width : 3,
	                    	},{
	                    		layout    : 'hbox',
	                    		reference : 'mobileArea',
	                    		items     :[{
	                    			xtype     : 'extextfield',
		                            reference : 'txt_MobiletelNo1',
		                            name      : 'MOBILE_TELNO1',
		                            width     : 50,
	                    		},{
	                    			width : 20,
		                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
	                    		},{
	                    			xtype     : 'extextfield',
		                            reference : 'txt_MobiletelNo2',
		                            name      : 'MOBILE_TELNO2',
		                            width     : 60,
	                    		},{
	                    			width : 20,
		                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
	                    		},{
	                    			xtype     : 'extextfield',
		                            reference : 'txt_MobiletelNo3',
		                            name      : 'MOBILE_TELNO3',
		                            width     : 60,
	                    		},{
	                    			width : 3	
	                    		}]
	                    	},{
                    			xtype     : 'exbutton',
	    	              		reference : 'smsBtn',
	    	              		name      : 'smsBtn',
	    	              		handler   : 'onCellSave',
	    	              		text      : '접수문자상태변경',
	                    	},{
	                    		width  : 0,
	                    		height : 0,
	                    		items  :[{
	                    			xtype            : 'extextfield',
				                    reference        : 'txt_smsYn',
				                    inputType        : 'hidden',
	                    		}]	
	                    	}]
	                    }]
        			},{
        				reference  : 'cmsArea',
        				items      :[{
        					xtype: 'exblockrow',
            				items:[{
    	                        xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">결제계정</div>'                           
    	                    },{
    	                    	xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'txt_CmsTradeCd',
    	                            exReadOnly : true,
    	                    	}]
    	                    },{
    	                    	xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">결제일</div>'
    	                    },{
    	                    	xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'txt_bunnabDay',
    	                            exReadOnly : true,
    	                    	}]
    	                    }]
        				},{
        					xtype: 'exblockrow',
            				items:[{
    	                        xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">은행</div>'                           
    	                    },{
    	                    	xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'txt_bank',
    	                            exReadOnly : true,
    	                    	}]
    	                    },{
    	                    	xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">계좌번호</div>'
    	                    },{
    	                    	xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'txt_accountNumber',
    	                            exReadOnly : true,
    	                            width      : 120
    	                    	},{
    	                    		width : 5
    	                    	},{
    	                    		xtype      : 'extextfield',
    	                            reference  : 'txt_accountSeq',
    	                            exReadOnly : true,
    	                            width      : 30
    	                    	}]
    	                    }]
        				},{
        					xtype: 'exblockrow',
            				items:[{
    	                        xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">계좌변경</div>'                           
    	                    },{
    	                    	xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype        :'excombobox',
    	                            valueField   :'DISPLAY',
    	                            displayField :'DISPLAY',
    	                            reference    :'lc_sindoCmsInfo',
    	                            name         :'lc_sindoCmsInfo',   
    	                            emptyText    : '선택',                    
    	                            width        : 430,
    	                            bind:{
    	                             	store:'{ds_sindo_cms_info}'
    	                            },
    	                            listConfig: {
    	                                itemTpl: [                        	
    	                                    '<div data-qtip="{BANK_NM}: {IF_PAYMENT_ACCOUNT}">' +
    	                                		'<span style="width:100px;display:inline-block;">{BANK_NM}</span>'+ 
    	                                		'<span style="width:130px;display:inline-block;">{IF_PAYMENT_ACCOUNT}</span>'+
    	                                		'<span style="width:20px;display:inline-block;text-align:centger;">{ACCOUNT_SEQ}</span>'+
    	                                		'<span style="width:40px;display:inline-block;text-align:centger;">{CMS_PAYMENT_DAY_TEMP}</span>'+
    	                                		'<span style="width:110px;display:inline-block;">{CMS_CUSTOMER_COMMENT}</span>'+
    	                                    '</div>'
    	                                ]
    	                            },
    	                            listeners       : {
    	                            	change:'onCmsInfoChange'
    	                            }
    	                    	},{
    	                    		width : 3
    	                    	},{
    	                    		xtype     : 'exbutton',
    	    	              		reference : 'cmsRecBtn',
    	    	              		name      : 'cmsRecBtn',
    	    	              		handler   : 'onCmsRec',	              		
    	    	              		text      : '접수계좌정보변경',
    	                    	}]
    	                    }]
        				}]
        			
        			},{
        				xtype:'exblockrow',
        				items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">접수메모</div>'
        				},{
        					xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextarea',
	                            reference  : 'ta_memo',
	                            height     : 120,
	                            width      : '99.9%'
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">상세메모</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextarea',
	                            reference  : 'ta_remark',
	                            height     : 120,
	                            width      : '99.9%'
	                    	}]
	                    }]
        			},{
        				xtype     : 'exbutton',
	              		reference : 'saveRemarkBtn',
	              		name      : 'saveRemarkBtn',
	              		handler   : 'onSaveRemark',	              		
	              		text      : '메모저장',
	              		style     : {
	              			'margin'  : '5px' 
	              		}
        			}] //exfieldsetblockbox
        		}]
        	},{
        		width : '0.5%'
        	}]
        }]
        
    }]
})