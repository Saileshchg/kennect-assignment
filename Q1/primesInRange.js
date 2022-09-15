const getPrimesInRange = (lowerlimit, upperlimit) => {
    let primes = []; 
    for (let i = lowerlimit; i <= upperlimit; i++) {
        if (i == 1 || i == 0) {
            continue;
        }
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i) / 2; ++j) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if(isPrime){
            primes.push(i);
        }
    }
    return primes; 
}

/* 
    The time complexity of the above algorithm is
    O((upperlimit - lowerlimit) (square root of upperlimit))
    Explanation: The first loop runs from lower limit to upper limit. Hence, it runs upperlimit - lowerlimit times
    The second loop runs from 2 to square root of upper limit which is approximately square root of upperlimit times
    Combining both the loop, the time complexity is O((upperlimit - lowerlimit) (square root of upperlimit))
*/

/*
    The space complexity of the above algorithm is o(upperlimit - lowerlimit)
    So, there are lot of primitive variables like i, j, isPrime.
    We can ignore them as they are primitive variables as they take up fixed space.
    We have an array primes which is the result array. This array size grows as the range grows.
    Hence, O(upperlimit - lowerlimit) ~ O(n)
*/