// import ValidationValues from '../src/app/tools/validation_values'

import ValidationValues from '@tools/validation_values'

describe('Teste for a tools class', () => {
  describe('Tests of Email', () => {
    test('Email correct', () => {
      const emailCorrect = 'name@mail.com'

      const result = ValidationValues.validation_email(emailCorrect)

      expect(true).toBe(result)
    })

    test('Email not @ indentifier', () => {
      const emailIncorrect = 'test.com'

      const result = ValidationValues.validation_email(emailIncorrect)

      expect(false).toBe(result)
    })

    test('Email not have local not exists', () => {
      const emailIncorrect = '@test.com'

      const result = ValidationValues.validation_email(emailIncorrect)

      expect(false).toBe(result)
    })

    test('Email not have a domain indentifier', () => {
      const emailIncorrect = 'test.com'

      const result = ValidationValues.validation_email(emailIncorrect)

      expect(false).toBe(result)
    })

    test('Email local bigger size', () => {
      const emailIncorrect = 'c'.repeat(65) + '@test.com'

      const result = ValidationValues.validation_email(emailIncorrect)

      expect(false).toBe(result)
    })

    test('Email domain bigger size', () => {
      const emailIncorrect = 'name@' + 't'.repeat(65) + 'est.com'

      const result = ValidationValues.validation_email(emailIncorrect)

      expect(false).toBe(result)
    })

    test('Email not have .', () => {
      const emailIncorrect = 'name@mailcom'

      const result = ValidationValues.validation_email(emailIncorrect)

      expect(false).toBe(result)
    })

    test('Email bigger size', () => {
      const emailIncorrect = 'nam' + 'e'.repeat(130) + '@te' + 's'.repeat(200) + 't.com'

      const result = ValidationValues.validation_email(emailIncorrect)

      expect(false).toBe(result)
    })

    test('Email init incorrect .', () => {
      const emailIncorrect = '.name@mail.com'

      const result = ValidationValues.validation_email(emailIncorrect)

      expect(false).toBe(result)
    })
  })

  describe('Tests of Post', () => {
    test('Post empty', () => {
      const post = ''

      const resp = ValidationValues.validation_post(post)

      expect(false).toEqual(resp)
    })

    test('Post bigger size', () => {
      const post = 'ABC'.repeat(300)

      const resp = ValidationValues.validation_post(post)

      expect(false).toEqual(resp)
    })
  })

  describe('Tests Space Validation', () => {
    test('Value exists', () => {
      const txt = 'test'
      const resp = ValidationValues.validation_spaces(txt)
      expect(true).toEqual(resp)
    })
    test('Value not exists', () => {
      const txt = '                  '
      const resp = ValidationValues.validation_spaces(txt)
      expect(false).toEqual(resp)
    })
  })
})
