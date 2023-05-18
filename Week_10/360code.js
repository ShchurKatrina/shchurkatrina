import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var cube, lightTwo, torus, renderer, scene, camera, controls;

const button = document.getElementById("start");
button.addEventListener("click", start);

function start()
{
	button.style.display = "none";
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor(0xeeeeee, 1);
	document.body.appendChild( renderer.domElement );
	controls = new OrbitControls( camera, renderer.domElement );
	
	var lightOne=new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(lightOne);
	lightOne.position.set(10, 10, 10);

	const loader = new GLTFLoader();

	loader.load( '../Models/interdimensional_floating_islands.glb', function ( home ) {

	scene.add( home.scene );

	}, function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	}, function ( error ) {

	console.error( error );

	} );

	camera.position.z = 20;
	controls.update();

	animate();
}

function animate()
{
	requestAnimationFrame( animate);

	controls.update();

	renderer.render( scene, camera);
}
