Ext.define('ExFrm.view.rec.rec000p_03',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec000p_03Controller',
    	'ExFrm.view.rec.rec000p_03Model'
    ],
    controller:'rec000p_03',
    viewModel:{
        type:'rec000p_03'
    },
    isModal:true,
    name:'rec000p_03',
    title:'전각등 상세',
    closable:true,
    width:1600,
    height:700,
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
        	items  :[{
        		xtype        :'excombobox',
            	labelWidth   : 70,
                fieldLabel   : '<span style="font-weight: 700;">접수종류</span>',
                width        : 220,
                style        : 'padding-top:5px;',
                valueField   : 'CODE',
                displayField : 'NAME',     
                reference    :'lc_acceptGbn',
                exReadOnly   : true,
            	bind         : {
                	store:'{ds_type}'
                },
        	},{
        		xtype        :'excombobox',
            	labelWidth   : 70,
                fieldLabel   : '<span style="font-weight: 700;">전각구분</span>',
                width        : 220,
                style        : 'padding-top:5px;',
                valueField   : 'CODE',
                displayField : 'NAME',     
                reference    :'lc_jungakGbn',
            	bind         : {
                	store:'{ds_jungakGbn}'
                },
                listeners       : {
                	change:'onSelectGbn'
                },
        	},{
        		xtype        :'excombobox',
            	labelWidth   : 60,
                fieldLabel   : '<span style="font-weight: 700;">전각명</span>',
                width        : 220,
                style        : 'padding-top:5px;',
                valueField   : 'JUNGAK_CD',
                displayField : 'JUNGAK_NM',     
                reference    :'lc_jungakKind',
            	bind         : {
                	store:'{ds_jungakKind}'
                },
                listeners       : {
                	change:'onSelect'
                },        	
        	},{
        		width  : 0,
        		layout : 'hbox',
        		items  : [{
        			xtype            : 'extextfield',
                    reference        : 'p_light_no',
                    value            : '',
                    inputType        : 'hidden',
                    width            : 0
        		},{
        			xtype            : 'extextfield',
                    reference        : 'type_flag',
                    value            : '1',
                   // inputType        : 'hidden',
                    width            : 0
        		}]
        	}]
        },{
        	height : 5
        },{
        	html : '<img src="./resources/img/bg/light_gbn_popup.gif" >',
        	height : 25,
        },{
        	height : 5
        },{
        	layout : 'hbox',
        	items  : [{
        		width      : '100%',
         		exGroupRef : true,
                xtype      :'exgrid',
                reference  :'rec000p_03_a',
                cls        :'rec000p_03_a',
                height     : 400,
                align      : 'center',                    
                bind:{
                    store:'{ds_crossLight}'
                },                 
                listeners:{
                	cellclick    : 'onCellClick',
                	celldblclick : 'onCellDbClick',
                	itemcontextmenu   : 'onGridClick'
                		
                },
                columns:[{                   
                	text  :'행/열',
                    xtype :'rownumberer',
                    width : 70,
                    align : 'center',
                }]
            }]
        },{
        	height : 5
        },{
        	xtype :'exfieldsetblockbox',
        	items : [{
        		xtype:'exblockrow',
                items:[{
                	xtype:'exblocklabel',
                    html:'<div style="text-align:left;padding-left:5px;">전각명</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                        xtype     : 'extextfield',
                        reference : 'txt_sindo_jungak_nm',
                        exLabel   : '성명',
                        exReadOnly: true,
                    }]
                },{
                	xtype:'exblocklabel',
                    html:'<div style="text-align:left;padding-left:5px;">등번호</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                    	xtype     : 'extextfield',
                        reference : 'txt_sindo_light_no',
                        exLabel   : '등번호',
                        exReadOnly: true,
                        exType    : 'number',
                        exAlign   : 'right',
                    }]
                },{
                	xtype:'exblocklabel',
                    html:'<div style="text-align:left;padding-left:5px;">신도번호</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                    	xtype     : 'extextfield',
                        reference : 'txt_sindo_proposal_bud_no',
                        exLabel   : '신도번호',
                        exReadOnly: true,
                    }]
                },{
                	xtype:'exblocklabel',
                    html:'<div style="text-align:left;padding-left:5px;">신청자</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                    	xtype     : 'extextfield',
                        reference : 'txt_sindo_bud_name',
                        exLabel   : '신청자',
                        exReadOnly: true,
                    }]
                }]
        	},{
        		xtype:'exblockrow',
            	items:[{
                	xtype:'exblocklabel',
                    html:'<div style="text-align:left;padding-left:5px;">납부금액</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                        xtype     : 'extextfield',
                        reference : 'me_payment_amt',
                        exLabel   : '납부금액',
                        exReadOnly: true,
                        exType    : 'number',
                        exAlign   : 'right',
                    }]
                },{
                	xtype:'exblocklabel',
                    html:'<div style="text-align:left;padding-left:5px;">미수금액</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                        xtype     : 'extextfield',
                        reference : 'me_misu_amt',
                        exLabel   : '미수금액',
                        exReadOnly: true,
                        exType    : 'number',
                        exAlign   : 'right',
                    }]
                },{
                	xtype:'exblocklabel',
                    html:'<div style="text-align:left;padding-left:5px;">신청일</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                        xtype     : 'extextfield',
                        reference : 'txt_sindo_crt_date',
                        exLabel   : '신청일',
                        exReadOnly: true,
                    }]
                },{
                	xtype:'exblocklabel',
                    html:'<div style="text-align:left;padding-left:5px;"></div>'
                },{
                	xtype:'exblockfield',
                }]
        	},{
        		xtype:'exblockrow',
                items:[{
                	xtype:'exblocklabel',
                    html:'<div style="text-align:left;padding-left:5px;">주소</div>'
                },{
                	xtype:'exblockfield',
                    items:[{
                        xtype     : 'extextfield',
                        reference : 'txt_sindo_addr',
                        exLabel   : '주소',
                        exReadOnly: true,
                        width     : 800
                    }]
                }]
        	}]
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