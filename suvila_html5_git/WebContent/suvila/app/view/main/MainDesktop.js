Ext.define('ExFrm.view.main.MainDesktop', {
    extend: 'Ext.panel.Panel',
    xtype: 'maindesktop',
    requires: [
        'ExFrm.view.menu.LeftMenu',
        'ExFrm.view.main.MainDesktopController',
        'ExFrm.view.widget.WidgetGroup'
    ],

    bodyStyle: 'background:rgba(42,45,51,1);width: 2800px; height: 1600px;background-repeat: repeat;',
    controller: 'maindesktop',
    layout: 'border',
    bodyBorder: false,
    border: false,
    header: false,
    scrollable: false,
    isRootView:true,
    //enableKeyEvents: true,
    //listeners:{
    //	afterrender:'keyHandler'
    //},


    // TODO : F5번 클릭 시 새로고침 방지 경고문
	/*
		Ext.Loader.loadScript({
			url:'./resources/javascript/keypress.js',
			onLoad: function() {
			},
			onError: function() {
				alert('ERROR: Import Keypress MainSub.js');
			}
		});
		this.callParent(arguments);
	},
	*/
    
    items: [{
        title:'종무행정 통합관리 시스템',
        region:'west',
        width:200,
        reference   : 'mainDeskLeft',
        layout:{
            type:'vbox',
            align:'stretch'
        },
        listeners: {
            afterrender: 'onAfterrender'
        },
        collapsible:true,
        items:[{
            //html:'<img src="./resources/img/bg.jpg" width="250">',
            //height:140,
        },{
            flex:1,
            xtype:'leftmenu',
            listeners:{
                afterrender:function(panel){
                }
            }
        }]
    },{
        region: 'center',
        bodyBorder: false,
        border: false,
        name: 'mainView',
        listeners:{
            resize:'onResizeMainView'
        },
        bodyStyle: 'background:rgba(42,45,51,1);background-repeat: repeat;',    //  2800px - 1600px
        dockedItems: [           
        {
            xtype:'toolbar',
            name:'mainDesktopToolbar',
            dock:'bottom',
            items:[{
                xtype  : 'button',
                text   : '<b>시작</b>',
                iconCls: 'fa fa-windows',
                name   : 'startButton',                
                menu   : {           
                	//title      : '시작메뉴',
                    iconCls    : 'user',
                    minHeight  : 250,
                    dockedItems: [{
                        xtype:'toolbar',
                        dock:'right',
                        width: 20,
                        layout:{
                            type:'vbox',
                            align:'stretch',
                            pack:'center',
                        },
                        items: [
                        	/*
                            {
                             //   text:'설정',
                              //  iconCls:'fa fa-cogs',
                                //handler: me.onSettings,
                                //scope: me
                            },{
                                xtype:'container',
                                height:20
                            },{
                                text:'로그아웃',
                                iconCls:'fa fa-sign-out',
                                handler: 'onLogout',
                                //scope: me
                            }
                            */
                        ]
                    }]
                },
            },{
                xtype: 'tbseparator'
            },{
                //text:'Windows List',
                iconCls:'fa fa-bars',
                menu:{
                    name: 'windowsList',
                    items: [
                    ]
	            }
            },{
                xtype:'tbseparator'
            },{
                xtype:'toolbar',
                padding:'0 0 0 0',
                margin:'0 0 0 0',
                flex:1,
                bodyStyle:'background-color:yellow',
                name:'addedContainer',
                items:[]
            },{
                xtype:'tbseparator'
            },{
                xtype: 'button',
                handler:'onRemoveAllWindow',
                iconCls:'fa fa-times'
            },{
                xtype:'tbseparator'
            },{
                xtype: 'button',
                reference: 'userId',
                text: '',
                width: 80
            },{
                xtype:'tbseparator'
            },{
            	xtype: 'button',
                reference: 'btnSupprot',
                text: '원격지원',
                width: 70,
                handler: 'onSupport',
            }, {
                xtype: 'tbseparator'
            }, {
                xtype: 'button',
                reference: 'currentTime',
                iconCls: 'fa fa-clock-o',
                text: ''
            }, {
                xtype: 'tbseparator'
            },{
            	text:'로그아웃',
                iconCls:'fa fa-sign-out',
                handler: 'onLogout',
                //scope: me
            }]    
        }],
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
        {
            flex: 1,
            bodyStyle: 'background:transparent;',
            layout: {
                type: 'hbox',
                pack: 'start'
            },
            padding: '20 20 20 20',
            bodyBorder: false,
            border: false,
            items: [{
                layout: {
                    type: 'vbox',
                    pack:'start'
                    //columns: 10
                },
                bodyBorder: false,
                border: false,
                bodyStyle: 'background:transparent;',
                name: 'background',
                padding: '10 10 10 10',
                listeners: {
                    afterrender: function (me) {
                        // 다이나믹하게 처리하고 싶을 경우 여기서 처리할것.
                        setTimeout(function(){
                        	/*
                        	me.add({
                                xtype:'container',
                                url:'ExFrm.view.demo.Demo005',
                                items:[{
                                    xtype:'image',
                                    src:'./resources/img/icon2.jpg',
                                    flex:1
                                },{
                                    html:'마우스오른쪽'
                                }],
                                listeners:{
                                    el:{
                                        click:function(){
                                            console.log(this);
                                            this.component.up('[isRootView=true]').getController().onClick(this.component);
                                        }
                                    }
                                }
                            });
                        	*/
                        	me.add({
                                xtype:'container',
                                url:'ExFrm.view.desk.temple_calender',
                                width  : 120,
                                title : '행사일정',
                                //height : 108,
                                height : 125,
                                items:[{
                                    xtype:'image',
                                //    src:'./resources/img/icon2.jpg',
                                    src:'./resources/img/login/2.png',
                                },{
                                    html:'<div style="color:#ffffff;background:repeat rgb(42, 45, 51);width:100%;text-align:center;font-weight:700;cursor:pointer;">행사일정</div>'
                                }],
                                listeners:{
                                    el:{
                                        click:function(){
                                            console.log(this);
                                            this.component.up('[isRootView=true]').getController().onClick(this.component);
                                        }
                                    }
                                }
                            });
                        	me.add({
                                xtype:'container',
                                url:'ExFrm.view.desk.announce001r_01',
                                title : '공지사항',
                                width  : 114,
                                //height : 108,
                                height : 125,
                                items:[{
                                    xtype:'image',
                                  //  src:'./resources/img/icon2.jpg',
                                    src:'./resources/img/login/3.png',
                                    
                                },{
                                    html:'<div style="color:#ffffff;background:repeat rgb(42, 45, 51);width:100%;text-align:center;;font-weight:700;cursor:pointer;">공지사항</div>'
                                }],
                                listeners:{
                                    el:{
                                        click:function(){
                                            console.log(this);
                                            this.component.up('[isRootView=true]').getController().onClick(this.component);
                                        }
                                    }
                                }
                            });
                        	ExFrm.app.getController('AppController').openWindow('ExFrm.view.rec.rec001w_11', '인등', null, null, null , '인등');
                            //ExFrm.app.getController('AppController').openWindow('ExFrm.view.asp.asp013w_01', '연등', null, null, null , '연등');
                        },10);
                    }
                },
                defaults:{
                    layout:{
                        type:'vbox',
                        align:'stretch'
                    },
                    width:70,
                    height:110,
                    margin:'10 10 10 10',
                },
                items:[]
            }]
        }]
    }]
});

