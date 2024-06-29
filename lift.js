import {showModal, floorNumberInput} from './modal.js';

const floors = document.querySelectorAll('.liftFloor');
const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';
const ACTION_COME_IN = 'comeIn';
const ACTION_GET_OUT = 'getOut';
const ACTION_REMOVE = 'remove';

class Lift {
    constructor(id) {
        this.id = id;
        this.currentFloor = 1;
        this.direction = DIRECTION_UP;
        this.isMoving = false;
        this.clickedFloor = 1;
        this.desiredFloor = 1;
    }

    move() {
        if (this.direction === DIRECTION_UP) {
            this.currentFloor += 1;
        } else {
            this.currentFloor -= 1;
        }
    }

    setDirection(desiredFloor) {
        this.direction = desiredFloor < this.currentFloor ? DIRECTION_DOWN : DIRECTION_UP;
    }

    updateLabel(action) {
        const floorElement = document.getElementById(this.currentFloor);
        switch (action) {
            case 'comeIn':
                floorElement.textContent = `${this.currentFloor} (Come in)`;
                break;
            case 'getOut':
                floorElement.textContent = `${this.currentFloor} (Get out)`;
                break;
            case 'remove':
                floorElement.textContent = `${this.currentFloor}`;
                break;
        }
    }


    showLiftImage() {
        const liftContainers = Array.from(document.querySelectorAll(`.lift-${this.id}-container`)).reverse();
        const floorsLiftPicture = Array.from(document.querySelectorAll(`.liftPic-${this.id}`)).reverse();

        liftContainers.forEach((liftContainer, index) => {
            if (index === this.currentFloor - 1) {
                liftContainer.classList.add('visible');
                floorsLiftPicture[index].classList.add('visible');
            } else {
                liftContainer.classList.remove('visible');
                floorsLiftPicture[index].classList.remove('visible');
            }
        });
    }

    async handleClick(e, otherLift, isRecursive = false) {
        e.stopImmediatePropagation();
        console.log('otherLift',otherLift)

        if (this.isMoving && !isRecursive) {
            await otherLift.handleClick(e, this, true);
            return;
        }


        const currentFloor = this.currentFloor;

        this.clickedFloor = Number(e.target.id);
        this.desiredFloor = await showModal().then((res) => {
            console.log('res',res)
            return res;
        });

        switch (true) {
            case this.desiredFloor > 8 || this.desiredFloor < 1:
                alert('Invalid floor number');
                return;
            case this.desiredFloor === currentFloor:
                alert('You are already on this floor');
                return;
            case this.desiredFloor === this.clickedFloor:
                alert('You cannot go to the same floor as clicked');
                return;
        }

        this.isMoving = true;
        this.setDirection(this.desiredFloor);
        this.moveLift();
    }

    moveLift() {
        const interval = setInterval(() => {
            if (this.currentFloor === this.clickedFloor) {
                clearInterval(interval);
                this.updateLabel(ACTION_COME_IN);
                setTimeout(() => {
                    this.moveLiftToDesiredFloor(this.desiredFloor);
                }, 3500);
                return;
            }
            this.move();
            this.showLiftImage();
        }, 1000);
    }

    moveLiftToDesiredFloor(desiredFloor) {
        const interval = setInterval(() => {
            if (this.currentFloor === desiredFloor) {
                this.isMoving = false;
                clearInterval(interval);
                floorNumberInput.value = '';
                this.updateLabel(ACTION_GET_OUT);
                setTimeout(() => {
                    this.updateLabel(ACTION_REMOVE);
                }, 3000);
                return;
            }
            this.updateLabel(ACTION_REMOVE);
            this.setDirection(desiredFloor);
            this.move();
            this.showLiftImage();
        }, 1000);
    }

    distanceToFloor(floor) {
        return Math.abs(this.currentFloor - floor);
    }
}

const lift1 = new Lift(1);
const lift2 = new Lift(2);

// function to handle floor clicks
function handleFloorClick(e) {
    const clickedFloor = Number(e.target.id);
    const closerLift = lift1.distanceToFloor(clickedFloor) < lift2.distanceToFloor(clickedFloor) ? lift1 : lift2;
    closerLift.handleClick(e, closerLift === lift1 ? lift2 : lift1);
}

floors.forEach((floor) => {
    floor.addEventListener('click', handleFloorClick);
});