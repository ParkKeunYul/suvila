Ext.define('ExFrm.view.asp.asp044w_09',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp044w_09',
	requires:[
		'ExFrm.view.asp.asp044w_09Controller',
        'ExFrm.view.asp.asp044w_09Model'
	],
	controller:'asp044w_09',
	viewModel:{
        type:'asp044w_09'
    },
    name:'asp044w_09',
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
	        		width : 310,
	        		layout : 'vbox',
	        		items  : [{
	        			height : 5
	        		},{
	        			html    : '<span style="font-weight:700;line-height:30px;">사찰정보</span>',
	        			height : 30
	        		},{
	        			height : 5
	        		},{
	        			exGroupRef    : true,
	                    xtype         : 'exgrid',
	                    reference     : 'asp044w_09_a',
	                    cls           : 'none-dirty-grid asp044w_09_a',
	                    height        : 800,
	                    width         : '100%',
	                    bind          : {
	                        store:'{ds_templeCd}'
	                    },
	                    listeners      : {
	                    	selectionchange : 'onSelectionTemple'
	                    },
	                    columns:[{
	                    	text        : '사찰코드',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'TEMPLE_CD',                    
	                        exAlign     : 'center',
	                        width       : 90,
	                        sortable    : true,
	                    },{
	                    	text        : '사찰명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'TEMPLE_NM',                    
	                        exAlign     : 'left',
	                        width       : 200,
	                        sortable    : true,
	                    }]
	        		}]
	        	},{
	        		width : 5
	        	},{
	        		layout : 'vbox',
	        		flex   : 1,
	        		items  : [{
	        			height : 5
	        		},{
	        			layout : 'hbox',
	        			items  : [{
	        				html :'<div style="text-align:center;line-height:30px;font-weight:700;padding-right:5px;">변동일 : </div>',
	        			},{
	        				xtype          : 'exdatefield',
	                        reference      : 'me_AcceptSDateID',
	                        format         : 'Y-m-d',
	            		},{
	            			html :'<div style="text-align:center;width:20px;line-height:30px;">~</div>',
	            			width : 20
	            		},{
	            			xtype          : 'exdatefield',
	                        reference      : 'me_AcceptEDateID',
	                        format         : 'Y-m-d',
	            		},{
		        			width : 5
		        		},{
		        			xtype        :'excombobox',
		        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">메뉴명</span>',
		        			labelWidth   :70,
		                    valueField   :'CODE',
		                    displayField :'NAME',
		                    reference    :'menu',
		                    width        : 200,
		                    bind:{
		                     	store:'{ds_menu}'
		                    },
		                    value : ''
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
	                    reference     : 'asp044w_09_b',
	                    cls           : 'none-dirty-grid asp044w_09_b',
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
	                    	text        : '사찰번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'TEMPLE_CD',                    
	                        exAlign     : 'center',
	                        width       : 100,
	                        sortable    : true,
	                    },{
	                    	text        : '메뉴명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'MENU',                    
	                        exAlign     : 'left',
	                        width       : 200,
	                        sortable    : true,
	                    },{
	                    	text        : '변동내역',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'REMARK',                    
	                        exAlign     : 'center',
	                        width       : 400,
	                        sortable    : true,
	                    },{
	                    	text        : '수정자',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'UPT_USER',                    
	                        exAlign     : 'center',
	                        width       : 120,
	                        sortable    : true,
	                    },{
	                    	text        : '수정시간',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'UPT_DATE',                    
	                        exAlign     : 'center',
	                        width       : 180,
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