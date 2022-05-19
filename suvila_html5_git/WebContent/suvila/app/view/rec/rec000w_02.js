Ext.define('ExFrm.view.rec.rec000w_02',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec000w_02',
    requires:['ExFrm.view.rec.rec000w_02Controller',
              'ExFrm.view.rec.rec000w_02Model'],
    controller:'rec000w_02',
    viewModel:{
        type:'rec000w_02'
    },
 //   id:'rec000w_02',
    xtype : 'rec000w_02',
    isRootView:true,
    layout:{
        type:'hbox',
        align:'stretch'
    },
    height:305,
    items:[{
    	flex   : 1.4,
    	layout : 'vbox',
    	items  : [{
    		xtype  :'exfieldsetblockbox',
    		/*height : 265,*/
    		width  : '100%',
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[{
            	xtype :'exblockrow',
            	items : [{
            		xtype:'exblockfield',
                    items:[{
                    	xtype       : 'excheckbox',
                    	reference   : 'cb_setBudNo',
                    	listeners   : {
                        	change:'onCheckBudNo'
                        }
                    },{
                    	width : 1
                    },{
                    	xtype           : 'excombobox',                		
                		labelAlign      : 'left',
                        reference       : 'cb_Stipulation',
                        displayField    : 'name',
                        valueField      : 'code',
                        exCommonDmnCode : '001',    
                        width           : 100,
                        store           : {},
                        listeners       : {
                        	change:'onSearchTypeChange'
                        }
                        
                    },{
                    	html  :'<div style="text-align:left;padding-left:2px;font-weight:700;">분가포함</div>'
                    },{
                    	width : 1
                    },{
                    	 xtype           : 'excheckbox',
                    	 reference       : 'cb_setBunga',
                    	 listeners   : {
                         	change:'onCheckBunga'
                         }
                    },{
                    	width : 1
                    },{
                    	xtype           : 'extextfield',
                        reference       : 'txt_stipulation',
                       // value           : '',
                        enableKeyEvents : true,
                        width           : 130 ,
                        listeners       : {
                     	   keyup : 'onSearchEnter',
                     	   blur  : 'onSearchBlur'
                        },
                       // value : '00002'
                    },{
                    	width : 1
                    },{
                    	 xtype    : 'exbutton',
                         iconCls  : 'fa fa-search',
                         text     : '검색',
                         handler  : 'onBudSearch',
                         reference: 'budSearchBtn',
                    },{
                    	width : 1
                    },{
                    	xtype    : 'exbutton',
                        text     : '상담일지',
                        reference: 'memoBtn',
                        iconCls  : 'fa fa-sticky-note-o',
                        handler  : 'onMemo'
                    },{
                    	width            : 0,
                		height           : 0,
                		items            : [{
                			xtype            : 'extextfield',
                            reference        : 'hid_bud_no',
                            value            : '',
                            inputType        : 'hidden',
                            name             : 'V_BUD_NO'
                		},{
                			xtype            : 'extextfield',
                            reference        : 'card_stipulation',
                            value            : '',
                            inputType        : 'hidden',
                            name             : 'card_stipulation'
                		},{
                			xtype            : 'extextfield',
                            reference        : 'txt_budNo',
                            value            : '',
                            inputType        : 'hidden',
                            name             : 'txt_budNo'
                		},{
                			xtype            : 'extextfield',
                            reference        : 'pre_cb_Stipulation',
                            value            : '',
                            inputType        : 'hidden',
                            name             : 'pre_cb_Stipulation'
                		}]
                    
                    }]
            	}]
            },{
                xtype:'exblockrow',
                items:[{
                    xtype   :'exblocklabel',
                    width   :80,
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">대주번호</div>'
                },{
                    xtype:'exblockfield',
                    items:[{
                        reference  :'txt_daeju_no',
                        name       :'BUD_NO',
                        xtype      :'extextfield',
                        exReadOnly : true,
                        width      : 270
                    }]
                },{
                	xtype   :'exblocklabel',
                    width   :80,
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">대주/수계명</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                        xtype      :'extextfield',
                        exReadOnly : true,
                        width      : 128,
                        reference  :'txt_daeju_nm',
                        name       :'NAME_KOR',
                    },{
                    	html    : '<div style="padding:0 5px;font-weight:700;">/</div>'
                    },{
                    	xtype      :'extextfield',
                        exReadOnly : true,
                        width      : 128,
                        reference  :'txt_sacred_nm',
                        name       :'SACRED_KOR',
                    }]
                }]
            },{
                xtype:'exblockrow',
                items:[{
                	xtype   :'exblocklabel',
                    width   :80,
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">전화번호</div>'
                },{
                    xtype:'exblockfield',
                    items:[{
                        xtype      : 'extextfield',
                        exReadOnly : true,
                        width      : 80,
                        reference  :'txt_telNo1',
                        name       :'TELNO1',                        
                    },{
                    	html    : '<div style="padding:0 5px;font-weight:700;">-</div>'
                    },{
                    	xtype      : 'extextfield',
                        exReadOnly : true,
                        width      : 80,
                        reference  :'txt_telNo2',
                        name       :'TELNO2',
                    },{
                    	html    : '<div style="padding:0 5px;font-weight:700;">-</div>'
                    },{
                    	xtype      : 'extextfield',
                        exReadOnly : true,
                        width      : 80,
                        reference  :'txt_telNo3',
                        name       :'TELNO3',
                    }]
                },{
                	xtype   :'exblocklabel',
                    width   :80,
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">주소1</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                    	xtype      : 'extextfield',
                        exReadOnly : true,
                        width      : 270,
                        reference  :'txt_addr1',
                        name       :'ADDR1',
                    }]
                }]            
            },{
                xtype  :'exblockrow',
                items:[{
                	xtype   :'exblocklabel',
                    width   :80,
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">휴대전화</div>'
                },{
                    xtype:'exblockfield',
                    items:[{
                        xtype      : 'extextfield',
                        exReadOnly : true,
                        width      : 80,
                        reference  :'txt_MobiletelNo1',
                        name       :'MOBILE_TELNO1',
                    },{
                    	html    : '<div style="padding:0 5px;font-weight:700;">-</div>'
                    },{
                    	xtype      : 'extextfield',
                        exReadOnly : true,
                        width      : 80,
                        reference  :'txt_MobiletelNo2',
                        name       :'MOBILE_TELNO2',
                    },{
                    	html    : '<div style="padding:0 5px;font-weight:700;">-</div>'
                    },{
                    	xtype      : 'extextfield',
                        exReadOnly : true,
                        width      : 80,
                        reference  :'txt_MobiletelNo3',
                        name       :'MOBILE_TELNO3',
                    }]
                },{
                	xtype   :'exblocklabel',
                    width   :80,
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">주소2</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                    	xtype      : 'extextfield',
                        exReadOnly : true,
                        width      : 270,
                        reference  :'txt_addr2',
                        name       :'ADDR2',
                    }]
                }]
            },{
            	height : 1
            },{
            	xtype:'exblockrow',
            	layout : 'hbox',
        		width  : '100%',
        		items  :[{
        			flex : 1,
        			//title:'가족',
        			xtype    :'tabpanel',
        			cls      : 'selectTab',
        			items    : [{
        				title:'가족',
    	                xtype:'exgrid',    	                
    	                height : 135,
    	                bind:{
    	                    store:'{ds_familyInfo}'
    	                },
    	                columns:[{
    	                    text  :'No',
    	                    xtype :'rownumberer',
    	                    align : 'center',
    	                    width : 55
    	                },{
    	                	text         :'관계',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'REPRESEN_REL',
    	                    flex         : 1.8,
    	                    exAlign      : 'left',
    	                    sortable     : true,
    	                },{
    	                    text         :'신도명',
    	                    xtype        :'excolumn',
    	                    dataIndex    :'NAME_KOR',
    	                    flex         : 1.5,
    	                    exAlign      : 'left',
    	                    sortable     : true,
    	                },{
    	                    text         :'성별',
    	                    xtype        :'excolumn',
    	                    dataIndex    :'SEX_NM',
    	                    flex         : 1.2,
    	                    exAlign      : 'center',
    	                },{
    	                	text         :'간지',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'SEXAGENARY_NM',
    	                    flex         : 1.2,
    	                    exAlign      : 'center',
    	                }],
    	                viewConfig: {
                        	getRowClass: function(record, index) {
                        		 var BUNGA_YN  = record.get("BUNGA_YN");
                              	 var ONESELF_YN = record.get("ONESELF_YN");
                              	 
                              	 var color = "color_depth_1";
                              	 
                              	 if(BUNGA_YN == "T"){
                              		 color = "color_depth_3";
                              	 }else{
                              		 if(ONESELF_YN == "T"){
                              			color = "color_depth_2";
                              		 }
                              	 }
                              	 return  color;
                            }
                        }
        			}]
        		},{
        			width : 3
        		},{
        			flex : 1.2,
        			//
        			xtype    :'tabpanel',
        			cls      : 'selectTab',
        			items    : [{
        				title:'영가',
    	                xtype:'exgrid',
    	                
    	                height : 135,
    	                bind:{
    	                    store:'{ds_spiritInfo}'
    	                },
    	                columns:[{
    	                	text  :'No',
    	                    xtype :'rownumberer',
    	                    align : 'center',
    	                    width : 55
    	                },{
    	                	text         :'본',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'BON_NM',
    	                    flex         : 0.8,
    	                    exAlign      : 'center',
    	                },{
    	                	text         :'영가명',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'NAME_KOR',
    	                    flex         : 1.4,
    	                    exAlign      : 'left',
    	                },{
    	                	text         :'행관계',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'DECE_REL',
    	                    flex         : 1.1,
    	                    exAlign      : 'left',
    	                },{
    	                	text         :'복위자',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'BOKWIJA_NM',
    	                    flex         : 1.2,
    	                    exAlign      : 'left',
    	                },{
    	                	text         :'기일',
    	                	xtype        :'excolumn',
    	                    dataIndex    :'DEATH_DAY',
    	                    flex         : 1.2,
    	                    exAlign      : 'center',
    	                    exType       : 'date'
    	                }]
        			}],
        			viewConfig: {
                    	getRowClass: function(record, index) {
                    		var DEATH_YN = record.get("DEATH_YN");
                          	var color     = "recCellEdit";
                          	 
                          	 if(DEATH_YN == 1){
                          		 color = "recCellNotEdit";
                          	 }else if(DEATH_YN == 2){
                          		 color = "cmsline";
                          	 }
                          	 return  color;
                        }
                    }
        		}]
        	}]
         }]
    },{
    	width : 3
    },{
    	flex : 1,
    	layout:{
            type:'vbox',
            align:'stretch'
        },
        items:[{
            layout :'hbox',
            height : 36,
            items  : [{
                //html    : '<div style="text-align:left;padding-left:5px;font-weight:700;line-height:36px;">접수완료 및 수납현황</div>',
                items :[{
                	height : 6,
                },{
                	//html    :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;font-weight:700;">접수완료 및 수납현황</span>',
                	html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;center;border-top-right-radius:5px;display:inline-block;padding:0 15px;">접수완료 및 수납현황</div>',
                }]
            },{
            	width : 15
            },{
            	xtype     : 'exbutton',
          		text      : '가족인등수납',
          		margin    :'5px 0 0 0', 
          		handler   : 'onIndeungSunab'
            },{
            	width : 5
            },{
            	xtype     : 'exbutton',
          		text      : '영수증',
          		margin    :'5px 0 0 0',
          		handler   : 'onReceipt',
            },{
            	width : 5
            },{
            	xtype     : 'exbutton',
          		text      : '축원',
          		margin    : '5px 0 0 0',
          		handler   : 'onPray',
            },{
            	flex : 1
            },{
            	xtype        :'excombobox',
            	labelWidth   : 80,
                fieldLabel   : '<span style="font-weight: 700;">접수구분 </span>',
                width        : 300,
                style        : 'padding-top:5px;',
                valueField   : 'CODE',
                displayField : 'NAME',     
                reference    :'lc_acceptGbn',
            	bind         : {
                	store:'{ds_acceptGbn}'
                },
                listeners       : {
                	change:'onSearchRec'
                },
            },{
            	width : 3
            }]
        },{
            flex:1,
            xtype       : 'exgrid',
            reference   : 'rec000w_02_c',
            bind        : {
                store:'{ds_recHisInfo}'
            },
            features   : [{
            	ftype : 'summary',
            	dock  : 'bottom'  // 하단 잠금
            }],
            listeners:{
            	celldblclick : 'onCellDbClick'
            },
            columns:[{
            	text  :'No',
                xtype :'rownumberer',
                width : 55,
                align : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                	if(record.data.APPROVAL_GBN == 3){
                		meta.style = 'background-color: #d0e4f3 !important;'
                	}else{
                		meta.style = 'background-color : #ffffff !important;'
                	}
                	if(record.data.END_YN == "T") meta.style = 'background-color : #C8C8C8 !important;';
                	
                	return (rowIndex+1);
                }
            },{
            	text         :'접수일',
            	xtype        :'excolumn',
                dataIndex    :'ACCEPT_DATE',
                width        : 110,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                	if(record.data.APPROVAL_GBN == 3){
                		meta.style = 'background-color: #d0e4f3 !important;'
                	}else{
                		meta.style = 'background-color : #ffffff !important;'
                	}
                	if(record.data.END_YN == "T") meta.style = 'background-color : #C8C8C8 !important;';
                	
                	
                	if(value == undefined || value == "" || value == null){
                		return "";
                	}
                	return exCommon.getFormat(value,'dateYMD' );
                }
            },{
            	text         :'접수종류',
            	xtype        :'excolumn',
                dataIndex    :'PROD_NAME',
                flex         : 1,
                exAlign      : 'left',
                summaryType  : 'count',
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	if(value > 0){
                		return "총 "+value+' 건';
                	}                        
                },
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                	if(record.data.APPROVAL_GBN == 3){
                		meta.style = 'background-color: #d0e4f3 !important;'
                	}else{
                		meta.style = 'background-color : #ffffff !important;'
                	}
                	if(record.data.END_YN == "T") meta.style = 'background-color : #C8C8C8 !important;';
                	
                	if(record.data.END_YN == "T") meta.tdCls = 'useYnBack';
                	
                	return value;
                }
            },{
            	text         :'총납입금',
            	xtype        :'excolumn',
                dataIndex    :'PAYMENT_AMT',
                width        : 120,
                exAlign      : 'right',
                exType       : 'number',
                summaryType  : 'sum',
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	if(value > 0){
                		return exCommon.setNumberFormat(value)+' 원';
                	}                        
                },
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                	
                	if(record.data.APPROVAL_GBN == 3){
                		meta.style = 'background-color: #d0e4f3 !important;'
                	}else{
                		meta.style = 'background-color : #ffffff !important;'
                	}
                	if(record.data.END_YN == "T") meta.style = 'background-color : #C8C8C8 !important;';
                	
                	
                	return exCommon.setNumberFormat(value);
                }
            },{
            	text         :'미수금',
            	xtype        :'excolumn',
                dataIndex    :'MISU_AMT',
                width        : 120,
                exAlign      : 'right',
                exType       : 'number',
                summaryType  : 'sum',
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	if(value > 0){
                		return exCommon.setNumberFormat(value)+' 원';
                	}                        
                },
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                	if(record.data.APPROVAL_GBN == 3){
                		meta.style = 'background-color: #d0e4f3 !important;'
                	}else{
                		meta.style = 'background-color : #ffffff !important;'
                	}
                	if(record.data.END_YN == "T") meta.style = 'background-color : #C8C8C8 !important;';
                	
                	
                	return exCommon.setNumberFormat(value);
                }
            }]
        }]
    }]
});
