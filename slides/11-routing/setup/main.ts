import { defineAppSetup } from '@slidev/types'
import sharedSetup from '../../../common/setup/main'
import '../../../common/theme/style.css'

export default defineAppSetup(({ app }) => {
  if (sharedSetup && typeof sharedSetup === 'function') {
    sharedSetup({ app } as any)
  }
})
