/**
 * Created by erenbali on 2/13/16.
 */
import _ from "underscore";
import Victor from "victor";

export class Organism {
  constructor(dna, startingPos){
    _.extend(this, {dna});
    this.cells = dna.cellProps.map(cellProps => new Cell(cellProps, startingPos, new Victor(0,0), 1))
  }


}

export class DNA {
  constructor(cellProps, edgeProps, replicationFrequency = 10) {
    _.extend(this, {cellProps, edgeProps, replicationFrequency});
  }
}

/**
 * boredom
 * reactionFood
 *
 */
export class CellProps {
  constructor(props) {
    _.extend(this, props);
  }
}
/**
 *
 */
export class EdgeProps {
  constructor(cell1, cell2, props) {
    _.extend(this, cell1, cell2, props);
  }
}

export class Cell {
  constructor(props, pos, velocity, energy){
    _.extend(this, {props, pos, velocity, energy});
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill("red").drawCircle(0,0, 5);
    this.shape.x = this.pos.x;
    this.shape.y = this.pos.y;
  }
}

export function randomSingleCellOrganism(startingPos){
  let cellProps = new CellProps({
    boredomCoef: Math.random(),
    reactionFoodCoef: Math.random() * 2 - 1
  });
  let dna = new DNA([cellProps], []);
  let o = new Organism(dna, startingPos);
  return o;
}