Ext.define('ExFrm.view.rec.rec002w_18',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.rec002w_18',
	requires:[
		'ExFrm.view.rec.rec002w_18Controller',
        'ExFrm.view.rec.rec002w_18Model'
	],
	controller:'rec002w_18',
	viewModel:{
        type:'rec002w_18'
    },
    name:'rec002w_18',
    isRootView:true,
    title:'기부금출력관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10,
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
	            	layout : 'hbox',
	    	    	width  : '100%',
	    	    	height : 30,
	    	    	items  : [{
	        			xtype        :'excombobox',
	                	labelWidth   : 65,
	                    fieldLabel   : '<span style="font-weight: 700;">납부년도</span>',
	                    width        : 140,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'lc_search_year',	                    
	                	bind         : {
	                    	store:'{ds_year}'
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
	        			width : 5
	    	    	},{
	                	xtype           : 'extextfield',
	                    reference       : 'txt_stipulation',
	                   // value           : '',
	                    enableKeyEvents : true,
	                    width           : 110 ,
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
            			width : 5
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 50,
	                    fieldLabel   : '<span style="font-weight: 700;">전각명</span>',
	                    width        : 200,
	                    valueField   : 'JUNGAK_CD',
	                    displayField : 'JUNGAK_NM',     
	                    reference    : 'lc_IDJungakInfo',
	                    emptyText    : '전체',
	                    value        : 0,
	                	bind         : {
	                    	store:'{ds_IDJGKindInfo}'
	                	}
	        		},{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 50,
	                    fieldLabel   : '<span style="font-weight: 700;">인등명</span>',
	                    width        : 200,
	                    valueField   : 'LIGHT_CODE',
	                    displayField : 'LIGHT_NM',     
	                    reference    : 'lc_IDKindInfo',
	                    emptyText    : '전체',
	                    value        : 0,
	                	bind         : {
	                    	store:'{ds_IDKindInfo}'
	                	}
	        		},{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 60,
	                    fieldLabel   : '<span style="font-weight: 700;">신도분류</span>',
	                    width        : 220,
	                    valueField   : 'CLASS_CD',
	                    displayField : 'CLASS_NAME',     
	                    reference    : 'lc_classMgt',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_classMgt}'
	                	}
	        		},{
	        			width : 5
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 35,
	                    fieldLabel   : '<span style="font-weight: 700;">소등</span>',
	                    width        : 150,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'lc_IDCloseYn',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_deung_type}'
	                	}
	        		},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',
	              		reference : 'selectBtn',
	              		name      : 'selectBtn',
	              		text      : '조회',
	              		handler   : 'onSelect',
	    	    	},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',	              		
	              		text      : '엑셀',
	              		handler   : 'onExcel',
	        		},{
	        			width : 0,
	        			heigth: 0,
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
	    	        		xtype            : 'extextfield',
	                        reference        : 'hid_bud_no',
	                        value            : '',
	                        inputType        : 'hidden',
	                        name             : 'V_BUD_NO'
	            		},{
	            			xtype            : 'extextfield',
	                        reference        : 'txt_budNo',
	    	    		}]
	    	    	}]
	            },{
	        		exGroupRef : true,
	                xtype      : 'exgrid',
	                reference  : 'rec002w_18_a',
	                height     : 790,
	                plugins    :[{
	                	ptype: 'gridexporter'
	                }],
	                bind       : {
	                    store:'{ds_main}'
	                },
	                features      : [{
	                	ftype : 'summary',
	                	dock  : 'bottom'  // 하단 잠금
	                }],
	                cls       : 'rec002w_18_a  none-dirty-grid',
	                columns   : [{
	                	text        : '순번',
                        xtype       : 'rownumberer',
                        width       : 70,
                        align       : 'center',   
	                },{
	                	text      :'접수번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCEPT_SEQ',                    
	                    exAlign   :'center',
	                    width     : 160,
	                    sortable  : true,
	                },{
	                	text      :'접수일',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCEPT_DATE',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    sortable  : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.getFormat(value,'dateYMD' );
                        }
	                },{
	                	text      :'신도번호',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_BUD_NO',                    
	                    exAlign   :'center',
	                    width     : 130,
	                    sortable  : true,
	                },{
	                	text      :'신청자',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_NAME_KOR',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'CMS',
	                	xtype     :'excolumn',
	                    dataIndex :'CMS_TRADE_CD',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'1월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH1',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'2월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH2',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'3월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH3',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'4월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH4',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'5월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH5',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'6월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH6',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'7월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH7',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'8월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH8',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'9월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH9',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'10월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH10',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'11월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH11',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'12월납부',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_MONTH12',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'PAYMENT_MONTH',
	                	xtype     :'excolumn',
	                    dataIndex :'올해납부금액',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'접수금액',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_PLAN_AMT',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'총납부금액',
	                	xtype     :'excolumn',
	                    dataIndex :'PAYMENT_AMT',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'미수금액',
	                	xtype     :'excolumn',
	                    dataIndex :'MISU_AMT',                    
	                    exAlign   :'right',
	                    width     : 100,
	                    sortable  : true,
	                    exType    : 'number',
	                    summaryType  : 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
	                    },
	                },{
	                	text      :'인등종류',
	                	xtype     :'excolumn',
	                    dataIndex :'LIGHT_NM',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'신도명',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME_KOR',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'인등번호',
	                	xtype     :'excolumn',
	                    dataIndex :'LIGHT_NO',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'소등여부',
	                	xtype     :'excolumn',
	                    dataIndex :'CLOSE_YN',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_deung_type');
	                    	return exCommon.getComboVal(value,store);
	                    }
	                },{
	                	text      :'인등위치',
	                	xtype     :'excolumn',
	                    dataIndex :'JUNGAK_NM',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'년',
	                	xtype     :'excolumn',
	                    dataIndex :'INDEUNG_YEAR',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'월',
	                	xtype     :'excolumn',
	                    dataIndex :'INDEUNG_MONTH',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'기간',
	                	xtype     :'excolumn',
	                    dataIndex :'INDEUNG_PERIOD',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'메모',
	                	xtype     :'excolumn',
	                    dataIndex :'MEMO',                    
	                    exAlign   :'left',
	                    width     : 300,
	                    sortable  : true,
	                },{
	                	text      :'접수메모',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    width     : 300,
	                    sortable  : true,
	                }],
	                viewConfig: {
	                	getRowClass: function(record, index) {
	                        var CLOSE_YN = record.get('CLOSE_YN');	                   
	                        if(CLOSE_YN == 'T'){
	                        	return 'useYnBack';
	                        }else{
	                        	return 'color_depth_1';
	                        }
	                    }
	                }
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546