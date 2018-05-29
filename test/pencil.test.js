


//test case |  assert
const Pencil = require('./pencil')

describe('test query',() =>{    //test group
    test('query',()=>{   //testCase
        //assert
        expert(Pencil.query('hello','?hello=test'))
        expert(Pencil.query('hello','?hello=').toBe(''))
    
    })


    test('test hello is not exis', ()=>{
        expect(Pencil.query('hello','?hello2=test')).toBe(undefined)
    })




    

})




