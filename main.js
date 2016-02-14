/**
 * Created by erenbali on 2/13/16.
 */
import _ from "underscore";
import {Organism, Cell, randomSingleCellOrganism} from "./organisms";
import Victor from "victor";

var canvas = document.getElementById("app");
window.stage = new createjs.Stage("app");

var w = window.innerWidth - 400;
var h = window.innerHeight;
let world, foods, organisms;

var settings = {
  foodCount: 20,
  foodSize: 3,
  foodSmellRadius: 50,
  foodSpawnInterval: 3
}

function createWorld(){
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#CCE1E8").drawRect(0,0, w, h);
  shape.x = 0;
  shape.y = 0;
  return shape;
}

function createFood(){
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#00967B").drawCircle(0,0, settings.foodSize);
  shape.graphics.endFill().beginStroke("rgba(0,0,0,0.1)").setStrokeStyle(1).drawCircle(0,0, settings.foodSmellRadius);
  shape.x = w * Math.random();
  shape.y = h * Math.random();
  return {
    id: _.uniqueId(),
    shape: shape,
    smellRadius: settings.foodSmellRadius,
    size: settings.foodSize
  };
}

function init(){
  canvas.width  = w;
  canvas.height = h;

  world = createWorld();
  stage.addChild(world);

  foods=[];
  _(settings.foodCount).times(() => foods.push(createFood()));
  foods.forEach(f => stage.addChild(f.shape));

  setInterval(() => {
    var f = createFood();
    stage.addChild(f.shape);
    foods.push(f);
  }, settings.foodSpawnInterval * 1000);

  organisms=[];
  _(5).times(() => {
    let startingPos = new Victor(w * Math.random(), h*Math.random());
    let organism =  randomSingleCellOrganism(startingPos);
    organisms.push(organism);
  });

  organisms.forEach(o => {
    o.cells.forEach(c => stage.addChild(c.shape));
  });


  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);

  stage.update();
}

function tick(event) {
  var deltaS = event.delta / 1000;

  foods.forEach(f => {
    f.shape.x += deltaS * (Math.random() * 2 - 1) * 50;
    f.shape.y += deltaS * (Math.random() * 2 - 1) * 10;
  });

  stage.update(event);
}

init();
