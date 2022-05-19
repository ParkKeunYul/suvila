Ext.define('ExFrm.view.rec.rec000p_03_mouse',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec000p_03_mouseController',
    	'ExFrm.view.rec.rec000p_03_mouseModel'
    ],
    controller:'rec000p_03_mouse',
    viewModel:{
        type:'rec000p_03_mouse'
    },
    isModal:true,
    name:'rec000p_03_mouse',
    title:'등번호',
    closable:true,
    width:400,
    height:250,
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
        	height : 5
        },{
        	height : 0,
        	width  : 0,
        	items  :[{
        		xtype      : 'extextfield',
        		reference  : 'txt_jungak_cd',
        	},{
        		xtype      : 'extextfield',
        		reference  : 'txt_accept_gbn',
        	},{
        		xtype      : 'extextfield',
        		reference  : 'txt_accept_seq',
        	},{
        		xtype      : 'extextfield',
        		reference  : 'txt_seq',
        	}]
        },{
        	// BG_COLOR A  
        	reference : 'useDeung',
        	width     :'100%', 
        	hidden    : true ,
        	items     :[{
        		xtype      : 'extextfield',
                reference  : 'txt_jungak_nm',
                fieldLabel : '<span style="font-weight: 700;">전각명</span>',
                labelStyle : 'width:60px',
                exReadOnly : true
        	},{
        		height : 5
        	},{
        		xtype      : 'extextfield',
                reference  : 'txt_use_num',
                fieldLabel : '<span style="font-weight: 700;color:red;">등번호</span>',
                labelStyle : 'width:60px',
                exReadOnly : true
        	},{
        		height : 5
        	},{
        		html : '<span style="font-weight: 700;width:100%;text-align:center;display:block;">사용 처리 하겠습니까?</span>'
        	},{
        		height : 5
        	},{
        		layout :{
         			 type : 'hbox',
         			 pack : 'center'
         		},
         		width  :'100%', 
        		items  :[{
        			xtype     : 'exbutton',
                    reference : 'recoverBtn',
                    name      : 'recoverBtn',
                    handler   : 'recoverDeung',
                    text      : '예',
        		},{
        			width : 10
        		},{
        			xtype     : 'exbutton',
                    handler   : 'onClose',
                    text      : '아니오',
        		}]
        	}]
        },{
        	// BG_COLOR B 
        	reference : 'desDeung',
        	width     :'100%', 
        	hidden    : true ,
        	items     :[{
        		xtype      : 'extextfield',
                reference  : 'txt_jungak_nm2',
                fieldLabel : '<span style="font-weight: 700;">전각명</span>',
                labelStyle : 'width:60px',
                exReadOnly : true
        	},{
        		height : 5
        	},{
        		xtype      : 'extextfield',
                reference  : 'txt_use_num2',
                fieldLabel : '<span style="font-weight: 700;color:red;">등번호</span>',
                labelStyle : 'width:60px',
                exReadOnly : true
        	},{
        		height : 5
        	},{
        		html : '<span style="font-weight: 700;width:100%;text-align:center;display:block;">파손 처리 하겠습니까?</span>'
        	},{
        		height : 5
        	},{
        		layout :{
         			 type : 'hbox',
         			 pack : 'center'
         		},
         		width  :'100%', 
        		items  :[{
        			xtype     : 'exbutton',
                    reference : 'destoryBtn',
                    name      : 'destoryBtn',
                    handler   : 'destoryDeung',
                    text      : '예',
        		},{
        			width : 10
        		},{
        			xtype     : 'exbutton',
                    handler   : 'onClose',
                    text      : '아니오',
        		}]
        	}]
        },{
        	// BG_COLOR B 
        	reference : 'ingDeung',
        	width     :'100%', 
        	hidden    : true ,
        	items     :[{
        		xtype      : 'extextfield',
                reference  : 'txt_jungak_nm3',
                fieldLabel : '<span style="font-weight: 700;">전각명</span>',
                labelStyle : 'width:60px',
                exReadOnly : true
        	},{
        		height : 5
        	},{
        		xtype      : 'extextfield',
                reference  : 'txt_use_num3',
                fieldLabel : '<span style="font-weight: 700;color:red;">사용중인 등번호</span>',
                labelStyle : 'width:60px',
                exReadOnly : true,
                exType     : 'number',
        	},{
        		height : 5
        	},{
        		xtype      : 'extextfield',
                reference  : 'txt_move_num3',
                fieldLabel : '<span style="font-weight: 700;color:blue;">이동 할 등번호</span>',
                labelStyle : 'width:60px',
                //exReadOnly : true
        	},{
        		height : 5
        	},{
        		xtype      : 'extextfield',
                reference  : 'txt_period',
                fieldLabel : '<span style="font-weight: 700;">기간</span>',
                labelStyle : 'width:60px',
                exReadOnly : true
        	},{
        		height : 5
        		
        	},{
        		layout :{
         			 type : 'hbox',
         			 pack : 'center'
         		},
         		width  :'100%', 
        		items  :[{
        			xtype     : 'exbutton',
                    reference : 'moveBtn',
                    name      : 'moveBtn',
                    handler   : 'moveDeung',
                    text      : '이동',
        		},{
        			width : 10
        		},{
        			xtype     : 'exbutton',
                    reference : 'closeBtn',
                    name      : 'closeBtn',
                    handler   : 'closeDeung',
                    text      : '소등',        		        	
        		},{
        		    layout    : 'hbox',
        		    reference : 'extenBtnArea',
        		    items  :[{
        		    	width : 10
        		    },{
        		    	xtype     : 'exbutton',
                        reference : 'extenBtn',
                        name      : 'extenBtn',
                        handler   : 'extenDeung',
                        text      : '연장',
        		    }]
        			
        		},{
        			width : 10
        		},{
        			xtype     : 'exbutton',
                    handler   : 'onClose',
                    text      : '닫기',
        		}]
        	}]
        },{
        	// BG_COLOR E 
        	reference : 'reservDeung',
        	width     :'100%', 
        	hidden    : true ,
        	items     :[{
        		xtype      : 'extextfield',
                reference  : 'txt_jungak_nm4',
                fieldLabel : '<span style="font-weight: 700;">전각명</span>',
                labelStyle : 'width:60px',
                exReadOnly : true
        	},{
        		height : 5
        	},{
        		xtype      : 'extextfield',
                reference  : 'txt_use_num4',
                fieldLabel : '<span style="font-weight: 700;color:red;">등번호</span>',
                labelStyle : 'width:60px',
                exReadOnly : true
        	},{
        		height : 5
        	},{
        		html : '<span style="font-weight: 700;width:100%;text-align:center;display:block;">예약 취소 하겠습니까?</span>'
        	},{
        		height : 5
        	},{
        		layout :{
         			 type : 'hbox',
         			 pack : 'center'
         		},
         		width  :'100%', 
        		items  :[{
        			xtype     : 'exbutton',
                    reference : 'reservBtn',
                    name      : 'reservBtn',
                    handler   : 'reservDeung',
                    text      : '예',
        		},{
        			width : 10
        		},{
        			xtype     : 'exbutton',
                    handler   : 'onClose',
                    text      : '아니오',
        		}]
        	}]
       /* },{
        	height : 5
        },{
        	layout :{
      			 type : 'hbox',
      			 pack : 'center'
      		 }, 
      		 items  : [{
      			xtype     : 'exbutton',
                reference : 'closeBtn2',
                name      : 'closeBtn2',
                handler   : 'onClose',
                text      : '닫기',
      		 }]*/
        }]
        
    }]
})