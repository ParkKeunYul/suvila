Ext.define("Ext.pivot.d3.HeatMap",{extend:"Ext.d3.HeatMap",xtype:"pivotheatmap",requires:["Ext.pivot.matrix.Local","Ext.pivot.matrix.Remote"],padding:{top:20,right:30,bottom:20,left:80},config:{defaultFormatter:'number("0.00")',matrix:{type:"local",rowGrandTotalsPosition:"none",colGrandTotalsPosition:"none"},xAxis:{axis:{orient:"bottom"},scale:{type:"ordinal"},step:100},yAxis:{axis:{orient:"left"},scale:{type:"ordinal"},step:100},colorAxis:{scale:{type:"linear",range:["white","green"]}},tiles:{attr:{stroke:"green","stroke-width":1},labels:true},legend:{docked:"bottom",padding:60,items:{count:10,slice:[1],size:{x:40,y:20}}}},destroy:function(){this.setMatrix(null);this.callParent()},applyMatrix:function(a){if(a){if(!a.isPivotMatrix){if(!a.type){a.type="local"}a.cmp=this;a=Ext.Factory.pivotmatrix(a)}}return a},updateMatrix:function(b,a){var c=this;Ext.destroy(a,c.matrixListeners);c.matrixListeners=null;if(b){c.matrixListeners=b.on({done:c.onMatrixDataReady,scope:c,destroyable:true})}},updateStore:Ext.emptyFn,updateXAxis:Ext.emptyFn,updateYAxis:Ext.emptyFn,updateColorAxis:Ext.emptyFn,onMatrixDataReady:function(g){var e=this,b=e.getXAxis(),a=e.getYAxis(),i=e.getColorAxis(),c=g.topAxis.dimensions,h=g.leftAxis.dimensions,f=g.aggregate,d;if(c.getCount()&&b){d=c.getAt(0);b.setField(d.getDataIndex());b.setTitle({text:d.getHeader()})}if(h.getCount()&&a){d=h.getAt(0);a.setField(d.getDataIndex());a.setTitle({text:d.getHeader()})}if(f.getCount()&&i){d=f.getAt(0);i.setField(d.getId())}this.processData();this.performLayout()},bindFormatter:function(c,a){var b=this;return function(d){return c(d,a||b.resolveListenerScope())}},getStoreData:function(){var v=this,p=v.getMatrix(),t=p.leftAxis.getTree(),d=t.length,h=p.topAxis.getTree(),s=h.length,n=[],k=v.getXAxis(),a=v.getYAxis(),u=v.getColorAxis(),c=k.getField(),e=a.getField(),g=u.getField(),r,q,b,f,l,m,o;for(r=0;r<d;r++){b=t[r];for(q=0;q<s;q++){f=h[q];l=p.results.get(b.key,f.key);m={data:{}};m.data[c]=f.name;m.data[e]=b.name;m.data[g]=l?l.getValue(g):null;m.data.records=l?l.records.length:0;n.push(m)}}return n},onUpdateTiles:function(g){var e=this,f=e.getMatrix(),c=e.getColorAxis(),a=c.getField(),d,h,i,b;if(f.aggregate.getCount()){d=f.aggregate.getAt(0);h=d.getFormatter()||e.getDefaultFormatter();i=d.getScope();b=Ext.app.bind.Parser.fly(h);h=e.bindFormatter(b.compileFormat(),i);b.release()}e.callParent([g]);g.select("rect").style("fill",function(j){return c.getColor(j)});g.select("text").text(function(k){var j=k.data[a]||null;if(j!==null&&d&&h){j=h(j)}return j!==null?j:null})}});Ext.define("Ext.pivot.d3.AbstractContainer",{extend:"Ext.panel.Panel",requires:["Ext.pivot.d3.HeatMap","Ext.pivot.plugin.Configurator"],isPivotComponent:true,config:{matrix:{type:"local"},drawing:{xtype:"pivotheatmap"},configurator:null},destroy:function(){this.setMatrix(null);this.callParent()},addDrawing:function(){this.add(Ext.applyIf({matrix:this.getMatrix()},this.getDrawing()))},applyMatrix:function(b,a){Ext.destroy(a);if(b==null){return b}if(b&&b.isPivotMatrix){b.cmp=this;return b}Ext.applyIf(b,{type:"local"});b.cmp=this;return Ext.Factory.pivotmatrix(b)},applyConfigurator:function(a){return a?this.addPlugin(a):null},updateConfigurator:function(b,a){if(a){this.removePlugin(a)}}});Ext.define("Ext.pivot.d3.TreeMap",{extend:"Ext.d3.hierarchy.TreeMap",xtype:"pivottreemap",requires:["Ext.pivot.matrix.Local","Ext.pivot.matrix.Remote"],config:{autoExpand:true,matrix:{type:"local",rowGrandTotalsPosition:"none",colGrandTotalsPosition:"none"},store:{type:"tree",fields:["name","value",{name:"records",type:"int"}],root:{expanded:true,name:"Root",children:[]}},nodeValue:function(a){return a.data.value},colorAxis:{scale:{range:["#E45649","#ECECEC","#50A14F"]},processor:function(a,d,b,c){return b.isLeaf()?d(b.data.value):"#ececec"}}},destroy:function(){this.setMatrix(null);this.callParent()},applyMatrix:function(a){if(a){if(!a.isPivotMatrix){if(!a.type){a.type="local"}a.cmp=this;a=Ext.Factory.pivotmatrix(a)}}return a},updateMatrix:function(b,a){var c=this;Ext.destroy(a,c.matrixListeners);c.matrixListeners=null;if(b){c.matrixListeners=b.on({done:c.onMatrixDataReady,scope:c,destroyable:true})}},onMatrixDataReady:function(c){var d=this,g=d.getColorAxis(),b=c.aggregate,a=d.getStore().getRoot(),f;if(b.getCount()&&g){f=b.getAt(0).getId();g.setField(f)}var e=d.getTreeStoreData(c.leftAxis.getTree(),f);if(a){a.removeAll();a.appendChild(e)}d.performLayout()},getTreeStoreData:function(k,f){var e=[],g=this.getMatrix(),c=this.getAutoExpand(),b,d,h,a,j;if(k&&g){d=k.length;for(b=0;b<d;b++){h=k[b];j=g.results.get(h.key,g.grandTotalKey);if(j){a={path:h.key,name:h.name,value:j?j.getValue(f):null,records:j&&j.records?j.records.length:0};if(h.children){a.children=this.getTreeStoreData(h.children,f);a.expanded=c}else{a.leaf=true}e.push(a)}}}return e}});Ext.define("Ext.pivot.d3.Container",{extend:"Ext.pivot.d3.AbstractContainer",xtype:"pivotd3container",config:{configurator:{id:"configurator",type:"pivotconfigurator"}},initialize:function(){this.addDrawing();this.callParent()}});