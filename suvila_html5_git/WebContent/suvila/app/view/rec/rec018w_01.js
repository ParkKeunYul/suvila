Ext.define('ExFrm.view.rec.rec018w_01',{
    extend: 'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec015w_01',
    requires:[
    	'ExFrm.view.rec.rec018w_01Controller'
       ,'ExFrm.view.rec.rec018w_01Model'       
    ],
    controller:'rec018w_01',
    viewModel:{
        type:'rec018w_01'
    },
    name:'rec018w_01',
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
    		width  : '99%',
    		layout : 'vbox',
    		items  : [{
    			layout : 'hbox',
    			width  : '100%',
    			items  : [{
    				xtype           : 'excombobox',                		
            		labelAlign      : 'right',
            		labelWidth      : 60,
                    fieldLabel      : '<span style="font-weight: 700;">신도검색</span>',
                    reference       : 'cb_Stipulation',
                    displayField    : 'name',
                    valueField      : 'code',
                    exCommonDmnCode : '001',    
                    width           : 180,
                    store           : {},
                    listeners       : {
                    	change:'onSearchTypeChange'
                    }
    			},{
        			width : 10
        		},{
                	xtype           : 'extextfield',
                    reference       : 'txt_stipulation',
                    enableKeyEvents : true,
                    width           : 110 ,
                    listeners       : {
                 	   keyup : 'onSearchEnter',
                 	   blur  : 'onSearchBlur'
                    },
        		},{
        			width : 5
        		},{
               	 	xtype    : 'exbutton',
                    iconCls  : 'fa fa-search',
                    //text     : '신도검색',
                    handler  : 'onBudSearch',
                    reference: 'budSearchBtn',
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 40,
                    fieldLabel   : '<span style="font-weight: 700;">년도 </span>',
                    width        : 120,
                    valueField   : 'GIBU_DAY_CODE',
                    displayField : 'GIBU_DAY',                         
                    reference    : 'lc_year',
                    name         : 'V_YEAR',
                	bind         : {
                    	store:'{ds_year}'
                    },
    			},{
        			html :'<div style="text-align:center;width:20px;line-height:24px;">~</div>',
        			width : 20
    			},{
    				xtype        :'excombobox',                	
                    width        : 80,
                    valueField   : 'GIBU_DAY_CODE',
                    displayField : 'GIBU_DAY',                         
                    reference    : 'lc_year_end',
                    name         : 'V_YEAR',
                	bind         : {
                    	store:'{ds_year}'
                    },
        		},{
        			width : 3
        		},{
        			xtype    : 'exbutton',                    
                    text     : '검색',
                    handler  : 'onSelect',
                    reference: 'selectBtn',
                    iconCls  : 'fa fa-search',
        		},{
        			width : 3
        		},{
        			xtype    : 'exbutton',                    
                    text     : '재발급',                    
                    handler  : 'onRePrint',
                    reference: 'issueBtn',
                    iconCls  : 'fa fa-print',
        		},{
        			width : 3
        		},{
        			xtype    : 'exbutton',                    
                    text     : '엑셀',                    
                    handler  : 'onExcel',
                    reference: 'excelBtn',
                    iconCls   : 'fa fa-file'
                   // iconCls   : 'fas fa-file-time'
        		},{
        			width : 3
        		},{
        			xtype    : 'exbutton',                    
                    text     : '발급명세서(개인)',                    
                    handler  : 'onIssueG',
                    reference: 'issuegBtn',
                    iconCls   : 'fa fa-file'
        		},{
        			width : 3
        		},{
        			xtype    : 'exbutton',                    
                    text     : '발급명세서(법인)',                    
                    handler  : 'onIssueB',
                    reference: 'issuebBtn',
                    iconCls   : 'fa fa-file'
        		},{
        			width : 3
        		},{
        			xtype    : 'exbutton',                    
                    text     : '기부금 합계표',                    
                    handler  : 'onPrintToT',
                    reference: 'totalBtn',
                    iconCls  : 'fa fa-print',
        		},{
        			xtype            : 'extextfield',
                    reference        : 'hid_bud_no',
                    value            : '',
                    inputType        : 'hidden',
                    name             : 'V_BUD_NO'
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_budNo',
    			},{
        			width            : 0,
            		height           : 0,
            		items            :[{
            			
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
    			height : 25
    		},{
    			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">발급대장</div>',
    		},{
    			exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec018w_01_a',
                cls           : 'rec018w_01_a none-dirty-grid topCheckHeader',
                height        : 420,
                width         : '100%',                
                bind          : {
                    store:'{ds_main}'
                },
                plugins     : [{
                	ptype: 'gridexporter'
                }],
                features   : [{
                	ftype : 'summary',
                	dock  : 'bottom'  // 하단 잠금
                }],
                listeners      : {
                	 selectionchange : 'onSelectionChange'
                	,itemcontextmenu : 'onCrossLineClick'
                },
                columns:[{            	
                	text        : '순번',
                	xtype       : 'rownumberer',                                  
                    align       : 'center',
                    width       : 60,      
                },{
                	text           : '선택',
                	xtype          : 'excheckcolumn',
                    dataIndex      : 'SEL_YN',                    
                    exAlign        : 'center',
                    headerCheckbox : true,
                    width          : 90,
                },{
                	text        : '주민번호앞6자리',
                	xtype       : 'excolumn',
                    dataIndex   : 'JUMIN_NO',                    
                    exAlign     : 'center',
                    width       : 130,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '사업자번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'SAUP_NO',                    
                    exAlign     : 'center',
                    width       : 100,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '년도',
                	xtype       : 'excolumn',
                    dataIndex   : 'GIBU_DAY',                    
                    exAlign     : 'center',
                    width       : 80,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '등록일',
                	xtype       : 'excolumn',
                    dataIndex   : 'CRT_DATE',                    
                    exAlign     : 'center',
                    width       : 160,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '발급번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'GIBU_NO',                    
                    exAlign     : 'center',
                    width       : 80,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '신도번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'BUD_NO',                    
                    exAlign     : 'center',
                    width       : 120,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
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
                    width       : 100,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '기부금액',
                	xtype       : 'excolumn',
                    dataIndex   : 'GIBU_AMT',                    
                    exAlign     : 'right',
                    width       : 110,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return exCommon.setNumberFormat(value);
                    },
                    summaryType  : 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value)+' 원';
                    	}                        
                    },
                },{
                	text        : '주소',
                	xtype       : 'excolumn',
                    dataIndex   : 'ADDR1',                    
                    exAlign     : 'left',
                    width       : 280,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    },
                    summaryType  : 'count',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value)+' 건';
                    	}                        
                    },
                },{
                	text        : '상세주소',
                	xtype       : 'excolumn',
                    dataIndex   : 'ADDR',                    
                    exAlign     : 'left',
                    width       : 250,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    	//return exCommon.getRepVal(record.get("ADDR2"),"") + " " + exCommon.getRepVal(record.get("ADDR3"),""); 
                    }
                },{
                	text        : '우편번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'ZIP_CD',                    
                    exAlign     : 'center',
                    width       : 80,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '발급정보',
                	xtype       : 'excolumn',
                    dataIndex   : 'PRINT_GBN_NM',                    
                    exAlign     : 'center',
                    width       : 110,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '발급자',
                	xtype       : 'excolumn',
                    dataIndex   : 'USER_NM',                    
                    exAlign     : 'center',
                    width       : 110,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                },{
                	text        : '비고',
                	xtype       : 'excolumn',
                    dataIndex   : 'REMARK',                    
                    exAlign     : 'left',
                    width       : 170,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var ACCEPT_SEQ =  exCommon.getRepVal(record.get("ACCEPT_SEQ"),"");
                    	if(ACCEPT_SEQ == ""){
                    		meta.tdCls = 'useYnBack'
                    	}else{
                    		meta.tdCls = 'recCellEdit'
                    	}
                    	return value;
                    }
                }]
    		},{
    			layout : 'vbox',
    			height : 0,
    			//width  : '100%',
    			items  : [{
    				exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec018w_01_p',
                    cls           : 'rec018w_01_p none-dirty-grid',
                    height        : 0,
                    width         : '100%',                
                    bind          : {
                        store:'{ds_excel1}'
                    },
                    plugins     : [{
                    	ptype: 'gridexporter'
                    }],
                    columns:[{            	
                    	text        : '순번',
                    	xtype       : 'rownumberer',                                  
                        align       : 'center',
                        width       : 60,      
                    },{
                    	text        : '발급(일련)',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRINT_NO',                    
                        exAlign     : 'center',
                        width       : 120,       
                    },{
                    	text        : '발급',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRINT_DATE',                    
                        exAlign     : 'center',
                        width       : 100,  
                    },{
                    	text        : '기부자',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'center',
                        width       : 200,  
                    },{
                    	text        : '주민번호 앞 6자리',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BUD_REG_NO',                    
                        exAlign     : 'center',
                        width       : 150,  
                    },{
                    	text        : '주소',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ADDR',                    
                        exAlign     : 'left',
                        width       : 670,  
                    },{
                    	text        : '기부일자',
                    	xtype       : 'excolumn',
                        dataIndex   : 'GIBU_DATE',                    
                        exAlign     : 'center',
                        width       : 250,  
                    },{
                    	text        : '기부내용',
                    	xtype       : 'excolumn',
                        dataIndex   : 'GIBU_NAME',                    
                        exAlign     : 'center',
                        width       : 100,  
                    },{
                    	text        : '기부금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'GIBU_AMT',                    
                        exAlign     : 'right',
                        width       : 120,       
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.setNumberFormat(value);
                        },
                    }]
    			},{
    				exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec018w_01_bz',
                    cls           : 'rec018w_01_bz none-dirty-grid',
                    height        : 0,
                    width         : '100%',                
                    bind          : {
                        store:'{ds_excel2}'
                    },
                    plugins     : [{
                    	ptype: 'gridexporter'
                    }],
                    columns:[{            	
                    	text        : '순번',
                    	xtype       : 'rownumberer',                                  
                        align       : 'center',
                        width       : 60,      
                    },{
                    	text        : '발급(일련)',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRINT_NO',                    
                        exAlign     : 'center',
                        width       : 120,       
                    },{
                    	text        : '발급',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRINT_DATE',                    
                        exAlign     : 'center',
                        width       : 100,  
                    },{
                    	text        : '기부자(단체)',
                    	xtype       : 'excolumn',
                        dataIndex   : 'NAME_KOR',                    
                        exAlign     : 'center',
                        width       : 200,  
                    },{
                    	text        : '사업자번호',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BUD_REG_NO',                    
                        exAlign     : 'center',
                        width       : 150,  
                    },{
                    	text        : '주소',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ADDR',                    
                        exAlign     : 'left',
                        width       : 670,  
                    },{
                    	text        : '기부일자',
                    	xtype       : 'excolumn',
                        dataIndex   : 'GIBU_DATE',                    
                        exAlign     : 'center',
                        width       : 250,  
                    },{
                    	text        : '기부내용',
                    	xtype       : 'excolumn',
                        dataIndex   : 'GIBU_NAME',                    
                        exAlign     : 'center',
                        width       : 100,  
                    },{
                    	text        : '기부금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'GIBU_AMT',                    
                        exAlign     : 'right',
                        width       : 120,       
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.setNumberFormat(value);
                        },
                    }]
    			}]
    		},{
    			height : 10
    		},{
    			layout : 'hbox',
    			width  : '100%',
    			items  :[{
    				html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">발급 상세내역</div>',
    				flex   : 1
    			},{
        			xtype    : 'exbutton',                    
                    text     : '엑셀',                    
                    handler  : 'onExcelSub',
                    reference: 'excelSubBtn',
                    iconCls   : 'fa fa-file'
    			},{
    				width : 5
    			},{
        			xtype    : 'exbutton',                    
                    text     : '인쇄',                    
                    handler  : 'onPrintSub',
                    iconCls   : 'fa fa-file'
    			/*},{
    				width : 5
    			},{
    				xtype    : 'exbutton',                    
                    text     : '인쇄',                    
                    handler  : 'onPrintSub',
                    reference: 'printBtnSub',
                    iconCls  : 'fa fa-print',*/
    			}]
    			
    		},{
    			exGroupRef    : true,
                xtype         : 'exgrid',
                reference     : 'rec018w_01_b',
                cls           : 'grid-group rec018w_01_b none-dirty-grid',
                height        : 280,
                width         : '100%',                
                bind          : {
                    store:'{ds_detail}'
                },
                plugins     : [{
                	ptype: 'gridexporter'
                }],
                features   : [{
                	ftype : 'summary',
                	dock  : 'bottom'  // 하단 잠금
                }],
                exGroupFields : ['GIBU_DAY', 'GIBU_NO'],                
                columns:[{            	
                	text        : 'No',
                	xtype       : 'rownumberer',                                  
                    align       : 'center',
                    width       : 60,                      
                },{
                	text        : '년도',
                	xtype       : 'excolumn',
                    dataIndex   : 'GIBU_DAY',                    
                    exAlign     : 'center',
                    width       : 80,
                },{
                	text        : '발급번호',
                	xtype       : 'excolumn',
                    dataIndex   : 'GIBU_NO',                    
                    exAlign     : 'center',
                    width       : 110,
                },{
                	text        : '접수일자',
                	xtype       : 'excolumn',
                    dataIndex   : 'RECEIPT_DATE',                    
                    exAlign     : 'center',
                    width       : 120,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.getGridDateFormat(value , '/', 8);
                    }
                },{
                	text        : '접수종류',
                	xtype       : 'excolumn',
                    dataIndex   : 'REC_NM',                    
                    exAlign     : 'left',
                    width       : 350,
                    summaryType  : 'count',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value)+' 건';
                    	}                        
                    },
                },{
                	text        : '기부유형',
                	xtype       : 'excolumn',
                    dataIndex   : 'APPROVAL_GBN',                    
                    exAlign     : 'center',
                    width       : 100,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(value == '2'){
                    		return '카드';
                    	}else{
                    		return '현금';
                    	}
                    },
                },{
                	text        : '기부금액',
                	xtype       : 'excolumn',
                    dataIndex   : 'GIBU_AMT',                    
                    exAlign     : 'right',
                    width       : 130,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.setNumberFormat(value);
                    },
                    summaryType  : 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value)+' 원';
                    	}                        
                    },
                }]
    		}]
    	},{
    		width : '0.5%'
    	}]
    }]
});
