Ext.define('ExFrm.view.ide.ToolBarProp', {
    extend: 'Ext.window.Window',
    alias:'widget.toolbarprop',

    requires:['ExFrm.view.ide.ToolBarPropController',
//    		  'ExFrm.view.ide.ToolBarPropModel'
    ],
    
    controller:'toolbarprop',
    /*
    viewModel:{
    	type:'toolbarprop'
    },
    */ 
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    modal:true,
    title: getLboLangItem('툴바 추가'),
    width:900,
    height:600,
    defaults:{
      layout:'hbox'  
    },
    items:[
    {
        items:[
        {
            reference:'dockedPosition',
            xtype:'radiogroup',
            fieldLabel:'Position',
            labelWidth:200,
            layout:'hbox',
            items:[{
                boxLabel:'top',
                inputValue:'top',
                checked:true
            },{
                boxLabel:'bottom',
                inputValue:'bottom',
            },{
                boxLabel:'left',
                inputValue:'left',
            },{
                boxLabel:'right',
                inputValue:'right',
            }]  
        }]  
    },{
        xtype:'tbspacer',
        height:10
    },{
        items:[
        {
            html: getLboLangItem('버튼'),
            width:200
        },{
            flex:1,
            html:'<img src="./lib/tmpljs/resources/img/dockeditems_toolbar_buttons.png" height="30">'
        },{
            xtype:'button',
            text:'선택',
            dockedType:'buttons',
            handler:'onAddButtons'
        }]
    },{
        items:[
        {
            html: getLboLangItem('세그먼트버튼'),
            width:200
        },{
            flex:1,
            html:'<img src="./lib/tmpljs/resources/img/dockeditems_toolbar_segmentedbuttons.png" height="30">'
        },{
            xtype:'button',
            text:'선택',
            dockedType:'segmentedbuttons',
            handler:'onAddButtons'
        }]
    },{
        items:[
        {
            html: getLboLangItem('메뉴버튼'),
            width:200
        },{
            flex:1,
            html:'<img src="./lib/tmpljs/resources/img/dockeditems_toolbar_menubuttons.png" height="30">'
        },{
            xtype:'button',
            text:'선택',
            dockedType:'menubuttons',
            handler:'onAddButtons'
        }]
    },{
        items:[
        {
            html: getLboLangItem('아이콘'),
            width:200
        },{
            flex:1,
            html:'<img src="./lib/tmpljs/resources/img/dockeditems_toolbar_iconbuttons.png" height="30">'
        },{
            xtype:'button',
            text: getLboLangItem('선택'),
            dockedType:'iconbuttons',
            handler:'onAddButtons'
        }]
    },{
        items:[
        {
            html: getLboLangItem('체크박스'),
            width:200
        },{
            flex:1,
            html:'<img src="./lib/tmpljs/resources/img/dockeditems_toolbar_checkboxes.png" height="30">'
        },{
            xtype:'button',
            text: getLboLangItem('선택'),
            dockedType:'checkboxes',
            handler:'onAddButtons'
        }]
    },{
        items:[
        {
            html: getLboLangItem('혼합'),
            width:200
        },{
            flex:1,
            html:'<img src="./lib/tmpljs/resources/img/dockeditems_toolbar_complex.png" height="30">'
        },{
            xtype:'button',
            text: getLboLangItem('선택'),
            dockedType:'complex',
            handler:'onAddButtons'
        }]
    }]
});