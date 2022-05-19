Ext.define('ExFrm.view.widget.ExChartStock', {
    exInitStr:"{" + 
	"    xtype:'cartesian',\n" + 
	"    width:600,\n" + 
	"    height:300,\n" + 
	"    store:{\n" + 
	"    data:[\n" +
	"        {date:'0101', open:1995, high:2021, low:1994, close:1998},\n" +  
	"        {date:'0102', open:2005, high:2101, low:1984, close:1990},\n" +  
	"        {date:'0103', open:2009, high:2201, low:2300, close:2300},\n" +  
	"        {date:'0104', open:2060, high:2101, low:2094, close:2008},\n" +  
	"        {date:'0105', open:2048, high:2201, low:2194, close:2098},\n" +  
	"        {date:'0106', open:2014, high:2001, low:2294, close:2018},\n" +  
	"        {date:'0107', open:2050, high:2101, low:2394, close:2000}\n" +  
	"    ]},\n" + 
	"    axes:[\n" + 
	"    {\n" + 
	"       type: 'numeric',\n" + 
	"       position: 'left',\n" + 
	"       title: {\n" + 
	"           text: '제목(축)',\n" + 
	"           fontSize: 15\n" + 
	"       },\n" + 
	"       fields: ['open','high','low','close']\n" + 
	"    },{\n" + 
	"       type: 'category',\n" + 
	"       position: 'bottom',\n" + 
	"       title: {\n" + 
	"           text: '날짜(카테고리)',\n" + 
	"           fontSize: 15\n" + 
	"       },\n" + 
	"       fields: ['date']\n" + 
	"    }],\n" + 
	"    series: [\n" + 
	"    {\n" + 
	"       type: 'candlestick', \n" + 
	"       xField: 'date',\n" + 
	"       openField: 'open',\n" + 
	"       highField: 'high',\n" + 
	"       lowField: 'low',\n" + 
	"       closeField: 'close',\n" +
	"       style:{\n" + 
	"           barWidth:60,\n" + 
	"           opacitiy:0.9,\n" + 
	"           dropStyle:{\n" + 
	"              fill:'rgb(0,0,255)',\n" + 
	"              stroke:'rgb(0,0,255)'\n" +
	"           },\n" + 
	"           raiseStyle:{\n" + 
	"               fill:'rgb(255,0,0)',\n" +
	"               stroke:'rgb(255,0,0)'\n" + 
	"           }\n" + 
	"       }\n" +    
	"    }],\n" +  	
	"}"
});