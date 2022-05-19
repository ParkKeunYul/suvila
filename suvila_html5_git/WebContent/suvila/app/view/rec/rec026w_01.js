Ext.define('ExFrm.view.rec.rec026w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.rec026w_01',
	requires:[
		'ExFrm.view.rec.rec026w_01Controller',
        'ExFrm.view.rec.rec026w_01Model'
	],
	controller:'rec026w_01',
	viewModel:{
        type:'rec026w_01'
    },
    name:'rec026w_01',
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
	    	    		width : 50,
	    	    		html  :'<div style="text-align:center;width:50px;font-weight:700;line-height:24px;">수납일: </div>',
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
            		},{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 35,
	                    fieldLabel   : '<span style="font-weight: 700;">항목</span>',
	                    width        : 155,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'lc_acceptGbn',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_acceptGbn}'
	                	},
	        		},{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 60,
	                    fieldLabel   : '<span style="font-weight: 700;">수납구분</span>',
	                    width        : 180,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    :'lc_approv',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_approv}'
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
	                reference  : 'rec026w_01_a',
	                height     : 800,              
	                plugins    :[{
	                	ptype: 'gridexporter'
	                }],
	                bind      : {
	                    store:'{ds_main}'
	                },
	                features   : [{
                    	ftype : 'summary',
                    	dock  : 'bottom'  // 하단 잠금
                    }],
	                cls       : 'rec026w_01_a  none-dirty-grid',
	                columns   : [{
	                	text        : '순번',
                        xtype       : 'rownumberer',
                        width       : 70,
                        align       : 'center',
	                },{
	                	text      :'가족번호',
	                	xtype     :'excolumn',
	                    dataIndex :'BUD_CODE',                    
	                    exAlign   :'center',
	                    width     : 110,
	                    sortable  : true,
	                },{
	                	text      :'대주번호',
	                	xtype     :'excolumn',
	                    dataIndex :'DAEJU_BUD_NO',                    
	                    exAlign   :'center',
	                    width     : 120,
	                    sortable  : true,
	                },{
	                	text      :'대주명',
	                	xtype     :'excolumn',
	                    dataIndex :'DAEJU_NAME_KOR',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                },{
	                	text      :'전화',
	                	xtype     :'excolumn',
	                    dataIndex :'TELNO',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    sortable  : true,
	                },{
	                	text      :'휴대폰',
	                	xtype     :'excolumn',
	                    dataIndex :'MOBILE_TELNO',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    sortable  : true,
	                },{
	                	text      :'주소',
	                	xtype     :'excolumn',
	                    dataIndex :'ADDR1',                    
	                    exAlign   :'left',
	                    width     : 230,
	                    sortable  : true,
	                },{
	                	text      :'상세주소',
	                	xtype     :'excolumn',
	                    dataIndex :'ADDR2',                    
	                    exAlign   :'left',
	                    width     : 230,
	                    sortable  : true,
	                },{
	                	text      :'우편번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ZIP_CD',                    
	                    exAlign   :'center',
	                    width     : 110,
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