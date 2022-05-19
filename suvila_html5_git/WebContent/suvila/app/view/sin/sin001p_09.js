Ext.define('ExFrm.view.sin.sin001p_09',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_09',
    requires:[
    	'ExFrm.view.sin.sin001p_09Controller',
    	'ExFrm.view.sin.sin001p_09Model'
    ],
    controller:'sin001p_09',
    viewModel:{
        type:'sin001p_09'
    },
    isModal:true,
    name:'sin001p_09',
    title:'간지검색',
    closable:true,
    width:550,
    height:400,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        /*xtype:'exformmain',*/
        width:'100%',
        height:'100%',
        cls : 'exformmain',
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items:[{
            width : '0.5%'
        },{
        	 width  : '99%',
        	 items  :[{
        		 layout : 'hbox',
        		 height : 30,
        		 items  : [{
            		 xtype        : 'excombobox',
            		 fieldLabel   : '<span style="font-weight: 700;">검색</span>',
            		 labelWidth   : 35,
                     valueField   : 'CODE',
                     displayField : 'NAME',
                     reference    : 'sel_searchgbn',
                     name         : 'V_SEARCH_GBN',	 
                     value        : 'AGE',
                     width        : 150,
                     bind         : {
                     	store:'{ds_gbn}'
                     }
            	 },{
            		 wdith : 30
            	 },{
            		 xtype           : 'extextfield',
                     reference       : 'txt_search',
                     name            : 'V_SEARCH_WORD',
                     enableKeyEvents : true,
                     width           : 130 ,
                     listeners       : {
                  	   	keyup : 'onSearchEnter'
                     },
            	 },{
            		 width : 5
            	 },{
            		xtype     : 'exbutton',
               		reference : 'selectBtn',
               		name      : 'selectBtn',
               		handler   : 'onSelect',
               		text      : '조회',
            	 }]
        	 },{
        		 height : 20
        	 },{
        		 exGroupRef    : true,
                 xtype         : 'exgrid',
                 reference     : 'sin001p_09_a',
                 cls           : 'sin001p_09_a',
                 height        : 240,
                 width         : '100%',
                 bind          : {
                     store:'{ds_main}'
                 },
                 listeners:{
                 	celldblclick : 'onCellDbClick'
                 },
                 columns:[{
                	 text        : '출생년도',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'YEAR',                    
                     exAlign     : 'center',
                     flex        : 1,
                 },{
                	 text        : '간지',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'NAME',                    
                     exAlign     : 'center',
                     flex        : 1,
                 },{
                	 text        : '나이',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'AGE',                    
                     exAlign     : 'center',
                     flex        : 1,
                 }]
        	 },{
        		 height : 20
        	 },{
        		 layout :{
        			 type : 'hbox',
        			 pack : 'center'
        		 }, 
        		 items  : [{
        			/*xtype     : 'exbutton',
                	reference : 'confirmBtn',
                	name      : 'confirmBtn',
                	handler   : 'onConfirm',
                	text      : '확인',
        		 },{
        			 width : 10*/
        		 },{
        			xtype     : 'exbutton',
                 	reference : 'closeBtn',
                 	name      : 'closeBtn',
                 	handler   : 'onClose',
                 	text      : '닫기',
        		 }]
        	 }]
        },{
        	width : '0.5%'
        }]
    }]
})