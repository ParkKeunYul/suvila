Ext.define('ExFrm.view.com.print',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.com.printController',
    	'ExFrm.view.com.printModel'
    ],
    controller:'print',
    viewModel:{
        type:'print'
    },
    isModal:true,
    name:'print',
    title:'',
    closable:true,
    width:1500,
    height:890,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype  : 'exformmain',
        width  : '99.8%',
        cls    : 'exformmain',
        layout : {

            align:'center'
        },
        items  :[{
        	html : '<div id="OZViewer" style="width:1460px;height:825px;position:relative;"></div>'
        }]
        
    }]
})