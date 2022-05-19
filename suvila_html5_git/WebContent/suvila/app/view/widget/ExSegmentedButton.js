Ext.define('ExFrm.view.widget.ExSegmentedButton', {
    extend: 'Ext.button.Segmented',
    xtype:'exsegmentedbutton',    
    exInitStr:"{xtype:'exsegmentedbutton', text:'버튼', items: [{\n    text: 'Option One',pressed: true\n},{\ntext: 'Option Two'\n}, {\ntext: 'Option Three'\n}]}"
})