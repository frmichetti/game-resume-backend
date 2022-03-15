import * as schemas from '../src/schema/validation_schema'

test('it should be ok', () => { 
    expect(schemas.category_schema).not.toBeNull();
})