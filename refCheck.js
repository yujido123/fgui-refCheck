/**
 * npm i xpath
 * npm i xmldom
 */
 const fs = require("fs")
 const pt = require("path")
 const xp = require("xpath")
 const xdom = require("xmldom").DOMParser;
 const getRef = fp => {
     let res={},uses={},lds=[],f,nds,xd=new xdom();
     function iteFs(path) {
       let allF = fs.readdirSync(path)
       allF.forEach(function(item, index) {
         let fPath = pt.join(path, item)
         let stat = fs.statSync(fPath) 
         stat.isDirectory() && iteFs(fPath);
         stat.isFile() && item.endsWith(".xml") && cheRef(fPath);
       })
     }
     function cheRef(path){
       let doc = xd.parseFromString(fs.readFileSync(path,"utf-8"));     
       if(path.endsWith("package.xml")){
         nds = xp.select("//image",doc);
         for(let n of nds) res[n.attributes[0].nodeValue] = n.attributes[1].nodeValue;
       }else{
         let imgs=xp.select("//@src",doc),loads=xp.select("//@url",doc),gears=xp.select("//gearIcon//@values",doc),grs=xp.select("//gearIcon//@default",doc),icons=xp.select("//@icon",doc);
         for(e of loads) lds.push(e.nodeValue);
         for(e of gears) lds.push(e.nodeValue);
         for(e of grs) lds.push(e.nodeValue);
         for(e of icons) lds.push(e.nodeValue);
         for(e of imgs) uses[e.nodeValue] || (uses[e.nodeValue]=1);
       }
     }
     iteFs(fp)
     for(let k in res){
       f = false;
       for(let l of lds){if(l.indexOf(k)!=-1){f = true; break;}}
       !f && !uses[k] && console.log(res[k]);
     }
 }
 getRef("assets")
   