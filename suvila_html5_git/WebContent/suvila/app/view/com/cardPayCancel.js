Ext.define('ExFrm.view.com.cardPayCancel',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.com.cardPayCancelController',
    	'ExFrm.view.com.cardPayCancelModel'
    ],
    controller:'cardPayCancel',
    viewModel:{
        type:'cardPayCancel'
    },
    isModal:true,
    name:'cardPayCancel',
    title:'카드결제취소',
    closable:true,
    width:1080,
    height:660,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype  : 'exformmain',
        width  : '99.9%',
        cls    : 'exformmain',
        layout : {
            type:'vbox',
            align:'stretch'
        },
        items  :[{
        	html : '<img src="./resources/img/cardPay/titlecancle.gif" style="padding-right:5px;vertical-align-top;" ><span>해당 수납건과 함께 승인된 신용카드 내역입니다.</span>'
        },{
        	height : 5
        },{
        	layout : 'hbox',
        	height : 32,
        	items  : [{
        		xtype     : 'exbutton',
          		text      : '선택 된 항목 카드 취소',
          		handler   : 'onCancel',
        	},{
        		html : '<div style="padding:0 0 0 5px;color:red;">선택후 "선택된 항목 삭제"버튼을 클릭하며 해당 신용카드 승인이 취소됩니다.</div>'
        	},{
        		width : 0,
    			items : [{
    				xtype            : 'extextfield',
                    reference        : 'ds_recAmt',
                    name             : 'ds_recAmt',
                    value            : '',
                    inputType        : 'hidden',
    			},{
    				xtype            : 'extextfield',
                    reference        : 'ds_main',
                    name             : 'ds_main',
                    value            : '',
                    inputType        : 'hidden',
    			},{
    				xtype            : 'extextfield',
                    reference        : 'pg_flg',
                    name             : 'pg_flg',
                    value            : '1',
                    inputType        : 'hidden',
    			},{
    				xtype            : 'extextfield',
                    reference        : 'pg_CHECKYYYY',
                    name             : 'pg_CHECKYYYY',
                    value            : '',
                    inputType        : 'hidden',
    			},{
    				xtype            : 'extextfield',
                    reference        : 'pg_PAYMENT_YYYYMM',
                    name             : 'pg_PAYMENT_YYYYMM',
                    value            : '',
                    inputType        : 'hidden',
    			},{
    				xtype            : 'extextfield',
                    reference        : 'pg_SEQ',
                    name             : 'pg_SEQ',
                    value            : '',
                    inputType        : 'hidden',
    			}]
        	}]
        },{
        	 width  : '48%',
        	 items  :[{
         		exGroupRef :true,
                xtype      :'exgrid',
                reference  :'cardPayCancel_a',
                cls        : 'none-dirty-grid topCheckHeader',
                width      : '98%',
                height     : 530,
                align      : 'center',                    
                bind:{
                    store:'{ds_main}'
                },                 
                columns:[{
                	text           : '선택',
                	xtype          : 'excheckcolumn',
                    dataIndex      : 'CHK',                    
                    exAlign        : 'center',
                    headerCheckbox : true,
                    width          : 90,
                },{
                	text        : '순번',
                    xtype       : 'rownumberer',
                    width       : 70,
                    align       : 'center',  
                },{
                 	xtype       : 'excolumn',
                    text        : '접수일',
                    dataIndex   : 'PGAUTHDATE',
                    exAlign     : 'center',
                    width       : 150,
                    exType      : 'date'
                },{
                 	xtype       : 'excolumn',
                    text        : '접수구분',
                    dataIndex   : 'ACCEPT_GBN',
                    exAlign     : 'center',
                    width       : 150,
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_acceptGbn');
                    	return exCommon.getComboVal(value,store, '' );
                    }
                },{
                 	xtype       : 'excolumn',
                    text        : '접수상세',
                    dataIndex   : 'APPROVNAME',
                    exAlign     : 'center',
                    width       : 250,
                    exType      : 'date'
                },{
                 	xtype       : 'excolumn',
                    text        : '납부년월',
                    dataIndex   : 'PAYMENT_YYYYMM',
                    exAlign     : 'left',
                    width       : 150,
                    exType      : 'date',
                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                    	if(value == 0 || value == '0'){
                    		return '';
                    	}
                    }
                },{
                 	xtype       : 'excolumn',
                    text        : '납부금액',
                    dataIndex   : 'AMOUNT',
                    exAlign     : 'right',
                    width       : 150,
                    exType      : 'number'
                }]
            }]
        }]
        
    }]
})