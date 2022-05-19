Ext.define('ExFrm.view.ide.CssMaker', {
    extend: 'Ext.form.Panel',
    alias:'widget.cssmaker',
    requires:[
    	'ExFrm.view.ide.CssMakerController'],
    controller:'cssmaker',
    closable: true,
    title:'Css Maker',
    autoScroll: true,
    //url: './jsp/screenMake.jsp',

	layout:{
		type:'vbox',
		align:'stretch'
	},
	defaults:{
		labelWidth:100
	},
    items: [
    {
		reference:'etc',
		xtype:'textareafield',
		fieldLabel:'etc',
		labelAlign:'right',
		flex:1
	},{
		reference:'src',
		xtype:'textareafield',
		fieldLabel:'src',
		labelAlign:'right',
		flex:1
    }/*,{
		reference:'var',
		xtype:'textareafield',
		fieldLabel:'var',
		labelAlign:'right',
		flex:1
    }*/,{
    	xtype:'tbspacer',
    	height:10
    },{
    	layout:{
    		type:'hbox',
    		pack:'end'
    	},
		items:[
		{
			xtype:'button',
			text:getLboLangItem('저장'),
			handler:'onSave'
		},{
			xtype:'button',
			text:getLboLangItem('미리보기'),
			handler:function(){
				window.open('./index.html','_blank');
			}
		}]
    }]
});