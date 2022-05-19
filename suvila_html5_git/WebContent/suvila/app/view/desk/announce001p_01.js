Ext.define('ExFrm.view.desk.announce001p_01',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.desk.announce001p_01Controller',
    	'ExFrm.view.desk.announce001p_01Model'
    ],
    controller:'announce001p_01',
    viewModel:{
        type:'announce001p_01'
    },
    isModal:true,
    name:'announce001p_01',
    title:'공지사항',
    closable:true,
    width:580,
    height:580,
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
        	/*html   : '<div style="width:100%;height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">연락처정보</div>',
        	width  : '100%',
        },{*/
        	layout : 'hbox',
        	width  : '100%',
        	items  : [{
        		flex : 1 
        	},{
        		xtype     : 'exbutton',
          		text      : '닫기',
          		handler   : 'onClose',
        	}]       
        },{
        	height : 5
        },{
        	xtype   :'exfieldsetblockbox',
        	items   : [{
        		xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">제목</div>',
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		xtype      : 'extextfield',
                        reference  : 'txt_title',
                        width      : 420,
                        exReadOnly : true,
                	}]
                }]
        	},{
        		xtype:'exblockrow',
                items:[{
                    xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">작성일자</div>',
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		xtype      : 'extextfield',
                        reference  : 'txt_date',
                        width      : 420,
                        exReadOnly : true,
                	}]
                }]
        	},{
        		xtype:'exblockrow',
                items:[{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">내용</div>'
                },{
                	xtype   : 'exblockfield',
                	items   : [{
                		 xtype      : 'extextarea',
            			 reference  : 'txt_contents',
                         name       : 'MEMO',
                         height     : 389,
                         width      : 420,
                         exReadOnly : true,
                	}]
                }]        	
        	}]
        }]
        
    }]
})