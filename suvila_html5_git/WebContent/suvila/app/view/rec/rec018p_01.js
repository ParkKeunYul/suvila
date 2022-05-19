Ext.define('ExFrm.view.rec.rec018p_01',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec018p_01Controller',
    	'ExFrm.view.rec.rec018p_01Model'
    ],
    controller:'rec018p_01',
    viewModel:{
        type:'rec018p_01'
    },
    isModal:true,
    name:'rec018p_01',
    title:'주소변경',
    closable:true,
    width:800,
    height:300,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype  : 'exformmain',
        cls    : 'exformmain',
        layout : {
            type:'vbox',
            align:'center'
        },
        items  :[{
        	height : 5
        },{
        	width            : 0,
    		height           : 0,
    		items            :[{
    			xtype            : 'extextfield',
                reference        : 'txt_gibu_no',
                inputType        : 'hidden',
                name             : 'GIBU_NO'
    		},{
    			xtype            : 'extextfield',
                reference        : 'txt_gibu_day',
                inputType        : 'hidden',
                name             : 'GIBU_DAY'
    		},{
    			xtype            : 'extextfield',
                reference        : 'txt_bud_no',
                inputType        : 'hidden',
                name             : 'BUD_NO'
    		}]
        },{
        	width : '100%',
        	layout : {
        		 type :'hbox'
        		,pack : 'end'
        	},
        	items  :[{
        		xtype     : 'exbutton',
                handler   : 'onSaveAddr',
                text      : '저장',
        	},{
        		width : 5
        	},{
        		xtype     : 'exbutton',
                handler   : 'onClose',
                text      : '닫기',
        	},{
        		width : 82
        	}]
        },{
        	height : 3
        },{
        	xtype   :'exfieldsetblockbox',
        	items   : [{
        		xtype:'exblockrow',
                items:[{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">우편번호</div>'
                },{
                	xtype   : 'exblockfield',
                	items:[{
                         xtype      :'extextfield',
                         reference  : 'em_zip_cd',
                         name       : 'ZIP_CD',
                         exLabel    : '우편번호',
                         width      : 70,
                         exReadOnly : true,
                         exFormat   : 'zip',
                     },{
                    	 width : 5
                     },{
                    	 xtype:'button',
                         text:'우편번호',
                         handler:'onFindAddr'
                     }]  
                }]
        	},{
    			xtype:'exblockrow',
                items:[{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">주소</div>'
                },{
                	xtype   : 'exblockfield',
                	items:[{
                		 xtype      : 'extextfield',
                         width      : 500,
                         reference  : 'txt_addr1',
                         name       : 'ADDR1',
                         exLabel    : '주소',
                         exReadOnly : true     
                	}]
                }]
        	},{
        		xtype:'exblockrow',
                items:[{
                	xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;">상세주소</div>'
                },{
                	xtype   : 'exblockfield',
                	items:[{
                		 xtype      : 'extextfield',
                         width      : 295,
                         reference  : 'txt_addr2',
                         name       : 'ADDR2',
                         exLabel    : '상세주소',
                	},{
                		width       : 5
                	},{
                		 xtype      : 'extextfield',
                         width      : 200,
                         reference  : 'txt_addr3',
                         name       : 'ADDR3',
                         exReadOnly : true
                	},{
                		 width      : 0,
                		 xtype      : 'extextfield',
                         reference  : 'txt_bldg_num',
                         name       : 'BLDG_NUM',
                         inpytType  : 'hidden'
                	}]
                }]
        	}]
        },{
        	html : '<div id="layerRec018p_01" class="find_addr_layer_pop" style="display:none;position:fixed;overflow:hidden;z-index:3;-webkit-overflow-scrolling:touch;"><img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼"></div>'
        }]
    }]
})