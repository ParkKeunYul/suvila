Ext.define('ExFrm.view.sample.SampleTest1',{
    extend: 'ExFrm.view.widget.container.ExPanelMain',
    alias:'widget.sampletest1',
    requires:['ExFrm.view.sample.SampleTest1Controller',
    'ExFrm.view.sample.SampleTest1Model'],
    controller:'sampletest1',
    viewModel:{
        type:'sampletest1'
    },
    name:'SampleTest1',
    isRootView:true,
    title:'타이틀',
    closable:true,
    scrollable:true,
    items:[
    {
        xtype:'exformmain',
        items:[
        {
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
            items:[
            {
                xtype:'exrow',
                items:[            {
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
                    text:'조회'
                }]
            }]
        },{
            xtype:'container',
            height:10
        },{
            xtype:'exgrid',
            reference:'mainGrid',
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
        },{
            xtype:'container',
            height:10
        }]
    }]
});
