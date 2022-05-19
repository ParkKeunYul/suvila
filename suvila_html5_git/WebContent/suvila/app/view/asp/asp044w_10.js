Ext.define('ExFrm.view.asp.asp044w_10',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp044w_10',
	requires:[
		'ExFrm.view.asp.asp044w_10Controller',
        'ExFrm.view.asp.asp044w_10Model'
	],
	controller:'asp044w_10',
	viewModel:{
        type:'asp044w_10'
    },
    name:'asp044w_10',
    isRootView:true,
    title:'인등 소등관리',
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
	        	width  : '99%',
	        	layout : 'hbox',
	        	items  : [{
	        	
	        		layout : 'vbox',
	        		flex   : 1,
	        		items  : [{
	        			height : 5
	        		},{
	        			layout : 'hbox',
	        			items  : [{
	        				html :'<div style="text-align:center;line-height:30px;font-weight:700;padding-right:5px;">검색일 : </div>',
	        			},{
	        				xtype          : 'exdatefield',
	                        reference      : 'em_Sdate',
	                        format         : 'Y-m-d',
	            		},{
	            			html :'<div style="text-align:center;width:20px;line-height:30px;">~</div>',
	            			width : 20
	            		},{
	            			xtype          : 'exdatefield',
	                        reference      : 'em_Edate',
	                        format         : 'Y-m-d',
		        		},{
		        			width : 10
		        		},{
		        			xtype           : 'extextfield',
	                        fieldLabel      : '<span style="font-weight:700;">검색아이피 </span>',
	                        reference       : 'txt_search',
	                        labelAlign      : 'left',                        
	                        labelWidth      : 80,
	                        exLabel         : '사찰명',
	                        enableKeyEvents : true,
	                        width           : 250 ,
	                        listeners:{
	                    	   keyup : 'onSearchEnter'
	                        }
		        		},{
		        			width : 5
		        		},{
		    	    		xtype     : 'exbutton',
		              		text      : '조회',
		              		handler   : 'onSelect',
	        			}]
	        		},{
	        			height : 5
	        		},{
	        			exGroupRef    : true,
	                    xtype         : 'exgrid',
	                    reference     : 'asp044w_10_b',
	                    cls           : 'none-dirty-grid asp044w_10_b',
	                    height        : 800,
	                    width         : '100%',	                    
	                    bind          : {
	                        store:'{ds_main}'
	                    },
	                    plugins     : [{
	                    	ptype:'cellediting',
	                    	clicksToEdit: 1
	                    }],
	                    columns:[{
	                    	text        : '순번',
	                        xtype       : 'rownumberer',
	                        width       : 70,
	                        align       : 'center',
	                    },{
	                    	text        : '게스트아이피',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'GUEST_IP',                    
	                        exAlign     : 'center',
	                        width       : 140,
	                        sortable    : true,
	                    },{
	                    	text        : '접속횟수',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'MENU',                    
	                        exAlign     : 'CONNECT_CNT',
	                        width       : 90,
	                        sortable    : true,
	                    },{
	                    	text        : '접속일',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'YYYYMMDD',                    
	                        exAlign     : 'center',
	                        width       : 110,
	                        sortable    : true,
	                    },{
	                    	text        : '최초접속시간',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'FIRST_TIME',                    
	                        exAlign     : 'center',
	                        width       : 150,
	                        sortable    : true,
	                    },{
	                    	text        : '마지막 접속시간',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'LAST_TIME',                    
	                        exAlign     : 'center',
	                        width       : 150,
	                        sortable    : true,
	                    }]
	        		}]
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});