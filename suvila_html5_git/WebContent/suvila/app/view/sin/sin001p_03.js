Ext.define('ExFrm.view.sin.sin001p_03',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_03',
    requires:[
    	'ExFrm.view.sin.sin001p_03Controller',
    	'ExFrm.view.sin.sin001p_03Model'
    ],
    controller:'sin001p_03',
    viewModel:{
        type:'sin001p_03'
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
                     valueField   : 'BUD_NO',
                     displayField : 'NAME_KOR',
                     reference    : 'lc_bokwi',
                     name         : 'V_BOKWI_BUD_NO',	 
                     width        : 200,
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
  	                        html    : '<div style="text-align:left;padding-left:5px;">행관계</div>'                           
  	                    },{
  	                    	xtype   : 'exblockfield',
  	                    	items   : [{
  	                    		xtype      : 'extextfield',
 	                            reference  : 'txt_hyo_rel',
 	                            exLabel    : '가족코드',                            
 	                     //       name       : 'HYO_REL',
  	                    	},{
  	                    		width : 2 
  	                    	},{
  	                    		xtype     : 'exbutton',
  	                     		handler   : 'onHelp2',
  	                     		text      : '도움',
  	                    	}]
  	                    },{
  	                    	xtype   : 'exblocklabel',
  	                        html    : '<div style="text-align:left;padding-left:5px;">복위/기부</div>'
  	                   },{
 	                    	xtype   : 'exblockfield',
 	                    	items   : [{
 	                    		xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            reference    : 'lc_kibu',
	                      //   /   name         : 'BOKWI_KIBU_GBN',	 
	                            emptyText    : '선택',
	                            width        : 70,
	                            bind         : {
	                            	store:'{ds_kibu}'
	                            }
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
 	                       //     name       : 'LNAME',
 	                            width      : 40, 	                           
 	                            listeners  : { 	                            	
 	                            	 keyup : 'onSearchEnter'
 	                            	,blur  : 'onSelectBon'
 	                            },
 	                           enableKeyEvents : true,
  	                    		
  	                    	},{
  	                    		width  : 3	
  	                    	},{
  	                    		xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            reference    : 'lc_bon',
	                       //     name         : 'SINDO_GBN',	 
	                            emptyText    : '선택',
	                            width        : 70,
	                            bind         : {
	                            	store:'{ds_bon}'
	                            },
	                            /*listeners    : {
	                             	change:'onChangBon'
	                            }*/
  	                    	},{
  	                    		width : 0,
  	                    		items : [{
  	                    			xtype      : 'extextfield',
  	 	                            reference  : 'txt_lname_temp',
  	 	                            exLabel    : '가족코드',          
  	 	                            inputType  : 'hidden',
  	 	                          //  name       : 'LNAME_TEMP',
  	 	                            width      : 40, 	                           
  	 	                            listeners  : { 	                            	
  	 	                            	keyup : 'onFindLname'
  	 	                            },
  	 	                           enableKeyEvents : true,
  	                    		}]
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
   	                        html    : '<div style="text-align:left;padding-left:5px;">사망일</div>'                           
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
   	                        html    : '<div style="text-align:left;padding-left:5px;">사망시간</div>'
   	                   },{
  	                    	xtype   : 'exblockfield',
  	                    	items   : [{
  	                    		xtype      : 'timefield',
	                            reference  : 'sel_deathtime1',	                            	                            
	                        //    name       : 'TR_SENDTIME_TEMP',
	                            minValue   : '00',
	                            maxValue   : '23',
	                            format     : 'H',
	                            altFormats : 'H',
	                            increment  : 60,	                            
	                            width      : 60,
	                            emptyText  : '선택'
  	                    	},{
  	                    		width : 20,
  	                    		html  : '<div style="width:100%;text-align:center;" >시</div>'
  	                    	},{
  	                    		xtype      : 'timefield',
	                            reference  : 'sel_deathtime2',	                            	                            
	                        //    name       : 'TR_SENDTIME_TEMP',
	                            minValue   : '00',
	                            maxValue   : '59',
	                            format     : 'i',
	                            altFormats : 'i',
	                            increment  : 1,	                            
	                            width      : 60,
	                            emptyText  : '선택'
  	                    	},{
  	                    		width : 20,
  	                    		html  : '<div style="width:100%;text-align:center;" >분</div>'
  	                    	}]
   	                    }]
        			 
        			 },{
        				 xtype:'exblockrow',
    	                    items:[{
    	                        xtype   : 'exblocklabel',
    	                        html    : '<div style="text-align:left;padding-left:5px;">법명</div>'                           
    	                    },{
    	                    	xtype   : 'exblockfield',
    	                    	items   : [{
    	                    		xtype        : 'extextfield',
     	                            reference    : 'txt_sacred_kor',
     	                      //      name         : 'SACRED_KOR',	 
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
                	 text        : '행관계',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'HYO_REL',                    
                     exAlign     : 'left',
                     flex        : 1.4,
                 },{
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
                     //dataIndex   : 'BON',                    
                 	 dataIndex   : 'BON_NM',
                     exAlign     : 'center',
                     flex        : 1.2                     
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