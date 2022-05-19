Ext.define('ExFrm.view.sin.sin011w_03',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin011w_03',
	requires:[
		'ExFrm.view.sin.sin011w_03Controller',
        'ExFrm.view.sin.sin011w_03Model'
	],
	controller:'sin011w_03',
	viewModel:{
        type:'sin011w_03'
    },
    name:'sin011w_03',
    isRootView:true,
    title:'신도검색',
    closable:true,
    scrollable:true,
    layout  : 'hbox',
    items:[{
    	width  : '0.5%'
    },{
    	width  : '98.5%',
        xtype:'exformmain',
	    items:[{
	    	height  : 10,
	    },{
	    	width   : '100%',
	    	layout  : 'hbox',
            xtype   : 'container',
            items   : [{
            	xtype           : 'excombobox',
        		//fieldLabel      : '<span style="font-weight: 700;">신도검색</span>',        		
        		labelAlign      : 'left',
                reference       : 'cb_Stipulation',
                displayField    : 'name',
                valueField      : 'code',
                exCommonDmnCode :'001',    
                width           : 110,
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
                width           : 150 ,
                listeners       : {
              	   keyup : 'onSearchEnter',
                },
        	},{
        		width : 5
        	},{
        		xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">신도분류</span>',
                valueField   : 'CLASS_CD',
                displayField : 'CLASS_NAME',
                reference    : 'lc_classMgt',
                name         : 'V_CLASS_CD',	 
                emptyText    : '선택',
                labelWidth   : 70,
                width        : 220,
                value        : '0',
                bind         : {
                	store:'{ds_classMgt}'
                }
        	},{
        		width : 5
        	},{
        		xtype        :'excombobox',
                width        : 80,
                valueField   : 'CODE',
                displayField : 'NAME',     
                reference    : 'cb_date',
                value        : 1,
            	bind         : {
                	store:'{ds_date}'
            	},
			},{
    			width : 10
    		},{
    			xtype          : 'exdatefield',
                reference      : 'me_sDate',
                format         : 'Y-m-d',
    		},{
    			html :'<div style="text-align:center;width:20px;">~</div>',
    			width : 20
    		},{
    			xtype          : 'exdatefield',
                reference      : 'me_eDate',
                format         : 'Y-m-d',
        	},{
        		hidden       : true,
        		xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">단체명</span>',
                valueField   : 'ORG_CD',
                displayField : 'ORG_NAME',
                reference    : 'lc_org_NmAll',
                emptyText    : '전체',
                labelWidth   : 60,
                width        : 200,
                value        : 0,
                bind         : {
                	store:'{ds_org_NmAll}'
                }
        	},{        		
        		xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">결제상태</span>',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'paystate',
                emptyText    : '전체',
                labelWidth   : 80,
                width        : 200,
                value        : 0,
                bind         : {
                	store:'{ds_paystate}'
                }
        	},{
    			width : 5,	    	
        	},{
        		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		text      : '조회',
          		handler   : 'onSelect',
        	},{
    			width : 5
    		},{
    			xtype     : 'exbutton',
          		text      : '발송',
          		handler   : 'onSmsSend',
    		},{
    			width : 5
    		},{
    			xtype     : 'exbutton',
          		text      : '저장',
          		handler   : 'onSave',
        	},{
        		width            : 0,
        		height           : 0,
        		items            :[{
        			xtype            : 'extextfield',
                    reference        : 'hid_bud_no',
                    value            : '',
                    width            : 0,
                    height           : 0,
                    inputType        : 'hidden',
                    //name             : 'V_BUD_NO'
        		},{
        			xtype            : 'extextfield',
                    reference        : 'txt_budNo',
                    value            : '',
                    width            : 0,
                    height           : 0,
                    inputType        : 'hidden',
                    //name             : 'txt_budNo'
    		     },{
                	xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'ds_main_temp',
           	 		name      : 'ds_main_temp',
           	 		width     : 0
    	         },{
     				xtype     : 'extextfield',
        	 		inputType : 'hidden',
        	 		reference : 'ds_card_detail',
        	 		name      : 'ds_card_detail',
        	 		width     : 0
    	         },{
    	        	 xtype            : 'extextfield',
	                 reference        : 'upt_data',
	                 name             : 'upt_data',
	                 value            : '',
	                 inputType        : 'hidden',
        		}]
            }]
	    },{
	    	height  : 15,
	    },{
	    	layout : 'hbox',
	    	width  : '100%',
	    	items  : [{
		    	flex      :  1,
	    		exGroupRef : true,
	            xtype      : 'exgrid',
	            reference  : 'sin011w_03_a',
	            cls        : 'none-dirty-grid topCheckHeader',
	            height     : 700,
	            multiSelect: true, 	            
	            plugins    :[{
	            	ptype: 'gridexporter'
	            }],
	            bind       : {
	                store:'{ds_main_grid}'
	            },
	            plugins     : [{
                	ptype:'cellediting',
                	clicksToEdit: 1
                }],
	            listeners      : {
	            	celldblclick    : 'onCellDbClickPay',
	            },
	            columns   : [{
	            	text      :'신도번호',
	            	xtype     :'excolumn',
	                dataIndex :'BUD_NO',                    
	                exAlign   :'center',
	                width     : 120,	            
	            },{
	            	text      :'신도명',
	            	xtype     :'excolumn',
	                dataIndex :'ORDNM',                    
	                exAlign   :'center',
	                width     : 120,
	            },{
	            	text      :'발송번호',
	            	xtype     :'excolumn',
	                dataIndex :'ORDHPNO',                    
	                exAlign   :'center',
	                width     : 130,
	            },{
	            	text      :'기도명',
	            	xtype     :'excolumn',
	                dataIndex :'PRAY_NM',                    
	                exAlign   :'left',
	                width     : 130,
	            },{
	            	text      :'동참비',
	            	xtype     :'excolumn',
	                dataIndex :'AMOUNT',                    
	                width     : 130,
	                exAlign   : 'right',
	                exType    : 'number',
	            },{
	            	text      :'수수료',
	            	xtype     :'excolumn',
	                dataIndex :'COMMISSION',                    	                
	                width     : 130,
	                exAlign   : 'right',
	                exType    : 'number',
	            },{
	            	text      :'정산예정금액',
	            	xtype     :'excolumn',
	                dataIndex :'TOTAL',                    
	                width     : 130,
	                exAlign   : 'right',
	                exType    : 'number',
	            },{
	            	text      :'발송일',
	            	xtype     :'excolumn',
	                dataIndex :'REQDT',                    
	                exAlign   :'center',
	                width     : 150,
	                renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                	var sendDay = value;
	                	return sendDay.substr(0,4)+'/'+ sendDay.substr(4,2)+'/'+sendDay.substr(6,2)+' '+sendDay.substr(8,2)+':'+sendDay.substr(10,2)+':'+sendDay.substr(12,2);
	                	
	                },
	            },{
	            	text      :'결제상태',
	            	xtype     :'excolumn',
	                dataIndex :'PAYSTATUS',                    
	                exAlign   :'center',
	                width     : 130,
	            },{
	            	text      :'결제일',
	            	xtype     :'excolumn',
	                dataIndex :'PAYDT',                    
	                exAlign   :'center',
	                width     : 130,
	                renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                	var payDay = value;
	                	if(value != '' && value != null){
	                		return payDay.substr(0,4)+'/'+ payDay.substr(4,2)+'/'+payDay.substr(6,2);
	                	}
	                	return '';
	                },
	            },{
	            	text      :'결제고유번호',
	            	xtype     :'excolumn',
	                dataIndex :'TID',                    
	                exAlign   :'center',
	                width     : 250,
	            },{
	            	text      :'취소여부',
	            	xtype     :'excolumn',
	                dataIndex :'CANCEL_TEMP',                    
	                exAlign   :'center',
	                width     : 130,
	                renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                	var CANCEL    = record.get("CANCEL");
	                	var PAYSTATUS = record.get("PAYSTATUS");
	                	
	                	if(PAYSTATUS == '결제완료' && CANCEL == 'Y'){
	                		return '[취소완료]';
	                	}
	                	
	                	if(PAYSTATUS == '결제완료' && CANCEL != 'Y'){
	                		return '[카드취소]';
	                	}
	                	
	                	return '';
	                }
	            },{
	            	text      :'비고',
	            	xtype     :'excolumn',
	                dataIndex :'REMARK',                    
	                exAlign   :'left',
	                width     : 250,
	                editor    : {
                        xtype    : 'extextfield',
                    },
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	meta.tdCls = "recCellEdit";
                    	
                    	return value;
                    }
	            }],
	            viewConfig: {
	            	getRowClass: function(record, rowIndex, rowParams, store) {
	                    var CANCEL = record.get('CANCEL');	                   
	                    console.log(rowIndex + '= >CANCEL = ', CANCEL);
	                    if(CANCEL == 'Y'){
	                    	return 'useYnBackIm';
	                    }else{
	                    	return 'recCellEdit';
	                    }
	                }
	            }
	    	}]
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});