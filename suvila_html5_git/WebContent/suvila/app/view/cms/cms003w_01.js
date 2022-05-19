Ext.define('ExFrm.view.cms.cms003w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.cms003w_01',
	requires:[
		'ExFrm.view.cms.cms003w_01Controller',
        'ExFrm.view.cms.cms003w_01Model'
	],
	controller:'cms003w_01',
	viewModel:{
        type:'cms003w_01'
    },
    name:'cms003w_01',
    isRootView:true,
    title:'CMS회원',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 5
	    },{
	    	height : 30,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
            items:[{
            	layout:'hbox',
            	items:[{
            		xtype:'excombobox',
                	fieldLabel:'사찰계좌정보',
                	fieldStyle: 'text-align: right;',
                	labelWidth:90,
                    valueField:'CMS_TRADE_CD',
                    displayField:'CMS_CUSTOMER_COMMENT',
                    reference:'lc_cms_trade_cd',
                    emptyText : '전체[]',
                    value : '',
                    width : 250,
                    bind:{
                     	store:'{ds_temple_CMS_info}'
                    },
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{CMS_TRADE_CD}: {description}"><span >{CMS_CUSTOMER_COMMENT}</span>[{CMS_TRADE_CD}]</div>'
                        ]
                    },
            	},{
            		width : 2
            	},{
            		xtype:'excombobox',
            		fieldLabel:'신도검색',
            		labelWidth:70,
                	fieldStyle: 'text-align: right;',
                    reference:'sel_BudSearchGbn',
                    displayField:'name',
                    valueField:'code',
                    exCommonDmnCode:'001',    
                    width : 170,
                    store:{},
                    listeners:{
                    	change:'onSearchTypeChange'
                    }
            	},{
            		width : 2
            	},{
            		xtype:'extextfield',
                    reference:'txt_stipulation',
                    value : '',
                    enableKeyEvents: true,
                    listeners:{
                 	     keyup : 'onSearchEnter'
                 	    ,blur  : 'onSearchBlur'
                    },
                    width : 130
            	},{
            		width : 2
            	},{
            		xtype:'exbutton',
                    cls:'exbuttonsrch',
                    text:'신도조회',                
                    listeners:[{
                    	 click:'onSindoSearch'                    	
                    }]
            	},{
            		width : 20
            	},{
    	    		xtype:'exdatefield',
    	    		fieldLabel:'출금예정일',
    	    		labelWidth:80,	    		            	
                    reference:'em_sDate',
                    name:'em_sDate',                                                   
                    exFormat : 'Y/m/d',
                    exSubmitFormat : 'Ymd',
    	    	},{
    	    		width : 20,
    	    		html : '<div style="text-align:center;">~</div>'
    	    	},{
    	    		xtype:'exdatefield',
                    reference:'em_eDate',
                    name:'em_eDate',                                   
                    width : 170,
                    exFormat : 'Y/m/d',
                    exSubmitFormat : 'Ymd',
            	},{
            		xtype:'extextfield',
                    reference:'hid_bud_no',
                    value : '',
                    width : 0,
                    height : 0,
                    inputType: 'hidden',
                    name : 'V_BUD_NO'            		
            	}]
            },{
            	width : 5
            },{
            	xtype     : 'exbutton',
          		handler   : 'onSelect',
          		text      : '조회',    
            },{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		handler   : 'onExcel',
          		text      : '파일 저장 및 출력',
        	},{
        		width : '0.5%'
            }]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	 layout:'vbox',
	        	 width:'99%',
	             items:[{
	        		//html : '그리드'
		        	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'cms003w_01_a',
	                height:470,
	                width:'100%',
	                //width:1700,
	               // exGroupFields:['IF_REQUEST_DATE','IF_TRAN_ID'],
	               /* viewConfig: {
                        getRowClass: function(record, rowIndex, rowParams, store) {
                        	//console.log('record',record);
                        	//return 'exrowwhite';
                        }
                    },*/ 
	                bind:{
	                    store:'{ds_main}'
	                },
	                plugins:[{	                
	                	ptype: 'gridexporter'
	                }],
	                listeners:{
	                   // itemclick:'onMainGridClick',
	                    selectionchange : 'onSelectionChange'
	                },
	                features: [{
	                	id: 'group',
	                    ftype: 'groupingsummary',
	                    hideGroupedHeader: true,
	                    enableGroupingMenu: false,
	                },{
	                	ftype : 'summary',
	                	dock: 'bottom'  // 하단 잠금
	                }],
	                columns:[{
	                	text:'출금예정일',
	                	xtype:'excolumn',
	                    dataIndex:'IF_REQUEST_DATE',
	                    width : 110,
	                    exAlign:'left',
	                    /*locked: true,*/
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value.substr(0,4)+" / "+value.substr(4,2)+" / "+value.substr(6,2);
                        }                        
	                },{
	                	text:'출금계정',
	                	xtype:'excolumn',
	                    dataIndex:'IF_TRAN_ID',
	                    width : 80,
	                    exAlign:'left',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value;
                        },
	                },{
	                	text:'순번',
	                	xtype:'excolumn',
	                    dataIndex:'REQUEST_SEQ',
	                    width:50,
	                    exAlign:'center',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value;
                        },                   
	                },{
	                	text:'신도번호',
	                	xtype:'excolumn',
	                    dataIndex:'BUD_NO',
	                    width:110,
	                    exAlign:'left',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value;
                        },                   
	                },{
	                	text:'신도명',
	                	xtype:'excolumn',
	                    dataIndex:'NAME_KOR',
	                    width:140,
	                    exAlign:'left',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value;
                        },	                 
	                },{
	                	text:'은행명',
	                	xtype:'excolumn',
	                    dataIndex:'BANK_NM',
	                    width:90,
	                    exAlign:'left',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value;
                        },
	                },{
	                	text:'계좌번호',
	                	xtype:'excolumn',
	                    dataIndex:'ACCOUNT_NO',
	                    width:130,
	                    exAlign:'left',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value;
                        },
	                },{
	                	text:'요청금액',
	                	xtype:'excolumn',
	                    dataIndex:'IF_REQUEST_PAYMENT_AMOUNT',
	                    width:130,
	                    exAlign:'right',
	                    exType: 'number',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return exCommon.setNumberFormat(value);
                        },
                        summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        }
	                },{
	                	text:'성공금액',
	                	xtype:'excolumn',
	                    dataIndex:'IF_PAYMENT_COMPLETION_AMOUNT',
	                    width:130,
	                    exAlign:'right',
	                    exType: 'number',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return exCommon.setNumberFormat(value);
                        },
                        summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        }
	                },{
	                	text:'수수료',
	                	xtype:'excolumn',
	                    dataIndex:'REQEUST_FEE',
	                    width:90,
	                    exAlign:'right',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return exCommon.setNumberFormat(value);
                        },
                        summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	if(value > 0){
                        		return exCommon.setNumberFormat(value)+' 원';
                        	}                        
                        }
	                /*},{
	                	text:'수수료',
	                	xtype:'excolumn',
	                    dataIndex:'IF_PAYMENT_COMMISSION',
	                    width:90,
	                    exAlign:'center',
	                },{
	                	text:'출금 성공',
	                	xtype:'excolumn',
	                    dataIndex:'IF_PROCESS_RESULT',
	                    width:90,
	                    exAlign:'center',*/
	                },{
	                	text:'출금 성공',
	                	xtype:'excolumn',
	                    dataIndex:'IF_PROCESS_RESULT_NM',
	                    width:90,
	                    exAlign:'center',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value;
                        },
	                /*},{
	                	text:'결과코드',
	                	xtype:'excolumn',
	                    dataIndex:'IF_RESULT_CD',
	                    width:90,
	                    exAlign:'center',*/
	                },{
	                	text:'작업결과',
	                	xtype:'excolumn',
	                    dataIndex:'IF_RESULT_MESSAGE',
	                    width:90,
	                    exAlign:'center',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value;
                        },
	                },{
	                	text:'출금구분',
	                	xtype:'excolumn',
	                    dataIndex:'CMS_REQUEST_GBN',
	                    width:90,
	                    exAlign:'center',
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_payment_day_gbn');
                            var index = store.find('CODE',value);
                            if(index != -1){
                                return store.getAt(index).get('NAME');
                            }
                            else {
                                return value;
                            }
                        	
                        	return value;
                        },
	                /*},{
	                	text:'출금예정일',
	                	xtype:'excolumn',
	                    dataIndex:'PAYMENT_YYYYMMDD',
	                    width:90,
	                    exAlign:'center',
	                },{
	                	text:'해지일',
	                	xtype:'excolumn',
	                    dataIndex:'REG_DATE',
	                    width:90,
	                    exAlign:'center',*/
	                },{
	                	text:'거래일',
	                	xtype:'excolumn',
	                    dataIndex:'IF_REAL_PAYMENT_DATE',
	                    width:110,
	                    exAlign:'center',
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	
                        	
                        	var val ="";
                        	if(value != undefined ){
                        		var val = value + "";
                        		    val = val.substr(0,4)+" / "+val.substr(4,2)+" / "+val.substr(6,2);
                        	}
                        	return val;
                        }
	                /*},{
	                	text:'출금요청일',
	                	xtype:'excolumn',
	                    dataIndex:'IF_TRANSFER_DATE',
	                    width:70,
	                    exAlign:'center',*/
	                },{
	                	text:'결과수신일',
	                	xtype:'excolumn',
	                    dataIndex:'IF_RECEIPT_DATE',
	                    width:110,
	                    exAlign:'center',
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	var val ="";
                        	if(value != undefined ){
                        		var val = value + "";
                        		    val = val.substr(0,4)+" / "+val.substr(4,2)+" / "+val.substr(6,2);
                        	}
                        	return val;
                        },
	                /*},{
	                	text:'전송여부',
	                	xtype:'excolumn',
	                    dataIndex:'SEND_YN',
	                    width:100,
	                    exAlign:'center',
	                },{
	                	text:'수신여부',
	                	xtype:'excolumn',
	                    dataIndex:'RECEIVE_YN',
	                    width:100,
	                    exAlign:'center',
	                },{*/
	                	text:'출금상태',
	                	xtype:'excolumn',
	                    dataIndex:'AMOUNT_STATUS',
	                    width:90,
	                    exAlign:'center',
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
	                    	
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_cms_amount_status');
	                    	return exCommon.getComboVal(value,store, '' );
	                    }
	                },{
	                	text:'전화번호',
	                	xtype:'excolumn',
	                    dataIndex:'TEL_NO',
	                    width:100,
	                    exAlign:'left',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value;
                        },
	                },{
	                	text:'휴대전화',
	                	xtype:'excolumn',
	                    dataIndex:'MOBILE_TEL_NO',
	                    width:100,
	                    exAlign:'left',
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(record.get("IF_PROCESS_RESULT") == 'N'){
                        		meta.style = 'background-color:#FEBEBE;';
                        	}
                        	return value;
                        },
	                }]
	             },{
	            	 height : 10
	             },{
	            	 exGroupRef:true,
	                 xtype:'exgrid',
	                 reference:'cms003w_01_b',
	                 height:200,
	                 width:'100%',
	                 listeners:{
	                	 
	                 },
	                 bind:{
		                    store:'{ds_detail}'
		             },
	                 columns:[{
	                	text:'No',
	                	xtype:'rownumberer',
	                    width : 70,
	                    align:'center',
	                 },{
	                     text:'접수번호',
	                     xtype:'excolumn',
	                     dataIndex:'ACCEPT_SEQ',
	                     align:'center',
	                     width : 190,
	                 },{
	                     text:'접수순번',
	                     xtype:'excolumn',
	                     dataIndex:'SEQ',
	                     align:'center',
	                     width :80,
	                 },{
	                     text:'납부년월',
	                     xtype:'excolumn',
	                     dataIndex:'PAYMENT_YYYYMM',
	                     align:'center',
	                     width : 120,
	                     onRenderer:function(orgValue,value){
	                    	var val = orgValue+"";
	                    	return val.substr(0,4)+" / "+val.substr(4,2);
                         },
	                 },{
	                     text:'금액',
	                     xtype:'excolumn',
	                     dataIndex:'AMOUNT',
	                     align:'center',
	                     width : 120,
	                     exType : 'number',
	                     exAlign : 'right'
	                 },{
	                     text:'접수구분',
	                     xtype:'excolumn',
	                     dataIndex:'ACCEPT_GBN',
	                     align:'center',
	                     width : 140,
	                     onRenderer:function(orgValue,value){
                            var store = this.up('[isRootView=true]').getViewModel().getStore('ds_rec');
                            var index = store.find('CODE',
                            value)
                            if(index != -1){
                                return store.getAt(index).get('NAME');
                            }
                            else {
                                return value;
                            }
                        },
	                 },{
	                     text:'접수내역',
	                     xtype:'excolumn',
	                     dataIndex:'REC_NM',
	                     align:'center',
	                     width : 360,
	                     exAlign : 'left'
	                 },{
	                     text:'상세메모',
	                     xtype:'excolumn',
	                     dataIndex:'REMARK',
	                     exAlign:'left',
	                     width : 220,
	                 }]
	             }]
	        },{
	        	width : '0.5%'
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});