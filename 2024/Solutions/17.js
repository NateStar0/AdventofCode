
module.exports = 
{
    run(data)
    {
        let part1 = (data) =>
        {
            let [registers, program] = data.split("\n\n");
            registers = registers.split("\n").map(line => line.split(": ")[1] * 1)
            program = program.split(": ")[1].split(",");

            let output = "";

            for(let instructionCounter = 0; instructionCounter < program.length; instructionCounter += 2)
            {
                let opcode = program[instructionCounter];
                let operand = program[instructionCounter + 1] * 1;
                let comboOperand = 0;

                switch(operand)
                {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        comboOperand = operand;
                    break;

                    case 4: comboOperand = registers[0]; break;
                    case 5: comboOperand = registers[1]; break;
                    case 6: comboOperand = registers[2]; break;
                }

                switch(opcode)
                {
                    case "0": registers[0] = Math.trunc(registers[0] / Math.pow(2, comboOperand)); break;
                    case "1": registers[1] = registers[1] ^ operand; break;
                    case "2": registers[1] = comboOperand % 8; break;
                    case "3": 
                        if(registers[0] !== 0)
                        {
                            instructionCounter = operand - 2;
                        }
                    break;

                    case "4": registers[1] = registers[1] ^ registers[2]; break;
                    case "5": output += String(comboOperand % 8) + ","; break;
                    case "6": registers[1] = Math.trunc(registers[0] / Math.pow(2, comboOperand)); break;
                    case "7": registers[2] = Math.trunc(registers[0] / Math.pow(2, comboOperand)); break;
                }
            }

            return output
        }

        let part2 = (data) =>
            {
                let [registers, program] = data.split("\n\n");
                registers = registers.split("\n").map(line => line.split(": ")[1] * 1)
                program = program.split(": ")[1].split(",");
    
                let expected = program.join(",");
                let initial = registers[0];

                const modulo = (x, n) => ((x % n) + n) % n

                let solve = function(registers, program)
                {
                    let output = "";

                    for(let instructionCounter = 0; instructionCounter < program.length - 1; instructionCounter += 2)
                    {
                        let opcode = program[instructionCounter];
                        let operand = program[instructionCounter + 1] * 1;
                        let comboOperand = 0;
        
                        switch(operand)
                        {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                comboOperand = operand;
                            break;
        
                            case 4: comboOperand = registers[0]; break;
                            case 5: comboOperand = registers[1]; break;
                            case 6: comboOperand = registers[2]; break;
                            case 7: break;
                        }
        
                        switch(opcode)
                        {
                            case "0": registers[0] = Math.trunc(registers[0] / Math.pow(2, comboOperand)); break;
                            case "1": registers[1] = registers[1] ^ operand; break;
                            case "2": registers[1] = modulo(comboOperand, 8); break;
                            case "3": 
                                if(registers[0] !== 0)
                                {
                                    instructionCounter = operand - 2;
                                }
                            break;
        
                            case "4": registers[1] = registers[1] ^ registers[2]; break;
                            case "5": output += String(modulo(comboOperand, 8)) + ","; break;
                            case "6": registers[1] = Math.trunc(registers[0] / Math.pow(2, comboOperand)); break;
                            case "7": registers[2] = Math.trunc(registers[0] / Math.pow(2, comboOperand)); break;
                        }
                    }

                    return output
                }

                function findA(startingA)
                {
                    for(let n = 0; n < 8; n++)
                    {
                        let output = solve([startingA + n, 0, 0], program) .slice(0, -1)
                        let ans = 0;

                        if(expected.endsWith(output))
                        {
                            if(output.length == expected.length) return startingA + n;
                            
                            ans = findA((startingA + n) * 8)

                            if(ans !== -1) return ans
                        } 
                    }

                    return -1;
                }
    
                return findA(1)
            }
        
        console.log(part1(data));
        console.log(part2(data));
    }
}
