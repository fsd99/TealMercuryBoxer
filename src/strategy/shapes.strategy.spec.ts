import { Test, TestingModule } from '@nestjs/testing'
import { Circle } from '../models/circle.model'
import { Rectangle } from '../models/rectangle.model'
import {
    Context,
    DoesCircleAndCircleCollide,
    DoesCircleAndRectangleCollide,
    DoesRectangleAndRectangleCollide
} from "../strategy/shapes.strategy";

describe('Context', () => {
    let context: Context;

    describe('DoesCircleAndCircleCollide', () => {
        context = new Context(new DoesCircleAndCircleCollide);
        const circle1 = new Circle(10, 10, 1);

        describe('two colliding circles', () => {
            [
                new Circle(12, 10, 1),
                new Circle(10, 12, 1),
                new Circle(11, 11, 1),
            ].forEach((circle2) => {
                it(`should return true for ${JSON.stringify(circle2)}`, () => {
                    expect(context.executeStrategy(circle1, circle2)).toBeTruthy;
                });
            });
        });

        describe('two non-colliding circles', () => {
            const circle2 = new Circle(5, 5, 1);

            it(`should return false for ${JSON.stringify(circle2)}`, () => {
                expect(context.executeStrategy(circle1, circle2)).toBeFalsy;
            });
        });
    });

    describe('DoesCircleAndRectangleCollide', () => {
        context = new Context(new DoesCircleAndRectangleCollide);
        const circle = new Circle(10, 10, 2);

        describe('a colliding circle and rectangle', () => {
            const rectangle = new Rectangle(9, 9, 1, 1);

            it('should return true', () => {
                expect(context.executeStrategy(circle, rectangle)).toBeTruthy;
            });
        });

        describe('a non-colliding circle and rectangle', () => {
            const rectangle = new Rectangle(5, 5, 2, 2);

            it('should return false', () => {
                expect(context.executeStrategy(circle, rectangle)).toBeFalsy;
            });
        });
    });

    describe('DoesRectangleAndRectangleCollide', () => {
        context = new Context(new DoesRectangleAndRectangleCollide);
        const rectangle1 = new Rectangle(9, 9, 1, 1);

        describe('two colliding rectangles', () => {
            const rectangle2 = new Rectangle(10, 10, 2, 2);

            it('should return true', () => {
                expect(context.executeStrategy(rectangle1, rectangle2)).toBeTruthy;
            });
        });

        describe('two non-colliding rectangles', () => {
            const rectangle2 = new Rectangle(4, 4, 2, 2);

            it('should return false', () => {
                expect(context.executeStrategy(rectangle1, rectangle2)).toBeFalsy;
            });
        });
    });
});