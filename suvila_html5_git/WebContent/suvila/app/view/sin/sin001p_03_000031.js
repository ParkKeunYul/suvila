Ext.define('ExFrm.view.sin.sin001p_03_000031',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_03',
    requires:[
    	'ExFrm.view.sin.sin001p_03_000031Controller',
    	'ExFrm.view.sin.sin001p_03_000031Model'
    ],
    controller:'sin001p_03_000031',
    viewModel:{
        type:'sin001p_03_000031'
    },
    isModal:true,
    name:'sin001p_03',
    title:'영가관리',
    closable:true,
    width:1150,
    height:900,
    closeToolText : "닫기",
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        width   : '100%',
        height  : '100%',
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
                     valueField   : 'VALUE',
                     displayField : 'NAME_CODE',
                     reference    : 'lc_bokwi',
                     width        : 230,
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
               		handler   : 'onAdd',
               		text      : '영가등록',
            	 },{
            		 width : 5
            	 },{
            		xtype     : 'exbutton',
               		handler   : 'onFetch',
               		text      : '영가모시기',
            	 },{
            		 width : 5
            	 },{
            		xtype     : 'exbutton',
               		handler   : 'onSave',
               		text      : '저장',
            	 },{
            		 width : 5
            	 },{
            		xtype     : 'exbutton',
               		handler   : 'onClose',
               		text      : '닫기',
            	 },{
            		/*버그가 있어서 자리 이동*/
            		xtype     : 'exformmain',
         			width     : 0,
         			heigth    : 0,
         			hidden    : true,
         			items     : [{
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
     	       	 		xtype     : 'extextfield',
     	       	 		inputType : 'hidden',
     	       	 		reference : 'tempData',
     	       	 		name      : 'tempData',
     	        	},{
            			xtype     : 'extextfield',
                        reference : 'txt_sel_index',
                        value     : '-1',
                        inputType : 'hidden',
     	    		}]
            	 }]
        	 },{
        		 height : 10
        	 },{
        		 items   : [{
        			layout : 'hbox',
        			height : 25,
        			items  : [{
     	    			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:25px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">복위자 정보설정 및 영가자 정보설정</div>',
     	    			flex : 1
                	 /*},{
                		xtype     : 'exbutton',
                   		handler   : 'onTempSave',
                   		text      : '임시저장',*/
        			}]
        			
        		 },{
        			 xtype   :'exfieldsetblockbox',
        			 items   : [{
        				xtype:'exblockrow',
 	                    items:[{
 	                        xtype   : 'exblocklabel',
 	                        html    : '<div style="text-align:left;padding-left:5px;">망관계</div>'                           
 	                    },{
 	                    	xtype   : 'exblockfield',
 	                    	items   : [{
 	                    		xtype      : 'extextfield',
	                            reference  : 'txt_dece_rel',
	                            exLabel    : '망관계',                            
	                           // name       : 'DECE_REL',
	                            enableKeyEvents : true,
	                            listeners       : {
	                            	blur : 'onBlurDece'
	                            },
 	                    	},{
  	                    		width : 2
  	                    	},{
  	                    		xtype     : 'exbutton',
  	                     		handler   : 'onHelp',
  	                     		text      : '도움',
 	                    	}]
 	                    },{
 	                    	xtype   : 'exblocklabel',
 	                        html    : '<div style="text-align:left;padding-left:5px;">영가명</div>'
 	                   },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextfield',
	                            reference  : 'txt_death_name_kor',
	                            exLabel    : '가족코드',                            
	                         //   name       : 'NAME_KOR',
	                    	}]
 	                    }]
        			 },{
        				xtype:'exblockrow',
  	                    items:[{
  	                        xtype   : 'exblocklabel',
  	                        html    : '<div style="text-align:left;padding-left:5px;">본</div>'                           
  	                    },{
  	                    	xtype   : 'exblockfield',
  	                    	items   : [{
  	                    		xtype      : 'extextfield',
 	                            reference  : 'txt_sung_kor',
 	                            exLabel    : '가족코드',                            
 	                            width      : 40, 	                           
 	                            listeners  : { 	                            	
 	                            	 keyup : 'onSearchEnter'
 	                            	,blur  : 'onSelectBon'
 	                            },
 	                           enableKeyEvents : true,
  	                    	},{
  	                    		width  : 3
  	                    	},{
  	                    		/*
  	                    		xtype      : 'extextfield',
  	                    		exHidden   : true,
 	                            reference  : 'txt_lname_temp',
 	                            exLabel    : '가족코드',                            
 	                            width      : 40, 	                           
 	                            listeners  : { 	                            	
 	                            	keyup : 'onFindLname'
 	                            },
 	                           enableKeyEvents : true,
 	                           */
  	                    	},{
  	                    		width  : 3	
  	                    	},{
  	                    		xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            reference    : 'lc_bon',
	                            emptyText    : '선택',
	                            width        : 70,
	                            bind         : {
	                            	store:'{ds_bon}'
	                            },
	                            /*listeners    : {
	                             	change:'onChangBon'
	                            }*/
  	                    	}]
  	                    },{
  	                    	xtype   : 'exblocklabel',
  	                        html    : '<div style="text-align:left;padding-left:5px;">후인/유인</div>'
  	                   },{
 	                    	xtype   : 'exblockfield',
 	                    	items   : [{
 	                    		xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            reference    : 'lc_sexgbn',
	                          //  name         : 'SINDO_GBN',	 
	                            emptyText    : '선택',
	                            width        : 70,
	                            bind         : {
	                            	store:'{ds_sex_gbn}'
	                            }
 	                    	}]
  	                    }]
        			 },{
        				 xtype:'exblockrow',
   	                    items:[{
   	                        xtype   : 'exblocklabel',
   	                        html    : '<div style="text-align:left;padding-left:5px;">동일구분</div>'                           
   	                    },{
   	                    	xtype   : 'exblockfield',
   	                    	items   : [{
   	                    		xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            reference    : 'lc_equal_gbn',
	                            emptyText    : '선택',
	                            width        : 70,
	                            bind         : {
	                            	store:'{ds_equal_gbn}'
	                            }
   	                    	}]
   	                    },{
   	                    	xtype   : 'exblocklabel',
   	                        html    : '<div style="text-align:left;padding-left:5px;">영체구분</div>'
   	                   },{
  	                    	xtype   : 'exblockfield',
  	                    	items   : [{
  	                    		xtype        : 'excombobox',
 	                            valueField   : 'CODE',
 	                            displayField : 'NAME',
 	                            reference    : 'lc_spiritual_gbn',
 	                            emptyText    : '선택',
 	                            width        : 70,
 	                            bind         : {
 	                            	store:'{ds_spiritual_gbn}'
 	                            }
  	                    	}]
   	                    }]
        			 
        			 },{
        				 xtype:'exblockrow',
   	                    items:[{
   	                        xtype   : 'exblocklabel',
   	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">기일</div>'                           
   	                    },{
   	                    	xtype   : 'exblockfield',
   	                    	items   : [{
   	                    		xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            reference    : 'lc_lunar_solar',
	                        //    name         : 'LUNAR_SOLAR',	 
	                            emptyText    : '선택',
	                            width        : 70,
	                            bind         : {
	                            	store:'{ds_lunar_solar}'
	                            }
   	                    	},{
   	                    		width  : 3
   	                    	},{
   	                    		xtype        : 'exdatefield',
 	                            reference    : 'em_birthday',
 	                       //     name         : 'DEATH_DAY',	 
 	                            format       : 'Y-m-d',
   	                    	}]
   	                    },{
   	                    	xtype   : 'exblocklabel',
   	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">법명</div>'
   	                   },{
  	                    	xtype   : 'exblockfield',
  	                    	items   : [{
  	                    		xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype        : 'extextfield',
     	                            reference    : 'txt_sacred_kor',
     	                      //      name         : 'SACRED_KOR',	 
    	                    	}]
  	                    	}]
   	                    }]
        			 
        			 },{
        				 xtype:'exblockrow',
	                     items:[{
	                    	 xtype   : 'exblocklabel',
		                     html    : '<div style="text-align:left;padding-left:5px;">행관계</div>'
	                     },{
	                    	 xtype   : 'exblockfield',
	   	                     items   : [{
		                    	 xtype        : 'excombobox',
		                         valueField   : 'CODE',
		                         displayField : 'NAME',
		                         reference    : 'lc_hyo',
		                         emptyText    : '선택',
		                         width        : 110,
		                         bind         : {
		                            	store:'{ds_hyo}'
		                         }
	   	                     }]
	                     },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">정렬순서</div>'
	                     },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype        : 'numberfield',
 	                            reference    : 'txt_sort_seq',
 	                     //       name         : 'SORT_SEQ',	 
 	                            minValue      : '1',
 	                            width         : 50,
	                    	}]
	                     }]
        			 }]// exfieldsetblockbox
        		 }]
        	 },{
        		 height : 30,
     	    	 layout : 'hbox',
     	    	 items  : [{
     	    		flex   : 1,
     	    		html   : '<div style="height : 30px;width: 60px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;">가족</div>',
     	    	 },{
            		xtype     : 'exbutton',
               		handler   : 'onDelete',
               		text      : '삭제',
     	    	 },{
     	    		 width : 5
     	    	 },{
     	    		xtype     : 'exbutton',
             		handler   : 'onSortUp',
             		iconCls   : 'fa fa-angle-up',
     		     },{
     			    width : 5
     		     },{
     			    xtype     : 'exbutton',
             		handler   : 'onDownUp',	            		
             		iconCls   : 'fa fa-angle-down',
     	    	 }]
        	 },{
        		 exGroupRef    : true,
                 xtype         : 'exgrid',
                 reference     : 'sin001p_03_a',
                 cls           : 'none-dirty-grid',
                 height        : 540,
                 width         : '100%',
                 bind          : {
                     store:'{ds_main}'
                 },
                 /*listeners:{
                 	celldblclick : 'onCellDbClick'
                 },*/
                 listeners      : {
                     selectionchange : 'onSelectionChange'
                 },
                 columns:[{
                	 text        : '복위자명',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'BOKWI_BUD_NO',                    
                     exAlign     : 'left',
                     flex        : 1.6,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                   	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_bokwi');
	                   	
	                   	
	                    return exCommon.getComboVal(value,store, 'user' , 'BUD_NO', 'NAME_KOR' );
	                 }
                 },{
                	 text        : '본',
                 	 xtype       : 'excolumn',
                     //dataIndex   : 'BON',                    
                 	 dataIndex   : 'BON',
                     exAlign     : 'center',
                     flex        : 1.2,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
  	                    var store = this.up('[isRootView=true]').getViewModel().getStore('ds_bon_master');
  	                    return exCommon.getComboVal(value,store, '' );
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
                     exAlign     : 'center',
                     flex        : 1.6,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    var store = this.up('[isRootView=true]').getViewModel().getStore('ds_equal_gbn');
	                    return exCommon.getComboVal(value,store, '' );
	                 }
                 },{
                	 text        : '영체구분',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'SPIRITUAL_GBN',                    
                     exAlign     : 'center',
                     flex        : 1.6,
                     renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
   	                    var store = this.up('[isRootView=true]').getViewModel().getStore('ds_spiritual_gbn');
   	                    return exCommon.getComboVal(value,store, '' );
   	                 }
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
                 },{
                	 text        : '기일',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'DEATH_DAY',                    
                     exAlign     : 'center',
                     flex        : 1.6,
                     renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    return exCommon.getGridDateFormat(value , ' / ');
	                 }
                 },{
                	 text        : '행관계',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'HYO_REL',                    
                     exAlign     : 'center',
                     flex        : 1.6,
                 },{
                	 text        : '정렬순서',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'SORT_SEQ',                    
                     exAlign     : 'center',
                     flex        : 1.2,
                 }]        	         	
        	 }]
        },{
        	width : '0.5%'
        }]
    }]
})