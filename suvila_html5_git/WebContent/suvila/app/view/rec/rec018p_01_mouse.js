Ext.define('ExFrm.view.rec.rec018p_01_mouse',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec018p_01_mouseController',
    	'ExFrm.view.rec.rec018p_01_mouseModel'
    ],
    controller:'rec018p_01_mouse',
    viewModel:{
        type:'rec018p_01_mouse'
    },
    isModal:true,
    name:'rec018p_01_mouse',
    title:'발행대장',
    closable:true,
    width:180,
    height:170,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype  : 'exformmain',
        width  : '99.8%',
        cls    : 'exformmain',
        layout : {
            type:'vbox',
            align:'center'
        },
        items  :[{
        	height : 5
        },{
        	height : 0,
        	width  : 0,
        	items  :[{
        		xtype      : 'extextfield',
        		reference  : 'txt_bud_no',
        		inputType  : 'hidden',
        		name       : 'BUD_NO'
        	},{
        		xtype      : 'extextfield',
        		reference  : 'txt_gibu_no',
        		inputType  : 'hidden',
        		name       : 'GIBU_NO'
        	},{
        		xtype      : 'extextfield',
        		reference  : 'txt_gibu_day',
        		inputType  : 'hidden',
        		name       : 'GIBU_DAY'
        	},{
        		xtype      : 'extextfield',
        		reference  : 'txt_addr1',
        		inputType  : 'hidden',
        		name       : 'ADDR1',
        	},{
        		xtype      : 'extextfield',
        		reference  : 'txt_addr2',
        		inputType  : 'hidden',
        		name       : 'ADDR2',
        	},{
        		xtype      : 'extextfield',
        		reference  : 'txt_addr3',
        		inputType  : 'hidden',
        		name       : 'ADDR3',
        	},{
        		xtype      : 'extextfield',
        		reference  : 'txt_bldg_num',
        		inputType  : 'hidden',
        		name       : 'BLDG_NUM',
        	},{
        		xtype      : 'extextfield',
        		reference  : 'txt_zip_cd',
        		inputType  : 'hidden',
        		name       : 'ZIP_CD',
        	}]
        },{
        	xtype: 'segmentedbutton',
        	width : '100%',
        	items:[{
        		xtype    : 'button',                    
                text     : '발생취소',
                handler  : 'onCancel',
                reference: 'cancelBtn',
                width : '100%',
        	}]
        },{
        	height : 11,
        },{
        	xtype: 'segmentedbutton',
        	width : '100%',
        	items:[{
        		xtype    : 'button',                    
                text     : '주소변경',
                handler  : 'onAddrChange',
                reference: 'addrChangeBtn',
                width : '100%',
        	}]
        }]
    }]
})