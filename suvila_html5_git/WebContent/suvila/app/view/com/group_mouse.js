Ext.define('ExFrm.view.com.group_mouse',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.com.group_mouseController',
    	'ExFrm.view.com.group_mouseModel'
    ],
    controller:'group_mouse',
    viewModel:{
        type:'group_mouse'
    },
    isModal:true,
    name:'group_mouse',
    title:'신도그룹 추가 및 SMS 발송',
    closable:true,
    width:190,
    height:190,
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
        	layout : 'vbox',
        	items  : [{
        		xtype     : 'exbutton',
                handler   : 'onGroupList',
                text      : '신도분류등록',
                width     : 140,
        	},{
        		height : 5
        	},{
        		xtype     : 'exbutton',
                handler   : 'onGroupAdd',
                text      : '폴더생성및 추가',
                width     : 140,
        	},{
        		height : 5
        	},{
        		xtype     : 'exbutton',
                handler   : 'onSmsSend',
                text      : '문자발송',
                width     : 140,
        	},{
        		height : 5
        	},{
        		xtype     : 'exbutton',
                handler   : 'onClose',
                text      : '닫기',
                width     : 140,
        	}]
        },{
        	height : 5
        }]
        
    }]
})