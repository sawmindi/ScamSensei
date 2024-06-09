import { defineConfig } from 'vitest/config'
import { config } from 'dotenv';
config();
export default defineConfig({
    test: {
      // coverage:{
      //   reporter:['text','html']
      // }
    },
  })