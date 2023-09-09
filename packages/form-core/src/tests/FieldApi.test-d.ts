import { assertType } from 'vitest'
import { FormApi } from '../FormApi'
import { FieldApi } from '../FieldApi'
import { zodValidator } from '../zod-validator'
import z from 'zod'

it('should type a subfield properly', () => {
  const form = new FormApi({
    defaultValues: {
      names: {
        first: 'one',
        second: 'two',
      },
    } as const,
  })

  const field = new FieldApi({
    form,
    name: 'names',
  })

  const subfield = field.getSubField('first')

  assertType<'one'>(subfield.getValue())
})

it('should type onChange properly', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  } as const)

  const field = new FieldApi({
    form,
    name: 'name',
    onChange: (value) => {
      assertType<'test'>(value)

      return undefined
    },
  })
})

it('should allow a Zod validator to be passed in', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  } as const)

  const field = new FieldApi({
    form,
    name: 'name',
    validator: zodValidator,
  })
})

it('should allow a Zod validator to handle the correct Zod type', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  })

  const field = new FieldApi({
    form,
    name: 'name',
    validator: zodValidator,
    onChange: z.string(),
  })
})

it('should allow not a Zod validator with the wrong Zod type', () => {
  const form = new FormApi({
    defaultValues: {
      name: 'test',
    },
  })

  const field = new FieldApi({
    form,
    name: 'name',
    validator: zodValidator,
    onChange: z.object({}),
  } as const)
})
