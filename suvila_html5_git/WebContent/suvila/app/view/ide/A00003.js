Ext.define('ExFrm.view.test.A00003',{
    extend: 'ExFrm.view.widget.container.ExPanelMain',
    alias:'widget.a00003',
    requires:['ExFrm.view.test.A00003Controller',
    'ExFrm.view.test.A00003Model'],
    controller:'a00003',
    viewModel:{
        type:'a00003'
    },
    name:'A00003',
    isRootView:true,
    title:'타이틀',
    closable:true,
    scrollable:true,
    items:[
    {
        xtype:'exformmain',
        items:[
        {
            cls:'title_panel',
            xtype:'expaneltitle',
            layout:'hbox',
            items:[{
                html:'제목'
            },{
                xtype:'tbspacer',
                flex:1
            }]
        },{
            xtype:'tbspacer',
            height:10
        },{
            exGroupRef:true,
            reference:'searchItems',
            xtype:'expanelboxsrch',
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[
            {
                layout:'hbox',
                items:[
                undefined,
                undefined,{
                    xtype:'tbspacer',
                    flex:1
                },{
                    xtype:'exbuttonsrch',
                    text:'조회'
                }]
            }]
        },{
            xtype:'tbspacer',
            height:10
        },{
            xtype:'exgrid',
            reference:'mainList',
            height:300,
            width:'100%',
            bind:{
                store:'{mainInfo}'
            },
            columns:[
            {
                text:'고객번호',
                dataIndex:'custNo',
                flex:1
            },{
                text:'고객명',
                dataIndex:'custName',
                flex:1
            },{
                text:'생년월일',
                dataIndex:'birth',
                flex:1
            },{
                text:'포인트',
                dataIndex:'point',
                flex:1
            },{
                text:'주소',
                dataIndex:'addr',
                flex:1
            }]
        }]
    }]
});