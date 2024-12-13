
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            data = data.split(" ");

            for(let blinks = 0; blinks < 25; blinks++)
            {
                let newStones = [];

                for(var i = 0; i < data.length; i++)
                {
                    if(data[i] == "0")
                    {
                        newStones.push("1");
                    } 
                    else if(data[i].length % 2 == 0)
                    {
                        newStones.push(data[i].slice(0, data[i].length / 2));
                        newStones.push(String(parseInt(data[i].slice(data[i].length / 2, data[i].length), 10)));
                    }
                    else
                    {
                        newStones.push(String(data[i] * 2024));
                    }
                }

                data = newStones
            }

            return data.length
        }

        let part2 = (data) =>
        {
            data = data.split(" ").map(Number);

            let cache = new Map();

            let parse = (blink, currentList) => 
            {
                if (blink === 0) return 1;
            
                blink -= 1;

                let len = 0;

                for (let value of currentList) 
                {
                    if (value == 0) 
                    {
                        if (cache.has(`${blink}:${1}`))
                        {
                            len += cache.get(`${blink}:${1}`);
                        }
                        else 
                        {
                            let sublen = parse(blink, [1]);
                            cache.set(`${blink}:${1}`, sublen);
                            len += sublen;
                        }
                        continue;
                    }
                    
                    value = String(value)
                    if (value.length % 2 == 0) 
                    {
                        let left = 1 * value.slice(0, value.length / 2);
                        let right = 1 * value.slice(value.length / 2, value.length);
                
                        if (cache.has(`${blink}:${left}`)) len += cache.get(`${blink}:${left}`);
                        else 
                        {
                            let sublen = parse(blink, [left]);
                            cache.set(`${blink}:${left}`, sublen);
                            len += sublen;
                        }
                
                        if (cache.has(`${blink}:${right}`)) len += cache.get(`${blink}:${right}`);
                        else 
                        {
                            let sublen = parse(blink, [right]);
                            cache.set(`${blink}:${right}`, sublen);
                            len += sublen;
                        }
                        continue;
                    }
            
                    let newValue = value * 2024;
                    if (cache.has(`${blink}:${newValue}`))
                    {
                        len += cache.get(`${blink}:${newValue}`);
                    }
                    else 
                    {
                        let sublen = parse(blink, [newValue]);
                        cache.set(`${blink}:${newValue}`, sublen);
                        len += sublen;
                    }
                }

                return len;
            };
            
            return parse(75, data);
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
