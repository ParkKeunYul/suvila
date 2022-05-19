Ext.define('ExFrm.view.asp.asp013w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp013w_01',
	requires:[
		'ExFrm.view.asp.asp013w_01Controller',
        'ExFrm.view.asp.asp013w_01Model'
	],
	controller:'asp013w_01',
	viewModel:{
        type:'asp013w_01'
    },
    name:'asp013w_01',
    isRootView:true,
    title:'SMS/CMS 수수료',
    closable:true,
    scrollable:true,
    items:[{
    	xtype:'container',
    	layout:'hbox',
        items:[{
        	width : '0.5%',
        },{
        	width : '69%',        	
    		layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[{
            	height : 10
            },{
            	layout:'hbox',
                xtype:'container',
                height : '30',
                items:[{
                	html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">SMS 수수료</div>',
                },{
                	width : 5
                },{            
                	xtype        :'exdatefield',
                	fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;"> 년월 </span>',
                    reference    :'smsSearchDate',
                    labelAlign   :'left',                        
                    labelWidth   :40,
                    format       : 'Y-m',
                    submitFormat : 'Ym',
                    exLabel      :'년월 :',
                },{
                	width : 10
                },{
                	xtype:'excombobox',
                	fieldLabel:'SMS종류',
                	labelWidth:60,
                    valueField:'value',
                    displayField:'display',
                    reference:'sel_TR_MSG_GB_Search',
                    value : '',
                    width : 140,
                    bind:{
                     	store:'{smsType}'
                     }
                },{
                	width : 10
                },{
                	xtype : 'exbutton',
              		reference : 'smsSelectBtn',
              		handler : 'smsSelect',
              		text:'조회',
              		margin : '0 5 5 0'
                },{
                	xtype     : 'exbutton',
              		reference : 'smsExcelBtn',
              		handler   : 'onSmsExcel',
              		text:'파일 저장 및 출력',
              		margin : '0 5 5 0' 			
                }]
            },{            	
                xtype:'exgrid',
                reference:'asp013w_01_a',
                height:600,
                plugins:[{
                    ptype:'cellediting'
                },{
                	ptype: 'gridexporter',
                }],
                bind:{
                    store:'{ds_SMS}'
                },   
                viewConfig: {
                    enableTextSelection: true
                },
                features: [{
                	id                 : 'group',
                    ftype              : 'groupingsummary',
                    hideGroupedHeader  : true,
                    enableGroupingMenu : false,
                },{
                	ftype : 'summary',
                	dock  : 'bottom'  // 하단 잠금
                }],
                exGroupFields:['TEMPLE_NM'],
                cls : 'grid-group asp013w_01_a',
                columns:[{
                	text:'사찰명',
                    dataIndex:'TEMPLE_NM',                    
                    exAlign:'left',
                    flex : 3,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {                    	
                    	if(value.length > 50){
                    		return '총계';
                    	}
                    }
              
                },{
                	text:'통신사',
                	xtype:'excolumn',
                    dataIndex:'TR_COMP',                    
                    align:'center',
                    flex : 1.2,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value.length < 50){
                    		return '합계';
                    	}else{
                    		return '';
                    	}
                    		
                    }
                },{
                	text:'구분',
                	xtype:'excolumn',
                    dataIndex:'TR_MSG_GB',                    
                    align:'center',
                    flex : 1
                },{
                	text:'성공건수',
                	xtype:'excolumn',
                    dataIndex:'SUCC',                    
                    exAlign:'right',
                    exType:'number',
                    flex : 1.5,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value)+' 건';
                    	}                        
                    }
                },{
                	text:'실패건수',
                	xtype:'excolumn',
                    dataIndex:'FAIL',                    
                    exAlign:'right',
                    exType:'number',
                    flex : 1.5,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value)+' 건';
                    	}                        
                    }
                },{
                	text:'전체건수',
                	xtype:'excolumn',
                    dataIndex:'TOTAL',                    
                    exAlign:'right',
                    exType:'number',
                    flex : 1.5,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value)+' 건';
                    	}                        
                    }
                },{
                	text:'청구금액',
                	xtype:'excolumn',
                    dataIndex:'T_FEE',                    
                    exAlign:'right',
                    exType:'number',
                    flex : 2,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value)+' 원';
                    	}                        
                    }
                },{
                	text:'사용금액',
                	xtype:'excolumn',
                    dataIndex:'L_FEE',                    
                    exAlign:'right',
                    exType:'number',
                    flex : 2,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value)+' 원';
                    	}                        
                    }
                },{
                	text:'이익',
                	xtype:'excolumn',
                    dataIndex:'PROFIT',                    
                    exAlign:'right',
                    exType:'number',
                    flex : 2,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value)+' 원';
                    	}                        
                    }
                }]
            },{
            	html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">통신사별 합계</div>',
            },{
            	exGroupRef:true,
                xtype:'exgrid',
                reference:'asp013w_01_c',
                cls : 'grid-group asp013w_01_c',
                exGroupFields:['TR_COMP'],
                height:193,
                viewConfig: {
                    getRowClass: function(record, rowIndex, rowParams, store) {
                        return 'exrowwhite';
                    }
                }, 
                bind:{
                    store:'{ds_SMS_summary}'
                },
                features: [{
                    ftype: 'summary',
                    dock  : 'bottom'  // 하단 잠금
                }],
                columns:[{
                	xtype:'excolumn',
                	text:'통신사',
                    dataIndex:'TR_COMP',                    
                    exAlign:'center',
                    flex : 1
                },{
                	xtype:'excolumn',
                	text:'구분',
                    dataIndex:'TR_MSG_GB',                    
                    exAlign:'center',
                    flex : 1,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value != 0){
                    		return '합계';
                    	}
                    }
                },{
                	xtype:'excolumn',
                	text:'성공건수',
                    dataIndex:'SUCC',                    
                    exAlign:'right',
                    flex : 1,
                    exType:'number',
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value);
                    	}                        
                    }
                },{
                	xtype:'excolumn',
                	exType:'number',
                	text:'실패건수',
                    dataIndex:'FAIL',                    
                    exAlign:'right',
                    flex : 1,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value);
                    	}                        
                    }
                },{
                	xtype:'excolumn',
                	exType:'number',
                	text:'전체건수',
                    dataIndex:'TOTAL',                    
                    exAlign:'right',
                    flex : 1,                    
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		var temp1  = value * 100;
                    		var temp2  = Math.ceil(temp1);
                    		var result = temp2 / 100;
                    		return exCommon.setNumberFormat(result);
                    	}                        
                    }
                },{
                	xtype:'excolumn',
                	exType:'number',
                	text:'청구금액',
                    dataIndex:'T_FEE',                    
                    exAlign:'right',
                    flex : 1,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		var temp1  = value * 100;
                    		var temp2  = Math.ceil(temp1);
                    		var result = temp2 / 100;
                    		return exCommon.setNumberFormat(result);
                    	}                        
                    }
                },{
                	xtype:'excolumn',
                	exType:'number',
                	text:'사용금액',
                    dataIndex:'L_FEE',                    
                    exAlign:'right',
                    flex : 1,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		var temp1  = value * 100;
                    		var temp2  = Math.ceil(temp1);
                    		var result = temp2 / 100;
                    		return exCommon.setNumberFormat(result);
                    	}                        
                    }
                },{
                	xtype:'excolumn',
                	exType:'number',
                	text:'이익',
                    dataIndex:'PROFIT',                    
                    exAlign:'right',
                    flex : 1,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		var temp1  = value * 100;
                    		var temp2  = Math.ceil(temp1);
                    		var result = temp2 / 100;
                    		return exCommon.setNumberFormat(result);
                    	}                        
                    }
                }]
            }]
        },{
        	width : '0.5%',
        },{
        	width : '29%',
    		layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[{            	
            	height : 10
            },{
        		layout:'hbox',
                xtype:'container',
                height : '30',
                items:[{
                	html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">CMS 수수료</div>',
                },{
                	width : 10
                },{
                	xtype:'exdatefield',
	                fieldLabel:'년월 :',
	                reference:'cmsSearchDate',
	                name:'temple_nmSrch',
	                labelAlign:'left',                        
	                labelWidth:50,
	                format: 'Y-m',
	                submitFormat : 'Ym',
	                exLabel:'년월 :'
                },{
                	xtype : 'exbutton',
              		reference : 'cmsSelectBtn',
              		name : 'cmsSelectBtn',
              		handler : 'onCmsSearch',
              		text:'조회',
              		margin : '0 5 5 5'
                },{
                	xtype : 'exbutton',
              		reference : 'cmsExcelBtn',
              		name : 'cmsExcelBtn',
              		handler : 'onCmsExcel',
              		text:'엑셀',
              		margin : '0 5 5 0' 	
                }]
            },{
            	exGroupRef:true,
                xtype:'exgrid',
                reference:'asp013w_01_b',                
                height:820,
                cls : 'cmsGrid',
                bind:{
                    store:'{ds_CMS}'
                },
                features: [{
                    ftype: 'summary',   
                    dock  : 'bottom'  // 하단 잠금
                }],
                /*viewConfig : {
                    stripeRows : true,
                    enableTextSelection : false
                },*/
                plugins: 'gridexporter',
                columns:[{
                	text:'사찰명',
                    dataIndex:'TEMPLE_NM',                    
                    align:'left',
                    flex : 2,
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value != 0){
                    		return '합계';
                    	}
                    }
                },{
                	text:'거래 ID',
                    dataIndex:'IF_TRAN_ID',                    
                    align:'left',
                    flex : 2
                },{
                	xtype: 'numbercolumn',
                	text:'성공건수',
                    dataIndex:'SUCC_CNT',                    
                    align:'right',
                    flex : 1.5,
                    format:'0,00',
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value);
                    	}                        
                    }
                },{
                	xtype: 'numbercolumn',
                	text:'실패건수',
                    dataIndex:'FAIL_CNT',                    
                    align:'right',
                    flex : 1.5,
                    format:'0,00',
                    summaryType: 'sum',
                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                    	if(value > 0){
                    		return exCommon.setNumberFormat(value);
                    	}
                    	
                    }
                }]
            }]
        },{
        	width : '0.5%',
        }]
    }]
});