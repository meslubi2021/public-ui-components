import { expect } from 'vitest'
import { GranularityKeys, TimeframeKeys } from './types'
import { TimePeriods } from './timeframes'

const freeTierMax = TimePeriods.get(TimeframeKeys.ONE_DAY)?.timeframeLength() || 86400
const sevenDays = TimePeriods.get(TimeframeKeys.SEVEN_DAY)?.timeframeLength() || 86400 * 7
const thirtyDays = TimePeriods.get(TimeframeKeys.THIRTY_DAY)?.timeframeLength() || 86400 * 30

const allowedTiersFree = Array.from(TimePeriods.values()).filter((val) => val.allowedTiers.includes('free'))
const allowedTiersPlus = Array.from(TimePeriods.values()).filter((val) => val.allowedTiers.includes('plus'))
const allowedTiersEnterprise = Array.from(TimePeriods.values()).filter((val) => val.allowedTiers.includes('enterprise'))

describe('timeFramesAllowed', () => {
  it('does not show anything beyond `Last 24 hours` if Free tier', () => {
    expect(allowedTiersFree.some((item) => item.timeframeLength() > freeTierMax)).toBe(false)
  })

  it('does show `Last 7 days` and `Last 30 days` if Plus tier', () => {
    expect(allowedTiersPlus.some((item) => item.timeframeLength() === sevenDays)).toBe(true)
    expect(allowedTiersPlus.some((item) => item.timeframeLength() === thirtyDays)).toBe(true)
  })

  it('does show `Last 7 days` and `Last 30 days` if Enterprise tier', () => {
    expect(allowedTiersEnterprise.some((item) => item.timeframeLength() === sevenDays)).toBe(true)
    expect(allowedTiersEnterprise.some((item) => item.timeframeLength() === thirtyDays)).toBe(true)
  })
})

describe('allowedGranularities', () => {
  it('meets specs for "standard" timeframes', () => {
    expect(TimePeriods.get(TimeframeKeys.FIFTEEN_MIN)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.MINUTELY]))

    expect(TimePeriods.get(TimeframeKeys.ONE_HOUR)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.MINUTELY]))

    expect(TimePeriods.get(TimeframeKeys.SIX_HOUR)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.MINUTELY, GranularityKeys.HOURLY]))

    expect(TimePeriods.get(TimeframeKeys.TWELVE_HOUR)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.HOURLY]))

    expect(TimePeriods.get(TimeframeKeys.ONE_DAY)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.HOURLY]))

    expect(TimePeriods.get(TimeframeKeys.SEVEN_DAY)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.HOURLY, GranularityKeys.DAILY]))

    expect(TimePeriods.get(TimeframeKeys.THIRTY_DAY)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.DAILY, GranularityKeys.WEEKLY]))

    expect(TimePeriods.get(TimeframeKeys.CURRENT_WEEK)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.HOURLY, GranularityKeys.DAILY]))

    expect(TimePeriods.get(TimeframeKeys.CURRENT_MONTH)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.DAILY, GranularityKeys.WEEKLY]))

    expect(TimePeriods.get(TimeframeKeys.PREVIOUS_WEEK)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.HOURLY, GranularityKeys.DAILY]))

    expect(TimePeriods.get(TimeframeKeys.PREVIOUS_MONTH)?.allowedGranularities())
      .toEqual(new Set([GranularityKeys.DAILY, GranularityKeys.WEEKLY]))
  })
})
