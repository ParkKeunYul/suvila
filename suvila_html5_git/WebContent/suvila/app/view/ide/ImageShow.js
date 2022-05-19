Ext.define('ExFrm.view.ide.ImageShow', {
    extend: 'Ext.window.Window',
    alias:'widget.imageshow',	    
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('미리보기'),
    width:800,
    height:600,
    name:'setttings',
	scrollable:true,
    items:[
	{
		name:'image',
		xtype:'image',
		width:'100%',
		src:''
	}],
	setImage:function(title, url){
		this.down('[name=image]').setSrc(url);
		this.setTitle( getLboLangItem('미리보기') + ' ' + title);
	}
});
