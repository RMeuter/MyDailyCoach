//permet de créer un Array contenant un intervalle de nombres
//https://gist.github.com/mzabriskie/6513968
export default function (low, high, step) {
    var range = [],
        start, end,
        charCode = false,
        reverse = false;

    // If no step was provided default to 1
    step = isNaN(parseInt(step, 10)) ? 1 : Math.abs(step);

    // If either low or high is a number, then both low and high must be numbers
    if (!isNaN(parseInt(low, 10)) && isNaN(parseInt(high, 10))) {
        high = 0;
    }
    else if (!isNaN(parseInt(high, 10)) && isNaN(parseInt(low, 10))) {
        low = 0;
    }

    // If both low and high are numbers then create a numeric range
    if (!isNaN(parseInt(low, 10)) && !isNaN(parseInt(high, 10))) {
        low = parseInt(low, 10);
        high = parseInt(high, 10);
    }
    // If both low and high are strings then create a character range
    else if (typeof low === 'string' && typeof high === 'string') {
        low = low.charCodeAt(0);
        high = high.charCodeAt(0);
        charCode = true;
    }

    // If low and high range values were able to be parsed, create the range
    if (typeof low === 'number' && typeof high === 'number') {
        // Range will need to be reversed if low is greater than high
        reverse = low > high;

        // Calculate the start and end points of the range
        start = Math.min(low, high);
        end = Math.max(low, high);

        // Verify that step is within the bounds of the range
        if (end - start > 0 && step > end - start) {
            throw new Error('step exceeds the specified range');
        }

        // Generate the range
        for (var i = start; i <= end; i += step) {
            range[range.length] = charCode ? String.fromCharCode(i) : i;
        }

        // Reverse the range if needed
        if (reverse) {
            range.reverse();
        }
    }

    // Return the range
    return range;
}