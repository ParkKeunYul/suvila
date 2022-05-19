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
    	layout : 'vbox',
        xtype  : 'exformmain',
	    items  : [{
	    	height  : 10,
	    },{
	    	height : 10
	    },{
	    	layout : 'hbox',
	    	width  : '100%',
	    	items  : [{
	    		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;border-top-갸홋-radius:5px;display:inline-block;padding:0 15px;">행사일정</div>',
	    	},{
	    		flex : 1
	    	},{
	    		xtype     : 'exbutton',
	    		iconCls   : 'fa fa-angle-left',
          		handler   : 'onDownYear',
	    	},{
	    		width : 3
	    	},{
	    		xtype       : 'extextfield',
	    		exReadOnly  : true,
	    		reference   : 'me_year',	  
	    		value       : '2019',
	    		width       : 50,
	    	},{
	    		width : 3
	    	},{
	    		xtype     : 'exbutton',
	    		iconCls   : 'fa fa-angle-right',
	    		handler   : 'onUpYear',
	    	},{
	    		width : 3
	    	},{
	    		xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'me_month',                
                width        : 55,
                bind         : {
                	store:'{ds_CalenderMonth}'
                },
                listeners:{
                	change : 'onChangeMonth'
                },
               // value : 0
	    	},{
	    		width : 5
	    	}]
	    },{
	    	height : 1
	    },{
    		xtype      : 'exgrid',
            width      : '99.9%',
            height     : 776,
            cls        : 'temple_calender none-dirty-grid',
            reference  : 'temple_calender',
            bind       : {
                store:'{ds_info}'
            },
            listeners:{
            	cellclick:'onCellClick',
            },
            columns:[{
            	xtype        :'excolumn',
            	text         :'<font color="red">일</font>',
                dataIndex    :'NUM_1',                        
                width        : '14.2%',
                exAlign      : 'center',
            },{
            	xtype        :'excolumn',
            	text         :'월',
                dataIndex    :'NUM_2',                        
                width        : '14.1%',
                exAlign      : 'center',
            },{
            	xtype        :'excolumn',
            	text         :'화',
                dataIndex    :'NUM_3',                        
                width        : '14.2%',
                exAlign      : 'center',
            },{
            	xtype        :'excolumn',
            	text         :'수',
                dataIndex    :'NUM_4',                        
                width        : '14.2%',
                exAlign      : 'center',
            },{
            	xtype        :'excolumn',
            	text         :'목',
                dataIndex    :'NUM_5',                        
                width        : '14.2%',
                exAlign      : 'center',
            },{
            	xtype        :'excolumn',
            	text         :'금',
                dataIndex    :'NUM_6',                        
                width        : '14.2%',
                exAlign      : 'center',
            },{
            	xtype        :'excolumn',
            	text         :'<font color="blue">토</font>',
                dataIndex    :'NUM_7',                        
                width        : '14.2%',
                exAlign      : 'center',           
            }]
	    }]/*container*/
    },{
    	width  : '0.5%'
    }]/*exformmain*/ 
});