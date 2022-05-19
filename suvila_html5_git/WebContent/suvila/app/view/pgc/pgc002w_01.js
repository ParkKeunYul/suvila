Ext.define('ExFrm.view.pgc.pgc002w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.pgc002w_01',
	requires:[
		'ExFrm.view.pgc.pgc002w_01Controller',
        'ExFrm.view.pgc.pgc002w_01Model'
	],
	controller:'pgc002w_01',
	viewModel:{
        type:'pgc002w_01'
    },
    name:'pgc002w_01',
    isRootView:true,
    title:'카드수수료',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10
	    },{
	    	height : 40,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
        	items:[{
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
                	change:'onChange'
                },
        	},{
        		width : 2
        	},{
        		xtype:'extextfield',
                reference:'txt_stipulation',
                value : '',
                enableKeyEvents: true,
                listeners:{
             	   keyup : 'onSearchEnter'
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
        		labelField:'거래일',
                labelAlign:'right',
                xtype:'radiogroup',
                reference:'exRadioGroup',
                width : 530,
                items :[{
                	 boxLabel: '거래일 : ', 
                	 inputValue: 1,    
                	 width : 80,
                	 checked: true
                },{
                	xtype:'exdatefield',
                    reference:'from_date',
                    name:'FROM_SUB_DATE',                                                   
                    exFormat : 'Y/m/d',
                    exSubmitFormat : 'Ymd',
                    width : 100
                },{
                	width :20,
                	xtype : 'label',
                	html : '<div style="width:20px;text-align:center">~</div>'
                },{
                	xtype:'exdatefield',
                    reference:'to_date',
                    name:'TO_SUB_DATE',                                                   
                    exFormat : 'Y/m/d',
                    exSubmitFormat : 'Ymd',
                    width : 100
                },{
                	width : 20,
                	xtype : 'label',
                	html : '<div style="width:20px;"></div>'
                },{
                	boxLabel: '입금예정일 : ', 
               	 	inputValue: 2,    
               	 	width : 110,
                },{
                	xtype:'exdatefield',
                    reference:'In_date',
                    name:'IN_DATE',                                                   
                    exFormat : 'Y/m/d',
                    exSubmitFormat : 'Ymd',
                    width : 100
                }]
        	},{
        		width : 30
        	},{
	    		xtype     : 'exbutton',
          		reference : 'selectCardBtn',
          		name      : 'selectCardBtn',
          		handler   : 'onSelectCard',
          		text      : '조회',
        	},{
        		width : 5
        	},{
	    		xtype     : 'exbutton',
          		reference : 'excelCardBtn',
          		name      : 'excelCardBtn',
          		handler   : 'onExcelCard',
          		text      : '엑셀',
        	},{
        		xtype:'extextfield',
                reference:'txt_budNo',
                value : '',
                width : 0,
                height : 0,
                inputType: 'hidden',
                name : 'BUD_NO'
        	}]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	width : '99%',  
	        	height : 770,
	    		layout:{
	                type:'vbox',
	                align:'stretch'	                
	            },
	            items:[{
                	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'pgc002w_01_a',
	                height:550,
	                cls : 'grid-group',
	                bind:{
	                    store:'{ds_main}'
	                },
	                features: [{
	                	id: 'group',
	                    ftype: 'groupingsummary',
	                    hideGroupedHeader: true,
	                    enableGroupingMenu: true,
	                },{
	                	ftype : 'summary'
	                	,dock: 'bottom'  // 하단 잠금
	                }],
	                lockedViewConfig: {
	                    scroll: 'horizontal'  
	                },	                
	                plugins:[{
	                	ptype: 'gridexporter'
	                }],
	                listeners: {
	                	selectionchange : 'onSelectionChange'
	                },
	                cls : 'asp015w_01_a',	                
	                columns:[{
	                	text:'번호',
	                	xtype:'rownumberer',
	                    align:'center',
	                    sortable: true,
	                    width : 100,	                    
	                },{
	                	text:'신도번호',
	                	xtype:'excolumn',
	                    dataIndex:'BUD_NO',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 1
	                },{
	                	text:'신도명',
	                	xtype:'excolumn',
	                    dataIndex:'NAME_KOR',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1
	                },{
	                	text:'금액',
	                	xtype:'excolumn',
	                    dataIndex:'AMOUNT',                    
	                    exAlign:'right',
	                    exType:'number',
	                    sortable: true,
	                    flex : 1,
	                    summaryType: 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	if(value > 0){
	                    		return exCommon.setNumberFormat(value)+' 원';
	                    	}                        
	                    }
	                },{
	                	text:'수수류',
	                	xtype:'excolumn',
	                    dataIndex:'COMMISSION',                    
	                    exAlign:'right',
	                    sortable: true,
	                    exType:'number',
	                    flex : 1,
	                    summaryType: 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	if(value > 0){
	                    		return exCommon.setNumberFormat(value)+' 원';
	                    	}                        
	                    }
	                },{
	                	text:'부가세',
	                	xtype:'excolumn',
	                    dataIndex:'COMMISSION_BILL',                    
	                    exAlign:'right',
	                    sortable: true,
	                    exType:'number',
	                    flex : 1,
	                    summaryType: 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	if(value > 0){
	                    		return  exCommon.setNumberFormat(new Number(value))+' 원';
	                    	}                        
	                    }
	                },{
	                	text:'거래일',
	                	xtype:'excolumn',
	                    dataIndex:'SUB_DATE',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 1,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return value.substr(0,4) + " / " + value.substr(4,2) + " / " + value.substr(6,2);
	                    }
	                },{
	                	text:'전화번호',
	                	xtype:'excolumn',
	                    dataIndex:'TEL_NO_RENDER',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1,
	                },{
	                	text:'휴대폰',
	                	xtype:'excolumn',
	                    dataIndex:'MOBILE_TELNO_RENDER',                    
	                    exAlign:'left',
	                    sortable: true,
	                    flex : 1,
	                    //summaryType: 'sum',
	                    summaryType: function (record){
	                    	
	                    	var Total = 0;
	                    	for(var i = 0; i< record.length ; i++){
	                    		Total = Total + ( record[i].get("AMOUNT") - (  record[i].get("COMMISSION") + record[i].get("COMMISSION_BILL")  ) )
	                    		//console.log('record', record[i]);
	                    	}
	                    	return Total;
	                    },
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                    	
	                    	if(value != 0){
	                    		return  exCommon.setNumberFormat(value)+' 원';
	                    	}
	                    }
	                }]
	            },{
	            	height : 40,
	            },{
	            	height : 180,
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'pgc002w_01_b',
	                cls : 'grid-group',
	                bind:{
	                    store:'{ds_detail}'
	                },
	                cls : 'pgc002w_01_b',	                
	                columns:[{
	                	text:'번호',
	                	xtype:'rownumberer',
	                    align:'center',
	                    sortable: true,
	                    flex : 1
	                },{
	                	text:'접수번호',
	                	xtype:'excolumn',
	                    dataIndex:'ACCEPT_SEQ',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 2.5
	                },{
	                	text:'접수일자',
	                	xtype:'excolumn',
	                    dataIndex:'SUB_DATE',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 2,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	try{
	                    		return value.substr(0,4) + " / " + value.substr(4,2) + " / " + value.substr(6,2);
	                    	}catch (e) {
								return value;
							}
	                    	  
	                    }
	                },{
	                	text:'수납일자',
	                	xtype:'excolumn',
	                    dataIndex:'PAYMENT_YYYYMM',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 2,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	try{
	                    		return value.substr(0,4) + " / " + value.substr(4,2);
	                    	}catch (e) {
								return value;
							}
	                    	
	                    	  
	                    }
	                },{
	                	text:'납부금액',
	                	xtype:'excolumn',
	                    dataIndex:'AMOUNT',                    
	                    exAlign:'right',
	                    sortable: true,
	                    flex : 2,
	                    exType:'number'
	                },{
	                	text:'승인번호',
	                	xtype:'excolumn',
	                    dataIndex:'AUTHCODE',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 3
	                },{
	                	text:'접수구분',
	                	xtype:'excolumn',
	                    dataIndex:'ACCEPT_GBN',                    
	                    exAlign:'center',
	                    sortable: true,
	                    flex : 2
	                }]
                }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});