Ext.define('ExFrm.view.sin.sin001p_04',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_04',
    requires:[
    	'ExFrm.view.sin.sin001p_04Controller',
    	'ExFrm.view.sin.sin001p_04Model'
    ],
    controller:'sin001p_04',
    viewModel:{
        type:'sin001p_04'
    },
    isModal:true,
    isRootView:true,
    name:'sin001p_04',
    title:'합가처리',
    closable:true,
    width:1150,
    height:850,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype   : 'exformmain',
        width   : '100%',
        height  : '100%',
        cls     : 'exformmain',
        layout  : {
            type:'hbox',
            align:'stretch'
        },
        items   : [{
            width : '0.4%'
        },{
        	width  : '99%',
        	items  : [{
        		 layout : 'hbox',
        		 items :[{
        			 xtype           : 'excombobox',
        			 fieldLabel      : '<span style="font-weight: 700;">신도검색</span>',
        			 labelWidth      : 60,
        			 labelAlign      : 'left',
        		     reference       : 'cb_Stipulation',
        		     displayField    : 'name',
        		     valueField      : 'code',
        		     exCommonDmnCode :'003',    
        		     width           : 170,
        		     store           : {},
        		     listeners       : {
        		    	change:'onSearchTypeChange'
        		     }
        		 },{
        			 width : 2
        		 },{
        			 xtype           : 'extextfield',
        		     reference       : 'txt_stipulation',
        		     value           : '',
        		     enableKeyEvents : true,
        		     width           : 130 ,
        		     listeners       : {
        		        keyup : 'onSearchEnter'
        		     }
        		 },{
        			width : 5
        		 },{
        			xtype           : 'exbutton',
        		    cls             : 'exbuttonsrch',
        		    text            : '신도조회',                
        		    listeners       : [{
        		    	click:'onSindoSearch'
        		    }]
        		 },{
        			 width          : 0,
             		 height         : 0,
             		 items          :[{
             			xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'newData',
    	       	 		name      : 'newData',
    	        	 },{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'uptData',
    	       	 		name      : 'uptData',
    	        	 },{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'delData',
    	       	 		name      : 'delData',
    	        	 },{
             			xtype            : 'extextfield',
                        reference        : 'hid_bud_no',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_BUD_NO'
             		  },{
             			xtype            : 'extextfield',
                        reference        : 'slave_bud_code',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_SLAVE_BUD_CODE' 
             		  },{
             			xtype            : 'extextfield',
                        reference        : 'branch_bud_code',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_BRANCH_BUD_CODE'
             		},{
             			xtype            : 'extextfield',
                        reference        : 'selectAll',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_SELECT_ALL'
             		},{
             			xtype            : 'extextfield',
                        reference        : 'daeju_bud_no',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_DAEJU_BUD_NO'
             		},{
             			xtype            : 'extextfield',
                        reference        : 'bud_code',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_BUD_CODE'
             		}]
        		 }]
        	},{
        		height : 10,
        	},{
        		//html : '분가대상가족'
        		layout : 'hbox',
        		items  : [{
        			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">분가대상가족</span>',
        		},{
        			width : 5
        		},{
        			html : 'Shift, Ctrl 키조합으로 신도를 다중 선택 할 수 있습니다.'
        		}]
        		
        		
        	/*},{
        		height : 10,*/
        	},{
    			 exGroupRef    : true,
    			 xtype         : 'exgrid',
    			 reference     : 'sin001p_04_b',
    			 cls           : 'sin001p_04_b',
    			 height        : 300,
    			 width         : '100%',
    			 bind          : {
    			     store:'{ds_slave}'
    			 },
    			 /*listeners:{
    			 	celldblclick : 'onCellDbClick'
    			 },*/
    			 selModel      : {
	                mode: 'MULTI',
	                type: 'checkboxmodel',
	                //checkOnly: true,
	                showHeaderCheckbox: true,
	             },
	             columns:[{
    				 text        : '관계',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'REPRESEN_REL',                    
    			     exAlign     : 'left',
    			     flex        : 1.2
    			 },{
    				 text        : '성명',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'NAME_KOR',                    
    			     exAlign     : 'left',
    			     flex        : 1.4
    			 },{
    				 text        : '법명',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'SACRED_KOR',                    
    			     exAlign     : 'left',
    			     flex        : 1.4
    			 },{
    				 text        : '성별',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'SEX_GBN',                    
    			     exAlign     : 'center',
    			     flex        : 1.2,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
 	                	if(value == undefined || value == "" || value == null){
 	                		return "";
 	                	}
 	                	return exCommon.getFormat(value,'gender' );
 	                }
    			 },{
    				 text        : '생년월일',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'BIRTHDAY',                    
    			     exAlign     : 'center',
    			     flex        : 1.8,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	if(value == undefined || value == "" || value == null){
	                		return "";
	                	}
	                	return exCommon.getFormat(value,'dateYMD' );
	                }
    			 },{
    				 text        : '양력음력',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'LUNAR_SOLAR',                    
    			     exAlign     : 'center',
    			     flex        : 1.2,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
    			    	 if(value == undefined || value == "" || value == null){
 	                		return "";
 	                	}
 	                	return exCommon.getFormat(value,'lunar' );
    			     }
    			 },{
    				 text        : '간지',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'SEXAGENARY',                    
    			     exAlign     : 'center',
    			     flex        : 1.2,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
    	               	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_ganjiMaster');
    	               	return exCommon.getComboVal(value,store, '' );
    	             }
    			 },{
    				 text        : '핸드폰',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'MOBILE_TELNO',                    
    			     exAlign     : 'center',
    			     flex        : 2,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	var MOBILE_TELNO1 = record.get("MOBILE_TELNO1");
	                	var MOBILE_TELNO2 = record.get("MOBILE_TELNO2");
	                	var MOBILE_TELNO3 = record.get("MOBILE_TELNO3");
	                	
	                	if(MOBILE_TELNO1 == undefined || MOBILE_TELNO1 == null){
	                		MOBILE_TELNO1 = "";
	                	}
	                	if(MOBILE_TELNO2 == undefined || MOBILE_TELNO2 == null){
	                		MOBILE_TELNO2 = "";
	                	}
	                	if(MOBILE_TELNO3 == undefined || MOBILE_TELNO3 == null){
	                		MOBILE_TELNO3 = "";
	                	}
	                	
	                	var MOBILE_TELNO = MOBILE_TELNO1 + MOBILE_TELNO2 + MOBILE_TELNO3;
	                	
	                	if(MOBILE_TELNO.length == 11 || MOBILE_TELNO.length == 10){
	                		return MOBILE_TELNO1 + "-"+ MOBILE_TELNO2 + "-"+ MOBILE_TELNO3;
	                	}
	                	else if( MOBILE_TELNO.length == 7 ){
	                		return MOBILE_TELNO.substr(0,3) + "-"+MOBILE_TELNO.substr(3,7);
	                	}
	                	else if( MOBILE_TELNO.length == 8 ){
	                    	return MOBILE_TELNO.substr(0,4) + "-"+MOBILE_TELNO.substr(4,8);
	                	}else{
	                		return MOBILE_TELNO;
	                	}
	                	
	                }
    			 },{
    				 text        : 'E-MAIL',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'EMAILtemp',                    
    			     exAlign     : 'left',
    			     flex        : 2.4,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	var email1 = record.get("EMAIL1") 
	                	if(email1 == undefined || email1 == null){
	                		email1 = "";
	                	}
	                	
	                	var email2 = record.get("EMAIL2") 
	                	if(email2== undefined  || email2 == null){
	                		email2 = "";
	                	}
	                	
	                	if(email1 == "" || email2 == ""){
	                		return "";
	                	}else{
	                		return email1 +"@" + email2 ;
	                	}
	                	                	
	                	
	                }
    			 },{
    				 text        : '대표신도',
    				 xtype       : 'excheckcolumn',
    			     dataIndex   : 'DAEJU_YN',                    
    			     exAlign     : 'center',
    			     flex        : 1.4,
    			     listeners   : {
    			         beforecheckchange: function() {
    			             return false; // HERE
    			         }
    			     }
    			 }]
        	},{
        		height : 10,
        	},{        		 
        		 height : 25,
        		 layout: {
    	            type: 'hbox',
    	            pack: 'center'
    	         },
         		 items :[{
         			 xtype     : 'exbutton',
	        		 reference : 'unionBtn',
	        		 handler   : 'onUnion',	            		
	        		 iconCls   : 'fa fa-angle-down',
	        		 text      : '선택'
         		 },{
         			 width : 5
         		 },{
         			xtype     : 'exbutton',
	        		reference : 'unionAllBtn',
	        		handler   : 'onUnionAll',	            		
	        		iconCls   : 'fa fa-angle-double-down',
	        		text      : '전체선택'
         		 }]
        	},{
        		layout : 'hbox',
        		items : [{
        			html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">합가대상가족</span>',
        			flex : 1
        		},{
        			xtype     : 'exbutton',
               		reference : 'saveBtn',
               		handler   : 'onSave',
               		text      : '저장',
            	 },{
            		 width : 5
            	 },{
            		xtype     : 'exbutton',
               		reference : 'closeBtn',
               		handler   : 'onClose',
               		text      : '닫기',
            	 },{
            		 width : 0,
         			 heigth: 0,
         			 items : [{
             			 xtype            : 'extextfield',
                         reference        : 'procSave',
                         value            : '0',
                         inputType        : 'hidden',
     	    		}]
        		}]
        	/*},{
        		height : 10,*/
        	},{
        		 exGroupRef    : true,
        		 xtype         : 'exgrid',
        		 reference     : 'sin001p_04_a',
        		 cls           : 'sin001p_04_a',
        		 height        : 300,
        		 width         : '100%',
        		 bind          : {
        		     store:'{ds_main}'
        		 },
        		 plugins     : [{
                 	ptype:'cellediting'
                 }],
                 columns:[{
    				 text        : '관계',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'REPRESEN_REL',                    
    			     exAlign     : 'left',
    			     flex        : 1.2
    			 },{
    				 text        : '성명',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'NAME_KOR',                    
    			     exAlign     : 'left',
    			     flex        : 1.4
    			 },{
    				 text        : '법명',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'SACRED_KOR',                    
    			     exAlign     : 'left',
    			     flex        : 1.4
    			 },{
    				 text        : '성별',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'SEX_GBN',                    
    			     exAlign     : 'center',
    			     flex        : 1.2,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
 	                	if(value == undefined || value == "" || value == null){
 	                		return "";
 	                	}
 	                	return exCommon.getFormat(value,'gender' );
 	                }
    			 },{
    				 text        : '생년월일',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'BIRTHDAY',                    
    			     exAlign     : 'center',
    			     flex        : 1.8,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	if(value == undefined || value == "" || value == null){
	                		return "";
	                	}
	                	return exCommon.getFormat(value,'dateYMD' );
	                }
    			 },{
    				 text        : '양력음력',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'LUNAR_SOLAR',                    
    			     exAlign     : 'center',
    			     flex        : 1.2,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
    			    	 if(value == undefined || value == "" || value == null){
 	                		return "";
 	                	}
 	                	return exCommon.getFormat(value,'lunar' );
    			     }
    			 },{
    				 text        : '간지',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'SEXAGENARY',                    
    			     exAlign     : 'center',
    			     flex        : 1.2,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
    	               	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_ganjiMaster');
    	               	return exCommon.getComboVal(value,store, '' );
    	             }
    			 },{
    				 text        : '핸드폰',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'MOBILE_TELNO',                    
    			     exAlign     : 'center',
    			     flex        : 2,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	var MOBILE_TELNO1 = record.get("MOBILE_TELNO1");
	                	var MOBILE_TELNO2 = record.get("MOBILE_TELNO2");
	                	var MOBILE_TELNO3 = record.get("MOBILE_TELNO3");
	                	
	                	if(MOBILE_TELNO1 == undefined || MOBILE_TELNO1 == null){
	                		MOBILE_TELNO1 = "";
	                	}
	                	if(MOBILE_TELNO2 == undefined || MOBILE_TELNO2 == null){
	                		MOBILE_TELNO2 = "";
	                	}
	                	if(MOBILE_TELNO3 == undefined || MOBILE_TELNO3 == null){
	                		MOBILE_TELNO3 = "";
	                	}
	                	
	                	var MOBILE_TELNO = MOBILE_TELNO1 + MOBILE_TELNO2 + MOBILE_TELNO3;
	                	
	                	if(MOBILE_TELNO.length == 11 || MOBILE_TELNO.length == 10){
	                		return MOBILE_TELNO1 + "-"+ MOBILE_TELNO2 + "-"+ MOBILE_TELNO3;
	                	}
	                	else if( MOBILE_TELNO.length == 7 ){
	                		return MOBILE_TELNO.substr(0,3) + "-"+MOBILE_TELNO.substr(3,7);
	                	}
	                	else if( MOBILE_TELNO.length == 8 ){
	                    	return MOBILE_TELNO.substr(0,4) + "-"+MOBILE_TELNO.substr(4,8);
	                	}else{
	                		return MOBILE_TELNO;
	                	}
	                	
	                }
    			 },{
    				 text        : 'E-MAIL',
    			 	 xtype       : 'excolumn',
    			     dataIndex   : 'EMAILtemp',                    
    			     exAlign     : 'left',
    			     flex        : 2.4,
    			     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                	var email1 = record.get("EMAIL1") 
	                	if(email1 == undefined || email1 == null){
	                		email1 = "";
	                	}
	                	
	                	var email2 = record.get("EMAIL2") 
	                	if(email2== undefined  || email2 == null){
	                		email2 = "";
	                	}
	                	
	                	if(email1 == "" || email2 == ""){
	                		return "";
	                	}else{
	                		return email1 +"@" + email2 ;
	                	}
	                	                	
	                	
	                }
    			 },{
    				 text        : '대표신도',
    				 xtype       : 'excheckcolumn',
    			     dataIndex   : 'DAEJU_YN',                    
    			     exAlign     : 'center',
    			     flex        : 1.4,
    			     listeners   : {
    			         beforecheckchange: function() {
    			             return false; // HERE
    			         }
    			     }
    			 }]
        	}]
        },{
        	width : '0.4%'
        }]
    }]
})