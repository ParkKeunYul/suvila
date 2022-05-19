Ext.define('ExFrm.view.sin.sin001p_03_000033',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_03_000033',
    requires:[
    	'ExFrm.view.sin.sin001p_03_000033Controller',
    	'ExFrm.view.sin.sin001p_03_000033Model'
    ],
    controller:'sin001p_03_000033',
    viewModel:{
        type:'sin001p_03_000033'
    },
    isModal:true,
    name:'sin001p_03',
    title:'영가관리',
    closable:true,
    width:1150,
    height:600,
    closeToolText : "닫기",
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
    	//xtype     : 'exformmain',
        width   : '100%',
        height  : '100%',
        //cls     : 'exformmain',
        layout  : {
            type  : 'hbox',
            align : 'stretch'
        },
        items   : [{
            width : '0.5%'
        },{
        	 width  : '99%',
        	 items  :[{
        		 layout : 'hbox',
        		 height : 30,
        		 items  : [{
            		 xtype        : 'excombobox',
            		 fieldLabel   : '<span style="font-weight: 700;">복위자명</span>',
            		 labelWidth   : 70,
                     valueField   : 'NAME_CODE',
                     displayField : 'NAME_CODE',
                     reference    : 'lc_bokwi',
                     name         : 'V_BOKWI_BUD_NO',	 
                     emptyText    : '선택',
                     width        : 220,
                     bind         : {
                     	store:'{ds_bokwi}'
                     },
                     listeners    : {
                     	change:'onSearch'
                     }
            	 },{
            		 flex : 1
            	 },{
            		 xtype     : 'exbutton',
            		 reference : 'confirmBtn',
            		 name      : 'confirmBtn',
            		 handler   : 'onConfirm',
            		 text      : '확인',
            	 },{
            		 width    : 5
            	 },{
            		xtype     : 'exbutton',
               		reference : 'closeBtn',
               		name      : 'closeBtn',
               		handler   : 'onClose',
               		text      : '닫기',
            	 }]
        	 },{
        		 height : 20
        	 },{
        		 exGroupRef    : true,
                 xtype         : 'exgrid',
                 reference     : 'sin001p_03_000033',
                 height        : 450,
                 width         : '100%',
                 bind          : {
                     store:'{ds_main}'
                 },
                 /*listeners:{
                 	celldblclick : 'onCellDbClick'
                 },*/
                 selModel: {
                    mode: 'MULTI'
                 },
                 columns:[{
                	 text        : '신도번호',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'BUD_NO',                    
                     exAlign     : 'center',
                     flex        : 2,
                 },{
                	 text        : '복위자명',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'BOKWI_BUD_NO',                    
                     exAlign     : 'left',
                     flex        : 1.6,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
  	                    var store = this.up('[isRootView=true]').getViewModel().getStore('ds_bokwi');
  	                    return exCommon.getComboVal(value,store, 'user' , 'BUD_NO' , 'NAME_KOR' );
  	                 }
                 },{
                	 text        : '망관계',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'DECE_REL',                    
                     exAlign     : 'center',
                     flex        : 1.6,
                 },{
                	 text        : '본',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'BON',                    
                     exAlign     : 'center',
                     flex        : 1.2,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
   	                    var store = this.up('[isRootView=true]').getViewModel().getStore('ds_bon_master');
   	                    return exCommon.getComboVal(value,store, 'user' , 'CODE', 'NAME' );
   	                 }
                 },{
                	 text        : '성별',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'SEX_GBN',                    
                     exAlign     : 'center',
                     flex        : 1.6,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
 	                    var store = this.up('[isRootView=true]').getViewModel().getStore('ds_sex_gbn');
 	                    return exCommon.getComboVal(value,store, '' );
 	                 }
                 },{
                	 text        : '영가명',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'NAME_KOR',                    
                     exAlign     : 'left',
                     flex        : 1.6,
                 },{
                	 text        : '동일구분',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'EQUAL_GBN',                    
                     exAlign     : 'left',
                     flex        : 1.4,
                 },{
                	 text        : '영체구분',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'SPIRITUAL_GBN',                    
                     exAlign     : 'left',
                     flex        : 1.4,
                 },{
                	 text        : '법명',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'SACRED_KOR',                    
                     exAlign     : 'left',
                     flex        : 1.6,
                 },{
                	 text        : '양력음력',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'LUNAR_SOLAR',                    
                     exAlign     : 'center',
                     flex        : 1.6,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
  	                    var store = this.up('[isRootView=true]').getViewModel().getStore('ds_lunar_solar');
  	                    return exCommon.getComboVal(value,store, '' );
  	                 }
                 }]        	         	
        	 }]
        },{
        	width : '0.5%'
        }]
    }]
})