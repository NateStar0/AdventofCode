
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let [templates, tests] = data.split("\n\n");
            templates = templates.split(", ");
            tests = tests.split("\n");

            let sum = 0;

            let possible = function(templates, towel)
            {
                for(let i = 0; i < templates.length; i++)
                {
                    let template = templates[i];
                    if((template == towel) || (towel.startsWith(template) && possible(templates, towel.slice(template.length))))
                    {
                        return true;
                    }
                }

                return false
            }

            tests.forEach(towel =>
            {
                sum += possible(templates, towel);
            })

            return sum
        }

        let part2 = (data) =>
        {
            let [templates, tests] = data.split("\n\n");
            templates = templates.split(", ");
            tests = tests.split("\n");

            let sum = 0;

            let combinations = function(templates, towel)
            {
                for(let i = 0; i < templates.length; i++)
                {
                    let template = templates[i];
                    if((template == towel) || (towel.startsWith(template) && combinations(templates, towel.slice(template.length))))
                    {
                        return true;
                    }
                }

                return false
            }

            tests.forEach(towel =>
            {
                sum += combinations(templates, towel);
            })

            return sum
        }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
