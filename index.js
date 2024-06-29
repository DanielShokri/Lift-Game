// var containsDuplicate = function (nums) {
//   const numsArr = {};

//   nums.forEach((num) => {
//     if (!numsArr[num]) numsArr[num] = 1;
//     else ++numsArr[num];
//   });

//   const maxNum = Math.max(...Object.values(numsArr));
//   if (maxNum > 1) return true;
//   else return false;
// };

// console.log(containsDuplicate([1, 2, 3, 3]));

// function containsNearbyDuplicate(nums, k) {
//   // Create an object to keep track of the indices of elements we've seen.
//   const seen = {};

//   // Loop through the array.
//   for (let i = 0; i < nums.length; i++) {
//       // If we've seen the number before and the difference between the
//       // current index and the last index is less than or equal to k, return true.
//       if (nums[i] in seen && i - seen[nums[i]] <= k) {
//           return true;
//       }

//       // Record the index of the current number.
//       seen[nums[i]] = i;
//   }

//   // If no such pair is found, return false.
//   return false;
// }

// // Example usage:
// const nums = [1,2,3,1,2,3];
// const k = 3;
// console.log(containsNearbyDuplicate(nums, k)); // Output: true

// var MyStack = function () {
//   this.stack = [];
// };
//
// MyStack.prototype.push = function (x) {
//   this.stack.push(x);
// };
//
// MyStack.prototype.pop = function () {
//   return this.stack.pop();
// };
//
// MyStack.prototype.top = function () {
//   return this.stack[this.stack.length - 1];
// };
//
// MyStack.prototype.empty = function () {
//   return this.length === 0;
// };

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// var obj = new MyStack();
// obj.push(5);
// var param_2 = obj.pop();
// var param_3 = obj.top();
// var param_4 = obj.empty();
// console.log("obj", obj);


// const arr = [2,3,1,2,4,3];
// console.log('hello',arr);
//
// function minSubArrayLen(target, nums) {
//     let minLength = Infinity; // Start with the largest possible length
//     let currentSum = 0; // Current sum of the sliding window
//     let start = 0; // Start index of the sliding window
//
//     for (let end = 0; end < nums.length; end++) {
//         currentSum += nums[end]; // Add the next element to the sum
//         console.log(nums[end])
// console.log(currentSum)
//         // Shrink the window as small as possible while the sum is larger than the target
//         while (currentSum >= target) {
//             // console.log("end:",end, "start:",start +1)
//             minLength = Math.min(minLength, end - start + 1); // Update the minimum length = [2]
//             currentSum -= nums[start]; // Subtract the element at the start index [3]
//             console.log('currentSum',currentSum)
//             start++; // Move the start index forward [1]
//         }
//     }
//
//     // If minLength is Infinity, no such subarray was found
//     return minLength === Infinity ? 0 : minLength;
// }
//
// // Example usage
const target = 7;
const nums = [2,3,1,2,4,3];
// // console.log(minSubArrayLen(targetrget, nums)); // Output should be 2

 function minSubArrayLen(target, nums) {
    const map = {};
    let tempNum = 0;
    for (let i = 0; i <nums.length; i++) {
        tempNum += nums[i];
        console.log(tempNum);
        if(tempNum === target) {
            console.log('HI',tempNum)
        }
    }
};

// console.log(minSubArrayLen(target, nums));
minSubArrayLen(target, nums);
