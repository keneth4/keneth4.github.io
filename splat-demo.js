const host = document.querySelector('#splat-canvas');
const poster = document.querySelector('.demo-poster');
const start = document.querySelector('#demo-start');
const reset = document.querySelector('#demo-reset');
const back = document.querySelector('#demo-back');
const label = document.querySelector('#demo-button-text');
const status = document.querySelector('#demo-status');
const caption = document.querySelector('#demo-caption');
const words = {
 es:{start:'Explorar en 3D',loading:'Cargando experiencia…',ready:'Arrastra para explorar el plato. También puedes usar las flechas del teclado.',reset:'Restablecer vista',back:'Ver sitio',failed:'No se pudo abrir la experiencia. Puedes explorar el sitio de AMPM.',caption:'AM:PM — Un plato real, convertido en una experiencia 3D'},
 en:{start:'Explore in 3D',loading:'Loading experience…',ready:'Drag to explore the dish. You can also use the keyboard arrows.',reset:'Reset view',back:'View website',failed:'The experience could not load. You can explore the AMPM website.',caption:'AM:PM — A real dish, turned into a 3D experience'},
 de:{start:'In 3D erkunden',loading:'Erlebnis wird geladen…',ready:'Ziehe, um das Gericht zu erkunden. Du kannst auch die Pfeiltasten verwenden.',reset:'Ansicht zurücksetzen',back:'Website ansehen',failed:'Das Erlebnis konnte nicht geladen werden. Besuche die AMPM-Website.',caption:'AM:PM — Ein echtes Gericht als 3D-Erlebnis'},
 ja:{start:'3Dで見る',loading:'読み込み中…',ready:'ドラッグまたはキーボードの矢印で料理を探索できます。',reset:'視点をリセット',back:'サイトを見る',failed:'読み込めませんでした。AMPMのサイトをご覧ください。',caption:'AM:PM — 実際の料理から生まれた3D体験'}
};
let state='idle',viewer,visible=true;
const text=()=>words[document.documentElement.lang]||words.es;
function updateText(){const t=text();host.querySelector('canvas')?.setAttribute('aria-label',t.ready);label.textContent=state==='loading'?t.loading:t.start;reset.textContent=t.reset;back.textContent=t.back;status.textContent=state==='active'?t.ready:state==='failed'?t.failed:state==='loading'?t.loading:'';caption.textContent=state==='active'?t.caption:({es:'AM:PM — Sitio web y menú interactivo',en:'AM:PM — Website & interactive menu',de:'AM:PM — Website & interaktive Speisekarte',ja:'AM:PM — ウェブサイトとインタラクティブメニュー'})[document.documentElement.lang]||'';}
new MutationObserver(updateText).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
function show(active){host.hidden=!active;poster.hidden=active;start.hidden=active;reset.hidden=!active;back.hidden=!active;state=active?'active':'idle';updateText();}
async function createViewer(){
 const [THREE,{SparkRenderer,SplatMesh},{OrbitControls}] = await Promise.all([import('./assets/vendor/three.module.js'),import('./assets/vendor/spark.module.js'),import('./assets/vendor/OrbitControls.js')]);
 const renderer=new THREE.WebGLRenderer({antialias:false,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor('#ECE7FF');
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(40,1,.01,1000);host.append(renderer.domElement);renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label',text().ready);
 const spark=new SparkRenderer({renderer});scene.add(spark);
 const mesh=new SplatMesh({url:'./assets/rework/ampm-huevos.spz'});scene.add(mesh);await mesh.initialized;
 // Robust crop from actual splat centers avoids a few reconstruction outliers controlling the view.
 const axes=[[],[],[]];mesh.forEachSplat((index,center,scales,quaternion,opacity)=>{if(index%16===0&&opacity>.2){axes[0].push(center.x);axes[1].push(center.y);axes[2].push(center.z);}});
 const lo=[],hi=[];axes.forEach((a,i)=>{a.sort((x,y)=>x-y);lo[i]=a[Math.floor(a.length*.015)];hi[i]=a[Math.floor(a.length*.985)];});
 let box=mesh.getBoundingBox();if(axes[0].length)box=new THREE.Box3(new THREE.Vector3(...lo),new THREE.Vector3(...hi));
 const center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());mesh.rotation.x=Math.PI;mesh.position.copy(center.applyQuaternion(mesh.quaternion).multiplyScalar(-1));
 const radius=Math.max(size.x,size.y,size.z),distance=radius*1.65;camera.position.set(0,distance*.65,distance);camera.lookAt(0,0,0);camera.near=Math.max(.001,radius/1000);camera.far=radius*100;camera.updateProjectionMatrix();
 const controls=new OrbitControls(camera,renderer.domElement);controls.enablePan=false;controls.enableDamping=!matchMedia('(prefers-reduced-motion: reduce)').matches;controls.dampingFactor=.12;controls.enableZoom=false;controls.minPolarAngle=Math.PI/6;controls.maxPolarAngle=Math.PI*5/12;controls.minAzimuthAngle=-Math.PI/4;controls.maxAzimuthAngle=Math.PI/4;controls.update();controls.saveState();
 const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};new ResizeObserver(resize).observe(host);resize();
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});observer.observe(host);
 let previous=0;renderer.setAnimationLoop(time=>{if(state!=='active'||!visible||document.hidden||time-previous<33)return;previous=time;controls.update();renderer.render(scene,camera);});
 renderer.domElement.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key))return;event.preventDefault();if(event.key==='Home'){controls.reset();return;}const spherical=new THREE.Spherical().setFromVector3(camera.position);spherical.theta=THREE.MathUtils.clamp(spherical.theta+(event.key==='ArrowLeft'?.12:event.key==='ArrowRight'?-.12:0),controls.minAzimuthAngle,controls.maxAzimuthAngle);spherical.phi=THREE.MathUtils.clamp(spherical.phi+(event.key==='ArrowUp'?-.1:event.key==='ArrowDown'?.1:0),controls.minPolarAngle,controls.maxPolarAngle);camera.position.setFromSpherical(spherical);controls.update();});
 return {reset:()=>controls.reset(),resize};
}
start.addEventListener('click',async()=>{if(state==='loading')return;state='loading';start.disabled=true;updateText();try{host.hidden=false;viewer??=await createViewer();show(true);viewer.resize();}catch(error){console.error('SPZ demo:',error);host.hidden=true;host.replaceChildren();state='failed';updateText();}finally{start.disabled=false;}});
reset.addEventListener('click',()=>viewer?.reset());back.addEventListener('click',()=>show(false));updateText();
