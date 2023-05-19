import * as THREE from "https://unpkg.com/three@0.152.2/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const texture1 = new THREE.TextureLoader().load("../assets/textures/2k_sun.jpg"); 
const materialTexture1 = new THREE.MeshBasicMaterial( { map:texture1 } );
const texture2 = new THREE.TextureLoader().load("../assets/textures/2k_neptune.jpg"); 
const materialTexture2 = new THREE.MeshBasicMaterial( { map:texture2 } );
const texture3 = new THREE.TextureLoader().load("../assets/textures/2k_uranus.jpg"); 
const materialTexture3 = new THREE.MeshBasicMaterial( { map:texture3 } );
const texture4 = new THREE.TextureLoader().load("../assets/textures/2k_venus.jpg"); 
const materialTexture4 = new THREE.MeshBasicMaterial( { map:texture4 } );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xeeeeee, 1);

document.body.appendChild( renderer.domElement );

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), materialTexture1 );
sphere.position.set(0, 0, 0);
scene.add( sphere );

const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), materialTexture2);
scene.add( sphere1 );

const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), materialTexture3);
scene.add( sphere2 );

const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), materialTexture4);
scene.add( sphere3 );

const torus1 = new THREE.Mesh(new THREE.TorusGeometry( 10, 0.05, 16, 100 ), new THREE.MeshBasicMaterial( { color: 0x0 } )); 
scene.add( torus1 );

const torus2 = new THREE.Mesh(new THREE.TorusGeometry( 50, 0.05, 16, 100 ), new THREE.MeshBasicMaterial( { color: 0x0 } )); 
scene.add( torus2 );

const torus3 = new THREE.Mesh(new THREE.TorusGeometry( 100, 0.05, 16, 100 ), new THREE.MeshBasicMaterial( { color: 0x0 } )); 
scene.add( torus3 );

camera.position.z = 120;

let t=0;

let timer=new THREE.Clock();

function animate()
	{

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

		requestAnimationFrame( animate);
		renderer.render( scene, camera);
	}

animate();

