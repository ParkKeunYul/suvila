Ext.define('ExFrm.view.ide.FileUpload', {
    extend: 'Ext.window.Window',
    alias:'widget.fileupload',
    requires:[
    	'ExFrm.view.ide.FileUploadController'
    ], 
    controller:'fileupload',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('파일 업로드'),
    width:400,
    height:200,
    modal:true,
    isModel:true,
	items:[{
		xtype:'form',
		reference:'regForm',
		padding:'10 10 10 10',
		items: [
		{
			xtype:'hidden',
			name:'path',
			reference:'path'
		},{
			fieldLabel:'파일명',
			xtype:'filefield',
			reference:'fileName',
			name:'fileName',
			width:370
		},{
			xtype:'tbspacer',
			width:20
		},{
			layout:'hbox',
			items:[
			{
				xtype:'tbspacer',
				flex:1
			},{
				xtype:'button',
				text:getLboLangItem('파일 업로드'),
				handler:'onUpload'
			},{
				xtype:'tbspacer',
				width:10
			},{
				xtype:'button',
				text:getLboLangItem('취소'),
				handler:'onCancel'
			},{
				xtype:'tbspacer',
				flex:1
			}]
		},{
			xtype:'tbspacer',
			width:20
		},{
			html:getLboLangItem('파일 용량은 100 Kbyte로 제한되며 서버 관리상 큰 파일은 임의로 삭제될 수 있습니다.')
		}]
	}]
});
