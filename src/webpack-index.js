const jsGFwk = require('./jsgfwk.js');
const Animator2D = require('./animator2d.js');
//import { GameObject, VisualGameObject } from './gameObjects.js';
const Clock = require('./clock.js');
const Collisions = require('./collisions.js');
//import { Container, Containers } from './containers.js';

module.exports = { 
    Engine: jsGFwk, 
    Animator2D: Animator2D,
    //GameObject: GameObject,
    //VisualGameObject: VisualGameObject,
    Clock: Clock,
    Collisions: Collisions,
    /*Container: Container,
    Containers: Containers*/ 
};