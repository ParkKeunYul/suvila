Ext.define('ExFrm.view.ide.TmplLeftMenu', {
    extend: 'Ext.tree.TreePanel',
    alias:'widget.tmplleftmenu',
    requires:['ExFrm.view.ide.TmplLeftMenuController'],
    controller:'tmplleftmenu',
    width:200,
    title: getLboLangItem('템플릿 목록'),
    name:'tmplLeftMenu',
    collapsible:true,
    rootVisible:false,
    displayField:'name',
    preloadChildren: true,
    useArrows:true,
    tools:[
    {
    	type:'plus',
    	handler:'onNewTmpl'
	},{
    	type:'refresh',
    	handler:function(){
    		this.up('[name=tmplLeftMenu]').getStore().load();	
    	}
	}],
    store:{
    	type:'tree',
    	fields:['name', 'url'],
	 	proxy:{
			type:'ajax',
			url:'./jsp/tmplFileList.jsp?path=' + lboServerPath + 
				lboFileSeperator + "lib" + lboFileSeperator + "tmpljs" + lboFileSeperator + "link" + lboFileSeperator,
			reader:{
				type:'json',
			}
		},
		autoload:true,
    },
    listeners:{
    	itemdblclick:'onMenuClick'
    }
});