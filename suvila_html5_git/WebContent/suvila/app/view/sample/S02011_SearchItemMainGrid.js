Ext.define('ExFrm.view.sample.S02011_SearchItemMainGrid',{
    extend:'ExFrm.view.widget.container.ExPanelMain',
    alias:'widget.s02011_searchitemmaingrid',
    requires:['ExFrm.view.sample.S02011_SearchItemMainGridController',
    'ExFrm.view.sample.S02011_SearchItemMainGridModel'],
    controller:'s02011_searchitemmaingrid',
    viewModel:{
        type:'s02011_searchitemmaingrid'
    },
    name:'S02011_SearchItemMainGrid',
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
        },{
            xtype:'exgrid',
            reference:'mainGrid',
            height:300,
            plugins:[{
                ptype:'cellediting'
            }],
            width:'100%',
            bind:{
                store:'{mainInfo}'
            },
            columns:[
            {
                xtype:'rownumberer',
                width:100
            },{
                text:'무꼬1',
                width:100,
                dataIndex:'custNo',
                xtype:'widgetcolumn',
                widget:{
                    xtype:'button'
                }
            },                
            {
                text:'무꼬',
                width:500,
                dataIndex:'custNo',
                xtype:'widgetcolumn',
                widget:{                    
                    //xtype:'widget',
                    xtype:'container',
                    //autoShow:true,
                    width:'100%',
                    record:{},
                    layout:'hbox',
                    html:'aaaa',
                    
                    items:[{
                        xtype:'button',
                        text:'자료없음인쇄',
                        name:'button7',
                        //hidden:true
                    },{
                        xtype:'tbspacer',
                        width:5
                    },{
                        xtype:'button',
                        text:'회보서',
                        name:'button8',
                        //hidden:true
                    },{
                        xtype:'tbspacer',
                        width:5
                    },{
                        xtype:'button',
                        text:'다음버튼',
                        name:'button9',
                        //hidden:true
                    },{
                        xtype:'tbspacer',
                        width:5
                    },{
                        xtype:'button',
                        text:'11111',
                        name:'button1',
                       // hidden:true
                    },{
                        xtype:'tbspacer',
                        width:5
                    },{
                        xtype:'button',
                        text:'2222222',
                        name:'button2',
                        //hidden:true
                    },{
                        xtype:'tbspacer',
                        width:5
                    },{
                        xtype:'button',
                        text:'333333',
                        name:'button3',
                        //hidden:true
                    },{
                        xtype:'tbspacer',
                        width:5
                    }]
                    
                },
                
                onWidgetAttach:function(col, widget, rec){
                    var totalWidth = 0;
                    widget.updateLayout();
                    widget.down('[name=button7]').setText(rec.get('custNo'));
                    //widget.down('[name=button8]').setVisible(false);
                }
                
            },{
                text: '고객번호1',
                dataIndex: 'custNo',
                editor:'textfield',
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
            flex: 1}
            ,
            {
                text: '주소',
                dataIndex: 'addr',
            flex: 1}
            ]
        },{
            xtype:'container',
            height:10
        }]
    }]
})