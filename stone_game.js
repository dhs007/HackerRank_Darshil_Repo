function processData(input) {
  const pil = input.split(`\n`)[1].split(' ').map(a => +a)
  if (!pil.length) return 0

  const vars = val => Array(val).fill(val).map((v, i) => v - i).concat(0)
  const toVars = arr => arr.map(el => vars(el))

  const split = str => str.split(':').map(a => +a)

  const xor = arr => split(arr).reduce((acc, el) => acc ^ el, 0)
  const hasOne = (orig, arr) => split(arr).some((el, ix) => el === orig[ix])
  const noZero = arr => !split(arr).every(el => el === 0)

  function merge (arr1, arr2) {
    let res = []
    for (let i in arr2) {
      for (let j in arr1) {
        res.push(arr2[i] + ':' + arr1[j])
      }
    }
    return res
  }
  const toMerge = ars => ars.reduceRight((acc, arr) => merge(acc, arr))

  const hash = arr => arr.reduce((acc, el) => {
    acc[el] = xor(el)
    return acc
  }, {})

  const piles = toVars(pil)
  let pr = {}

  if (piles.length > 6) {

    let pr1 = piles.slice(0, Math.ceil(piles.length / 2))
    let pr2 = piles.slice(Math.ceil(piles.length / 2))

    pr1 = hash(toMerge(pr1))
    pr2 = hash(toMerge(pr2))

    for (let ik in pr1) {
      for (let jk in pr2) {
        if (pr1[ik] === pr2[jk]) {
          pr[ik + ':' + jk] = 0
        }
      }
    }

  } else {

    pr = hash(toMerge(piles))

  }

  const res = Object.keys(pr)
    .filter(key => !pr[key])
    .filter(arr => hasOne(pil, arr))
    .filter(arr => noZero(arr))
    .length

  console.log(res)
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});