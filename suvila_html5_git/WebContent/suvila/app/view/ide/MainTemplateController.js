
Ext.define('ExFrm.view.ide.MainTemplateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.idemain',
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    onNewFile:function(){
 		ExFrm.app.getController('IdeController').setMainBar('ExFrm.view.ide.TmplSelect','템플릿선택','');    	
    },
    onNewTmpl:function(){
    	ExFrm.app.getController('IdeController').setTmplMainStep2Bar('ExFrm.view.ide.TmplMakeStep2','',''); 
    },
    onCss:function(){
    	ExFrm.app.getController('IdeController').setMainBar('ExFrm.view.ide.CssMaker','CSS수정','');
    },
    onSaveFile:function(){
    	// 뷰 파일을 읽어와 생성한다.
    	getStringAll();
    }
});
