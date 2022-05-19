Ext.define('ExFrm.view.sin.sin001p_03_02',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_03_02',
    requires:[
    	'ExFrm.view.sin.sin001p_03_02Controller',
    	'ExFrm.view.sin.sin001p_03_02Model'
    ],
    controller:'sin001p_03_02',
    viewModel:{
        type:'sin001p_03_02'
    },
    isModal:true,
    name:'sin001p_03_02',
    title:'영가모시기',
    closable:true,
    width:1000,
    height:550,
    closeToolText : "닫기",
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        width:'100%',
        height:'100%',
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items:[{
            width : '0.5%'
        },{
        	width  : '99%',
        	layout : 'vbox',
   		 	height : 30,
   		 	items  : [{
   		 		layout : 'hbox',
   		 		items  : [{
	   		 		xtype        : 'excombobox',
	   		 		fieldLabel   : '<span style="font-weight: 700;">복위자명</span>',
	   		 		labelWidth   : 60,
		            valueField   : 'BUD_NO',
		            displayField : 'NAME_KOR',
		            reference    : 'lc_bokwi',
		            name         : 'V_BOKWI_BUD_NO',	 
		            width        : 170,
		            bind         : {
		            	store:'{ds_bokwi}'
		            },
		            listeners    : {
		            	change:'onSearch'
		            }
   		 		},{
   		 			width : 5
   		 		},{
	   		 		xtype     : 'exbutton',
	           		reference : 'confirmBtn',
	           		name      : 'confirmBtn',
	           		handler   : 'onConfirm',
	           		text      : '확인',
   		 		},{
   		 			width : 5
   		 		},{
		        	xtype     : 'exbutton',
	           		reference : 'closeBtn',
	           		name      : 'closeBtn',
	           		handler   : 'onClose',
	           		text      : '닫기',
   		 		}]
   		 		
	   		},{
	         	height : 10
	        },{
	         	exGroupRef    : true,
	             xtype         : 'exgrid',
	             reference     : 'sin001p_03_02_a',
	             height        : 440,
	             width         : '100%',
	             bind          : {
	                 store:'{ds_main}'
	             },
	             selModel: {
	             	 selType        : 'checkboxmodel',
	         	   // mode           : 'SINGLE', // 상단 체크박스 나오지 않음	                	    
	         	     allowDeselect  : false  ,  // row 선택시 자동체크 해제
	         	     checkOnly      : false,
	         	     headerText     : '선택',
	                 headerWidth    : 60,
	                 injectCheckbox : 0,  // last
	                 showHeaderCheckbox : true,
	                 listeners      : {
                    	 deselect : 'onCheckFalse'
                    	,select   : 'onCheckTrue'
                    },
	             },
	             columns:[{
	             	 text        : '복위기부',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BOKWI_KIBU_GBN',                    
	                 exAlign     : 'center',
	                 flex        : 1.6,
	                 renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    var store = this.up('[isRootView=true]').getViewModel().getStore('ds_kibu');
	                    return exCommon.getComboVal(value,store, '' );
	                 }
	             },{
	             	 text        : '망관계',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DECE_REL',                    
	                 exAlign     : 'left',
	                 flex        : 1.6,
	             },{
	             	 text        : '본',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'BON_NM',                    
	                 exAlign     : 'center',
	                 flex        : 1.4,
	             },{
	             	 text        : '영가명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'NAME_KOR',                    
	                 exAlign     : 'left',
	                 flex        : 1.6,
	             },{
	             	 text        : '법명',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'SACRED_KOR',                    
	                 exAlign     : 'left',
	                 flex        : 1.6,
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
	             	 text        : '양력음력',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'LUNAR_SOLAR',                    
	                 exAlign     : 'center',
	                 flex        : 1.6,
	                 renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
  	                    var store = this.up('[isRootView=true]').getViewModel().getStore('ds_lunar_solar');
  	                    return exCommon.getComboVal(value,store, '' );
  	                 }
	             },{
	             	 text        : '기일',
	             	 xtype       : 'excolumn',
	                 dataIndex   : 'DEATH_DAY',                    
	                 exAlign     : 'center',
	                 flex        : 1.6,
	                 renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                 	return exCommon.getGridDateFormat(value , ' / ');
	                 }
	            }]
   		 	}]
        },{
        	width : '0.5%'
        }]
    }]
})