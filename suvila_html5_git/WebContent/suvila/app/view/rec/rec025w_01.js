Ext.define('ExFrm.view.rec.rec025w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.rec025w_01',
	requires:[
		'ExFrm.view.rec.rec025w_01Controller',
        'ExFrm.view.rec.rec025w_01Model'
	],
	controller:'rec025w_01',
	viewModel:{
        type:'rec025w_01'
    },
    name:'rec025w_01',
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
	                	xtype        : 'extextfield',            	
	                    reference    : 'txt_addr',
	                    name         : 'V_ADDR',
	                    fieldLabel   : '<span style="font-weight: 700;">주소</span>',
	                    labelWidth   : 35,
	                    width        : 175,
	                    enableKeyEvents : true,
	                    listeners:{
	                	   //keyup : 'onSearchSelect'
	                    }
	                },{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 60,
	                    fieldLabel   : '<span style="font-weight: 700;">접수구분</span>',
	                    width        : 170,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'lc_acceptGbn',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_acceptGbn}'
	                	},
	                	listeners       : {
	                    	change:'onSearchAcceptChange'
	                    }
	        		},{
	        			width : 5
	        		},{
	        			xtype        :'excombobox',
	                    width        : 110,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'lc_subacceptGbn',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_subacceptGbn}'
	                	},
	                	value        : 0
	        		},{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	        			labelWidth   : 35,
	                    fieldLabel   : '<span style="font-weight: 700;">일자</span>',
	                    width        : 135,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'cb_date',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_date_type}'
	                	},
	                	listeners       : {
	                    	change:'onDateTypeChange'
	                    }
	        		},{
	        			hidden    : true ,
	        			layout    : 'hbox',
	        			reference : 'date_area',
	        			items     : [{
	        				width : 5
	        			},{
	        				xtype          : 'exdatefield',
	                        reference      : 'me_SDate',
	                        format         : 'Y-m-d',
	                        width          : 100
	            		},{
	            			html :'<div style="text-align:center;width:20px;font-weight:700;line-height:24px;">~</div>',
	            			width : 20
	            		},{
	            			xtype          : 'exdatefield',
	                        reference      : 'me_EDate',
	                        format         : 'Y-m-d',
	                        width          : 100 
	        			}]
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
	                reference  : 'rec025w_01_a',
	                height     : 800,              
	                plugins    :[{
	                	ptype: 'gridexporter'
	                }],
	                bind      : {
	                    store:'{ds_detail}'
	                },
	                features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
	                cls       : 'rec025w_01_a  none-dirty-grid',
	                columns   : [{
	                	text        : '순번',
                        xtype       : 'rownumberer',
                        width       : 70,
                        align       : 'center',
	                },{
	                	text      :'발송자',
	                	xtype     :'excolumn',
	                    dataIndex :'SINDO_GBN_NM',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    sortable  : true,
	                },{
	                	text      :'입회일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ISSUE_DATE',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    sortable  : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getFormat(value,'dateYMD' );
	                    }
	                },{
	                	text      :'신도번호',
	                	xtype     :'excolumn',
	                    dataIndex :'BUD_NO',                    
	                    exAlign   :'center',
	                    width     : 130,
	                    sortable  : true,
	                },{
	                	text      :'관계',
	                	xtype     :'excolumn',
	                    dataIndex :'REPRESEN_REL',                    
	                    exAlign   :'left',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'신청자',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME_KOR',                    
	                    exAlign   :'left',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'생년월일',
	                	xtype     :'excolumn',
	                    dataIndex :'BIRTHDAY',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    sortable  : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getFormat(value,'dateYMD' );
	                    }
	                },{
	                	text      :'성별',
	                	xtype     :'excolumn',
	                    dataIndex :'SEX_GBN_NM',                    
	                    exAlign   :'left',
	                    width     : 80,
	                    sortable  : true,
	                },{
	                	text      :'전화번호',
	                	xtype     :'excolumn',
	                    dataIndex :'TELNO',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    sortable  : true,
	                },{
	                	text      :'휴대번호',
	                	xtype     :'excolumn',
	                    dataIndex :'MOBILE_TELNO',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    sortable  : true,
	                },{
	                	text      :'주소1',
	                	xtype     :'excolumn',
	                    dataIndex :'ADDR1',                    
	                    exAlign   :'left',
	                    width     : 200,
	                    sortable  : true,
	                },{
	                	text      :'주소2',
	                	xtype     :'excolumn',
	                    dataIndex :'ADDR2',                    
	                    exAlign   :'left',
	                    width     : 200,
	                    sortable  : true,
	                },{
	                	text      :'우편번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ZIP_CD',                    
	                    exAlign   :'center',
	                    width     : 90,
	                    sortable  : true,
	                },{
	                	text      :'대표신도번호',
	                	xtype     :'excolumn',
	                    dataIndex :'DAEJU_BUD_NO',                    
	                    exAlign   :'center',
	                    width     : 130,
	                    sortable  : true,
	                },{
	                	text      :'총금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT',                    
	                    exAlign   :'right',
	                    width     : 130,
	                    sortable  : true,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
	                    },
	                    summaryType    : 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        },
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546