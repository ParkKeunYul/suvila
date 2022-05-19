Ext.define('ExFrm.view.ide.ImageViewerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.imageviewer',
    folderName:'',
    fileName:'',
    calledByOther:function(params){
		var me = this;
    	this.folderName = params.folderName;
    	this.fileName = params.fileName;

		var tempPath = '';
		if(lboFileType == 'server'){
			tempPath = lboUserPath +
				'/' + 'extra' + 
				//'/' + 'view' + 
				'/' + me.folderName.replace('\\', '/') + 
				'/' + me.fileName.replace('\\', '/')  
		}
		this.lookupReference('imageContainer').setHtml(
			'<img src="' + tempPath + '"><br>' + tempPath.replace(lboUserPath +'/extra','')
		)
    }    
});