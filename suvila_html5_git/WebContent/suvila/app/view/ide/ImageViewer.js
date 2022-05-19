Ext.define('ExFrm.view.ide.ImageViewer', {
    extend: 'Ext.panel.Panel',
    alias:'widget.imageviewer',
    requires:['ExFrm.view.ide.ImageViewerController',
    ], 
    controller:'imageviewer',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('이미지 보기'),
    items:[
    {
        xtype:'container',
        reference:'imageContainer',
    	flex:1,
        html:'',
        bodyCls: 'transparent',
	}]
});
