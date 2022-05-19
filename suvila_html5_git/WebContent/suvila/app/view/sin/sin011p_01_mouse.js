Ext.define('ExFrm.view.sin.sin011p_01_mouse',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.sin.sin011p_01_mouseController',
    	'ExFrm.view.sin.sin011p_01_mouseModel'
    ],
    controller:'sin011p_01_mouse',
    viewModel:{
        type:'sin011p_01_mouse'
    },
    isModal:true,
    name:'sin011p_01_mouse',
    title:'선택 및 해제',
    closable:true,
    width:130,
    height:90,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        /*xtype  : 'exformmain',*/
        width  : '99.8%',
        cls    : 'exformmain',
        layout : {
            type:'vbox',
            align:'stretch'
        },
        items  :[{
        	layout : 'hbox',
        	width  : '100%',
        	items  : [{
        	},{
        		xtype     : 'exbutton',
          		text      : '선택',
          		handler   : 'onCheck',
        	},{
        		width : 5
        	},{
        		xtype     : 'exbutton',
          		text      : '해제',
          		handler   : 'onCancel',
        	}]
        		
        }]
    }]
})