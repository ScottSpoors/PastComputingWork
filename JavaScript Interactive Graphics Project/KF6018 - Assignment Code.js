//Importing the three.js library and OrbitControls to allow camera movement
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

//Initialise the world scene, initialise camera and set its inital position, and initialise renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100,window.innerWidth / window.innerHeight, 1, 2000);
camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 50;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

//Enable the use of shadows within the scene
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

//Initialise a set of variables that will be needed later in the code
var lightson = false;
var snowfall=false;
var snowspread = 125;
var daytime = true;
var smoking = false;
var snowmanstage = 0;

//Setting orbit controls to be linked with the camera object and setting the controls initial target
var controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();



//Creating the geometry for the floor of the world
var geofloor = new THREE.CircleGeometry(150,150);

//Loading the textures needed for the snow floor and its normal map
const texture = new THREE.TextureLoader().load( "./maps/snow01.png" );
const normaltexture = new THREE.TextureLoader().load( "./maps/SnowNormalMap.png" );

//Setting the snow texture to be repeated across the surface of the floor geometry 
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
var wrap = 16;
texture.repeat.set(wrap,wrap);

//Creating the material for the floor, assigning a shininess value lower than default and assigning the texture and normal maps to it
var matfloor = new THREE.MeshPhongMaterial({map:texture,normalMap: normaltexture, side: THREE.DoubleSide, shininess:10});
var meshfloor = new THREE.Mesh(geofloor,matfloor);

//Setting the floor to display shadows of other objects reflecting onto it, adding the floor to the scene and setting its position and correct rotation to be horizontally flat
meshfloor.receiveShadow = true;
scene.add(meshfloor);
meshfloor.rotation.x = Math.PI/2;
meshfloor.position.y = -4; 



//Creating the material, geometry, and mesh for the trunk of the Christmas tree and setting it to both cast shadows and display shadows of other objects
var trunkgeo = new THREE.CylinderGeometry(3,1.5,7,32);
var trunkmat = new THREE.MeshPhongMaterial({color: 0x382101, shininess:30}); 
var meshtrunk = new THREE.Mesh(trunkgeo,trunkmat);
meshtrunk.castShadow = true;
meshtrunk.receiveShadow = true;
scene.add(meshtrunk);

//Change the scale of the entire tree, all decorations, and presents under the tree due to the hierarchy of the objects
meshtrunk.scale.set(2,2,2);

//Sets the trunk - and therefore the rest of the tree - to inherit its location values from the floor object
meshtrunk.parent = meshfloor;
meshtrunk.rotation.x =  -90*(Math.PI/180);

//Sets the tree's position so that the bottom of the tree will always be perfectly in line with the floor no matter how the tree's scale changes
meshtrunk.position.z = -((meshtrunk.geometry.parameters.height/2)*meshtrunk.scale.z); 



//Creates the 3D model for the lowest cone of the Christmas tree and sets it to cast shadows but not receive them
var conerad = 7;
var geocone = new THREE.ConeGeometry(conerad,conerad*2-4,6);
var matcone = new THREE.MeshPhongMaterial({color:0x0c4501, shininess:30});
var meshcone = new THREE.Mesh(geocone,matcone);
meshcone.castShadow = true;
scene.add(meshcone);

//Sets this bottom cone to be a child of the trunk object and sets its vertical position relative to that trunk
meshcone.parent = meshtrunk;
meshcone.position.y = 5;

//Decrements the radius value of the next cone to use this variable
conerad--;



//Creates the 3D model for the second cone of the Christmas tree and sets it to cast shadows but not receive them
var geocone2 = new THREE.ConeGeometry(conerad,conerad*2-4,6);
var meshcone2 = new THREE.Mesh(geocone2,matcone);
meshcone2.castShadow = true;
scene.add(meshcone2);

//Sets this second cone to be a child of the bottom cone object and sets its vertical position relative to that cone
meshcone2.parent = meshcone;
meshcone2.position.y = 3;

//Decrements the radius value of the next cone to use this variable
conerad--;



//Creates the 3D model for the third cone of the Christmas tree and sets it to cast shadows but not receive them
var geocone3 = new THREE.ConeGeometry(conerad,conerad*2-4,6);
var meshcone3 = new THREE.Mesh(geocone3,matcone);
meshcone3.castShadow = true;
scene.add(meshcone3);

//Sets this third cone to be a child of the second cone object and sets its vertical position relative to that cone
meshcone3.parent = meshcone2;
meshcone3.position.y = 2;

//Decrements the radius value of the next cone to use this variable
conerad--;



//Creates the 3D model for the top cone of the Christmas tree and sets it to cast shadows but not receive them
var geocone4 = new THREE.ConeGeometry(conerad,conerad*1.5,6);
var meshcone4 = new THREE.Mesh(geocone4,matcone);
meshcone4.castShadow = true;
scene.add(meshcone4);

//Sets this top cone to be a child of the third cone object and sets its vertical position relative to that cone
meshcone4.parent = meshcone3;
meshcone4.position.y = 3;



//Creates the 3D model for the star decoration of the Christmas tree and sets it to cast shadows but not receive them
var geostar = new THREE.OctahedronGeometry(1,1);
var matstar = new THREE.MeshPhongMaterial({color:0x917613, transparent: true, opacity:0.8});
var meshstar = new THREE.Mesh(geostar,matstar);
meshstar.castShadow = true;
scene.add(meshstar);

//Sets this star object to be a child of the top cone object and sets its vertical position relative to that cone
meshstar.parent = meshcone4;
meshstar.position.y = 3.5;

//Creates the light object that will illuminate the star object on top of the tree and makes this light invisible to begin with
var starlight = new THREE.PointLight( 0xc9a202, 20,5);
scene.add(starlight);
starlight.visible = false;

//Makes this light a child of the star object
starlight.parent = meshstar;
starlight.position.y = 0;



//Initialises an array of possible colours for the Christmas tree decorations to be
var baublecolors = [];
baublecolors[0] = 0x9c141f;
baublecolors[1] = 0x0f80db;
baublecolors[2] = 0xcc9b08;
baublecolors[3] = 0xe8e7e6;
baublecolors[4] = 0x5c03a1;
baublecolors[5] = 0xe88710;

//Initialises two arrays to store information about the variours tree decorations and the light associated with these
var baubles = [];
var baublelights = [];

//Initialises the geometry to be used by all of the tree decorations (other than the star)
var geobauble = new THREE.SphereGeometry(.6,10,10);


//Loops 17 times to create a set of tree decoration objects with colours randomly assigned from the above colour array which are added to an array
//with accordingly coloured lights being created and assigned to the same numeric location as the according decoration
//and with the deocrations being declared children of the lower cone of the tree and the lights being assigned as children of the accordingly numbered decorations
for (let i = 0; i< 17; i++) {
    var rand = THREE.MathUtils.randInt(0,5);
    var matbauble = new THREE.MeshPhongMaterial({color:baublecolors[rand],transparent: true, opacity:0.95});
    baubles[i] = new THREE.Mesh(geobauble,matbauble);
    scene.add(baubles[i]);
	baubles[i].parent = meshcone;
	var baublelight = new THREE.PointLight( baublecolors[rand], 10,10);
	baublelights[i] = baublelight;
	baublelights[i].visible = false;
	scene.add(baublelights[i]);
	baublelights[i].parent = baubles[i];
}

//Sets the positions of all of the decorations in the array relative to the location of the lower cone of the tree
baubles[0].position.set(4,-1,4);
baubles[1].position.set(2,4.25,2.6);
baubles[2].position.set(-2,3.5,3);
baubles[3].position.set(-2,3.5,-2.6);
baubles[4].position.set(-3,-2.75,4.25);
baubles[5].position.set(2,-1.85,4);
baubles[6].position.set(1,2,4.6);
baubles[7].position.set(-3.2,4,-0.3);
baubles[8].position.set(-4,0.75,1.2);
baubles[9].position.set(-1,2,-4.6);
baubles[10].position.set(-3,-2.75,-4.25);
baubles[11].position.set(-5.2,-3.15,-1.8);
baubles[12].position.set(3.7,-0.6,-3.75);
baubles[13].position.set(4.5,1.5,-1.45);
baubles[14].position.set(3,3,-3.25);
baubles[15].position.set(2,-2.3,-4.3);
baubles[16].position.set(4.7,-2.6,-1.6);


//Creates an array of loaded in textures of various wrapping paper designs to be used for present objects underneath the tree
var presentmaps = [];
presentmaps[0] = new THREE.MeshPhongMaterial( {
    map: new THREE.TextureLoader().load( './maps/wrapping1.jpg')
} );
presentmaps[1] = new THREE.MeshPhongMaterial( {
    map: new THREE.TextureLoader().load( './maps/wrapping2.jpg')
} );
presentmaps[2] = new THREE.MeshPhongMaterial( {
    map: new THREE.TextureLoader().load( './maps/wrapping3.jpg')
} );
presentmaps[3] = new THREE.MeshPhongMaterial( {
    map: new THREE.TextureLoader().load( './maps/wrapping4.jpg')
} );
presentmaps[4] = new THREE.MeshPhongMaterial( {
    map: new THREE.TextureLoader().load( './maps/wrapping5.jpg')
} );



//Creates a series of 7 gift objects with randomly assigned sizes and texture maps, adding these in turn to an array and setting them to cast and receive shadows
var treepresents = [];

for (let i = 0; i < 7; i++) {
	var randmap = THREE.MathUtils.randInt(0,4);
	var matpresent = presentmaps[randmap];
	var randsize = THREE.MathUtils.randFloat(1.5, 3.25);
	var geopresent = new THREE.BoxGeometry(randsize,randsize,randsize);
	treepresents[i] = new THREE.Mesh(geopresent,matpresent);
	treepresents[i].castShadow = true;
	treepresents[i].receiveShadow = true;
	scene.add(treepresents[i]);
	//Setting the gifts to be child objects of the trunk of the tree and setting their vertical position to always be in line with the floor no matter the gift's scale
	treepresents[i].parent = meshtrunk;
	treepresents[i].position.y = -(meshtrunk.geometry.parameters.height/2)+(treepresents[i].geometry.parameters.height/2);
}


//Sets the horizontal positions of all of the presents and alters their rotation to make them appear more naturally placed under the tree
treepresents[0].position.x = 4.75;
treepresents[0].rotation.y = 15*(Math.PI/180);
treepresents[0].position.z = 1.6;

treepresents[1].position.x = 2.3;
treepresents[1].rotation.y = 7*(Math.PI/180);
treepresents[1].position.z = 4.2;

treepresents[2].position.x = -4.15;
treepresents[2].rotation.y = 27*(Math.PI/180);
treepresents[2].position.z = -1.8;

treepresents[3].position.x = -3.2;
treepresents[3].rotation.y = 42*(Math.PI/180);
treepresents[3].position.z = 1.4;

treepresents[4].position.x = -1.5;
treepresents[4].rotation.y = 21*(Math.PI/180);
treepresents[4].position.z = -4.6;

treepresents[5].position.x = 3.75;
treepresents[5].rotation.y = 17*(Math.PI/180);
treepresents[5].position.z = -3.4;

treepresents[6].position.x = -1.6;
treepresents[6].rotation.y = -65*(Math.PI/180);
treepresents[6].position.z = 3.9;


//Initialises an array of 2000 small 2D circle objects to act as snowflakes with randomly assigned size, starting position in the sky, and speed at which they will fall
//in order to make the snowfall feel more realistic
var matsnow = new THREE.MeshBasicMaterial({color: 0xfaf9f7, side: THREE.DoubleSide});
var snowflakes = [];
var snowflakespeed = [];
for (let i = 0; i < 2000; i++) {
	var geosnow = new THREE.CircleGeometry(THREE.MathUtils.randFloat(.1,.6),7);
	snowflakes[i] = new THREE.Mesh(geosnow,matsnow);
	snowflakes[i].position.x = THREE.MathUtils.randFloat(-snowspread,snowspread)
	snowflakes[i].position.y = THREE.MathUtils.randFloat(175,250);
	snowflakes[i].position.z = THREE.MathUtils.randFloat(-snowspread,snowspread);
	snowflakespeed[i] = THREE.MathUtils.randFloat(0.1,0.3);
}



//Creates the sphere object used for the skybox, importing the texture needed and only having this texture be visible on the inside of the sphere
var geoskybox = new THREE.SphereGeometry(150,64,32);
var skytexture = new THREE.TextureLoader().load( "./maps/snowy_park.jpg" );
var matskybox = new THREE.MeshPhongMaterial({map:skytexture,side:THREE.BackSide});
var skybox = new THREE.Mesh(geoskybox,matskybox);
scene.add(skybox);
//Setting this skybox to be a child of the floor object so that it will move/scale accordinglt if the dimensions/position of the floor is altered
skybox.parent = meshfloor;
skybox.rotation.x =  -90*(Math.PI/180);



//Initialises the code needed for the creation of the three snowballs to make up the snowman's body
var snowrad = 5;
var snowman = [];
var geosnowball1 = new THREE.SphereGeometry(snowrad,48,24);
var geosnowball2 = new THREE.SphereGeometry(snowrad-1,48,24);
var geosnowball3 = new THREE.SphereGeometry(snowrad-2,48,24);
var matsnowball = new THREE.MeshPhongMaterial({color:0xffffff});
var snowball1 = new THREE.Mesh(geosnowball1,matsnowball);
snowman[0] = snowball1;
snowball1.position.set(80,0,10);
snowrad-=1;
var snowball2 = new THREE.Mesh(geosnowball2,matsnowball);
snowman[1] = snowball2;
snowrad-=1;
var snowball3 = new THREE.Mesh(geosnowball3,matsnowball);
snowman[2] = snowball3;
snowball1.castShadow = true;
snowball2.castShadow = true;
snowball3.castShadow = true;
scene.add(snowball1,snowball2,snowball3);
snowball1.parent = meshfloor;

//code to change snowman scale due to the object hierarchy of its body
var snowmanscale = 1.25;
snowball1.scale.set(snowmanscale,snowmanscale,snowmanscale);

//establishes the hierarchy of the snowball objects and sets the rotation of all snowman objects and its vertical position relative to the floor
//so that it will always be at the same vertical position regardless of the snowman's scale
snowball1.rotation.x =  -90*(Math.PI/180);
snowball1.rotation.y = -40*(Math.PI/180);
snowball1.position.z = -((snowball1.geometry.parameters.radius/2)*snowball1.scale.z); 
snowball2.parent = snowball1;
snowball2.position.y+=2*snowrad;
snowball3.parent = snowball2;
snowball3.position.y+=2*snowrad-1;

//creates the objects that make up the snowman's hat with appropriate positioning and hierarchy
var brimdepth = 0.5
var geobrim = new THREE.CylinderGeometry(2.75,2.75,brimdepth,30);
var geohat = new THREE.CylinderGeometry(1.75,1.75,3,30);
var matblack = new THREE.MeshPhongMaterial({color:0x000000});
var brim = new THREE.Mesh(geobrim,matblack);
snowman[3]=brim;
var hat = new THREE.Mesh(geohat,matblack);
snowman[4]=hat;
scene.add(brim,hat);
brim.castShadow = true;
hat.castShadow = true;
hat.parent = brim;
brim.parent = snowball3;
brim.position.y = snowrad-.5;
hat.position.y = 2*brimdepth;

//Creates the carrot object to be used for the snowman's nose with appropriate relative positioning
var geonose = new THREE.ConeGeometry(0.5,2,10);
var matnose = new THREE.MeshPhongMaterial({color:0xfc6603});
var nose = new THREE.Mesh(geonose,matnose);
snowman[5]=nose;
scene.add(nose);
nose.castShadow = true;
nose.parent = snowball3;
nose.rotation.x = Math.PI/2;
nose.position.z = snowrad+1;

//Creates an array of cylinder objects to be used as the eyes and button decorations on the snowman
var geobutton = new THREE.CylinderGeometry(0.3,0.3,0.3,16);
var buttons = [];
for (let i = 0; i < 5; i++) {
	buttons[i] = new THREE.Mesh(geobutton,matblack);
	snowman[6+i]=buttons[i];
	scene.add(buttons[i]);
	buttons[i].castShadow = true;
	buttons[i].rotation.x = Math.PI/2;
	if (i<3) {
		buttons[i].parent = snowball2;
	}
	else {
		buttons[i].parent = snowball3;
	}
}

//Sets the relative position and rotation of these button and eye objects
buttons[0].position.set(0,1,3.85);
buttons[1].position.set(0,0,4);
buttons[2].position.set(0,2,3.6);
buttons[2].rotation.x -= 20*(Math.PI/180);
buttons[3].position.set(1,1,2.8);
buttons[4].position.set(-1,1,2.8);

//Creates the objects used as the stick arms of the snowman, setting their appropriate relative positioning and rotation to look naturally added to the sides of the snowman
var geotwig = new THREE.CylinderGeometry(0.5,0.5,6,30);
var mattwig = new THREE.MeshPhongMaterial({color:0x592501});
var twigs = [];
for (let i = 0; i < 2; i++) { 
	twigs[i] = new THREE.Mesh(geotwig,mattwig);
	snowman[11+i]=twigs[i];
	scene.add(twigs[i]);
	twigs[i].castShadow = true;
	twigs[i].parent = snowball2;
}
twigs[0].rotation.z = 75*(Math.PI/180);
twigs[0].position.set(4,1,0);
twigs[1].rotation.z = -75*(Math.PI/180);
twigs[1].position.set(-4,1,0);


//Creates the object to act as the floor of the log cabin, assigning it a wood texture and appropriate normal map and setting it to be a child of the snow floor object
var geohutfloor = new THREE.BoxGeometry(25,1,25);
var mathutfloor = new THREE.MeshPhongMaterial( {
	map: new THREE.TextureLoader().load( './maps/wood-floor.jpg'),
	normalMap: new THREE.TextureLoader().load( './maps/WoodFloorNormalMap.png')
} );
var meshhutfloor = new THREE.Mesh(geohutfloor,mathutfloor);
meshhutfloor.castShadow = true;
scene.add(meshhutfloor);
meshhutfloor.parent = meshfloor;
meshhutfloor.position.set(-100,0,0);
meshhutfloor.rotation.x = -90*(Math.PI/180);

//creates the geometry to be used for the log cabin walls with appropriate texture and normal maps
var geowall = new THREE.BoxGeometry(0.5,16,25);
var matwall = new THREE.MeshPhongMaterial( {
	map: new THREE.TextureLoader().load( './maps/wood-wall.jpg'),
	normalMap: new THREE.TextureLoader().load( './maps/WoodNormalMap.png')
} );
var hutwalls = [];

//iterates 4 times to create the 4 objects to act as the walls of the log cabin,making them child objects of the cabin floor
for (let i = 0; i < 4; i++) {
	var meshwall = new THREE.Mesh(geowall,matwall);
	hutwalls[i] = meshwall;
	hutwalls[i].castShadow = true;
	hutwalls[i].receiveShadow = true;
	scene.add(hutwalls[i]);
	hutwalls[i].parent = meshhutfloor;
}

//sets the relative positions and rotations of the walls based on the cabin floor to fully wall the cabin
hutwalls[0].position.set(-meshhutfloor.geometry.parameters.width/2-hutwalls[0].geometry.parameters.width/2,hutwalls[0].geometry.parameters.height/2,0);
hutwalls[1].position.set(meshhutfloor.geometry.parameters.width/2+hutwalls[1].geometry.parameters.width/2,hutwalls[1].geometry.parameters.height/2,0);
hutwalls[2].rotation.y = 90*(Math.PI/180);
hutwalls[2].position.set(0,hutwalls[2].geometry.parameters.height/2,meshhutfloor.geometry.parameters.width/2+hutwalls[2].geometry.parameters.width/2);
hutwalls[3].rotation.y = 90*(Math.PI/180);
hutwalls[3].position.set(0,hutwalls[3].geometry.parameters.height/2,-meshhutfloor.geometry.parameters.width/2-hutwalls[3].geometry.parameters.width/2);

//Sets the scale of all aspects of the cabin as they all inherit from the floor object and sets the cabin's position in the scene to appear more naturally placed
meshhutfloor.scale.set(1.5,1.5,1.5);
meshhutfloor.rotation.y = 35*(Math.PI/180);
meshhutfloor.position.x+=10;
meshhutfloor.position.y -= 10;

var roofpieces = [];

//Creates a custom geometry of a right-angled triangular prism to serve as the roof of the log cabin
var georoof = new THREE.Geometry(); 
	georoof.vertices.push(new THREE.Vector3(0,3,-0.125));  
	georoof.vertices.push(new THREE.Vector3(0,0,-0.125)); 
	georoof.vertices.push(new THREE.Vector3(2,0,-0.125));
	georoof.vertices.push(new THREE.Vector3(0,3,0.125));  
	georoof.vertices.push(new THREE.Vector3(0,0,0.125)); 
	georoof.vertices.push(new THREE.Vector3(2,0,0.125));
	georoof.faces.push(new THREE.Face3(0,1,2));
	georoof.faces.push(new THREE.Face3(3,4,5));
	georoof.faces.push(new THREE.Face3(0,2,5));
	georoof.faces.push(new THREE.Face3(0,3,5));
	
var matroof = new THREE.MeshPhongMaterial({color:0x000000,side:THREE.DoubleSide});

//Creates 2 objects using the custom geometry in order to create the two halves of the cabin roof, setting the appropriate scale so that the roof sits correctly atop the walls
for (let i = 0; i < 2; i++) {
	roofpieces[i] = new THREE.Mesh(georoof, matroof);
	scene.add(roofpieces[i]);
	roofpieces[i].parent = meshhutfloor;
	roofpieces[i].scale.set(8,3,115);
	roofpieces[i].position.y = hutwalls[0].geometry.parameters.height;
	
}
roofpieces[1].rotation.y = 180*(Math.PI/180);

//Creates a double sided plane geometry to act as the base of the roof
var georoofbase = new THREE.PlaneGeometry(roofpieces[0].scale.x*4,roofpieces[0].scale.z/4);
var meshroofbase = new THREE.Mesh(georoofbase,matroof);
scene.add(meshroofbase);
meshroofbase.parent = meshhutfloor;
meshroofbase.position.y = hutwalls[0].geometry.parameters.height;
meshroofbase.rotation.x = 90*(Math.PI/180);


//Creates 12 beam shaped objects in a cross pattern to act as the window frames of the cabin when split into 2 groups of 6 based on which object acts as the object's parent
var windowframe = [];
var geoframe = new THREE.BoxGeometry(30,2.5,1);
var matframe = new THREE.MeshPhongMaterial({color:0x4a2207});
for (let i = 0; i < 12; i++) {
	windowframe[i] = new THREE.Mesh(geoframe,matframe);
	scene.add(windowframe[i]);
	if (i==1 || i==3 || i==5 || i == 7 || i == 9 || i == 11) {
		windowframe[i].rotation.z = 90*(Math.PI/180);
	}
	if (i>0 && i<6) {
		windowframe[i].parent = windowframe[0];
	}
	else if (i>6) {
		windowframe[i].parent = windowframe[6];
	}
	else if (i==6){
		windowframe[i].parent = hutwalls[0];
	}	
	else{
		windowframe[i].parent = hutwalls[1];
	}
}

//Sets the relative positions of the beam objects in order to create the required cross pattern to form the 2 window frames
windowframe[0].position.set(windowframe[0].geometry.parameters.depth/2,0,0);
windowframe[2].position.set(0,windowframe[0].geometry.parameters.width/2-(windowframe[0].geometry.parameters.height/2),0);
windowframe[3].position.set(windowframe[0].geometry.parameters.width/2-(windowframe[0].geometry.parameters.height/2),0,0);
windowframe[4].position.set(0,(-(windowframe[0].geometry.parameters.width/2))+(windowframe[0].geometry.parameters.height/2),0);
windowframe[5].position.set((-(windowframe[0].geometry.parameters.width/2))+(windowframe[0].geometry.parameters.height/2),0,0);
windowframe[6].position.set(-windowframe[6].geometry.parameters.depth/2,0,0);
windowframe[8].position.set(0,windowframe[6].geometry.parameters.width/2-(windowframe[6].geometry.parameters.height/2),0);
windowframe[9].position.set(windowframe[6].geometry.parameters.width/2-(windowframe[6].geometry.parameters.height/2),0,0);
windowframe[10].position.set(0,(-(windowframe[6].geometry.parameters.width/2))+(windowframe[6].geometry.parameters.height/2),0);
windowframe[11].position.set((-(windowframe[6].geometry.parameters.width/2))+(windowframe[6].geometry.parameters.height/2),0,0);

//Sets the scale and rotation of the 2 window frames to correctly fit on the walls of the cabin
windowframe[0].scale.set(0.2,0.2,0.2);
windowframe[0].rotation.y = 90*(Math.PI/180);
windowframe[6].scale.set(0.2,0.2,0.2);
windowframe[6].rotation.y = -90*(Math.PI/180);

//Creates two black plane objects to sit between the cabin walls and the window frames to give the illusion of the inside of the cabin being dark
var geopane = new THREE.PlaneGeometry(windowframe[0].geometry.parameters.width,windowframe[0].geometry.parameters.width);
var matpane = new THREE.MeshBasicMaterial({color:0x000000});
var panes = [];
for (let i = 0; i < 2; i++) {
	panes[i] = new THREE.Mesh(geopane,matpane);
	scene.add(panes[i]);
}
panes[0].parent = windowframe[0];
panes[0].position.set(0,0,-(windowframe[0].geometry.parameters.depth/2));
panes[1].parent = windowframe[6];
panes[1].position.set(0,0,-(windowframe[0].geometry.parameters.depth/2));

//Creates two light objects linked to the window frame objects to give the illusion of lights turning on in the house when they are set to visible
var windowlights = [];
for (let i = 0; i < 2; i++) {
	windowlights[i] = new THREE.PointLight(0xe3c062, 0.3,50);
	windowlights[i].castShadow = true;
	scene.add(windowlights[i]);
	windowlights[i].visible = false;
}
windowlights[0].parent = windowframe[0];
windowlights[1].parent = windowframe[6];


//Creates the geometry and material for a small vertical wall object to act as pieces of the cabin chimney
var geochimney = new THREE.BoxGeometry(2,6,0.5);
var matchimney = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load( './maps/cobble-stone-texture.jpg'),
	normalMap: new THREE.TextureLoader().load( './maps/StoneNormalMap.png')
});
var chimney = [];

//loops 4 times in order to create the 4 sides of the cabin chimney
for (let i = 0; i < 4; i++) {
	chimney[i] = new THREE.Mesh(geochimney,matchimney);
	chimney[i].castShadow = true;
	scene.add(chimney[i]);
	if (i!=0) {
		chimney[i].parent = chimney[0];
	}
	else{
		chimney[i].parent = meshhutfloor;
	}
}

//Sets the relative rotation and positions of the 4 chimney pieces so the chimney is placed appropriately in part of the cabin roof
chimney[0].position.set(meshhutfloor.geometry.parameters.width/3,hutwalls[0].geometry.parameters.height+chimney[0].geometry.parameters.height,0);
chimney[1].rotation.y = 90*(Math.PI/180);
chimney[2].rotation.y = 90*(Math.PI/180);
chimney[1].position.set(-(chimney[0].geometry.parameters.width/2)-(chimney[1].geometry.parameters.depth/2),0,-chimney[1].geometry.parameters.width/2);
chimney[2].position.set(chimney[0].geometry.parameters.width/2+chimney[2].geometry.parameters.depth/2,0,-chimney[2].geometry.parameters.width/2);
chimney[3].position.set(0,0,-chimney[0].geometry.parameters.width);
var chimneyscale = 1.75;
chimney[0].scale.set(chimneyscale,chimneyscale,chimneyscale);
chimney[0].rotation.y = 90*(Math.PI/180);

/*
Creates 400 semi-transparent double sided circle objects to simulate plumes of smoke to flow out of the chimney,
setting each object to have a randomised position within the chimney as well as a randomised slightly different speed
in order to make the smoke coming out of the chimney appear more random and natural
*/
var matsmoke = new THREE.MeshBasicMaterial({color:0x3d3d3d,side:THREE.DoubleSide,transparent: true, opacity:0.3});
var smoke = [];
var smokespeed = [];
for (let i = 0; i < 400; i++) {
	var geosmoke = new THREE.CircleGeometry(THREE.MathUtils.randFloat(0.1, 0.4),8);
	smoke[i] = new THREE.Mesh(geosmoke,matsmoke);
	smoke[i].position.set(0,THREE.MathUtils.randFloat(-chimney[0].geometry.parameters.height-2,-chimney[0].geometry.parameters.height+2),-chimney[0].geometry.parameters.width/2+THREE.MathUtils.randFloat(-0.5,0.5));
	smokespeed[i] = THREE.MathUtils.randFloat(0.05,0.1);
}


//Creates the geometry for the door of the cabin, giving it an appropriate texture map
var geodoor = new THREE.BoxGeometry(4,6,0.2);
var matdoor = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load( './maps/hut-door.jpg'),
});

//Creates the door object, setting its position relative to the cabin floor such that it will remain in the same relative position no matter the change to either object's scale
var meshdoor = new THREE.Mesh(geodoor,matdoor);
meshdoor.castShadow = true;
scene.add(meshdoor);
meshdoor.parent = meshhutfloor;
var doorscale = 2;
meshdoor.scale.set(doorscale,doorscale,doorscale);
meshdoor.position.set(0,(meshdoor.geometry.parameters.height/2)*meshdoor.scale.y,meshhutfloor.geometry.parameters.width/2+hutwalls[2].geometry.parameters.width/2+meshdoor.geometry.parameters.depth);


//Creates 3 beam-like box objects in order to act as the frame surrounding the cabin door
var doorframe = [];
var geodoorframe1 = new THREE.BoxGeometry(1, meshdoor.geometry.parameters.height,0.5);
var geodoorframe2 = new THREE.BoxGeometry(meshdoor.geometry.parameters.width+(2*geodoorframe1.parameters.width),1,0.5);
var matdoorframe = new THREE.MeshPhongMaterial({color:0x261202});
for (let i = 0; i < 3; i++) {
	if (i<2) {
		doorframe[i] = new THREE.Mesh(geodoorframe1,matdoorframe);
	}
	else{
		doorframe[i] = new THREE.Mesh(geodoorframe2,matdoorframe);
	}
	scene.add(doorframe[i]);
	doorframe[i].parent = meshdoor;
}
doorframe[0].position.set(-meshdoor.geometry.parameters.width/2-doorframe[0].geometry.parameters.width/2,0,doorframe[0].geometry.parameters.depth/2);
doorframe[1].position.set(meshdoor.geometry.parameters.width/2+doorframe[0].geometry.parameters.width/2,0,doorframe[0].geometry.parameters.depth/2);
doorframe[2].position.set(0,meshdoor.geometry.parameters.height/2+doorframe[2].geometry.parameters.height/2,doorframe[0].geometry.parameters.depth/2);

//Adds ambient and point lights in order to illuminate the scene and adds a sphere object in order to visualise the location of the point light
console.log("Add the ambient light");

var lightAmbient = new THREE.AmbientLight(0x222222, 5.0); 
lightAmbient.needsUpdate = true;
scene.add(lightAmbient);

var lightThis = new THREE.PointLight(0xffffff);
lightThis.position.set(0, 120, 120);
lightThis.intensity = 0.2;
lightThis.castShadow = true;
scene.add(lightThis);

var geobulb= new THREE.SphereGeometry(0.5, 18, 18);
var matbulb = new THREE.MeshBasicMaterial( { color: 0xCCCC00, transparent: true, opacity:  lightThis.intensity} );
var meshLightPositionVis = new THREE.Mesh(geobulb, matbulb);
scene.add(meshLightPositionVis);
meshLightPositionVis.parent = lightThis;


//animates the entire scene and all objects added to it 
function animate() {
    requestAnimationFrame(animate);
	//Conditionally animates the falling snowflakes if the variable allowing it is set to true, or removing all snowflakes in the scene if this is false
	if(snowfall==true){
		for (let i = 0; i < snowflakes.length; i++) {
			scene.add(snowflakes[i]);
			snowflakes[i].position.y -= snowflakespeed[i];
			if(snowflakes[i].position.y <= 0){
				snowflakes[i].position.set(THREE.MathUtils.randFloat(-snowspread,snowspread),THREE.MathUtils.randFloat(175,250),THREE.MathUtils.randFloat(-snowspread,snowspread));
				snowflakespeed[i] = THREE.MathUtils.randFloat(0.1,0.3);
			}
		}
	}
	else{
		//Resets the vertical position of all snowflake objects and removes them from the scene
		for (let i = 0; i < snowflakes.length; i++) {
			snowflakes[i].position.y = THREE.MathUtils.randFloat(175,250);
			scene.remove(snowflakes[i]);
		}
	}
	//Adds all 400 smoke objects to the scene and animates them rising, moving their y position back down and randomising this position should the smoke reach a given height above its starting position
	if (smoking==true) {
		for (let i = 0; i < smoke.length; i++) {
			scene.add(smoke[i])
			smoke[i].parent = chimney[0];
			smoke[i].rotation.y = 90*(Math.PI/180);
			smoke[i].position.y+=smokespeed[i];
			if (smoke[i].position.y>=10) {
				smoke[i].position.set(0,THREE.MathUtils.randFloat(chimney[0].geometry.parameters.height-4,-chimney[0].geometry.parameters.height-2),-chimney[0].geometry.parameters.width/2+THREE.MathUtils.randFloat(-0.5,0.5));
				smokespeed[i] = THREE.MathUtils.randFloat(0.05,0.1);
			}
		}
	}
	else{
		//Randomises the positon of all smoke objects and removes them from the scene
		for (let i = 0; i < smoke.length; i++) {
			smoke[i].position.set(0,THREE.MathUtils.randFloat(-chimney[0].geometry.parameters.height,-chimney[0].geometry.parameters.height+2),-chimney[0].geometry.parameters.width/2+THREE.MathUtils.randFloat(-0.5,0.5));
			scene.remove(smoke[i]);
		}
	}

	//The following code alters which objects of the snowman are visible in the scene depending on the state of a variable,
	//making it seem as if the snowman is gradually being 'built' or 'taken apart'
	if (snowmanstage==0) {
		for (let i = 0; i < snowman.length; i++) {
			if (snowmanstage==0) {
				snowman[i].visible = false;
			}
		}
	}
	else if (snowmanstage==1) {
		snowman[1].visible = false;
		snowman[0].visible = true;
	}
	else if (snowmanstage==2) {
		snowman[2].visible = false;
		snowman[1].visible = true;
	}
	else if (snowmanstage==3) {
		for (let i = 6; i < 11; i++){
			snowman[i].visible = false;	
		}
		snowman[2].visible = true;
	}
	else if (snowmanstage==4) {
		snowman[5].visible = false;
		for (let i = 6; i < 11; i++){
			snowman[i].visible = true;	
		}
	}
	else if (snowmanstage==5) {
		for (let i = 3; i < 5; i++){
			snowman[i].visible = false;	
		}
		snowman[5].visible = true;
	}
	else if (snowmanstage==6) {
		for (let i = 11; i < 13; i++){
			snowman[i].visible = false;	
		}
		for (let i = 3; i < 5; i++){
			snowman[i].visible = true;	
		}
	}
	else{
		for (let i = 11; i < 13; i++){
			snowman[i].visible = true;	
		}
	}

	//Allows the orbit controls to be updated overtime
    controls.update(); 
    renderer.render(scene, camera);
}

animate();


//this code is fired whenever a key on the keyboard is pressed, with different responses occuring based on which key is pressed
window.addEventListener( 'keydown', function onKeyDown( event ) {
	//If L is pressed this will switch the state of the Christmas decoration and cabin window lights between visible and invisible based on their current state
	//and alters the colour of the star decoration and cabin window objects to make it seem more convinving that these lights are turning on and off
	if(event.key ==="l") {
		if (lightson == true){
			starlight.visible = false;
            meshstar.material.color.set( 0x917613 );
			for (let i = 0; i < baublelights.length; i++) {
				baublelights[i].visible = false;
			}
			for (let i = 0; i < windowlights.length; i++) {
				windowlights[i].visible = false;
			}
			for (let i = 0; i < panes.length; i++) {
				panes[i].material.color.set(0x000000);
			}
			lightson = false;
		}
		else if (lightson == false){
			starlight.visible = true;
			for (let i = 0; i < baublelights.length; i++) {
				baublelights[i].visible = true;
			}
			meshstar.material.color.set( 0xffff00 );
			for (let i = 0; i < windowlights.length; i++) {
				windowlights[i].visible = true;
			}
			for (let i = 0; i < panes.length; i++) {
				panes[i].material.color.set(0xe3c062);
			}
			lightson = true;
		}
	}
	//Pressing S will toggle the snowfall on and off in the scene
	else if(event.key ==="s"){
		if(snowfall==true){snowfall=false;}
		else{snowfall=true;}
	}
	else if (event.key === "c") {
		if(smoking==true){smoking=false;}
		else{smoking=true;}
	}
	//Pressing D will alter the intensity of the in-scene lights to simulate the change between night and day, 
	//and will also alter the visibility of the decoration and cabin lights based on whether it is 'night' or 'day'
	else if(event.key ==="d"){
		if(daytime==true){
			lightAmbient.intensity = 0.2;
			lightThis.intensity = 0.4;
			for (let i = 0; i < baublelights.length; i++) {
				baublelights[i].visible = true;
			}
			starlight.visible = true;
			meshstar.material.color.set( 0xffff00 );
			for (let i = 0; i < windowlights.length; i++) {
				windowlights[i].visible = true;
			}
			for (let i = 0; i < panes.length; i++) {
				panes[i].material.color.set(0xe3c062);
			}
			lightson = true;
			daytime = false;
		}
		else{
			lightAmbient.intensity = 5;
			lightThis.intensity = 0.2;
			starlight.visible = false;
	        meshstar.material.color.set( 0x917613 );
			for (let i = 0; i < baublelights.length; i++) {
				baublelights[i].visible = false;
			}
			for (let i = 0; i < windowlights.length; i++) {
				windowlights[i].visible = false;
			}
			for (let i = 0; i < panes.length; i++) {
				panes[i].material.color.set(0x000000);
			}
			lightson = false;
			daytime = true;
		}
	}
	//Pressing E will decrement the value of the variable that controls which snowman objects are visible in the scene,
	//making it seem as if the user is gradually taking apart the snowman
	else if (event.key==="e") {
		if (snowmanstage>0) {
			snowmanstage--;
		}
	}
	//Pressing R will increment the value of the variable that controls which snowman objects are visible in the scene,
	//making it seem as if the user is gradually building the snowman
	else if (event.key==="r") {
		if (snowmanstage<7) {
			snowmanstage++;
		}
	}
});