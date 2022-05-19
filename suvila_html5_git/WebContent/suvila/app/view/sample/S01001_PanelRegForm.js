Ext.define('ExFrm.view.sample.S01001_PanelRegForm',{
    extend: 'ExFrm.view.widget.container.ExPanelMain',
    alias:'widget.s01001_panelregform',
    requires:['ExFrm.view.sample.S01001_PanelRegFormController',
    'ExFrm.view.sample.S01001_PanelRegFormModel'],
    controller:'s01001_panelregform',
    viewModel:{
        type:'s01001_panelregform'
    },
    name:'S01001_PanelRegForm',
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
            reference:'mainItems',
            xtype:'expanelbox',
            items:[
            {
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
            },{
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
        },{
            xtype:'expanelaction',
            layout:'hbox',
            items:[{
                html:'<h3>제목</h3>'
            },{
                xtype:'container',
                flex:1
            },{
                xtype:'exbutton',
                cls:'exbuttonaction',
                text:'버튼1',
                handler:''
            },{
                xtype:'tbspacer',
                width:5
            },{
                xtype:'exbutton',
                cls:'exbuttonaction',
                text:'버튼2',
                handler:''
            }]
        }]
    }]
});
