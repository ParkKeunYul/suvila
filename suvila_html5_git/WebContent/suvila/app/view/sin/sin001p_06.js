Ext.define('ExFrm.view.sin.sin001p_06',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_06',
    requires:[
    	'ExFrm.view.sin.sin001p_06Controller',
    	'ExFrm.view.sin.sin001p_06Model'
    ],
    controller:'sin001p_06',
    viewModel:{
        type:'sin001p_06'
    },
    isModal:true,
    name:'sin001p_06',
    title:'축원외 가족추가',
    closable:true,
    width:1000,
    height:500,
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
        		 xtype   :'exfieldsetblockbox',
	    		 items   : [{
	    			 xtype:'exblockrow',
	                 items:[{
	                	 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">관계</div>'
	                 },{
	                	 xtype   : 'exblockfield',
                    	 items   : [{
                    		xtype     : 'extextfield',
                            reference : 'txt_represen_rel',
                            exLabel   : '종류',                            
                            name      : 'REPRESEN_REL',
                            width     : 120,
                            listeners : {
                            	blur : 'onRelBlur'
                            },
                            
                    	}]
	                 },{
	                    xtype   : 'exblocklabel',
	                    html    : '<div style="text-align:left;padding-left:5px;">성별</div>'
	                 },{
                    	xtype   : 'exblockfield',
                    	items   : [{
                     	xtype        : 'excombobox',
                            valueField   : 'CODE',
                            displayField : 'NAME',
                            reference    : 'lc_sex_gbn',
                            name         : 'SEX_GBN',
                            emptyText    : '선택',
                            bind         : {
                            	store:'{ds_sex_gbn}'
                            },
                            width : 80	
                    	}]
	                 }]
	    		 
	    		 },{
	    			 xtype:'exblockrow',
	                 items:[{
	                	 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">성명</div>'
	                 },{
	                	 xtype   : 'exblockfield',
                    	 items   : [{
                    		xtype     : 'extextfield',
                            reference : 'txt_name_kor',
                            exLabel   : '종류',                            
                            name      : 'NAME_KOR',
                            width     : '99%'
                    	 }]
	                 },{
	                	 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">법명</div>'
	                 },{
	                	 xtype   : 'exblockfield',
	                     items   : [{
                    		xtype     : 'extextfield',
                            reference : 'txt_sacred_kor',
                            exLabel   : '종류',                            
                            name      : 'SACRED_KOR',
                            width     : '99%'
	                     }]
	                 }]
	    		 },{
	    			 xtype:'exblockrow',
	    			 items:[{
	    				 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">생년월일</div>'
	    			 },{
	    				 xtype   : 'exblockfield',
	                     items   : [{
	                    	 xtype        : 'excombobox',
                             valueField   : 'CODE',
                             displayField : 'NAME',
                             reference    : 'lc_lunar_solar',
                             name         : 'SEX_GBN',
                             emptyText    : '선택',
                             bind         : {
                             	store:'{ds_lunar_solar}'
                             },
                             width : '35%'
	                     },{
	                    	 width : '1%'
	                     },{
	                    	 xtype     : 'exdatefield',
                             reference : 'em_birthday',
                             exLabel   : '종류',                            
                             name      : 'BIRTHDAY',
                             width     : '64%',
                             format    : 'Y/m/d',
                             listeners : {
                            	 expand     : 'onExpand'
                            	,change     : 'onBirthChange'
                             },
	                     }]
	    			 },{
	    				 xtype   : 'exblocklabel',
	                     html    : '<div style="text-align:left;padding-left:5px;">간지</div>'
	    			 },{
	    				 xtype   : 'exblockfield',
	    				 items   : [{
	    					 xtype        : 'excombobox',
                             valueField   : 'CODE',
                             displayField : 'NAME',
                             reference    : 'lc_sexagenary',
                             name         : 'SEXAGENARY',
                             emptyText    : '선택',
                             width        : 80,
                             exReadOnly   : true,
                             bind         : {
                            	store:'{ds_ganjiMaster}'
                             },
	    				 },{
	                    		width : '1%'
	    				 },{
	    					 xtype    : 'button',
	                         text     : '간지',
	                         handler  : 'onGanji'
	    				 },{
                    		 height : 0,
                    		 width  : 0,
                    		 items  : [{
                    			xtype     : 'extextfield',
	                            reference : 'txt_leap_month',
	                            name      : 'LEAP_MONTH',
	                            inputType : 'hidden',
	                            width     : 0,
	                            height    : 0
                    		 }]
	    				 }]
	    			 }]
	    		 }]
        	 },{
        		 height : 30,
        		 layout :{
        			 type : 'hbox',
        		}, 
        		 items  : [{
        			 flex : 1 
        		 },{
        			 xtype     : 'exbutton',
              		 reference : 'addBtn',
              	 	 name      : 'addBtn',
              		 handler   : 'onAdd',
              		 text      : '추가',
        		 },{
	    				width : 5
        		 },{
        			 xtype     : 'exbutton',
              		 reference : 'saveBtn',
              		 name      : 'saveBtn',
              		 handler   : 'onTempSave',
              		 text      : '임시저장',
        		 },{
	    				width : 5
        		 },{
        			 xtype     : 'exbutton',
	              	 reference : 'deleteBtn',
	              	 name      : 'deleteBtn',
	              	 handler   : 'onDelete',
	              	 text      : '삭제',
        		 }]
        	 },{
        		 exGroupRef    : true,
                 xtype         : 'exgrid',
                 reference     : 'sin001p_06_a',
                 cls           : 'sin001p_06_a',
                 height        : 240,
                 width         : '100%',
                 bind          : {
                     store:'{ds_main}'
                 },
                 listeners      : {
                     selectionchange : 'onSelectionChange'
                },
                 columns:[{
                	 text        : '관계',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'REPRESEN_REL',                    
                     exAlign     : 'left',
                     flex        : 1.4,
                 },{
                	 text        : '성명',
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
                     flex        : 1.4,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                     	//meta.style = 'background-color:#F6F9FD;';
                     	
                     	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_sex_gbn');
                     	return exCommon.getComboVal(value,store, '' );
                     }
                 },{
                	 text        : '생년월일',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'BIRTHDAY',                    
                     exAlign     : 'center',
                     flex        : 2,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                     	if(value == undefined || value == "" || value == null){
                     		return "";
                     	}
                     	return exCommon.getFormat(value,'dateYMD' );
                     }
                 },{
                	 text        : '간지',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'SEXAGENARY',                    
                     exAlign     : 'center',
                     flex        : 1.4,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                     	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_ganjiMaster');
                     	return exCommon.getComboVal(value,store, '' );
                     }
                 }]
        	 },{
        		 height : 20
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
        },{
        	width : '0.5%'
        }]
    }]
})