Ext.define('ExFrm.view.sin.sin010p_01',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sin010p_01',
    requires:[
    	'ExFrm.view.sin.sin010p_01Controller',
    	'ExFrm.view.sin.sin010p_01Model'
    ],
    controller:'sin010p_01',
    viewModel:{
        type:'sin010p_01'
    },
    isModal:true,
    isRootView:true,
    name:'sin010p_01',
    title:'신도검색',
    closable:true,
    width:1200,
    height:550,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',
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
                height:550,
                items:[{
                    layout:'hbox',
                    cls : 'postExample',
                },{
                	layout:'hbox',
                	height : 30,
                	items:[{
                		xtype          :'excombobox',
                        reference      :'sel_BudSearchGbn',
                        displayField   :'name',
                        valueField     :'code',
                        exCommonDmnCode:'001',
                        name           :'V_SEARCH_GBN',
                        width          : 170,
                        store          : {},
                        listeners      :{
                        	change:'onSearchTypeChange'
                        },
                	},{
                		width : 3
                	},{
                		xtype           : 'extextfield',
                		reference       :'txt_stipulation',
                		name            : 'V_SEARCH_WORD',
                		value           : '',
                		enableKeyEvents : true,
                		listeners       : [{
                       	 	keydown : 'onSearchEnter'
                        }]
                	},{
                		width  :0,
                		height :0,
                		items:[{
                			xtype            : 'extextfield',
	                        reference        : 'hid_bud_no',
	                        value            : '',
	                        inputType        : 'hidden',
	                        name             : 'V_BUD_NO'
                		}]
                		
                	},{
                		width           : 5
                	},{
                		xtype           : 'exbutton',
                		reference       : 'findSindoBtn',
                		name            : 'findSindoBtn',
                		handler         : 'onSearch',
                		text            :'조회',
                	},{
                		width : 5
                	},{
                		xtype           : 'exbutton',
                		reference       : 'returnBtn',
                		name            : 'returnBtn',
                		handler         : 'onReturn',
                		text            : '확인',
                	},{
                		width : 5
                	},{
                		xtype           : 'exbutton',
                		reference       : 'closeBtn',
                		name            : 'closeBtn',
                		handler         : 'onClose',
                		text            : '닫기',
                	}]
                                    
                },{
	                 xtype     : 'container',
	               	 reference : 'sindo_a',
	               	 width     : '100%',
	               	 items     : [{
	               		exGroupRef   : true,
	                    xtype        : 'exgrid',
	                    reference    : 'postGrid',
	                    cls          : 'sin010p_01_a',
	                    width        : '100%',
	                    height       : 450,
	                    align        : 'center',                    
	                    bind         : {
	                        store:'{ds_main}'
	                    },                 	                                        
	                    columns:[{
	                    	text           : '선택',
	                    	xtype          : 'excheckcolumn',
	                        dataIndex      : 'CHECK_P',                    
	                        exAlign        : 'center',
	                        exAlign        : 'center',
	                        headerCheckbox : true,
	                        width          : 65,   
	                    },{
	                    	text      :'신도종류',
	                    	xtype     :'excolumn',
	                        dataIndex :'SINDO_GBN_TXT',                        
	                        exAlign   :'center',
	                        flex      : 2.5,
	                        sortable  : true,
	                    },{
	                    	text      :'신도번호',
	                    	xtype     :'excolumn',
	                        dataIndex :'BUD_NO',                        
	                        exAlign   :'center',
	                        flex      : 3.5,
	                        sortable  : true,
	                    },{
	                    	text      :'신도명',
	                    	xtype     :'excolumn',
	                        dataIndex :'NAME_KOR',                        
	                        exAlign   :'left',
	                        flex      : 3,
	                        sortable  : true,
	                    },{
	                    	text      :'관계',
	                    	xtype     :'excolumn',
	                        dataIndex :'REPRESEN_REL',                        
	                        exAlign   :'left',
	                        sortable  : true,
	                        flex      : 2
	                    },{
	                    	text      :'전화번호',
	                    	xtype     :'excolumn',
	                        dataIndex :'TEL_NO_RENDER',                        
	                        exAlign   :'left',
	                        sortable  : true,
	                        flex      : 3.5                        
	                    },{
	                    	text      :'휴대번호',
	                    	xtype     :'excolumn',
	                        dataIndex :'MOBILE_TELNO_RENDER',                        
	                        exAlign   :'left',
	                        sortable  : true,
	                        flex      : 3.5                      
	                    },{
	                    	text      :'주소',
	                    	xtype     :'excolumn',
	                        dataIndex :'ADDR',                        
	                        exAlign   :'left',
	                        sortable  : true,
	                        flex      : 9
	                    }]
	                }]
                }]
            }]
        }]
    }]
})