
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let rules = data.split("\n\n")[0].split("\n").map(rule => rule.split("|"));
            let books = data.split("\n\n")[1].split("\n").map(book => book.split(","));

            let sum = 0;

            books.forEach(book =>
            {
                let isOrdered = true;

                for(let i = 0; i < book.length; i++)
                {
                    for(let j = 0; j < i; j++)
                    {
                        for(let k = 0; k < rules.length; k++)
                        {
                            if(book[i] == rules[k][0] && book[j] == rules[k][1])
                            {
                                isOrdered = false;
                            }
                        }
                    }
                }

                if(isOrdered)
                {
                    let middle = book[(book.length - 1) / 2] * 1;
                    sum += middle;
                }
            })

            return sum
        }

        let part2 = (data) =>
        {
            let rules = data.split("\n\n")[0].split("\n").map(rule => rule.split("|"));
            let books = data.split("\n\n")[1].split("\n").map(book => book.split(","));

            let sum = 0;

            books.forEach(book =>
            {
                let isOrdered = true;

                for(let i = 0; i < book.length; i++)
                {
                    for(let j = 0; j < i; j++)
                    {
                        for(let k = 0; k < rules.length; k++)
                        {
                            if(book[i] == rules[k][0] && book[j] == rules[k][1])
                            {
                                isOrdered = false;
                            }
                        }
                    }
                }

                if(!isOrdered)
                {
                    for(let i = 0; i < book.length; i++)
                    {
                        for(let k = 0; k < rules.length; k++)
                        {
                            let left = book.indexOf(rules[k][0]);
                            let right = book.indexOf(rules[k][1]);

                            if(left != -1 && right != -1)
                            {
                                if(right < left)
                                {
                                    let temp = book[right];
                                    book[right] = book[left];
                                    book[left] = temp;
                                }
                            }
                        }
                    }

                    let middle = book[(book.length - 1) / 2] * 1;
                    sum += middle;
                }
            })

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
