/**
 * Canonical clinic contact information for The Bredesen Protocol by Dr. Thomas.
 * Any UI that shows a phone number, address, or portal link should import from
 * this file so the whole app stays in sync when the clinic's details change.
 */

export const CLINIC = {
  name: 'The Bredesen Protocol by Dr. Thomas',
  // Phone formatted for tel: links — digits only, no punctuation.
  phoneRaw: '8012665559',
  phoneDisplay: '(801) 266-5559',
  faxDisplay: '(801) 266-5569',
  hours: 'Mon–Fri, 9am–5pm MT',
  address: {
    street: '5525 S 900 E Ste #340',
    city: 'Murray',
    state: 'UT',
    zip: '84117',
    oneLine: '5525 S 900 E Ste #340, Murray, UT 84117',
  },
  portalUrl: 'https://secure.gethealthie.com',
  // Google Maps driving-directions link to the clinic.
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('5525 S 900 E Ste 340, Murray, UT 84117'),
} as const

export const telHref = `tel:${CLINIC.phoneRaw}`
