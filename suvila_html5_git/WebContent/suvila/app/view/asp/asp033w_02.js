Ext.define('ExFrm.view.asp.asp033w_02',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp033w_02',
	requires:[
		'ExFrm.view.asp.asp033w_02Controller',
        'ExFrm.view.asp.asp033w_02Model'
	],
	controller:'asp033w_02',
	viewModel:{
        type:'asp033w_02'
    },
    name:'asp033w_02',
    isRootView:true,
    title:'메뉴관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	width  : '49%',
	        	layout : 'vbox',
	        	items  : [{
	        		height : 10
	        	},{
	        		layout : 'hbox',
	        		width  : '100%',
	        		items  :[{
	        			xtype        :'exdatefield',
	                	fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;"> 년월 </span>',
	                    reference    :'start_date',
	                    labelAlign   :'left',                        
	                    labelWidth   :40,
	                    format       : 'Y-m',
	                    submitFormat : 'Ym',
	                    exLabel      :'년월 :',
	        		},{
	        			flex : 1
	        		},{
	        			xtype        :'excombobox',	                	
	                    valueField   :'TEMPLE_CD',
	                    displayField :'TEMPLE_NM',
	                    reference    :'lc_templeCd',
	                    name         :'V_SEARCH_TEMPLE_VALUE',                    
	                    value        : '',
	                    width         : 200,
	                    bind:{
	                     	store:'{ds_templeCd}'
	                    },
	                    listeners : {
	                    	change : 'onTempleChange'
	                    }/*,
	                    listConfig: {
	                    	itemTpl: [
	                    		'console.log("TEMPLE_CD", {TEMPLE_CD})'
	                    	]
	                    }*/
	        		},{
	        			width : 5
	        		},{
	        			xtype     : 'exbutton',
	              		handler   : 'onSelect',
	              		text      : '조회'
	        		},{
	        			width : 5
	        		},{
	        			xtype     : 'exbutton',
	              		handler   : 'onSmsExcel',
	              		text      : '엑셀'
	        		}]
	        	},{
	        		height : 5
	        	},{
	        		exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec033w_02_a',
                    cls           : 'none-dirty-grid rec033w_02_a',
                    height        : 710,
                    width         : '100%',
                    bind          : {
                        store:'{ds_month}'
                    },
                    listeners      : {
                    	selectionchange : 'onSelectionChange'
                    },
                    columns:[{
                    	text        : '사찰명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'TEMPLE_NM',                    
                        exAlign     : 'center',
                        flex        : 1,
                        sortable    : true,
                    },{
                    	text        : '신청건수',
                    	xtype       : 'excolumn',
                        dataIndex   : 'APP_CNT',                    
                        exAlign     : 'center',
                        width       : 120,
                        sortable    : true,
                        exType      : 'number'
                    },{
                    	text        : '발급건수',
                    	xtype       : 'excolumn',
                        dataIndex   : 'COM_CNT',                    
                        exAlign     : 'center',
                        width       : 120,
                        sortable    : true,
                        exType      : 'number'
                    },{
                    	text        : '보류건수',
                    	xtype       : 'excolumn',
                        dataIndex   : 'DELAY_CNT',                    
                        exAlign     : 'center',
                        width       : 120,
                        sortable    : true,
                        exType      : 'number'
                    }]
	        	}]
	        },{
	        	width : '0.5%'
	        },{
	        	layout : 'vbox',
	        	width  : '49%',
	        	items  : [{
	        		height : 40
	        	},{
	        		exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'rec033w_02_b',
	                cls           : 'none-dirty-grid rec033w_02_b',
	                height        : 710,
	                width         : '100%',
	                bind          : {
	                    store:'{ds_day}'
	                },
	                columns:[{
	                	text        : '신청날짜',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'APP_DAY',                    
	                    exAlign     : 'center',
	                    flex        : 1,
	                    sortable    : true,
	                    exType      : 'date'
	                },{
	                	text        : '신청건수',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'APP_CNT',                    
	                    exAlign     : 'center',
	                    flex        : 1,
	                    sortable    : true,
	                    exType      : 'number'
	                },{
	                	text        : '발급건수',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'COM_CNT',                    
	                    exAlign     : 'center',
	                    flex        : 1,
	                    sortable    : true,
	                    exType      : 'number'
	                },{
	                	text        : '보류건수',
	                	xtype       : 'excolumn',
	                    dataIndex   : 'DELAY_CNT',                    
	                    exAlign     : 'center',
	                    flex        : 1,
	                    sortable    : true,
	                    exType      : 'number'
	                }]
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});