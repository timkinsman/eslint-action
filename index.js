const core = require('@actions/core')
const { ESLint } = require('eslint')

const run = async () => {
  const autofixes = core.getInput('autofixes')

  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint({ baseConfig: {
      "env": {
        "browser": true,
        "es2020": true,
        "node": true
      },
      "extends": [
        "plugin:react/recommended",
        "standard"
      ],
      "parserOptions": {
        "ecmaFeatures": {
          "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
      },
      "plugins": [
        "react"
      ],
      "rules": {
      }
    },
    fix: true
  })

  // 2. Lint files. This doesn't modify target files.
  const results = await eslint.lintFiles('**/*.js')

  // 3. Modify the files with the fixed code.
  if (autofixes === 'true') {
    await ESLint.outputFixes(results)
  }

  // 4. Format the results.
  const formatter = await eslint.loadFormatter('stylish')
  const resultText = formatter.format(results)

  // 5. Output it.
  console.log(resultText)
}

run().catch(error => {
  process.exitCode = 1
  console.error(error)
})
