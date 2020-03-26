import {add} from './math'
// tree shaking success
import uniq from 'lodash/uniq'
// tree shaking fail
// import {uniq} from 'lodash'
console.log(add(3,6))
