#!/usr/bin/env node

import fs from 'fs'
import colors from 'colors'
import { buildTemplateFromRequest } from './buildTemplate'

function main () {
  const entryPath = process.argv[2]
  const outputPath = process.argv[3]

  if (!(entryPath && outputPath)) {
    console.log(colors.red('You must provide an entry path and an output path'))
    return
  }

  const raw = fs.readFileSync(entryPath)
  const dataRequest = JSON.parse(raw.toString())

  const template = buildTemplateFromRequest(dataRequest)

  fs.writeFileSync(outputPath, JSON.stringify(template))
}

main()
