var scene, camera, renderer;
var arToolkitSource, arToolkitContext;

let sphere, sphere1, sphere2, sphere3, torus1, torus2, torus3;

document.addEventListener("DOMContentLoaded", initialize);

function initialize()
{
	scene = new THREE.Scene();

	let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.5 );
	scene.add( ambientLight );
				
	camera = new THREE.Camera();
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha: true
	});

	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////


	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
		sourceWidth: 1280,
		sourceHeight: 720,
		// resolution displayed for the source
		displayWidth: 1280,
		displayHeight: 720
	});

	function onResize()
	{
		arToolkitSource.onResizeElement();
		arToolkitSource.copyElementSizeTo(renderer.domElement);
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)	
		}	
	}

	arToolkitSource.init(onResize);
	
	// handle resize event
	window.addEventListener('resize', function(){
		onResize();
	});
	
	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////	

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: '../assets/camera_para.dat',
		detectionMode: 'mono'
	});
	
	// copy projection matrix to camera when initialization complete
	arToolkitContext.init(() => {
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	});

	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////

	let markerHiro = new THREE.Group();

	scene.add(markerHiro);

	let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerHiro, {
			type : 'pattern', patternUrl : "../assets/markers/pattern-hiro.patt",
		});
	
	const texture1 = new THREE.TextureLoader().load("../assets/textures/2k_sun.jpg"); 
	const materialTexture1 = new THREE.MeshBasicMaterial( { map:texture1 } );
	const texture2 = new THREE.TextureLoader().load("../assets/textures/2k_neptune.jpg"); 
	const materialTexture2 = new THREE.MeshBasicMaterial( { map:texture2 } );
	const texture3 = new THREE.TextureLoader().load("../assets/textures/2k_uranus.jpg"); 
	const materialTexture3 = new THREE.MeshBasicMaterial( { map:texture3 } );
	const texture4 = new THREE.TextureLoader().load("../assets/textures/2k_venus.jpg"); 
	const materialTexture4 = new THREE.MeshBasicMaterial( { map:texture4 } );
	
	sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), materialTexture1 );
	sphere.position.set(0, 0, 0);
	
	sphere1 = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), materialTexture2);
	
	sphere2 = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), materialTexture3);

	sphere3 = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), materialTexture4);
	
	torus1 = new THREE.Mesh(new THREE.TorusGeometry( 10, 0.05, 16, 100 ), new THREE.MeshBasicMaterial( { color: 0x0 } )); 
	
	torus2 = new THREE.Mesh(new THREE.TorusGeometry( 50, 0.05, 16, 100 ), new THREE.MeshBasicMaterial( { color: 0x0 } )); 
	
	torus3 = new THREE.Mesh(new THREE.TorusGeometry( 100, 0.05, 16, 100 ), new THREE.MeshBasicMaterial( { color: 0x0 } )); 
	
	let group = new THREE.Group();
	group.add(sphere);
	group.add(sphere1);
	group.add(sphere2);
	group.add(sphere3);
	group.add(torus1);
	group.add(torus2);
	group.add(torus3);
	scene.add(group);

	group.scale.set(0.5, 0.5, 0.5);
	group.rotation.set(-Math.PI/2, -Math.PI/4, 0);

	markerHiro.add(group);
	animate();
	
	camera.position.set(0, 0, 120);

}

let t=0;

let timer=new THREE.Clock();

function animate()
{
	requestAnimationFrame(animate);

	const r1 =10, r2=50, r3=100;
	t += timer.getDelta();
	
	const x1=r1*Math.cos(0.9*t);
	const y1=r1*Math.sin(0.9*t);

	const x2=r2*Math.cos(t);
	const y2=r2*Math.sin(t);

	const x3=r3*Math.cos(t*1.2);
	const y3=r3*Math.sin(t*1.2);

	sphere1.position.set(x1, y1, 0);
	sphere2.position.set(x2, y2, 0);
	sphere3.position.set(x3, y3, 0);

	if ( arToolkitSource.ready !== false )
		arToolkitContext.update( arToolkitSource.domElement );
	renderer.render( scene, camera );
}

