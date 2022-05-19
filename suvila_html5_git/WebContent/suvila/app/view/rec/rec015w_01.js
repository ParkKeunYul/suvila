Ext.define('ExFrm.view.rec.rec015w_01',{
    extend: 'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec015w_01',
    requires:[
    	'ExFrm.view.rec.rec015w_01Controller'
       ,'ExFrm.view.rec.rec015w_01Model'       
    ],
    controller:'rec015w_01',
    viewModel:{
        type:'rec015w_01'
    },
    name:'rec015w_01',
    isRootView:true,
    title:'신청접수',
    closable:true,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
    	height : 10,
    	html : '<div id="layerRec015"  class="find_addr_layer_pop" style="display:none;position:fixed;overflow:hidden;z-index:3;-webkit-overflow-scrolling:touch;"><img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼"></div>'    
    },{
    	xtype  :'exformmain',
    	layout : 'hbox',
    	items  : [{
    		width : '0.5%'
    	},{
    		width  : '47.5%',
    		layout : 'vbox',
    		items  : [{
    			width  : '100%',
    			layout : 'hbox',
    			items  :[{
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
    				width : 5
    			},{
    				xtype           : 'excheckbox',
	               	reference       : 'cb_setBunga',
	               	fieldLabel      : '<span style="text-align:left;padding-left:2px;font-weight:700;">분가포함</span>',
	               	labelWidth      : 60,
        		},{
        			width : 10
        		},{
                	xtype           : 'extextfield',
                    reference       : 'txt_stipulation',
                   // value           : '',
                    enableKeyEvents : true,
                    width           : 130 ,
                    listeners       : {
                 	   keyup : 'onSearchEnter'
                    },
                    value : '01-00002-0-01'
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
    	       	 		reference : 'GIBU_AMT',
    	       	 		name      : 'GIBU_AMT',
    	       	 		width     : 0,
    	       	 		value     : 0,
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
    	       	 		width     : 0
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'delData',
    	       	 		name      : 'delData',
    	       	 		width     : 0
            		}]
    			}]
    		},{
    			height : 5
    		},{
    			layout : 'hbox',
    			width  : '100%',
    			items  : [{
    				flex : 1,
    				xtype   :'exfieldsetblockbox',
    				items   : [{
    					xtype : 'exblockrow',
	                    items : [{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">대주번호</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'txt_bud_code',
	                            exLabel    : '대주번호',                            
	                            //name       : 'BUD_CODE',
	                            exReadOnly : true,
	                            width      : '99%',
	                    	}]
	                    }]
    				},{
    					xtype : 'exblockrow',
	                    items : [{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">대주/수계명</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'txt_daeju_nm',
	                            exLabel    : '대주명',                            
	                            //name       : 'BUD_CODE',
	                            exReadOnly : true,
	                            width      : '45%',
	                    	},{
	                    		html  : '<div style="width:20px;text-align:center;font-weight:700;"> / </div>'
	                    	},{
	                    		xtype      : 'extextfield',
	                            reference  : 'txt_sacred_nm',
	                            exLabel    : '수계명',                            
	                            //name       : 'BUD_CODE',
	                            exReadOnly : true,
	                            width      : '45%',
	                    	}]
	                    }]
    				},{
    					xtype : 'exblockrow',
	                    items : [{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">전화번호</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items:[{
	                    		xtype      : 'extextfield',
	                             reference  : 'txt_TelNo1',
	                             //name       : 'TELNO1',
	                             exLabel    : '전화1',
	                             width      : 70,
	                             exReadOnly : true,
	                    	},{
	                    		width : 20,
	                    		html  : '<div style="width:20px;text-align:center;font-weight:700;"> - </div>'
	                    	},{
	                    		 xtype      : 'extextfield',
	                             reference  : 'txt_TelNo2',
	                             //name       : 'TELNO2',
	                             exLabel    : '전화2',
	                             width      : 70,
	                             exReadOnly : true,
	                    	},{
	                    		width : 20,
	                    		html  : '<div style="width:20px;text-align:center;font-weight:700;"> - </div>'
	                    	},{
	                    		xtype       : 'extextfield',
	                             reference  : 'txt_TelNo3',
	                             //name       : 'TELNO3',
	                             exLabel    : '전화3',
	                             width      : 70,
	                             exReadOnly : true,
	                    	}]
	                    }]
    				},{
    					xtype : 'exblockrow',
	                    items : [{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">휴대전화</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items:[{
	                    		xtype      : 'extextfield',
	                             reference  : 'txt_MobiletelNo1',
	                             //name       : 'TELNO1',
	                             exLabel    : '휴대전화1',
	                             width      : 70,
	                             exReadOnly : true,
	                    	},{
	                    		width : 20,
	                    		html  : '<div style="width:20px;text-align:center;font-weight:700;"> - </div>'
	                    	},{
	                    		 xtype      : 'extextfield',
	                             reference  : 'txt_MobiletelNo2',
	                             //name       : 'TELNO2',
	                             exLabel    : '휴대전화12',
	                             width      : 70,
	                             exReadOnly : true,
	                    	},{
	                    		width : 20,
	                    		html  : '<div style="width:20px;text-align:center;font-weight:700;"> - </div>'
	                    	},{
	                    		xtype       : 'extextfield',
	                             reference  : 'txt_MobiletelNo3',
	                             //name       : 'TELNO3',
	                             exLabel    : '휴대전화33',
	                             width      : 70,
	                             exReadOnly : true,
	                    	}]
	                    }]
    				},{
		    			xtype:'exblockrow',
	                    items:[{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">주소</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items:[{
	                    		 xtype      : 'extextfield',
	                    		 width      : '99%',
	                             reference  : 'txt_addr1',
	                             //name       : 'ADDR1',
	                             exLabel    : '주소',
	                             exReadOnly : true,     
	                    	}]
	                    }]
		    		},{
		    			xtype:'exblockrow',
	                    items:[{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">상세주소</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items:[{
	                    		 xtype      : 'extextfield',
	                             width      : '52%',
	                             reference  : 'txt_addr2',
	                             //name       : 'ADDR2',
	                             exLabel    : '상세주소',
	                             exReadOnly : true,
	                    	},{
	                    		width       : '1%'
	                    	},{
	                    		 xtype      : 'extextfield',
	                             width      : '45%',
	                             reference  : 'txt_addr3',
	                             //name       : 'ADDR3',
	                             exReadOnly : true,
	                             /*inpytType  : 'hidden'*/
	                    	},{
	                    		 xtype      : 'extextfield',
	                             width      : '0%',
	                             reference  : 'txt_bldg_num',
	                             inpytType  : 'hidden'
	                    	}]
	                    }]
    				}]
    			},{
    				width : 120,    				
    				html : '<div style="width:120px;height:182px;text-align:center;padding:40px 0 0 0 ;border:1px solid rgb(206, 217, 236);"><img src="./resources/img/etc/default_photo.gif" height="90px" width="90px" ></div>',
    			}]
    		},{
    			height : 5
    		},{
    			layout : 'hbox',
    			width  : '100%',
    			items  :[{
    				html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">접수내역</span>',
    			},{
    				width : 5
    			},{
    				xtype        :'excombobox',
                	labelWidth   : 40,
                    fieldLabel   : '<span style="font-weight: 700;">년도</span>',
                    width        : 120,
                    valueField   : 'GIBU_DAY_CODE',
                    displayField : 'GIBU_DAY',                         
                    reference    : 'lc_year',
                    name         : 'V_YEAR',
                	bind         : {
                    	store:'{ds_year}'
                    },
                    listeners       : {
                    	change:'onYearChange'
                    }
    			}]
    		},{
    			height : 1
    		},{
    			exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec015w_01_a',
                cls           : 'none-dirty-grid rec002w_03_a',
                height        : 580,
                width         : '100%',
                bind          : {
                    store:'{ds_recHisInfo}'
                },
                selModel: {
                    mode: 'MULTI'
                },
                columns:[{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    width       : 70,
                    align       : 'center',                    
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	
                    	if(record.get("GIBU_CNT") == 1){
                    		meta.tdCls = 'gibuReceipt'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return (rowIndex+1);
                    }
                },{
                	text        : '신도번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'BUD_NO',                    
                    exAlign     : 'center',
                    width       : 110,
                    exType      : 'number',
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		if(record.get("GIBU_CNT") == 1){
                    		meta.tdCls = 'gibuReceipt'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '신도명',
                	xtype       : 'excolumn',
                    dataIndex   : 'NAME_KOR',                    
                    exAlign     : 'left',
                    width       : 110,
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		if(record.get("GIBU_CNT") == 1){
                    		meta.tdCls = 'gibuReceipt'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '접수일',
                	xtype       : 'excolumn',
                    dataIndex   : 'RECEIPT_DATE',                    
                    exAlign     : 'center',
                    width       : 110,
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		if(record.get("GIBU_CNT") == 1){
                    		meta.tdCls = 'gibuReceipt'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                		return exCommon.getFormat(value,'dateYMD' );
                    }
                },{
                	text        : '후원명',
                	xtype       : 'excolumn',
                    dataIndex   : 'REC_NM',                    
                    exAlign     : 'left',
                    width       : 160,
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		if(record.get("GIBU_CNT") == 1){
                    		meta.tdCls = 'gibuReceipt'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                		return value;
                    }
                },{
                	text        : '유형',
                	xtype       : 'excolumn',
                    dataIndex   : 'APPROVAL_GBN',                    
                    exAlign     : 'center',
                    width       : 70,
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		
                		if(record.get("GIBU_CNT") == 1){
                    		meta.tdCls = 'gibuReceipt'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                		
                		if(value == 1){
                			return '현금';
                		}
                		return '카드';
                		
                    }
                },{
                	text        : '납부금',
                	xtype       : 'excolumn',
                    dataIndex   : 'GIBU_AMT',                    
                    exAlign     : 'right',
                    width       : 130,
                    exType      : 'number',
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		if(record.get("GIBU_CNT") == 1){
                    		meta.tdCls = 'gibuReceipt'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                		return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
                	}
                },{
                	text        : '발급신도번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'ISSUE_BUD_NO',                    
                    exAlign     : 'center',
                    width       : 110,
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		if(record.get("GIBU_CNT") == 1){
                    		meta.tdCls = 'gibuReceipt'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                }]
    		}]
    	},{
    		width : '4%',
    		layout: {
                type: 'vbox',
                pack :'center',
                align: 'center',
            }, 
            height : '100%',
            items:[{
            	height : 100
            },{
        		items:[{    
        			xtype     : 'exbutton',
              		reference : 'inRightButton',
              		name      : 'inRightMoveBtn',
              		handler   : 'inRightMove',
              		text      : '>',
              		width     : 35,
              		flex      : 1,
              		exAlign   : 'center'
        		},{
        			height : 20
        		},{
        			xtype     : 'exbutton',
              		reference : 'inLeftMoveBtn',
              		name      : 'inLeftMoveBtn',
              		handler   : 'inLeftMove',
              		text      : '<',
              		width     : 35,
              		flex      : 1,
              		exAlign   : 'center'
        		},{
        			height : 20
                },{
                	xtype     : 'exbutton',
              		reference : 'inRightAllButton',
              		name      : 'inRightAllButton',
              		handler   : 'inRightAllMove',
              		text      : '>>',
              		width     : 35,
              		flex      : 1,         
              		exAlign   : 'center'
                },{
        			height : 20
                },{
                	xtype     : 'exbutton',
              		reference : 'inLeftAllButton',
              		name      : 'inLeftAllButton',
              		handler   : 'inLeftAllMove',
              		text      : '<<',
              		width     : 35,
              		flex      : 1,         
              		exAlign   : 'center'
                }]
            }]
    	},{
    		width  : '47.5%',
    		layout : 'vbox',
    		items  : [{
    			width  : '100%',
    			layout : 'hbox',
    			items  :[{
        			xtype           : 'excombobox',                		
            		labelAlign      : 'left',
                    reference       : 'cb_Stipulation_bill',
                    displayField    : 'name',
                    valueField      : 'code',
                    exCommonDmnCode : '001',    
                    width           : 100,
                    store           : {},
                    listeners       : {
                    	change:'onSearchTypeChangeBill'
                    }
    			},{
        			width : 10
        		},{
                	xtype           : 'extextfield',
                    reference       : 'txt_stipulation_bill',
                   // value           : '',
                    enableKeyEvents : true,
                    width           : 130 ,
                    listeners       : {
                 	   keyup : 'onSearchEnterBill'
                    },
                   
        		},{
        			width : 5
        		},{
               	 	xtype    : 'exbutton',
                    iconCls  : 'fa fa-search',
                    text     : '검색',
                    handler  : 'onBudSearchBill',
                    reference: 'budSearchBillBtn',
        		},{
        			width : 5
        		},{
    			    xtype     : 'exbutton',
            		handler   : 'onSaveBill',	            		
            		text      : '저장',
            		iconCls   : 'fa fa-save',
        		},{
        			width : 5
        		},{
    			    xtype     : 'exbutton',
            		handler   : 'onPrintBill',	            		
            		text      : '인쇄',
            		iconCls   : 'fa fa-print',
        		/*},{
        			width : 5
        		},{
    			    xtype     : 'exbutton',
            		handler   : 'onTempbill',	            		
            		text      : '임시인쇄',
            		iconCls   : 'fa fa-print',*/
        		},{
        			width            : 0,
            		height           : 0,
            		items            :[{
            			xtype            : 'extextfield',
                        reference        : 'hid_bud_no_bill',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_BUD_NO_BILL'
            		}]
    			}]
    		},{
    			height : 5
    		},{
    			layout : 'hbox',
    			width  : '100%',
    			items  : [{
    				width   : '100%',
    				xtype   :'exfieldsetblockbox',
    				items   : [{
    					xtype : 'exblockrow',
	                    items : [{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신도번호</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'txt_budNo_bill',
	                            exLabel    : '신도번호',                            
	                            name       : 'BUD_NO',
	                            exReadOnly : true,
	                            width      : '99%',
	                    	}]
	                    }]
    				},{
    					xtype : 'exblockrow',
	                    items : [{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">성명</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'txt_name_kor',
	                            exLabel    : '성명',                            
	                            name       : 'NAME_KOR',
	                            exReadOnly : true,
	                            width      : '45%',
	                    	},{
	                    		width : 5
	                    	},{
	                    		 xtype        : 'excombobox',
	                             valueField   : 'CODE',
	                             displayField : 'NAME',
	                             reference    : 'sel_gbn',
	                             name         : 'SEL_GBN',
	                             value        : 'T',
	                             bind         : {
	                             	store:'{ds_type_gbn}'
	                             },
	                             listeners       : {
	                             	change:'typeGbnChange'
	                             },
	                             width : 140,
	                    	},{
	                    		width : 5
	                    	},{
	                    		reference  : 'birth_area',
	                    		layout : 'hbox',	                    		
	                    		items  : [{
	                    			xtype      : 'extextfield',
		                            reference  : 'me_rep_juminno',
		                            exLabel    : '주민번호',                            
		                            name       : 'JUMIN_NO',	                           
		                            width      : 120,		
		                            enableKeyEvents : true,
		                            listeners       : {
		                            	keyup      : 'onKeyUp'
		                            }
	                    		}]
	                    	},{
	                    		hidden : true,
	                    		reference  : 'biz_area',
	                    		layout : 'hbox',
	                    		items  : [{
	                    			xtype      : 'extextfield',
		                            reference  : 'me_rep_saup_no',
		                            exLabel    : '사업자번호',                            
		                            name       : 'SAUP_NO',	                           
		                            width      : 120,
		                          //  exFormat   : 'bzn',
		                            enableKeyEvents : true,
		                            listeners       : {
		                           	   keyup : 'onKeyUp'
		                             },
	                    		}]
	                    	}]
	                    }]
    				},{
		    			xtype:'exblockrow',
	                    items:[{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">우편번호</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items:[{
	                             xtype      :'extextfield',
	                             reference  : 'me_bill_postno',
	                             name       : 'ZIP_CD',
	                             exLabel    : '우편번호',
	                             width      : 70,
	                             exReadOnly : true,
	                             exFormat   : 'zip',
	                         },{
	                        	 width : 5
	                         },{
	                        	 xtype:'button',
	                             text:'우편번호',
	                             handler:'onFindAddr'
	                         }]  
	                    }]
    				},{
		    			xtype:'exblockrow',
	                    items:[{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">주소</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items:[{
	                    		 xtype      : 'extextfield',
	                    		 width      : '99%',
	                             reference  : 'txt_bill_addr1',
	                             name       : 'ADDR1',
	                             exLabel    : '주소',
	                             exReadOnly : true,     
	                    	}]
	                    }]
		    		},{
		    			xtype:'exblockrow',
	                    items:[{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">상세주소</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items:[{
	                    		 xtype      : 'extextfield',
	                             width      : '52%',
	                             reference  : 'txt_bill_addr2',
	                             name       : 'ADDR2',
	                             exLabel    : '상세주소',
	                    	},{
	                    		width       : '1%'
	                    	},{
	                    		 xtype      : 'extextfield',
	                             width      : '45%',
	                             reference  : 'txt_bill_addr3',
	                             name       : 'ADDR3',
	                             exReadOnly : true,	                             
	                    	},{
	                    		 xtype      : 'extextfield',
	                             width      : '0%',
	                             reference  : 'txt_bill_bldg_num',
	                             inpytType  : 'hidden',
	                             name       : 'BLDG_NUM',
	                    	}]
	                    }]
		    		},{
		    			xtype:'exblockrow',
	                    items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">메모</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		 xtype      : 'extextarea',
	                			 reference  : 'txt_remark',
	                             name       : 'REMARK',
	                             width      : '99%',
	                             height     : 40
	                    	}]
	                    }]	     
    				}]
    			}]
    		},{
    			height : 5
    		},{
    			layout : 'hbox',
    			width  : '100%',
    			items  :[{
    				html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">기부금 신청내역</span>',
    			},{
    				width : 5
    			},{
    				xtype           : 'excheckbox',
	               	reference       : 'cb_setAdd',
	               	fieldLabel      : '<span style="text-align:left;padding-left:2px;font-weight:700;color:blue;">신도유지</span>',
	               	labelWidth      : 60,
    			},{
        			width : 5
        		},{
    			    xtype     : 'exbutton',
            		reference : 'addBullBtn',
            		name      : 'addBullBtn',
            		handler   : 'onAddBul',	            		
            		text      : '불전함추가',
            		iconCls   : 'fa fa-save',
        		},{
        			width : 5
        		},{
    			    xtype     : 'exbutton',
            		reference : 'addHyunBtn',
            		name      : 'addHyunBtn',
            		handler   : 'onAddHyun',	            		
            		text      : '현물추가',
            		iconCls   : 'fa fa-save',
    			}]
    		},{
    			height : 1
    		},{
    			exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec015w_01_b',
                cls           : 'none-dirty-grid rec002w_03_a',
                height        : 567,
                width         : '100%',
                bind          : {
                    store:'{ds_Detail}'
                },
                selModel: {
                    mode: 'MULTI'
                },
                plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                }],
                features   : [{
                	ftype : 'summary',
                	dock  : 'bottom'  // 하단 잠금
                }],
                listeners      : {
                	beforeedit   : 'onBeforeedit',	    
                	edit         : 'onEdit'
                },
                columns:[{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    width       : 60,
                    align       : 'center',                    
                    /*renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(record.get("GIBU_CNT") == 1){
                    		meta.tdCls = 'gibuReceipt'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return (rowIndex+1);
                    }*/
                },{
                	text        : '년도',
                	xtype       : 'excolumn',
                    dataIndex   : 'GIBU_DAY',                    
                    exAlign     : 'center',
                    width       : 70,
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                   		meta.tdCls = 'recCellNotEdit'
                		return value;
                	}
                },{
                	text        : '접수일자',
                	xtype       : 'excolumn',
                    dataIndex   : 'RECEIPT_DATE',                    
                    exAlign     : 'center',
                    width       : 110,
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		
                		if( record.get("BULJUNHAM") == 'T' ){
                			meta.tdCls = 'recCellEdit'
                		}else{
                			meta.tdCls = 'recCellNotEdit'
                		}
                		return exCommon.getGridDateFormat(value,'/' , 8);
                    },
                    editor    : {
                    	xtype         : 'exdatefield',
                    	format        : 'Y/m/d'
                    },
                },{
                	text        : '접수종류',
                	xtype       : 'excolumn',
                    dataIndex   : 'REC_NM',                    
                    exAlign     : 'left',
                    width       : 180,
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		if(record.get("BULJUNHAM") == 'T' && record.get("GIBU_TYPE") == '2'){
                			meta.tdCls = 'recCellEdit'
            			}else{
            				meta.tdCls = 'recCellNotEdit'
            			}
                		return value;
                    },
                    editor    : {
                    	xtype         : 'extextfield',                    	
                    },
                    summaryType  : 'count',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 건';
                    },
                },{
                	text        : '기부종류',
                	xtype       : 'excolumn',
                    dataIndex   : 'GIBU_TYPE',                    
                    exAlign     : 'right',
                    width       : 110,
                    exHidden    : true,
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		meta.tdCls = 'recCellNotEdit'
                		return value;
                    }
                },{
                	text        : '수량',
                	xtype       : 'excolumn',
                    dataIndex   : 'EA',                    
                    exAlign     : 'right',
                    width       : 70,
                    exType      : 'number',
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		
                		if(record.get("BULJUNHAM") == 'T' && record.get("GIBU_TYPE") == '2'){
                			meta.tdCls = 'recCellEdit'
            			}else{
            				meta.tdCls = 'recCellNotEdit'
            			}
                			
            			if(record.get("BULJUNHAM") == 'T' && record.get("GIBU_TYPE") == '1'){
            				return '';
            			}	
                			
            			if(record.get("TYPE") != 'REC'){
                			return exCommon.setNumberFormat(exCommon.getRepNum(value));
                		}
                		return '';
                	},
                	editor    : {
                    	xtype         : 'extextfield',                    	
                    },
                },{
                	text        : '단가',
                	xtype       : 'excolumn',
                    dataIndex   : 'PRICE',                    
                    exAlign     : 'right',
                    width       : 80,
                    exType      : 'number',
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		
            			if(record.get("BULJUNHAM") == 'T' && record.get("GIBU_TYPE") == '2'){
                			meta.tdCls = 'recCellEdit'
            			}else{
            				meta.tdCls = 'recCellNotEdit'
            			}	
                			
            			if(record.get("BULJUNHAM") == 'T' && record.get("GIBU_TYPE") == '1'){
            				return '';
            			}
                			
                		if(record.get("TYPE") != 'REC'){
                			return exCommon.setNumberFormat(exCommon.getRepNum(value));
                		}
                		return '';
                	},
                	editor    : {
                    	xtype         : 'extextfield',                    	
                    },
                },{
                	text        : '접수번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'ACCEPT_SEQ',                    
                    exAlign     : 'center',
                    width       : 170,
                    
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                		meta.tdCls = 'recCellEdit'
                		return value;
                	},
                	exHidden: true
                },{
                	text        : '기부금액',
                	xtype       : 'excolumn',
                    dataIndex   : 'GIBU_AMT',                    
                    exAlign     : 'right',
                    width       : 110,
                    exType      : 'number',
                	renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
            			if(record.get("TYPE") != 'REC'){
            				meta.tdCls = 'recCellEdit'
            			}else{
            				meta.tdCls = 'recCellNotEdit'
            			}
                		return exCommon.setNumberFormat(exCommon.getRepNum(value));
                	},
                	summaryType  : 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
                    },
                	editor    : {
                    	xtype         : 'extextfield',                    	
                    },
                }],
                /*
                viewConfig: {
                	getRowClass: function(record, index) {
                        if(record.get("TYPE") != 'REC'){
                        	return 'recCellEdit'
            			}else{
            				return 'recCellNotEdit'
            			}
                        
                    }
                }
                */
    		}]
    	},{
    		width : '0.5%'
    	}]
    }]
});
