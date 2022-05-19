Ext.define('ExFrm.view.widget.ExFileMulti', {
    extend: 'Ext.form.field.File',
    xtype:'exfilemulti',
    cls:'exfilemulti',
    exInitStr:"{    \n        xtype:'exfilemulti' }",
    labelSeparator : '',
    //buttonOnly:true,
    buttonText:'파일선택(멀티)',
    fileList:'',    
    cmp:{}, 
    setMulti:function(){
	this.cmp.fileInputEl.set({
            multiple:'multiple'
        });
    },  
    listeners:{
        afterrender:function(cmp){
        	this.cmp = cmp;
            cmp.fileInputEl.set({
                multiple:'multiple'
            });
        },
        change:function(){
        	var files = this.fileInputEl.dom.files;
        	var temp = "";
        	for(i=0; i<files.length; i++){
        		temp = temp + files[i].name + '\n';
        	}
        	//Ext.ComponentQuery.query('textarea[name=filelist]')[0].setValue(temp);	
        	if(this.nextSibling('textarea[name=' + this.fileList + ']') != null){
	        	console.log('textarea',this.fileList, this.nextSibling('textarea[name=' + this.fileList + ']'));
	        	this.nextSibling('textarea[name=' + this.fileList + ']').setValue(temp);
	        }
	        else{
	        	console.log('textarea',this.fileList, this.up('exdisplaylabel').nextSibling('exdisplayfield').down('textarea[name=' + this.fileList + ']'));
	        	this.up('exdisplaylabel').nextSibling('exdisplayfield').down('textarea[name=' + this.fileList + ']').setValue(temp);
	        }
        }
    }
})