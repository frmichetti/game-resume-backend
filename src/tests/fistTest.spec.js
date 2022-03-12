import * as schemas from '../schema/validation_schema'

test('it should be ok', () => { 
    expect(schemas.category_schema).not.toBeNull();
})