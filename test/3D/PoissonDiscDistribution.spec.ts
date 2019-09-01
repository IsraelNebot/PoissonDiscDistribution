import { PoissonDiscDistribution } from '../../src/poissonDiscDistribution/PoissonDiscDistribution';
import { Area2 } from '../../src/2D/Area2';
import { Area3 } from '../../src/3D/Area3';

describe('PoissonDiscDistribution', () => {

  const area: Area3 = new Area3(50, 50, 50, 0, 0, 0);

  const k: number = 10;
  const radius: number = 5;

  const distribution = PoissonDiscDistribution.generateDistribution(area, k, radius);
  
  test('should create a distribution correctly', () => {
    expect(distribution.length).toBeGreaterThan(0);
  });
  
  test('should create a distribution in which all points are at least (radius) units away from each other', () => {
    for (let i = 0; i < distribution.length; i++) {
      for (let j = i + 1; j < distribution.length; j++) {
         expect(distribution[i].distance(distribution[j])).toBeGreaterThanOrEqual(radius);
      }
    }
  });

  test('should create a distribution in which all points are contained in the defined area', () => {
    for (let sample of distribution) {
      expect(sample.isInsideArea(area)).toEqual(true);
    }
  });

  test('should create a distribution in a uniform way accross the four quadrants of the area', () => {
    const oneFourthOfDistributionSize = distribution.length / 4;

    let pointsTopLeft: number = 0;
    let pointsTopRight: number = 0;
    let pointsBottomLeft: number = 0;
    let pointsBottomRight: number = 0;

    for (let sample of distribution) {
      if (sample.x < 0 && sample.y < 0) {
        pointsBottomLeft++;
      } else if (sample.x < 0 && sample.y > 0) {
        pointsTopLeft++;
      } else if (sample.x > 0 && sample.y < 0) {
        pointsBottomRight++;
      } else {
        pointsTopRight++;
      }
    }

    expect(pointsTopLeft).toBeGreaterThanOrEqual(Math.round(oneFourthOfDistributionSize - (oneFourthOfDistributionSize/10)));
    expect(pointsTopLeft).toBeLessThanOrEqual(Math.round(oneFourthOfDistributionSize + (oneFourthOfDistributionSize/10)));

    expect(pointsTopRight).toBeGreaterThanOrEqual(Math.round(oneFourthOfDistributionSize - (oneFourthOfDistributionSize/10)));
    expect(pointsTopRight).toBeLessThanOrEqual(Math.round(oneFourthOfDistributionSize + (oneFourthOfDistributionSize/10)));
  
    expect(pointsBottomLeft).toBeGreaterThanOrEqual(Math.round(oneFourthOfDistributionSize - (oneFourthOfDistributionSize/10)));
    expect(pointsBottomLeft).toBeLessThanOrEqual(Math.round(oneFourthOfDistributionSize + (oneFourthOfDistributionSize/10)));
    
    expect(pointsBottomRight).toBeGreaterThanOrEqual(Math.round(oneFourthOfDistributionSize - (oneFourthOfDistributionSize/10)));
    expect(pointsBottomRight).toBeLessThanOrEqual(Math.round(oneFourthOfDistributionSize + (oneFourthOfDistributionSize/10)));
  });

});