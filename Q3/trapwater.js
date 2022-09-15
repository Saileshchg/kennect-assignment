const trapWater = (input) => {
    let currentHighestIndex = 0;
    let total = 0;
    while (currentHighestIndex <= (input.length-1)) {
        let tempAdd = 0;
        for (let i = currentHighestIndex + 1; i <= (input.length-1); i++) {
            if (input[currentHighestIndex] > input[i]) {
                tempAdd += (input[currentHighestIndex] - input[i]);
            }
            if (input[currentHighestIndex] <= input[i]) {
                total += tempAdd;
                tempAdd = 0;
                currentHighestIndex = i;
                break;
            }
            if (i === (input.length-1)) {
                tempAdd = 0;
                currentHighestIndex += 1;
                break;
            }
        }
        if(currentHighestIndex === (input.length - 1)){
            currentHighestIndex += 1;
        }
    }
    return total;
}
