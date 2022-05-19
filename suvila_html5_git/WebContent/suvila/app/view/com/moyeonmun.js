Ext.define('ExFrm.view.com.moyeonmun',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.com.moyeonmunController',
    	'ExFrm.view.com.moyeonmunModel'
    ],
    controller:'moyeonmun',
    viewModel:{
        type:'moyeonmun'
    },
    isModal:true,
    name:'moyeonmun',
    title:'권선문검색',
    closable:true,
    width:1000,
    height:400,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        /*xtype  : 'exformmain',*/
        width  : '99.8%',
        cls    : 'exformmain',
        layout : {
            type:'vbox',
            align:'stretch'
        },
        items  :[{
        	height : 35,
        	layout  : 'hbox',
	       	items   : [{
	       		 xtype        : 'excombobox',
	           	 fieldLabel   : '대분류',
	           	 labelWidth   : 55,
	             valueField   : 'MOYEONMUN_CODE',
	             displayField : 'MOYEONMUN_NM',
	             reference    : 'lc_Moyeon',
	             name         : 'V_MOYEON',                    	                    
	             width        : 170,
	             
	             bind:{
	                 	store:'{ds_Moyeon}'
	             }
	       	},{
	       		 xtype        : 'excombobox',
	           	 fieldLabel   : '검색',
	           	 labelWidth   : 45,
	             valueField   : 'CODE',
	             displayField : 'NAME',
	             reference    : 'sel_BudSearchGbn',
	             name         : 'V_SEARCH_GBN',
	             value        : 'BUD_NO',
	             width        : 170,
	             bind:{
	                 	store:'{ds_search}'
	             } 
	       	 },{
	       		 width : 3
	       	 },{
	       		 xtype          : 'extextfield',
	             reference      : 'txt_name',
	             name           : 'V_SEARCH_WORD',
	             labelAlign     : 'left',                        
	             exLabel        : '검색어',
	             enableKeyEvents: true,
	             width          : 100,
	             listeners:{
	            	 keyup : 'onSearchEnter'
	             }
	         },{
	       		 width : 3
	       	 },{
	       		 xtype     : 'exbutton',
	          	 reference : 'selectBtn',
	          	 name      : 'selectBtn',
	          	 text      : '조회',
	          	 handler   : 'onSelect',
	       	 }]
        },{
        	layout : 'hbox',
        	items  : [{
                width : '0.5%'
            },{
            	 width : '99%',
            	 items  :[{
             		exGroupRef :true,
                    xtype      :'exgrid',
                    reference  :'moyeonmun_a',
                    height     : 235,
                    align      : 'center',                    
                    bind:{
                        store:'{ds_main}'
                    },                 
                    listeners:{
                    	celldblclick    : 'onCellDbClick'
                    },
                    columns:[{                   
                    	xtype       :'rownumberer',
                    	text        :'번호',
                    	align       :'center',
                    	flex        : 0.8
                    },{
                     	xtype       : 'excolumn',
                        text        : '모연인',
                        dataIndex   : 'NAME_KOR',
                        exAlign     : 'left',
                        flex        : 1.4
                    },{
                     	xtype       : 'excolumn',
                        text        : '대분류',
                        dataIndex   : 'MOYEONMUN_NM',
                        exAlign     : 'left',
                        flex        : 2 
                    },{
                     	xtype       : 'excolumn',
                        text        : '중분류',
                        dataIndex   : 'MOYEONMUN_TITLE',
                        exAlign     : 'left',
                        flex        : 2.4 
                    },{
                     	xtype       : 'excolumn',
                        text        : '동참년도',
                        dataIndex   : 'JOIN_YEAR',
                        exAlign     : 'center',
                        flex        : 1.6 
                    },{
                     	xtype       : 'excolumn',
                        text        : '권선문 번호',
                        dataIndex   : 'KWONSUN_NO',
                        exAlign     : 'left',
                        flex        : 2 
                    },{
                     	xtype       : 'excolumn',
                        text        : '모연문 번호',
                        dataIndex   : 'MOYEONMUN_NO',
                        exAlign     : 'left',
                        flex        : 1.2 
                    }]
             	}]            	 	
            },{
            	width : '0.5%'
            }]
        },{
        	height : 10
        },{
        	layout :{
       			 type : 'hbox',
       			 pack : 'center'
       		 }, 
       		 items  : [{
       			 xtype     : 'exbutton',
	          	 reference : 'confirmBtn',
	          	 name      : 'confirmBtn',
	          	 handler   : 'onConfirm',
	          	 text      : '확인',
       		 },{
       			 width : 10
       		 },{
       			 xtype     : 'exbutton',
	          	 reference : 'closeBtn',
	          	 name      : 'closeBtn',
	          	 handler   : 'onClose',
	          	 text      : '닫기',
       		 }]
        }]
        
    }]
})