Ext.define('ExFrm.view.rec.rec004w_06_mouse',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec004w_06_mouseController',
    	'ExFrm.view.rec.rec004w_06_mouseModel'
    ],
    controller:'rec004w_06_mouse',
    viewModel:{
        type:'rec004w_06_mouse'
    },
    isModal:true,
    name:'rec004w_06_mouse',
    title:'출력선택',
    closable:true,
    width:220,
    height:90,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        width  : '99.8%',
        layout : {
            type:'vbox',
            align:'stretch'
        },
        items  :[{
        	layout : 'hbox',
        	width  : '100%',
        	items  : [{
        		xtype     : 'exbutton',
                handler   : 'checkPrint',
                text      : '출력선택',
        	},{
        		width : 5
        	},{
        		xtype     : 'exbutton',
                handler   : 'unCheckClose',
                text      : '출력해제',
        	},{
        		width : 5
        	},{
        		xtype     : 'exbutton',
                handler   : 'onClose',
                text      : '닫기',
        	}]
        }]
        
    }]
})