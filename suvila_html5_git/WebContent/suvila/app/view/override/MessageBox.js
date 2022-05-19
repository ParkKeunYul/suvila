Ext.define('ExFrm.view.override.MessageBox', {
    override: 'Ext.window.MessageBox',
    stylle:'z-index:10001 !important;',
    initialize : function() {
        this.callOverridden(arguments);
    }
});
