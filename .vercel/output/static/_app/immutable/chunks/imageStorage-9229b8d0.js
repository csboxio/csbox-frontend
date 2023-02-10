import{s as E}from"./supabaseClient-70197f8c.js";import"./index-28f47c29.js";import"./index-2bc87171.js";var F={},R={get exports(){return F},set exports(r){F=r}};(()=>{var r={d:(t,u)=>{for(var o in u)r.o(u,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:u[o]})},o:(t,u)=>Object.prototype.hasOwnProperty.call(t,u),r:t=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},s={};function m(t,u){for(var o=0;o<u.length;o++){var e=u[o];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}r.r(s),r.d(s,{default:()=>f});var l=function(){function t(){(function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")})(this,t)}var u,o;return u=t,o=[{key:"changeHeightWidth",value:function(e,n,a,g,c,d){return a>g&&(e=Math.round(e*g/a),a=g),e>n&&(a=Math.round(a*n/e),e=n),c&&a<c&&(e=Math.round(e*c/a),a=c),d&&e<d&&(a=Math.round(a*d/e),e=d),{height:e,width:a}}},{key:"resizeAndRotateImage",value:function(e,n,a,g,c){var d=arguments.length>5&&arguments[5]!==void 0?arguments[5]:"jpeg",w=arguments.length>6&&arguments[6]!==void 0?arguments[6]:100,i=arguments.length>7&&arguments[7]!==void 0?arguments[7]:0,P=w/100,p=document.createElement("canvas"),v=e.width,y=e.height,b=this.changeHeightWidth(y,a,v,n,g,c);!i||i!==90&&i!==270?(p.width=b.width,p.height=b.height):(p.width=b.height,p.height=b.width),v=b.width,y=b.height;var h=p.getContext("2d");return h.fillStyle="rgba(0, 0, 0, 0)",h.fillRect(0,0,v,y),h.imageSmoothingEnabled&&h.imageSmoothingQuality&&(h.imageSmoothingQuality="high"),i&&(h.rotate(i*Math.PI/180),i===90?h.translate(0,-p.width):i===180?h.translate(-p.width,-p.height):i===270?h.translate(-p.height,0):i!==0&&i!==360||h.translate(0,0)),h.drawImage(e,0,0,v,y),p.toDataURL("image/".concat(d),P)}},{key:"b64toByteArrays",value:function(e,n){for(var a=atob(e.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/,"")),g=[],c=0;c<a.length;c+=512){for(var d=a.slice(c,c+512),w=new Array(d.length),i=0;i<d.length;i++)w[i]=d.charCodeAt(i);var P=new Uint8Array(w);g.push(P)}return g}},{key:"b64toBlob",value:function(e,n){var a=this.b64toByteArrays(e,n);return new Blob(a,{type:n,lastModified:new Date})}},{key:"b64toFile",value:function(e,n,a){var g=this.b64toByteArrays(e,a);return new File(g,n,{type:a,lastModified:new Date})}},{key:"createResizedImage",value:function(e,n,a,g,c,d,w){var i=arguments.length>7&&arguments[7]!==void 0?arguments[7]:"base64",P=arguments.length>8&&arguments[8]!==void 0?arguments[8]:null,p=arguments.length>9&&arguments[9]!==void 0?arguments[9]:null,v=new FileReader;if(!e)throw Error("File Not Found!");if(e.type&&!e.type.includes("image"))throw Error("File Is NOT Image!");v.readAsDataURL(e),v.onload=function(){var y=new Image;y.src=v.result,y.onload=function(){var b=t.resizeAndRotateImage(y,n,a,P,p,g,c,d),h="image/".concat(g);switch(i){case"blob":var j=t.b64toBlob(b,h);w(j);break;case"base64":w(b);break;case"file":var k=e.name.toString().replace(/(png|jpeg|jpg|webp)$/i,"").concat(g.toString()),A=t.b64toFile(b,k,h);w(A);break;default:w(b)}}},v.onerror=function(y){throw Error(y)}}}],o&&m(u,o),t}();const f={imageFileResizer:function(t,u,o,e,n,a,g,c,d,w){return l.createResizedImage(t,u,o,e,n,a,g,c,d,w)}};R.exports=s})();const M=r=>new Promise(s=>{F.imageFileResizer(r,100,100,"JPEG",90,0,m=>{s(m)},"blob")});let S=!1;const I=async r=>{const{data:s}=await E.storage.from("avatars").remove(r);s!=null};async function _(r){{const s=r[0];return await M(s)}}const C=async(r,s,m,l)=>{try{if(!r||r.length===0)throw new Error("You must select an image to upload.");const f=`${l.id+"/"+l.id+"_profileImage"}.JPEG`;await I(f);const t=await _(r),{error:u}=await E.storage.from("avatars").upload(f,t),{data:o}=E.storage.from("avatars").getPublicUrl(f);await z(o.publicUrl,l)}catch(f){f instanceof Error&&alert(f.message)}},D=async(r,s,m,l,f)=>{try{if(S=!0,!r||r.length===0)throw new Error("You must select an image to upload.");const t=`${l+"/icon_courseImage"}.JPEG`;await I(t);const u=await _(r),{error:o}=await E.storage.from("courses").upload(t,u),{data:e}=E.storage.from("courses").getPublicUrl(t);await O(e.publicUrl,l,f),S=!1}catch(t){t instanceof Error&&alert(t.message)}};async function z(r,s){try{S=!0;const m={id:s.id,avatar_url:r,updated_at:new Date},{error:l}=await E.from("users").upsert(m);if(l)throw l}catch(m){m instanceof Error&&alert(m.message)}finally{S=!1}}async function O(r,s,m){try{const l={id:s,inserted_at:new Date,created_by:m.id,course_image_url:r},{error:f}=await E.from("courses").upsert(l).eq("created_by",m.id).eq("id",s);if(f)throw f}catch(l){l instanceof Error&&alert(l.message)}finally{S=!1}}export{D as a,C as u};