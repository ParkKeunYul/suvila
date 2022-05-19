Ext.define('ExFrm.view.ide.ToolBarPropController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.toolbarprop',
	retMethod:{},
	openerObj:{},
    calledByOther:function(openerMethod,openerObj){
    	this.openerObj = openerObj
		this.retMethod = openerMethod;
    },  
    onAddButtons:function(obj){
        console.log(':::',obj, this.lookupReference('dockedPosition').getChecked()[0].inputValue);
        console.log('lboSelectedInfo', lboSelectedInfo);
        var dockedPosition = this.lookupReference('dockedPosition').getChecked()[0].inputValue;
        if(lboSelectedInfo == null){
            alert('상단의 트리뷰에서 위젯을 선택하십시오');
            return;
        }
        var propertyValue='';
        for(var i=0; i < lboSelectedInfo.lboItem.lboPropertyLen; i++){
            if(lboSelectedInfo.lboItem.lboPropertyName[i]=='dockedItems'){
                propertyValue = lboSelectedInfo.lboItem.lboPropertyValue[i].trim();
                break;
            }
        }
        console.log('propertyValue', propertyValue);
        if(propertyValue != ''){
            
            var startChar = propertyValue.substring(0,1);
            var endChar = propertyValue.substring(propertyValue.length-1,propertyValue.length);
            if(startChar == '[' && endChar == ']'){
                propertyValue = propertyValue.substring(1, propertyValue.length-1);
            }
            else {
                //propertyValue = '['+ propertyValue +']';
            }
            try{
                var tempObj = Ext.decode(propertyValue);
            }
            catch(e){
                alert('객체 형식에 맞지 않습니다.');
            }
            propertyValue = propertyValue + ',';
        }
        console.log('propertyValue2', propertyValue);
        var dockedItems = '';
        if(obj.dockedType == 'buttons'){
            dockedItems = '{\n'+
            '    xtype:\'toolbar\',\n'+
            '    dock:\'' + dockedPosition + '\',\n'+
            '    items:[\n'+
            '    {\n'+
            '        xtype:\'button\',\n'+
            '        text:\'버튼\',\n'+
            '        iconCls: null\n'+
            '    }, \'-\',' +
            '    {\n'+
            '        xtype:\'button\',\n'+
            '        text:\'버튼\',\n'+
            '        iconCls: null\n'+
            '    },{\n'+
            '        xtype:\'button\',\n'+
            '        text:\'버튼\',\n'+
            '        iconCls: null\n'+
            '    }]'+
            '}';
        } else if(obj.dockedType == 'segmentedbuttons'){
            dockedItems = '{\n'+
            '    xtype:\'toolbar\',\n'+
            '    dock:\''+ dockedPosition +'\',\n'+
            '    items:[\n'+
            '    {\n'+
            '        xtype:\'segmentedbutton\',\n'+
            '        text:\'세그먼트\',\n'+
            '        items:[{\n'+
            '            text:\'아이템1\'\n'+
            '        },{\n'+
            '            text:\'아이템2\'\n'+
            '        },{\n'+
            '            text:\'아이템3\'\n'+
            '        }]\n'+
            '    }, \'-\',' +
            '    {\n'+
            '        xtype:\'segmentedbutton\',\n'+
            '        text:\'세그먼트\',\n'+
            '        items:[{\n'+
            '            text:\'아이템1\'\n'+
            '        },{\n'+
            '            text:\'아이템2\'\n'+
            '        },{\n'+
            '            text:\'아이템3\'\n'+
            '        }]\n'+
            '    },{\n'+
            '        xtype:\'segmentedbutton\',\n'+
            '        text:\'세그먼트\',\n'+
            '        items:[{\n'+
            '            text:\'아이템1\'\n'+
            '        },{\n'+
            '            text:\'아이템2\'\n'+
            '        },{\n'+
            '            text:\'아이템3\'\n'+
            '        }]\n'+
            '    }]'+
            '}';
        } else if(obj.dockedType == 'menubuttons'){
            dockedItems = '{\n'+
            '    xtype:\'toolbar\',\n'+
            '    dock:\''+ dockedPosition +'\',\n'+
            '    items:[\n'+
            '    {\n'+
            '        xtype:\'splitbutton\',\n'+
            '        text:\'Menu Button\',\n'+
            '        iconCls: null,\n'+
            '        glyph: 61,\n'+
            '        menu:[{\n'+
            '            text:\'Menu Button 1\'\n'+
            '        }]\n'+
            '    }, \'-\',' +
            '    {\n'+
            '        xtype:\'splitbutton\',\n'+
            '        text:\'Menu Button\',\n'+
            '        iconCls: null,\n'+
            '        glyph: 61,\n'+
            '        menu:[{\n'+
            '            text:\'Menu Button 1\'\n'+
            '        }]\n'+
            '    },{\n'+
            '        xtype:\'splitbutton\',\n'+
            '        text:\'Menu Button\',\n'+
            '        iconCls: null,\n'+
            '        glyph: 61,\n'+
            '        menu:[{\n'+
            '            text:\'Menu Button 1\'\n'+
            '        }]\n'+
            '    }]'+
            '}';
        } else if (obj.dockedType == 'iconbuttons'){
            dockedItems = '{\n' + 
            '    xtype:\'toolbar\',\n'+
            '    dock:\''+ dockedPosition +'\',\n'+
            '    items:[\n'+
            '    {\n'+
            '        xtype:\'button\',\n'+
            '        iconCls: \'button-home-small\',\n'+
            '    }, \'-\',' +
            '    {\n'+
            '        xtype:\'button\',\n'+
            '        iconCls: \'button-home-small\',\n'+
            '    },{\n'+
            '        xtype:\'button\',\n'+
            '        iconCls: \'button-home-small\',\n'+
            '    }]'+
            '}';
        }else if (obj.dockedType == 'checkboxes'){
            dockedItems = '{\n' + 
            '    xtype:\'toolbar\',\n'+
            '    dock:\''+ dockedPosition +'\',\n'+
            '    items:[\n'+
            '    {\n'+
            '        xtype:\'checkbox\',\n'+
            '        fieldLabel: \'체크박스\'\n'+
            '    }, \'-\',' +
            '    {\n'+
            '        xtype:\'checkbox\',\n'+
            '        fieldLabel: \'체크박스\'\n'+
            '    },{\n'+
            '        xtype:\'checkbox\',\n'+
            '        fieldLabel: \'체크박스\'\n'+
            '    }]'+
            '}';
        }else if (obj.dockedType == 'complex'){
            dockedItems = '{\n'+
            '    xtype:\'toolbar\',\n'+
            '    dock:\''+ dockedPosition +'\',\n'+
            '    items:[\n'+
            '    {\n'+
            '        xtype:\'button\',\n'+
            '        text:\'버튼\',\n'+
            '        iconCls: null\n'+
            '    }, \'-\',' +            
            '    {\n'+
            '        xtype:\'splitbutton\',\n'+
            '        text:\'Menu Button\',\n'+
            '        iconCls: null,\n'+
            '        glyph: 61,\n'+
            '        menu:[{\n'+
            '            text:\'Menu Button 1\'\n'+
            '        }]\n'+
            '    },{\n'+
            '        xtype:\'segmentedbutton\',\n'+
            '        text:\'세그먼트\',\n'+
            '        items:[{\n'+
            '            text:\'아이템1\'\n'+
            '        },{\n'+
            '            text:\'아이템2\'\n'+
            '        },{\n'+
            '            text:\'아이템3\'\n'+
            '        }]\n'+
            '    },{\n'+
            '        xtype:\'checkbox\',\n'+
            '        fieldLabel: \'체크박스\'\n'+
            '    }]'+
            '}';
        }
        
        
        propertyValue = '[' + propertyValue + dockedItems + ']';
        console.log('propertyValue3', propertyValue);
        //ExFrm.app.getController('IdeController').regProperty('dockedItems', propertyValue, dockedItems);
    	this.retMethod(
    		'dockedItems',
    		propertyValue,
    		this.openerObj);
    	this.getView().destroy();
    }
});