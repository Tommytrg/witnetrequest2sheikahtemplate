import cbor from 'cbor'

// Build a data request template from a witnet's node format data request
function buildTemplateFromRequest (request: Request): Template {
  const dr = request.params.dro.data_request
  return {
    name: 'Data request',
    description: 'description',
    radRequest: {
      notBefore: dr.time_lock,
      retrieve: dr.retrieve.map((stage: EncodeRetrieveStage) => {
        return {
          ...stage,
          script: cbor.decodeFirstSync(
            stage.script.map((op: number) => op.toString(16)).join('')
          )
        }
      }),

      aggregate: createTemplateAggregateTally(dr.aggregate),
      tally: createTemplateAggregateTally(dr.tally)
    }
  }
}

// Build aggregation / tally script readable for a template
function createTemplateAggregateTally (
  script: EncodeAggregateTallyScript
): TemplateAggregateTallyScript {
  return {
    filters: script.filters.map((filter: EncodeFilter) => {
      return filter.args.length ||
        (filter.args.length === 1 && filter.args[0] !== 128)
        ? [
            filter.op,
            ...(filter.args.length
              ? cbor.decodeFirstSync(
                  filter.args.map((arg: number) => arg.toString(16)).join('')
                )
              : [])
          ]
        : filter.op
    }),
    reducer: script.reducer
  }
}

export { buildTemplateFromRequest }
