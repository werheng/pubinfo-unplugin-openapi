import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    include: ['tests/**/*.test.{ts,js}'],
  },
})
