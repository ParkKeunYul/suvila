Ext.define('ExFrm.view.sin.sin015w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.sin015w_01',
    requires:[
    	'ExFrm.view.sin.sin015w_01Controller',
        'ExFrm.view.sin.sin015w_01Model',
    ],
    controller :'sin015w_01',
    viewModel:{
        type   :'sin015w_01'
    },
    name:'sin015w_01',
    isRootView:true,
    title:'임시출력',
    closable:true,
    scrollable:true,
    layout  : 'hbox',
    items :[{
    	width : '0.5%'
    },{
    	xtype   :'exformmain',
    	flex  : 1,
    	items : [{
    		width  : '100%',
    		layout : 'vbox',
    		items  : [{
    			height : 10,
    			html : '<div id="layerSin015" class="find_addr_layer_pop" style="display:none;position:fixed;overflow:hidden;z-index:3;-webkit-overflow-scrolling:touch;"><img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼"></div>'
    		},{
    			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;margin: 0 0 10px 0;">축원문</div>',    		    			
    		},{
    			layout : 'hbox',
    			width  : '100%',
    			items  :[{
    				xtype           : 'excombobox',                		
            		labelAlign      : 'left',
                    reference       : 'cb_StipulationSin',
                    displayField    : 'name',
                    valueField      : 'code',
                    exCommonDmnCode : '001',    
                    width           : 100,
                    store           : {},
                    listeners       : {
                    	change:'onSearchTypeChangeSin'
                    }
    			},{
    				width : 5
    			},{
    				xtype           : 'extextfield',
                    reference       : 'txt_stipulationSin',
                    enableKeyEvents : true,
                    width           : 130 ,
                    listeners       : {
                 	   keyup : 'onSearchEnterSin'
                    },
    			},{
    				width : 5
    			},{
               	 	xtype    : 'exbutton',
                    iconCls  : 'fa fa-search',
                    handler  : 'onBudSearch',
    			},{
    				flex : 1
    			},{
    				xtype    : 'exbutton',
                    text     : '신규',
                    handler  : 'onNewSin',
    			},{
    				width : 5
    			},{
    				xtype    : 'exbutton',
                    text     : '인쇄',
                    handler  : 'onPrintSin',
    			},{
        			width            : 0,
            		height           : 0,
            		items            :[{
            			xtype            : 'extextfield',
                        reference        : 'hid_bud_no',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_BUD_NO'
            		},{
            			xtype            : 'extextfield',
                        reference        : 'txt_budNoSin',
            		},{
            			xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'newData',
    	       	 		name      : 'newData',
    	       	 		width     : 0
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'uptData',
    	       	 		name      : 'uptData',
    	       	 		width     : 0
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'delData',
    	       	 		name      : 'delData',
    	       	 		width     : 0
            		}]
    			}]
    		}]
    	},{
    		height : 10
    	},{
    		xtype   :'exfieldsetblockbox',
    		items   : [{
    			xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">우편번호</div>',
                    width   : 100
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		 xtype      :'extextfield',
                         reference  : 'em_zip_cd',
                         exLabel    : '우편번호',
                         width      : 70,
                         exReadOnly : true,
                         exFormat   : 'zip',
                	},{
                   	 	 width      : 5
                    },{
                   	 	 xtype      : 'button',
                         text       : '우편번호',
                         handler    : 'onFindAddr'
                	}]                
                }]
    		},{
    			xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">주소</div>',
                    width   : 100
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		 xtype      :'extextfield',
                         reference  : 'txt_addr1_sin',
                         exLabel    : '주소',
                         width      : 500,
                         exReadOnly : true,
                	}]                
                }]
    		},{
    			xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">상세주소</div>',
                    width   : 100
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		 xtype      :'extextfield',
                         reference  : 'txt_addr2_sin',
                         exLabel    : '주소',
                         width      : 290,
                     //    exReadOnly : true,
                	},{
                		width      :  10,
                	},{
                		xtype      :'extextfield',
                        reference  : 'txt_addr3_sin',
                        exLabel    : '주소',
                        width      : 200,
                        exReadOnly : true,
                	},{
                		width      : 0,
                		xtype      :'extextfield',
                		reference  : 'txt_bldg_num_sin',
                        inpytType  : 'hidden'
                	}]                
                }]
    		}]
    	},{
    		height : 60
    	},{
    		layout : 'hbox',
    		items  :[{
    			flex : 1
    		},{
	    		xtype     : 'exbutton',
        		handler   : 'onUpSin',
        		iconCls   : 'fa fa-angle-up',
		    },{
			    width : 5
		    },{
			    xtype     : 'exbutton',
        		handler   : 'onDownSin',
        		iconCls   : 'fa fa-angle-down',
		    },{
		    	width     : 5
		    },{
		    	xtype     : 'exbutton',
        		handler   : 'onAddSin',
        		text      : '추가',
		    },{
		    	width     : 5
		    },{
		    	xtype     : 'exbutton',
        		handler   : 'onDeleteSin',
        		text      : '삭제',
		    },{
		    	width     : 5
		    },{
		    	xtype     : 'exbutton',
        		handler   : 'onDeleteAllSin',
        		text      : '전체삭제',
    		}]
    	},{
    		height : 10
    	},{
    		exGroupRef    : true,
            xtype         : 'exgrid',
            reference     : 'sin015w_01_a',
            cls           : 'topCheckHeader none-dirty-grid',
            height        : 500,
            width         : '100%',
            bind         : {
            	store:'{ds_sindo}'
        	},
        	plugins     : [{
            	ptype:'cellediting',
            	clicksToEdit: 1
            }],
            columns:[{
            	text           : '선택',
            	xtype          : 'excheckcolumn',
                dataIndex      : 'CHECK_P',                    
                exAlign        : 'center',
                headerCheckbox : true,
                width          : 65,
            },{
            	text        : '순번',
                xtype       : 'rownumberer',
                width       : 70,
                align       : 'center',
            },{
            	text        : '관계',
            	xtype       : 'excolumn',
                dataIndex   : 'REPRESEN_REL',                    
                exAlign     : 'left',
                width       : 150,
                editor      : {
                	xtype         : 'extextfield',
                },
            },{
            	text        : '성명',
            	xtype       : 'excolumn',
                dataIndex   : 'NAME_KOR',                    
                exAlign     : 'left',
                width       : 150,
                editor      : {
                	xtype         : 'extextfield',
                },
            },{
            	text        : '생년월일',
            	xtype       : 'excolumn',
                dataIndex   : 'BIRTHDAY',                    
                exAlign     : 'center',
                width       : 150,
                exType      : 'date',
            	editor      : {
                	xtype         : 'extextfield',
                },
            }],
            viewConfig: {
            	getRowClass: function(record, index) {
                    	return 'recCellEdit';
                }
            }
    	}]
    },{
    	width : 15
    },{
    	flex   : 1,
    	layout : 'vbox',
    	items : [{
    		height : 10,
		},{
    		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;margin: 0 0 10px 0;">천혼문</div>',
		},{
			layout : 'hbox',
			width  : '100%',
			items  :[{
				xtype           : 'excombobox',                		
        		labelAlign      : 'left',
                reference       : 'cb_StipulationYoung',
                displayField    : 'name',
                valueField      : 'code',
                exCommonDmnCode : '001',    
                width           : 100,
                store           : {},
                listeners       : {
                	change:'onSearchTypeChangeYoung'
                }
			},{
				width : 5
			},{
				xtype           : 'extextfield',
                reference       : 'txt_stipulationYoung',
                enableKeyEvents : true,
                width           : 130 ,
                listeners       : {
             	   keyup : 'onSearchEnterYoung'
                },
			},{
				width : 5
			},{
           	 	xtype    : 'exbutton',
                iconCls  : 'fa fa-search',
                handler  : 'onBudSearchYoung',
			},{
				flex : 1
			},{
				xtype    : 'exbutton',
                text     : '신규',
                handler  : 'onNewYoung',
			},{
				width : 5
			},{
				xtype    : 'exbutton',
                text     : '인쇄',
                handler  : 'onPrintYoung',
			},{
    			width            : 0,
        		height           : 0,
        		items            :[{
        			xtype            : 'extextfield',
                    reference        : 'hid_bud_noYoung',
                    value            : '',
                    inputType        : 'hidden',
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_budNoYoung',
        		}]
			}]
		},{
    		height : 10
		},{
			xtype   :'exfieldsetblockbox',
    		items   : [{
    			xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">복위자</div>',
                    width   : 100
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		xtype        :'excombobox',
                        width        : 180,
                        valueField   : 'FIND_VALUE_TEMP',
                        displayField : 'DISPLAY_TEMP',     
                        reference    :'lc_bokwi',
                        //emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_bokwi}'
                    	},
                    	listeners   : {
                    		change : 'onBokChange'
                    	}
                	}]                
                }]
    		},{
    			xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">관계</div>',
                    width   : 100
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		 xtype      :'extextfield',
                         reference  : 'txt_hyo',
                         width      : 70,
                	},{
                   	 	 width      : 5
                	},{
                		xtype      :'extextfield',
                        reference  : 'txt_bokwi_nm',
                        width      : 70,
                	},{
                  	 	 width      : 5
                    },{
                    	xtype        :'excombobox',
                        width        :  80,
                        valueField   : 'CODE',
                        displayField : 'NAME',     
                        reference    :'lc_kibu',
                    	bind         : {
                        	store:'{ds_kibu}'
                    	}
                	}]                
                }]
    		},{
    			xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">우편번호</div>',
                    width   : 100
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		 xtype      :'extextfield',
                         reference  : 'em_zip_cd_death',
                         exLabel    : '우편번호',
                         width      : 70,
                         exReadOnly : true,
                         exFormat   : 'zip',
                	},{
                   	 	 width      : 5
                    },{
                   	 	 xtype      : 'button',
                         text       : '우편번호',
                         handler    : 'onFindAddrDeath'
                	}]                
                }]
    		},{
    			xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">주소</div>',
                    width   : 100
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		 xtype      :'extextfield',
                         reference  : 'txt_addr1_death',
                         exLabel    : '주소',
                         width      : 500,
                         exReadOnly : true,
                	}]                
                }]
    		},{
    			xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">상세주소</div>',
                    width   : 100
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		 xtype      :'extextfield',
                         reference  : 'txt_addr2_death',
                         exLabel    : '주소',
                         width      : 290,
                       //  exReadOnly : true,
                	},{
                		width      :  10,
                	},{
                		xtype      :'extextfield',
                        reference  : 'txt_addr3_death',
                        exLabel    : '주소',
                        width      : 200,
                        //exReadOnly : true,
                	},{
                		width      : 0,
                		xtype      :'extextfield',
                		reference  : 'txt_bldg_num_death',
                        inpytType  : 'hidden'
                	}]                
                }]
    		}]
		},{
			width  : '100%',
			layout : 'hbox',
    		items  :[{
    			flex : 1
    		},{
	    		xtype     : 'exbutton',
        		handler   : 'onUpDeath',
        		iconCls   : 'fa fa-angle-up',
		    },{
			    width : 5
		    },{
			    xtype     : 'exbutton',
        		handler   : 'onDownDeath',
        		iconCls   : 'fa fa-angle-down',
		    },{
		    	width     : 5
		    },{
		    	xtype     : 'exbutton',
        		handler   : 'onAddDeath',
        		text      : '추가',
		    },{
		    	width     : 5
		    },{
		    	xtype     : 'exbutton',
        		handler   : 'onDeleteDeath',
        		text      : '삭제',
		    },{
		    	width     : 5
		    },{
		    	xtype     : 'exbutton',
        		handler   : 'onDeleteAllDeath',
        		text      : '전체삭제',
    		}]
		},{
			height : 10
		},{
			exGroupRef    : true,
            xtype         : 'exgrid',
            reference     : 'sin015w_01_b',
            cls           : 'topCheckHeader none-dirty-grid',
            height        : 500,
            width         : '100%',
            bind          : {
            	store:'{ds_death}'
        	},
        	plugins     : [{
            	ptype:'cellediting',
            	clicksToEdit: 1
            }],
            columns:[{
            	text           : '선택',
            	xtype          : 'excheckcolumn',
                dataIndex      : 'CHECK_P',                    
                exAlign        : 'center',
                headerCheckbox : true,
                width          : 65,
            },{
            	text        : '순번',
                xtype       : 'rownumberer',
                width       : 65,
                align       : 'center',
            },{
            	text        : '망관계',
            	xtype       : 'excolumn',
                dataIndex   : 'DECE_REL',                    
                exAlign     : 'center',
                width       : 85,
            	editor      : {
                	xtype         : 'extextfield',
                },
            },{
            	text        : '본',
            	xtype       : 'excolumn',
                dataIndex   : 'BON',                    
                exAlign     : 'center',
                width       : 80,
            	editor      : {
                	xtype         : 'extextfield',
                },
            },{
            	text        : '성별',
            	xtype       : 'excolumn',
                dataIndex   : 'SEX_GBN',                    
                exAlign     : 'center',
                width       : 65,
                editor        : {
                	xtype        : 'excombobox',
                    valueField   : 'CODE',
                    displayField : 'NAME',
                    bind:{
                        store:'{ds_sexgbn}'
                    }
                },
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                	meta.tdCls = 'recCellEdit'
                	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_sexgbn');
                	return exCommon.getComboVal(value,store, '' );
                },
            },{
            	text        : '영가명',
            	xtype       : 'excolumn',
                dataIndex   : 'NAME_KOR',                    
                exAlign     : 'left',
                width       : 110,
            	editor      : {
                	xtype         : 'extextfield',
                },
            },{
            	text        : '동일구분',
            	xtype       : 'excolumn',
                dataIndex   : 'EQUAL_GBN',                    
                exAlign     : 'center',
                width       : 80,
                editor        : {
                	xtype        : 'excombobox',
                    valueField   : 'CODE',
                    displayField : 'NAME',
                    bind:{
                        store:'{ds_equal_gbn}'
                    }
                },
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                	meta.tdCls = 'recCellEdit'
                	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_equal_gbn');
                	return exCommon.getComboVal(value,store, '' );
                },
            },{
            	text        : '영체구분',
            	xtype       : 'excolumn',
                dataIndex   : 'SPIRITUAL_GBN_CD',                    
                exAlign     : 'center',
                width       : 80,
                editor        : {
                	xtype        : 'excombobox',
                    valueField   : 'CODE',
                    displayField : 'NAME',
                    bind:{
                        store:'{ds_spiritual_gbn}'
                    }
                },
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                	meta.tdCls = 'recCellEdit'
                	
                	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_spiritual_gbn');
                	return exCommon.getComboVal(value,store, '' );
                },
            }],
            viewConfig: {
            	getRowClass: function(record, index) {
                    	return 'recCellEdit';
                }
            }
    	}]
		
    },{
    	width : '0.5%',
    }]
});
