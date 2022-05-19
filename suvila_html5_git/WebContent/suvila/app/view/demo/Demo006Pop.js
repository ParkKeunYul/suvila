Ext.define('ExFrm.view.demo.Demo006Pop',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.demo006pop',
    requires:['ExFrm.view.demo.Demo006PopController',
    'ExFrm.view.demo.Demo006PopModel'],
    controller:'demo006pop',
    viewModel:{
        type:'demo006pop'
    },
    isModal:true,
    name:'Demo006Pop',
    title:'메뉴',
    closable:true,
    width:300,
    height:600,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        flex:1,
        layout:{
            type:'vbox',
            align:'stretch'
        },
        items:[{
            hidden:true,
            xtype:'extextfield',
            fieldLabel:'조회조건',
            reference:'searchInput'
        },{
            exGroupRef:true,
            xtype:'exgrid',
            reference:'popGrid', 
            flex:1,
            bind:{
                store:'{popInfo}'
            }, 
            listeners:{
                itemclick:'onGridClick'
            },
            columns:[
            {                       
                text:'메뉴명',
                dataIndex:'custNo',
                width:100,
                xtype:'excolumn',
                exAlign:'center'
            },{

                xtype:'excolumn',
                text:'고객명',
                dataIndex:'custName',
                flex:1
            }]
        }]
    }]
})