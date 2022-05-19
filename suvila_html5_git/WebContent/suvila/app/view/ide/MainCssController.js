
Ext.define('ExFrm.view.ide.MainCssController', {
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
 		ExFrm.app.getController('IdeController').setMainBar('ExFrm.view.ide.TmplSelect','���ø�����','');    	
    },
    onNewTmpl:function(){
    	ExFrm.app.getController('IdeController').setTmplMainStep2Bar('ExFrm.view.ide.TmplMakeStep2','���ø�����',''); 
    },
    onCss:function(){
    	ExFrm.app.getController('IdeController').setMainBar('ExFrm.view.ide.CssMaker','CSS����','');
    },
    onSaveFile:function(){
    	// �� ������ �о�� �����Ѵ�.
    	getStringAll();
    }
});
