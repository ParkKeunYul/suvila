Ext.define('ExFrm.view.sample.S02001_SrchItemMainItem',{
    extend:'ExFrm.view.widget.container.ExPanelMain',
    alias:'widget.s02001_srchitemmainitem',
    requires:['ExFrm.view.sample.S02001_SrchItemMainItemController',
    'ExFrm.view.sample.S02001_SrchItemMainItemModel'],
    controller:'s02001_srchitemmainitem',
    viewModel:{
        type:'s02001_srchitemmainitem'
    },
    name:'S02001_SrchItemMainItem',
    isRootView:true,
    title:'타이틀',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
        items:[{
            xtype:'container',
            layout:'hbox',
            items:[{
                html:'<h3>제목</h3>'
            },{
                xtype:'tbspacer',
                flex:1
            }]
        },{
            reference:'searchItems',
            xtype:'exfieldsetbox',
            cls:'exfieldsetboxsrch',
            items:[{
                xtype:'exrow',
                items:[{
                    xtype:'extextfield',
                    fieldLabel:'고객명',
                    reference:'custNameSrch',
                    name:'custNameSrch',
                    labelAlign:'right',
                    exLabel:'고객명'
                }]
            },{
                xtype:'exrow',
                items:[{
                    xtype:'exdatefield',
                    fieldLabel:'생년월일',
                    reference:'birthSrch',
                    labelAlign:'right',
                    exLabel:'생년월일',
                    name:'birthSrch'
                }]
            },{
                xtype:'exrow',
                items:[{
                    xtype:'container',
                    flex:1
                },{
                    xtype:'exbutton',
                    cls:'exbuttonsrch',
                    text:'조회',
                    listeners:[
                    {
                        click:'onSearchItems'
                    }
                    ]
                }]
            }]
        },{
            xtype:'container',
            height:10
        },{
            reference:'mainItems',
            xtype:'exfieldsetbox',
            items:[{
                xtype:'exrow',
                items:[{
                    xtype:'extextfield',
                    fieldLabel:'고객번호',
                    reference:'custNo',
                    name:'custNo',
                    labelAlign:'right',
                    exLabel:'고객번호'
                },{
                    xtype:'extextfield',
                    fieldLabel:'고객명',
                    reference:'custName',
                    name:'custName',
                    labelAlign:'right',
                    exLabel:'고객명'
                },{
                    xtype:'exdatefield',
                    fieldLabel:'생년월일',
                    reference:'birth',
                    labelAlign:'right',
                    exLabel:'생년월일',
                    name:'birth'
                }]
            },{
                xtype:'exrow',
                items:[{
                    xtype:'extextfield',
                    fieldLabel:'포인트',
                    reference:'point',
                    name:'point',
                    labelAlign:'right',
                    exLabel:'포인트',
                    exType:'number'
                },{
                    xtype:'extextfield',
                    fieldLabel:'주소',
                    reference:'addr',
                    name:'addr',
                    labelAlign:'right',
                    exLabel:'주소'
                }]
            }]
        },{
            xtype:'container',
            height:10
        },{
            xtype:'expanelaction',
            layout:'hbox',
            items:[{
                html:''
            },{
                xtype:'container',
                flex:1
            },{
                xtype:'exbutton',
                cls:'exbutton',
                text:'버튼1',
                handler:''
            },{
                xtype:'tbspacer',
                width:5
            },{
                xtype:'exbutton',
                cls:'exbutton',
                text:'버튼2',
                handler:''
            }]
        }]
    }]
})