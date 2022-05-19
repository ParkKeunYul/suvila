Ext.define('ExFrm.view.desk.temple_calender',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.temple_calender',
	requires:[
		'ExFrm.view.desk.temple_calenderController',
        'ExFrm.view.desk.temple_calenderModel'
	],
	controller:'temple_calender',
	viewModel:{
        type:'temple_calender'
    },
    name:'temple_calender',
    isRootView:true,
    title:'행사일정',
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
        		xtype        : 'excombobox',
        		fieldLabel   : '<span style="font-weight: 700;">수계</span>',
                valueField   : 'CONF_CODE',
                displayField : 'CONF_NAME',
                reference    : 'lc_buddhismAll',
                emptyText    : '선택',
                labelWidth   : 50,
                width        : 250,
                value        : '0',
                bind         : {
                	store:'{ds_buddhismAll}'
                }        	        	
            }]
	    },{
	    	html : '<div id="calender_area"></div>',
	    	listeners : [{
	    		click : 'onClick'
	    	}]
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});