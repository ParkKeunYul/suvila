Ext.define('ExFrm.view.rec.rec000p_04',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec000p_04Controller',
    	'ExFrm.view.rec.rec000p_04Model'
    ],
    controller:'rec000p_04',
    viewModel:{
        type:'rec000p_04'
    },
    isModal:true,
    name:'rec000p_04',
    title:'수납현황',
    closable:true,
    width:370,
    height:495,
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
        	height : 5
        },{
        	layout : 'hbox',
        	items  : [{
                width : '0.5%'
            },{
            	 width : '99%',
            	 items  :[{
             		exGroupRef :true,
                    xtype      :'exgrid',
                    reference  :'rec000p_04_a',
                    height     : 400,
                    align      : 'center',                    
                    bind:{
                        store:'{ds_Jungak}'
                    },                 
                    listeners:{
                    	cellclick    : 'onCellDbClick'
                    },
                    columns:[{                   
                    	text  :'No',
                        xtype :'rownumberer',
                        width : 60,
                        align : 'center',
                    },{
                     	xtype       : 'excolumn',
                        text        : '위치',
                        dataIndex   : 'JUNGAK_NM',
                        exAlign     : 'left',
                        flex        : 1.6 
                    }]
             	}]            	 	
            },{
            	width : '0.5%'
            }]
        },{
        	height : 5
        },{
        	layout :{
      			 type : 'hbox',
      			 pack : 'center'
      		 }, 
      		 items  : [{
      		 },{
      			xtype     : 'exbutton',
                reference : 'closeBtn2',
                name      : 'closeBtn2',
                handler   : 'onClose',
                text      : '닫기',
      		 }]
        }]
        
    }]
})