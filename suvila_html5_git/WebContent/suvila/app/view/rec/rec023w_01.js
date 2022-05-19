Ext.define('ExFrm.view.rec.rec023w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.rec023w_01',
	requires:[
		'ExFrm.view.rec.rec023w_01Controller',
        'ExFrm.view.rec.rec023w_01Model'
	],
	controller:'rec023w_01',
	viewModel:{
        type:'rec023w_01'
    },
    name:'rec023w_01',
    isRootView:true,
    title:'결산내역',
    closable:true,
    scrollable:true,
    items:[{
        xtype  :'exformmain',
        layout : 'hbox',
	    items:[{
	    	width : '0.5%'
	    },{
	    	layout : 'vbox',
	    	width  : '99%',
	    	items  :[{
	    		height : 15,
	    	},{
	    		layout : 'hbox',
	    		height : 30,
	    		items : [{
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
                	html  :'<div style="text-align:left;padding-left:2px;font-weight:700;line-height:24px;">분가포함</div>'
                },{
                	width : 1
                },{
                	 xtype           : 'excheckbox',
                	 reference       : 'cb_setBunga',
        		},{
                	xtype           : 'extextfield',
                    reference       : 'txt_stipulation',                  
                    enableKeyEvents : true,
                    width           : 130 ,
                    listeners       : {
                 	   keyup : 'onSearchEnter',
                 	   blur  : 'onSearchBlur'
                    },
                    value : '01-00001-0-01'
        		},{
        			width : 10
	    		},{
	    			html :'<span style="font-weight: 700;display:inline-block;line-height:24px;width:40px;">일자 :</span>',
	    		},{
		    		xtype          : 'exdatefield',
	                reference      : 'em_sDate',
	                name           : 'V_ACT_DATE',                                                   
	                exFormat       : 'Y/m/d',
	                exSubmitFormat : 'Ymd',
	                width          : 180
	    		},{
	    			html :'<span style="font-weight: 700;display:inline-block;line-height:24px;width:20px;text-align:center;">~</span>',
	    		},{
		    		xtype          : 'exdatefield',
	                reference      : 'em_eDate',
	                name           : 'V_ACT_DATE',                                                   
	                exFormat       : 'Y/m/d',
	                exSubmitFormat : 'Ymd',
	                width          : 180
	    		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 40,
                    fieldLabel   : '<span style="font-weight: 700;">항목</span>',
                    width        : 160,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    : 'lc_rec',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_rec}'
                	}
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">수납구분</span>',
                    width        : 170,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    : 'lc_approv',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_approv}'
                	}
	    		},{
	        		width     : 5
		    	},{
		    		xtype     : 'exbutton',
	          		reference : 'selectBtn',
	          		name      : 'selectBtn',
	          		handler   : 'onSelect',
	          		text      : '조회',	    	
		    	},{
	        		width     : 5	    	
		    	},{
		    		xtype     : 'exbutton',
	          		reference : 'excelBtn',
	          		name      : 'excelBtn',
	          		handler   : 'onExcel',
	          		text      : '엑셀',		    	
		    	 },{
			    	 height : 0,
			    	 items :[{
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
			        	 xtype     : 'extextfield',
		       	 		 inputType : 'hidden',
		       	 		 reference : 'select_actdate',
		       	 		 name      : 'select_actdate',
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
	                     inputType        : 'hidden',
			         }]
		    	}]
	    	},{
	    		height : 10
	    	},{
	    		exGroupRef : true,
                xtype      : 'exgrid',
                reference  : 'rec023w_01_a',
                height     : 720,           
                width      : '100%',
                plugins    : [{
                	ptype: 'gridexporter'
                }],
                bind       : {
                    store:'{ds_main}'
                },
                features      : [{
                	ftype : 'summary',
                	dock  : 'bottom'  // 하단 잠금
                }],
                columns   : [{
                	text  :'순번',
                    xtype :'rownumberer',
                    align : 'center',
                    width : 60,
                },{
                	xtype     :'excolumn',
                	text      :'신도번호',
                    dataIndex :'PROPOSAL_BUD_NO',                    
                    exAlign   :'center',
                    width     : 110,
                },{
                	xtype     :'excolumn',
                	text      :'신도명',
                    dataIndex :'NAME_KOR',                    
                    exAlign   :'center',
                    width     : 120,
                },{
                	xtype     :'excolumn',
                	text      :'관계',
                    dataIndex :'REPRESEN_REL',                    
                    exAlign   :'center',
                    width     : 90,
                },{
                	xtype     :'excolumn',
                	text      :'수납일',
                    dataIndex :'SUNAB_DATE',                    
                    exAlign   :'center',
                    width     : 120,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.getFormat(value,'dateYMD' );
                    }
                },{
                	xtype     :'excolumn',
                	text      :'접수일',
                    dataIndex :'ACCEPT_DATE',                    
                    exAlign   :'center',
                    width     : 120,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.getFormat(value,'dateYMD' );
                    }
                },{
                	xtype     :'excolumn',
                	text      :'접수번호',
                    dataIndex :'ACCEPT_SEQ',                    
                    exAlign   :'center',
                    width     : 160,                    
                },{
                	xtype     :'excolumn',
                	text      :'금액',
                    dataIndex :'AMOUNT',                    
                    exAlign   :'right',
                    width     : 100,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                    },
                    summaryType  : 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+' 원';
                    },
                },{
                	xtype     :'excolumn',
                	text      :'접수항목',
                    dataIndex :'ACCPET_NM',                    
                    exAlign   :'center',
                    width     :110,
                },{
                	xtype     :'excolumn',
                	text      :'후원기간',
                    dataIndex :'SUPPORT_PERIOD',                    
                    exAlign   :'right',
                    width     : 100,
                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(exCommon.getRepVal( value ) == ""){
                    		return "";
                    	}
                    	
                    	if(value == 0 || value == '0'){
                    		return "무한";                    		
                    	}
                    	return value +'개월';
                    }
                },{
                	xtype     :'excolumn',
                	text      :'접수내역',
                    dataIndex :'REC_DETAIL_NM',                    
                    exAlign   :'left',
                    width     : 300,
                },{
                	xtype     :'excolumn',
                	text      :'수납구분',
                    dataIndex :'APPROVAL_NM',                    
                    exAlign   :'center',
                    width     : 100,
                },{
                	xtype     :'excolumn',
                	text      :'비고',
                    dataIndex :'REMARK',                    
                    exAlign   :'left',
                    width     : 400,
                }]
	    	}]
	    },{
	    	width : '0.5%'
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546