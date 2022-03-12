import { category_schema } from '../schema/category_schema'

test('it should be ok', () => { 
    expect(category_schema).not.toBeNull();
})