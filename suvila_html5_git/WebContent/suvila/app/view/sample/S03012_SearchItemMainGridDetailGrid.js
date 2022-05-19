Ext.define('ExFrm.view.sample.S03012_SearchItemMainGridDetailGrid',{
    extend:'ExFrm.view.widget.container.ExPanelMain',
    alias:'widget.s03012_searchitemmaingriddetailgrid',
    requires:['ExFrm.view.sample.S03012_SearchItemMainGridDetailGridController',
    'ExFrm.view.sample.S03012_SearchItemMainGridDetailGridModel'],
    controller:'s03012_searchitemmaingriddetailgrid',
    viewModel:{
        type:'s03012_searchitemmaingriddetailgrid'
    },
    name:'S03012_SearchItemMainGridDetailGrid',
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
            xtype:'expanelbox',
            cls:'expanelboxsrch',
            layout:{
                type:'vbox',
                align:'stretch'
            },
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
            },{
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
            exGroupRef:true,
            xtype:'exgrid',
            reference:'mainGrid',
            height:300,
            width:'100%',
            bind:{
                store:'{mainInfo}'
            },
            columns:[
            {
                text: '고객번호',
                dataIndex: 'custNo',
            flex: 1}
            ,
            {
                text: '고객명',
                dataIndex: 'custName',
            flex: 1}
            ,
            {
                text: '생년월일',
                dataIndex: 'birth',
                flex: 1,
                xtype: 'excolumn',
            exType: 'date'}
            ,
            {
                text: '포인트',
                dataIndex: 'point',
                flex: 1,
                xtype: 'excolumn',
            exType: 'number'}
            ,
            {
                text: '주소',
                dataIndex: 'addr',
            flex: 1}
            ],
            listeners:[
            {
                itemclick:'onMainGridClick'
            }
            ]
        },{
            xtype:'tbspacer',
            height:5
        },{
            xtype:'exgridpagearrows',
            reference:'mainGridArrows',
            storeName:'mainInfo',
            limit:10,
            pageNumberCount:5
        },{
            xtype:'container',
            height:10
        },{
            exGroupRef:true,
            xtype:'exgrid',
            reference:'detailGrid',
            height:300,
            width:'100%',
            bind:{
                store:'{detailInfo}'
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
        },{
            xtype:'tbspacer',
            height:5
        },{
            xtype:'exgridpagearrows',
            reference:'detailGridArrows',
            storeName:'detailInfo',
            limit:10,
            pageNumberCount:5
        }]
    }]
})