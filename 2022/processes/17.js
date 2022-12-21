
module.exports = 
{
    run(data)
    {
        let blocks = [
            [["#", "#", "#", "#"]],
            [
                [".", "#", "."],
                ["#", "#", "#"],
                [".", "#", "."]
            ],
            [
                ["#", "#", "#"],
                [".", ".", "#"],
                [".", ".", "#"]
            ],
            [["#"], ["#"], ["#"], ["#"]],
            [
                ["#", "#"],
                ["#", "#"]
            ]
        ]

        let part1 = (data) =>
        {
            let inp = data.split("");
            let chamber = [["#", "#", "#", "#", "#", "#", "#", "#", "#"]]
            let segment = ["#", ".", ".", ".", ".", ".", ".", ".", "#"]

            function colides(block, blockX, blockY) 
            {
                return block.some((r, y) => 
                {
                    return r.some((state, x) => 
                    {
                        return state == "#" && chamber[blockY + y][blockX + x] == "#"
                    })
                })
            }

            function checkRepeat(topIndex, inp) 
            {
                let l = topIndex - 1;
                let max = Math.floor((chamber.length / 2) - 5);
                let len = max;

                for (len; len > inp.length / 5; len--) 
                {
                    let same = true;

                    for (let i = 0; i < len; i++) 
                    {
                        if (!chamber[l - i].every((el, ix) => el === chamber[l - (i + len)][ix])) {
                            same = false
                            break
                        }
                    }

                    if (same) 
                    {
                        return len
                    }
                }

                return -1
            }

            let sum = 0;

            let steps = 1000000000000
            let blockIndex = 0
            let numBlocks = blocks.length
            let numjets = inp.length
            let topIndex = 1
            let jetIndex = 0
            
    
            let repeatFound = false
            let repeatLength = 0
            let repeatNext = 0
            let repeatStep = 0
            let mult = 0

            while (steps--) 
            {
                let block = blocks[blockIndex]
                let blockHeight = block.length
                let blockY = topIndex + 3
                let blockX = 3

                while (blockY + blockHeight > chamber.length) 
                {
                    chamber.push(segment.slice())
                }
            
                while (true) 
                {
                    let jet = inp[jetIndex++ % numjets] == "<" ? -1 : 1;

                    if (!colides(block, blockX + jet, blockY)) blockX += jet

                    if (!colides(block, blockX, blockY - 1)) 
                    {
                        blockY--
                    } 
                    else 
                    {
                        block.forEach((r, y) => 
                        {
                            r.forEach((state, x) => 
                            {
                                chamber[blockY + y][blockX + x] = (state == "#") ? state : chamber[blockY + y][blockX + x]
                            })
                        })

                        topIndex = Math.max(blockY + blockHeight, topIndex)

                        break
                    }
                }

                if (mult === 0) 
                {
                    if (!repeatFound) 
                    {
                        let repeat = checkRepeat(topIndex, inp)
                        if (repeat != -1) {
                            repeatFound = true
                            repeatNext = topIndex + repeat
                            repeatLength = repeat
                            repeatStep = steps
                        }
                    } 
                    else 
                    if (repeatNext == topIndex) 
                    {
                        repeatStep = repeatStep - steps
                        mult = Math.floor(steps / repeatStep)

                        steps = steps % repeatStep
                    }
                }

                if (1000000000000 - steps == 2022) sum = topIndex - 1

                if (++blockIndex == numBlocks) blockIndex = 0
            }

            return sum;
        }

        let part2 = (data) =>
        {
            let inp = data.split("");
            let chamber = [["#", "#", "#", "#", "#", "#", "#", "#", "#"]]
            let segment = ["#", ".", ".", ".", ".", ".", ".", ".", "#"]

            let colides = (block, blockX, blockY) =>
            {
                return block.some((r, y) => 
                {
                    return r.some((state, x) => 
                    {
                        return state == "#" && chamber[blockY + y][blockX + x] == "#"
                    })
                })
            }

            let checkRepeat = (topIndex, inp) =>
            {
                let l = topIndex - 1;
                let max = Math.floor((chamber.length / 2) - 5);
                let len = max;

                for (len; len > inp.length / 5; len--) 
                {
                    let same = true;

                    for (let i = 0; i < len; i++) 
                    {
                        if (!chamber[l - i].every((el, ix) => el === chamber[l - (i + len)][ix])) {
                            same = false
                            break
                        }
                    }

                    if (same) 
                    {
                        return len
                    }
                }

                return -1
            }

            let steps = 1000000000000
            let blockIndex = 0
            let numBlocks = blocks.length
            let numjets = inp.length
            let topIndex = 1
            let jetIndex = 0
            
    
            let repeatFound = false
            let repeatLength = 0
            let repeatNext = 0
            let repeatStep = 0
            let mult = 0

            while (steps--) 
            {
                let block = blocks[blockIndex]
                let blockHeight = block.length
                let blockY = topIndex + 3
                let blockX = 3

                while (blockY + blockHeight > chamber.length) 
                {
                    chamber.push(segment.slice())
                }
            
                while (true) 
                {
                    let jet = inp[jetIndex++ % numjets] == "<" ? -1 : 1;

                    if (!colides(block, blockX + jet, blockY)) blockX += jet

                    if (!colides(block, blockX, blockY - 1)) 
                    {
                        blockY--
                    } 
                    else 
                    {
                        block.forEach((r, y) => 
                        {
                            r.forEach((state, x) => 
                            {
                                chamber[blockY + y][blockX + x] = (state == "#") ? state : chamber[blockY + y][blockX + x]
                            })
                        })

                        topIndex = Math.max(blockY + blockHeight, topIndex)

                        break
                    }
                }

                if (mult === 0) 
                {
                    if (!repeatFound) 
                    {
                        let repeat = checkRepeat(topIndex, inp)
                        if (repeat != -1) {
                            repeatFound = true
                            repeatNext = topIndex + repeat
                            repeatLength = repeat
                            repeatStep = steps
                        }
                    } 
                    else 
                    if (repeatNext == topIndex) 
                    {
                        repeatStep = repeatStep - steps
                        mult = Math.floor(steps / repeatStep)

                        steps = steps % repeatStep
                    }
                }

                if (++blockIndex == numBlocks) blockIndex = 0
            }
            
            return topIndex - 1 + mult * repeatLength
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
