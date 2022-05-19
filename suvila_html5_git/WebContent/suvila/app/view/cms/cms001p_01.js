Ext.define('ExFrm.view.cms.cms001p_01',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.cms001p_01',
    requires:[
    	'ExFrm.view.cms.cms001p_01Controller',
    	'ExFrm.view.cms.cms001p_01Model'
    ],
    controller:'cms001p_01',
    viewModel:{
        type:'cms001p_01'
    },
    isModal:true,
    name:'cms001p_01',
    title:'변경내용 검색',
    closable:true,
    width:1200,
    height:350,
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
            type:'vbox',
            align:'stretch'
        },
        items:[
        {
            layout:'hbox',
            items:[{
                flex:1,
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                height:240,
                items:[{
                	layout:'hbox',
                	height : 30,                	                  
                	items:[{
                		html : '<div style="text-align:center;width:100%;">CMS회원 계좌정보 변경내역</div>'
                	}]
                },{
                	 xtype:'container',
                	 reference:'sindo_a',
                	 width: '100%',
                	 items:[{
                		 exGroupRef:true,
                         exGroupFields:['DAEJU_NAME_KOR'],
                         cls : 'grid-group ',
                         xtype:'exgrid',
                         reference:'postGrid',
                         width: '100%',
                         height : 210,
                         align : 'center',                    
                         bind:{
                             store:'{ds_main}'
                         },                 
                         listeners:{
                         	//itemdblclick:'onGridDbClick'
                         	celldblclick : 'onCellDbClick'
                         },
                         viewConfig: {
                             /*getRowClass: function(record, rowIndex, rowParams, store) {
                                 return 'exrowwhite';
                             }*/
                         }, 
                         columns:[
                         {                       
                             text:'NO',
                             xtype:'rownumberer',
                             dataIndex:'',                        
                             align:'center',
                             flex : 1.8,
                             sortable: true,
                         },{
                         	text:'상태',
                         	xtype:'excolumn',
                            dataIndex:'STATUS',                        
                            exAlign:'center',
                            flex : 1.5,
                            sortable: true,
                         },{
                         	text:'사찰계좌정보',
                         	xtype:'excolumn',
                             dataIndex:'CMS_TRADE_CD',                        
                             exAlign:'center',
                             flex : 2.5,
                             sortable: true,
                         },{
                         	text:'은행명',
                         	xtype:'excolumn',
                            dataIndex:'OLD_BANK_NM',                        
                            exAlign:'left',
                            flex : 3.5,
                            sortable: true,
                         },{
                         	text:'계좌번호',
                         	xtype:'excolumn',
                            dataIndex:'OLD_ACCOUNT_NO',                        
                            exAlign:'left',
                            flex : 3,
                            sortable: true,
                         },{
                         	text:'사용번호',
                         	xtype:'excolumn',
                             dataIndex:'OLD_ACCOUNT_SEQ',                        
                             exAlign:'left',
                             sortable: true,
                             flex : 1.8
                         },{
                         	text:'변경일',
                         	xtype:'excolumn',
                             dataIndex:'REG_DATE',                        
                             exAlign:'left',
                             sortable: true,
                             flex : 2    
                         },{
                          	text:'비고',
                          	xtype:'excolumn',
                            dataIndex:'REMARK',                        
                            exAlign:'left',
                            sortable: true,
                            flex : 8   
                         }]
                	 }]
                }]
            }]
        }]
    }]
})