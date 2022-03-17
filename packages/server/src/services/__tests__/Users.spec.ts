import * as service from '@/services/Users'

describe('User name validation', () => {
  it('should return false for an empty string', () => {
    expect(service.isValidName('')).toBe(false)
  })

  it('should return false for any string less than 2 or more than 32 chars', () => {
    expect(service.isValidName('h')).toBe(false)
    expect(service.isValidName('this is a very long name like what man')).toBe(false)
  })

  it('should return false if name contains special characters', () => {
    expect(service.isValidName('hey$')).toBe(false)
  })
})

