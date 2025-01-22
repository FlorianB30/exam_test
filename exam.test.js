describe('Rovers positions checker', () => {
    test('Returns the new positions for 2 rovers', () => {
        expect(managerRovers('5 5 1 2 N LMLMLMLMM 3 3 E MMRMMRMRRM')).toBe('1 3 N 5 1 E');
    });

    test('The new postion for a single rover (just Left)', () => {
        expect(managerRovers('5 5 1 2 N LMLMLMLMM')).toBe('1 3 N');
    });

    test('Returns correct positions at the edge of the map', () => {
        expect(managerRovers('5 5 0 0 N MMMMM')).toBe('0 5 N');
    });

    test('The new postion for a single rover (Left and Right)', () => {
        expect(managerRovers('10 10 5 5 E MMLMRMMRMLLM')).toBe('9 6 N');
    });

    test('The new postion for a single rover (just RIGHT)', () => {
        expect(managerRovers('5 5 2 2 N MMRMMMRMRM')).toBe('4 3 O');
    });

    test('Returns an error for bad instructions', () => {
        expect(() => managerRovers('5 5 1 2 N DFHGRJR')).toThrow('Bad instructions given');
    });

    test('Returns an error when no movement instructions', () => {
        expect(managerRovers('5 5 3 3 N')).toThrow('No move given');
    });

    test('Returns the new positions for 3 rovers', () => {
        expect(managerRovers('5 5 1 2 N MMLMRMRMRM 1 4 S MMRMLMLMLM 1 2 N LMLMLMLMM')).toBe('1 4 S 1 2 N 1 3 N');
    });

    test('Returns the new postions for rovers', () => {
        expect(managerRovers('6 6 2 2 N LMLMLMLMM 3 3 E MMRMMRMRRM')).toBe('2 3 N 5 1 E');
    });

    test('Returns the new position with a rectangular cart', () => {
        expect(managerRovers('5 9 2 2 N MMLMLMRMRM 2 4 S MMRMRMLMLM 1 2 N LMLMLMLMM')).toBe('0 4 N 0 2 S 1 3 N');
    });
});

const managerRovers = (datas) => {
    const mapSize = datas.slice(0, 3).trim();
    const explodeSizeMap = mapSize.split(' ');
    const [sizeMapX, sizeMapY] = [parseInt(explodeSizeMap[0]), parseInt(explodeSizeMap[1])];
    const movesDatas = datas.slice(3).trim();
    const regex = /(\d+ \d+ [NESO]) ([LRM]+)/g;
    const rovers = [];
    let match;
    let newPos = '';

    while ((match = regex.exec(movesDatas)) !== null) {
        rovers.push(match[1], match[2]);
    }

    for (let i = 0; i < rovers.length; i = i + 2) {
        if (i >= 2) newPos += ' ';
        newPos += moveRover(rovers[i], rovers[i + 1]);
    }

    return newPos;
};

const moveRover = (pos, instruction) => {
    const cardinalsPoint = ['N', 'O', 'S', 'E'];
    const explodePos = pos.split(' ');
    let [x, y, cardinal] = [parseInt(explodePos[0]), parseInt(explodePos[1]), explodePos[2]];
    let iCP = cardinalsPoint.indexOf(cardinal);

    for (const char of instruction) {
        if (char === 'L') iCP = iCP === cardinalsPoint.length - 1 ? 0 : iCP + 1;
        else if (char === 'R') iCP = iCP === 0 ? cardinalsPoint.length - 1 : iCP - 1;
        else if (cardinalsPoint[iCP] === 'N' && char === 'M') y++;
        else if (cardinalsPoint[iCP] === 'E' && char === 'M') x++;
        else if (cardinalsPoint[iCP] === 'O' && char === 'M') x--;
        else if (cardinalsPoint[iCP] === 'S' && char === 'M') y--;

        cardinal = cardinalsPoint[iCP];
    }

    console.log(x, y, cardinal, instruction)
    return `${x} ${y} ${cardinal}`;
}