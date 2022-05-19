Ext.define('ExFrm.view.ide.ParamView', {
    extend: 'Ext.window.Window',
    alias:'widget.paramview',
    requires:['ExFrm.view.ide.ParamViewController',
    ], 
    controller:'paramview',
    title: getLboLangItem('파라미터 관리'),
    width:400,
    height:400,
    isModel:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[
    {
      html:getLboLangItem('보낼 파라미터')  
    },{
    	flex:1,
    	reference:'sendParams',
    	name:'sendParams',
    	xtype:'textarea'
	},{
        layout:'hbox',
        items:[
        {
            xtype:'tbspacer',
            flex:1
        },{
            xtype:'button',
            text:getLboLangItem('보내기'),
            handler:'onSendParam'   
        },{
            xtype:'tbspacer',
            width:10
        }]
    },{
      html:getLboLangItem('받은 파라미터')  
    },{
    	flex:1,
    	reference:'receiveParams',
    	name:'receiveParams',
    	xtype:'textarea'
	}]
});
