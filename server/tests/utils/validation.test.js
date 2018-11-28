const expect = require('expect')
const {isRealString} = require('../../utils/validation')

describe('isRealString validation',()=>{
  it('should reject non-string values or all spaces and allow strings',()=>{
    const nonString = isRealString(1254)
    const spaces = isRealString('   ')
    const goodString = isRealString('  room  ')

    expect(nonString).toBeFalsy()
    expect(spaces).toBeFalsy()
    expect(goodString).toBeTruthy()

  })

})
