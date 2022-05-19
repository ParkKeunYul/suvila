Ext.define('ExFrm.view.demo.Demo005Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.demo005',
    onInit:function(){
        this.getViewModel().getStore('testInfo').load();
        for(var i=0; i< 10; i++){
            this.lookupReference('imageBlock').add(
            {
                seqNo:i,
                height:'100%',
                width:'100%',
                xtype:'image',
                reference:'image' + i,
                hidden:true,
            })
            this.lookupReference('fileBlock').add(
            {
                seqNo:i,
                name:'file' + i,
                reference:'file' + i,
                xtype:'exfile',		
                buttonOnly:true,
                buttonText:'첨부',
                width:60,
                hidden:false,
                listeners:{
                    change:'onChangeFile'
                }
            });
            this.lookupReference('fileBlock').add(
            {
                seqNo:i,
                xtype:'button',		
                reference:'fileDelete' + i,
                text:'삭제',
                hidden:true,
                width:60,
                handler:'onDeleteFile'
            });
            this.lookupReference('fileNameBlock').add({
                seqNo:i,
                xtype:'extextfield',
                reference:'fileName' + i,
                width:'100%',
                hidden:true,
            });
            this.lookupReference('memoBlock').add({
                seqNo:i,
                xtype:'extextarea',
                reference:'memo' + i,
                name:'memo' + i,
                rows:6,
                width:'100%',
                height:'100%',
                hidden:true    
            });
        }
        this.lookupReference('file' + 0).setHidden(false);
        this.lookupReference('fileDelete' + 0).setHidden(false);
        this.lookupReference('image' + 0).setHidden(false);
        this.lookupReference('fileName' + 0).setHidden(false);
        this.lookupReference('memo' + 0).setHidden(false);
    },
    hideImageAll:function(){
        for(var i=0; i< 10; i++){
            this.lookupReference('file' + i).setHidden(true);
            this.lookupReference('fileDelete' + i).setHidden(true);
            this.lookupReference('image' + i).setHidden(true);
            this.lookupReference('fileName' + i).setHidden(true);
            this.lookupReference('memo' + i).setHidden(true);
        }
    },
    onGridClick:function(grid, record, item, index, e){
        console.log(index);
        this.hideImageAll();
        this.lookupReference('file' + index).setHidden(false);
        this.lookupReference('fileDelete' + index).setHidden(false);
        this.lookupReference('image' + index).setHidden(false);
        this.lookupReference('fileName' + index).setHidden(false);
        this.lookupReference('memo' + index).setHidden(false);
    },
    onChangeFile:function(input, fileName){
        var me = this;
        var seqNo = input.seqNo;
        console.log(seqNo, arguments);
        var file = input.fileInputEl.dom.files[0];
        if( file.type == 'image/jpeg' ||
            file.type == 'image/jpg' ||
            file.type == 'image/png' ||
            file.type == 'image/gif'){
        }else {
            Ext.Msg.alert('확인', '사진은 jpeg, jpg, png, gif 파일만 가능합니다.');
            return;
        }
        //this.lookupReference('image0').setSrc(input.fileInputEl.dom.files[0]);
        //input.files
        var reader = new FileReader();
        reader.onload = function (e) {
            me.lookupReference('image' + seqNo).setSrc(e.target.result); 
            me.lookupReference('fileName' + seqNo).setValue(fileName); 
        }
        reader.readAsDataURL(file);
    },
    onDeleteFile:function(btn){
        var seqNo = btn.seqNo;
        this.lookupReference('file' + seqNo).reset();
        this.lookupReference('fileName' + seqNo).reset();
        this.lookupReference('image' + seqNo).setSrc('');
        this.lookupReference('image' + seqNo).setSrc('');
        
    }
})