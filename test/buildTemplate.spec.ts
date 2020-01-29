import { buildTemplateFromRequest } from '../src/buildTemplate'
import request from './request.json'
import template from './template.json'

test('lifeguard', () => {
  expect(true).toBe(true)
})

test('test', () => {
  expect(buildTemplateFromRequest(request)).toStrictEqual(template)
})
