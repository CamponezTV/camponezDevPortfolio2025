import { CONSENT_DEFAULT_SCRIPT, CONSENT_STORAGE_KEY, readConsent, saveConsent } from './consent'

const consentCommands = () =>
  (window.dataLayer ?? [])
    .filter((entry) => Object.prototype.toString.call(entry) === '[object Arguments]')
    .map((entry) => Array.from(entry as IArguments))

describe('consent', () => {
  beforeEach(() => {
    localStorage.clear()
    window.dataLayer = []
  })

  it('denies analytics and ads by default before Google Tag Manager loads', () => {
    new Function(CONSENT_DEFAULT_SCRIPT)()

    expect(consentCommands()).toEqual([
      [
        'consent',
        'default',
        { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 },
      ],
    ])
  })

  it('restores a previous acceptance on the next visit', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'granted')

    new Function(CONSENT_DEFAULT_SCRIPT)()

    expect(consentCommands()[1]).toEqual([
      'consent',
      'update',
      { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' },
    ])
  })

  it('stores the choice and tells Google Tag Manager, keeping ads denied', () => {
    saveConsent('granted')

    expect(readConsent()).toBe('granted')
    expect(consentCommands()).toEqual([
      ['consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }],
    ])
  })

  it('ignores unknown stored values', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'maybe')

    expect(readConsent()).toBeNull()
  })
})
