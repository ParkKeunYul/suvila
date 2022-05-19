Ext.define('ExFrm.view.sin.sin001p_02',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin001p_02',
    requires:[
    	'ExFrm.view.sin.sin001p_02Controller',
    	'ExFrm.view.sin.sin001p_02Model'
    ],
    controller:'sin001p_02',
    viewModel:{
        type:'sin001p_02'
    },
    isModal:true,
    name:'sin001p_02',
    title:'분가조회',
    closable:true,
    width:750,
    height:400,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        /*xtype:'exformmain',*/
        width:'100%',
        height:'100%',
        cls : 'exformmain',
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items:[{
            width : '0.5%'
        },{
        	 width  : '99%',
        	 items  :[{
        		 height : 10
        	 },{
        		 exGroupRef    : true,
                 xtype         : 'exgrid',
                 reference     : 'sin001p_02_a',
                 cls           : 'sin001p_02_a',
                 height        : 290,
                 width         : '100%',
                 bind          : {
                     store:'{ds_main}'
                 },
                 listeners:{
                  	celldblclick : 'onCellDbClick'
                 },
                 columns:[{
                	 text        : '가족명단',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'NAME_KOR',                    
                     exAlign     : 'left',
                     flex        : 1,
                 },{
                	 text        : '신도번호',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'BUD_NO',                    
                     exAlign     : 'center',
                     flex        : 1,
                 },{
                	 text        : '나이',
                 	 xtype       : 'excolumn',
                     dataIndex   : 'ADDR',                    
                     exAlign     : 'left',
                     flex        : 3.5,
                 }]
        	 },{
        		 height : 10
        	 },{
        		 layout :{
        			 type : 'hbox',
        			 pack : 'center'
        		 }, 
        		 items  : [{
        			/*xtype     : 'exbutton',
                	reference : 'confirmBtn',
                	name      : 'confirmBtn',
                	handler   : 'onConfirm',
                	text      : '확인',
        		 },{
        			 width : 10*/
        		 },{
        			xtype     : 'exbutton',
                 	reference : 'closeBtn',
                 	name      : 'closeBtn',
                 	handler   : 'onClose',
                 	text      : '닫기',
        		 }]
        	 }]
        },{
        	width : '0.5%'
        }]
    }]
})