
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let sum = 0;

            data.replace(/\n/g, "").split(",").map(aspect =>
                {
                    let currentValue = 0;
                    aspect.split("").map(character =>
                        {
                            currentValue += character.charCodeAt(0);
                            currentValue *= 17;
                            currentValue = currentValue % 256
                        })

                    sum += currentValue;
                })

            return sum
        }

        let part2 = (data) =>
        {
            let sum = 0;
            let boxes = new Array(256);
            for(let i = 0; i < 256; i++) boxes[i] = [];

            data.replace(/\n/g, "").split(",").map(aspect =>
                {
                    aspect = aspect.split("=").length > 1 ? aspect.split("=") : [aspect.split("-")[0], NaN];

                    let currentValue = 0;
                    aspect[0].split("").map(character =>
                        {
                            currentValue += character.charCodeAt(0);
                            currentValue *= 17;
                            currentValue = currentValue % 256
                        })

                    if(!isNaN(aspect[1] * 1))
                    {
                            let index = -1;
                            for(let i = 0; i < boxes[currentValue].length; i++)
                            {
                                if(boxes[currentValue][i][0] === aspect[0])
                                {
                                    index = i;
                                    boxes[currentValue][i][1] = aspect[1];
                                    i = boxes[currentValue];
                                }
                            }

                            if(index === -1)
                            {
                                boxes[currentValue].push(aspect);
                            }
                    }
                    else
                    {
                        let index = -1;
                        for(let i = 0; i < boxes[currentValue].length; i++)
                        {
                            if(boxes[currentValue][i][0] == aspect[0])
                            {
                                index = i;
                                boxes[currentValue].splice(i, 0);
                                i = boxes[currentValue].length;
                            }
                        }

                        let temp = [];
                        for(let i = 0; i < boxes[currentValue].length; i++)
                        {
                            if(i !== index)
                            {
                                temp.push(boxes[currentValue][i])
                            }
                        }

                        boxes[currentValue] = temp;
                    }
                })

            for(let i = 0; i < boxes.length; i++)
            {
                for(let j = 0; j < boxes[i].length; j++)
                {
                    sum += (i + 1) * (j + 1) * (boxes[i][j][1] * 1)
                }
            }

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
