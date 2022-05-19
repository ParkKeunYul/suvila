Ext.define('ExFrm.view.desk.announce001r_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.announce001r_01',
	requires:[
		'ExFrm.view.desk.announce001r_01Controller',
        'ExFrm.view.desk.announce001r_01Model'
	],
	controller:'announce001r_01',
	viewModel:{
        type:'announce001r_01'
    },
    name:'announce001r_01',
    isRootView:true,
    title:'행사일정',
    closable:true,
    scrollable:true,
    layout  : 'hbox',
    items:[{
    	width  : '0.5%'
    },{
    	width  : '98.5%',
    	layout : 'vbox',
        xtype  : 'exformmain',
	    items  : [{
	    	height  : 10,
	    },{
	    	layout : 'hbox',
	    	width  : '100%',
	    	items  : [{
	    		layout : 'vbox',
	    		flex   : 1,
	    		items  : [{	    			
	    			layout : 'hbox',
	    			width  : '100%',
	    			items  :[{
	    				html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;border-top-갸홋-radius:5px;display:inline-block;padding:0 15px;">수비라 공지사항</div>',
	    			},{
	    				flex : 1
	    			},{
	    				xtype        : 'excombobox',
	                    valueField   : 'CODE',
	                    displayField : 'NAME',
	                    reference    : 'notice_type',                
	                    width        : 120,
	                    bind         : {
	                    	store:'{ds_notice}'
	                    },
	                    emptyText    : '전체',
	                    listeners:{
	                    	change : 'onChangeNotice'
	                    },
	    			}]
	    		},{
	    			exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'announce001r_01_a',
	                height        : 380,
	                width         : '100%',
	                cls           : 'none-dirty-grid',
	                bind          :{
	                    store:'{ds_asp_Anc}'
	                },
	                listeners:{
	                	itemdblclick:'onDBClickNotice',
		            },
		            columns:[{
	                	xtype     :'rownumberer',	                    
	                    text      :'No',
	                    width     : 55,
	                    align     :'center',
	                },{
	                	text      :'공지유형',
	                	xtype     :'excolumn',
	                    dataIndex :'TYPE',                    
	                    exAlign   :'center',
	                    width     : 80,	   
	                    sortable  : true,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(value == 'P'){
	                    		return '패치노트';
	                    	}else{
	                    		return "공지사항";
	                    	}
	                    }
	                },{
	                	text      :'사찰명',
	                	xtype     :'excolumn',
	                    dataIndex :'TEMPLE_NM',                    
	                    exAlign   :'center',
	                    width     : 70,
	                    sortable  : true,
	                },{
	                	text      :'제목',
	                	xtype     :'excolumn',
	                    dataIndex :'TITLE',                    
	                    exAlign   :'left',
	                    flex      : 1,
	                    sortable  : true,
	                },{
	                	text      :'작성일짜',
	                	xtype     :'excolumn',
	                    dataIndex :'CRT_DATE',                    
	                    exAlign   :'center',
	                    width     : 90,
	                    exType    : 'date',
	                    sortable  : true,
	                }]
	    		},{
	    			height : 10
	    		},{
	    			layout : 'hbox',
	    	    	width  : '100%',
	    	    	items  : [{
	    	    		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;border-top-갸홋-radius:5px;display:inline-block;padding:0 15px;">행사일정</div>',
	    	    	},{
	    	    		flex : 1
	    	    	},{
	    	    		xtype     : 'exbutton',
	    	    		iconCls   : 'fa fa-angle-left',
	              		handler   : 'onDownYear',
	    	    	},{
	    	    		width : 3
	    	    	},{
	    	    		xtype       : 'extextfield',
	    	    		exReadOnly  : true,
	    	    		reference   : 'me_year',	  
	    	    		value       : '2019',
	    	    		width       : 50,
	    	    	},{
	    	    		width : 3
	    	    	},{
	    	    		xtype     : 'exbutton',
	    	    		iconCls   : 'fa fa-angle-right',
	    	    		handler   : 'onUpYear',
	    	    	},{
	    	    		width : 3
	    	    	},{
	    	    		xtype        : 'excombobox',
	            		
	                    valueField   : 'CODE',
	                    displayField : 'NAME',
	                    reference    : 'me_month',                
	                    width        : 55,
	                    bind         : {
	                    	store:'{ds_CalenderMonth}'
	                    },
	                    listeners:{
	                    	change : 'onChangeMonth'
	                    },
	                   // value : 0
	    	    	},{
	    	    		width : 5
	    	    	}]
	    		},{
	    			xtype      : 'exgrid',
	                width      : '99.9%',
	                height     : 410,
	                cls        : 'announce001r_01_c none-dirty-grid',
	                reference  : 'announce001r_01_c',
	                bind       : {
	                    store:'{ds_info}'
	                },
	                listeners:{
	                	cellclick:'onCellClick',
	                },
	                columns:[{
	                	xtype        :'excolumn',
	                	text         :'<font color="red">일</font>',
	                    dataIndex    :'NUM_1',                        
	                    width        : '14.2%',
	                    exAlign      : 'center',
	                },{
	                	xtype        :'excolumn',
	                	text         :'월',
	                    dataIndex    :'NUM_2',                        
	                    width        : '14.1%',
	                    exAlign      : 'center',
	                },{
	                	xtype        :'excolumn',
	                	text         :'화',
	                    dataIndex    :'NUM_3',                        
	                    width        : '14.2%',
	                    exAlign      : 'center',
	                },{
	                	xtype        :'excolumn',
	                	text         :'수',
	                    dataIndex    :'NUM_4',                        
	                    width        : '14.2%',
	                    exAlign      : 'center',
	                },{
	                	xtype        :'excolumn',
	                	text         :'목',
	                    dataIndex    :'NUM_5',                        
	                    width        : '14.2%',
	                    exAlign      : 'center',
	                },{
	                	xtype        :'excolumn',
	                	text         :'금',
	                    dataIndex    :'NUM_6',                        
	                    width        : '14.2%',
	                    exAlign      : 'center',
	                },{
	                	xtype        :'excolumn',
	                	text         :'<font color="blue">토</font>',
	                    dataIndex    :'NUM_7',                        
	                    width        : '14.2%',
	                    exAlign      : 'center',           
	                }]
	    		}]
	    	},{
	    		width : 10
	    	},{
	    		layout : 'vbox',
	    		flex   : 1,
	    		items  : [{
	    			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;border-top-갸홋-radius:5px;display:inline-block;padding:0 15px;">사찰 공지사항</div>',	    			
	    		},{
	    			exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'announce001r_01_b',
	                height        : 380,
	                width         : '100%',
	                cls           : 'none-dirty-grid',
	                bind          :{
	                    store:'{ds_temple_Anc}'
	                },
	                listeners:{
	                	itemdblclick:'onDBClickNotice',
		            },
		            columns:[{
	                	xtype     :'rownumberer',	                    
	                    text      :'No',
	                    width     : 55,
	                    align     :'center',
	                },{
	                	text      :'사찰명',
	                	xtype     :'excolumn',
	                    dataIndex :'TEMPLE_NM',                    
	                    exAlign   :'center',
	                    width     : 70,
	                    sortable  : true,
	                },{
	                	text      :'제목',
	                	xtype     :'excolumn',
	                    dataIndex :'TITLE',                    
	                    exAlign   :'left',
	                    flex      : 1,
	                    sortable  : true,
	                },{
	                	text      :'작성일짜',
	                	xtype     :'excolumn',
	                    dataIndex :'CRT_DATE',                    
	                    exAlign   :'center',
	                    width     : 90,
	                    exType    : 'date',
	                    sortable  : true,
	                }]
	    		},{
	    			height : 10
	    		},{
	    			layout: 'hbox',
	    			width : '100%',
	    			items : [{
	    				html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;border-top-갸홋-radius:5px;display:inline-block;padding:0 15px;">금주예정사항</div>',
	    			},{
	    				flex : 1
	    			},{
	    				html : '<span style="color:red;display:inline-block;line-height:30px;">* 49재/기제/천도제 예정 목록&nbsp;</span>'
	    			}]
	    		},{
	    			exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'announce001r_01_d',
	                height        : 410,
	                width         : '100%',
	                cls           : 'none-dirty-grid',
	                bind          :{
	                    store:'{ds_reqInfo}'
	                },
	                listeners:{
	                	itemdblclick:'onDBClickReq',
		            },
		            columns:[{
	                	xtype     :'rownumberer',	                    
	                    text      :'No',
	                    width     : 55,
	                    align     :'center',
	                },{
	                	text      :'접수항목',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME',                    
	                    exAlign   :'left',
	                    width     : 150,
	                    sortable  : true,
	                },{
	                	text      :'영가자',
	                	xtype     :'excolumn',
	                    dataIndex :'DECE_NAME_KOR',                    
	                    exAlign   :'left',
	                    width     : 120,
	                    sortable  : true,
	                },{
	                	text      :'음양',
	                	xtype     :'excolumn',
	                    dataIndex :'LUNAR_SOLAR',                    
	                    exAlign   :'center',
	                    width     : 80,
	                    sortable  : true,
	                },{
	                	text      :'예정일자',
	                	xtype     :'excolumn',
	                    dataIndex :'EVENT_DATE',                    
	                    exAlign   :'center',
	                    width     : 90,
	                    exType    : 'date',
	                    sortable  : true,
	                },{
	                	text      :'예정시간',
	                	xtype     :'excolumn',
	                    dataIndex :'EVENT_TIME',                    
	                    exAlign   :'center',
	                    width     : 90,
	                    sortable  : true,
	                },{
	                	text      :'예약자확인',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCEPT_YN',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    sortable  : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	if(value == 'T'){
	                    		return "확인";
	                    	}
	                    	return "미확인";
	                    }
	                }]
	    		}]
	    	}]
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});