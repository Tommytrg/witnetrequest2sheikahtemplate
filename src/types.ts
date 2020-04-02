type EncodeFilter = { args: Array<number>; op: number }
type TemplateAggregateTallyScript = {
  filters: [] | Array<number | Array<number | string>>
  reducer: number
}
type EncodeAggregateTallyScript = {
  filters: Array<EncodeFilter>
  reducer: number
}

type EncodeRetrieveStage = { kind: string; url: string; script: Array<number> }

type Template = {
  name: string
  description: string
  radRequest: {
    timelock: number
    retrieve: Array<{ kind: string; url: string; script: Array<any> }>
    aggregate: TemplateAggregateTallyScript
    tally: TemplateAggregateTallyScript
  }
}
type Request = {
  jsonrpc: string
  method: string
  id: string
  params: {
    dro: {
      data_request: {
        time_lock: number
        retrieve: Array<EncodeRetrieveStage>
        aggregate: {
          filters: Array<{ op: number; args: Array<any> }>
          reducer: number
        }
        tally: {
          filters: Array<{ op: number; args: Array<any> }>
          reducer: number
        }
      }
      witness_reward: number
      witnesses: number
      backup_witnesses: number
      commit_fee: number
      reveal_fee: number
      tally_fee: number
      extra_reveal_rounds: number
      min_consensus_percentage: number
    }
    fee: number
  }
}
