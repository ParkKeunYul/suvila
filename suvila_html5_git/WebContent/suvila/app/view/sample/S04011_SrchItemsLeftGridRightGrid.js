Ext.define('ExFrm.view.sample.S04011_SrchItemsLeftGridRightGrid',{
    extend:'ExFrm.view.widget.container.ExPanelMain',
    alias:'widget.s04011_srchitemsleftgridrightgrid',
    requires:['ExFrm.view.sample.S04011_SrchItemsLeftGridRightGridController',
    'ExFrm.view.sample.S04011_SrchItemsLeftGridRightGridModel'],
    controller:'s04011_srchitemsleftgridrightgrid',
    viewModel:{
        type:'s04011_srchitemsleftgridrightgrid'
    },
    name:'S04011_SrchItemsLeftGridRightGrid',
    title:'타이틀',
    closable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',
        items:[{
            flex:1,
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
                xtype:'container',
                height:10
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
                    },{
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
            }]
        },{
            layout:{
                type:'hbox',
                align:'stretch'
            },
            flex:1,
            items:[{
                layout:'vbox',
                width:300,
                items:[{
                    xtype:'exgrid',
                    reference:'leftGrid',
                    height:300,
                    width:'100%',
                    bind:{
                        store:'{leftInfo}'
                    },
                    columns:[
                    {
                        text:'고객번호',
                        dataIndex:'custNo',
                        flex:1
                    }
                    ,
                    {
                        text:'고객명',
                        dataIndex:'custName',
                        flex:1
                    }
                    ,
                    {
                        text:'생년월일',
                        dataIndex:'birth',
                        flex:1
                    }
                    ,
                    {
                        text:'포인트',
                        dataIndex:'point',
                        flex:1
                    }
                    ,
                    {
                        text:'주소',
                        dataIndex:'addr',
                        flex:1
                    }
                    ],
                    listeners:[
                    {
                        itemclick:'onLeftGridClick'
                    }
                    ]
                }]
            },{
                xtype:'tbspacer',
                width:20
            },{
                layout:'vbox',
                flex:1,
                items:[{
                    xtype:'exgrid',
                    reference:'rightGrid',
                    height:300,
                    width:'100%',
                    bind:{
                        store:'{rightInfo}'
                    },
                    columns:[
                    {
                        text:'고객번호',
                        dataIndex:'custNo',
                        flex:1
                    }
                    ,
                    {
                        text:'고객명',
                        dataIndex:'custName',
                        flex:1
                    }
                    ,
                    {
                        text:'생년월일',
                        dataIndex:'birth',
                        flex:1
                    }
                    ,
                    {
                        text:'포인트',
                        dataIndex:'point',
                        flex:1
                    }
                    ,
                    {
                        text:'주소',
                        dataIndex:'addr',
                        flex:1
                    }
                    ]
                }]
            }]
        }]
    }]
})