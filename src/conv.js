// a function to calculate the convolution of two vectors
// or to multiply the two algebraic expressions.
// source: https://gist.github.com/PhotonEE/7671999

/*
**

idea :
------
vec1 = [2,3,4]
vec2 = [1,2,3]

multiply vec2 by vec1[0] = 2    4   6
multiply vec2 by vec1[1] = -    3   6   9
multiply vec2 by vec1[2] = -    -   4   8   12
-----------------------------------------------
add the above three      = 2    7   14  17  12

the - above shows the displacement after each vector multiplication by element of another vector

**
*/

export function conv(vec1, vec2) {
  var disp = 0; // displacement given after each vector multiplication by element of another vector
  var convVec = [];
  // for first multiplication
  for (let j = 0; j < vec2.length; j++) {
    convVec.push(vec1[0] * vec2[j]);
  }
  disp = disp + 1;
  for (let i = 1; i < vec1.length; i++) {
    for (let j = 0; j < vec2.length; j++) {
      if ((disp + j) !== convVec.length) {
        convVec[disp + j] = convVec[disp + j] + (vec1[i] * vec2[j])
      } else {
        convVec.push(vec1[i] * vec2[j]);
      }
    }
    disp = disp + 1;
  }
  return convVec;
}

/*
**

Usage:
------
vecA = [2,3,2,1]
vecB = [4,1,2,3]
ans = conv(vecA, vecB);

**
*/
