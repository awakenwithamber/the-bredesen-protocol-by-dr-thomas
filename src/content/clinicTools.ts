/**
 * Clinic Tools
 * ------------
 * Staff-only Google Drive files used for patient management, progress
 * reporting, and program completion — NOT the patient-facing library.
 *
 * These are rendered only inside /admin/resources. They never appear in
 * the patient Resource Library or on any patient-facing route.
 */

export type ClinicToolKind = 'tracker-folder' | 'tracker-sheet' | 'tracker-file'

export type ClinicTool = {
  id: string
  title: string
  kind: ClinicToolKind
  summary: string
  whenToUse: string
  href: string
}

export const clinicTools: ClinicTool[] = [
  {
    id: 'clinic-tool-tracker-folder',
    title: 'FM / Bredesen Spreadsheet Tracker — Folder',
    kind: 'tracker-folder',
    summary: 'The clinic\'s working folder of all tracker spreadsheets.',
    whenToUse: 'Start here when onboarding a new admin or looking for a tracker that has moved.',
    href: 'https://drive.google.com/drive/folders/1ATZq55oVHFKGOiXtLQP8L_foEAHfV-nE',
  },
  {
    id: 'clinic-tool-patients-sheet',
    title: 'Functional Med — Bredesen Patients Sheet',
    kind: 'tracker-sheet',
    summary: 'Master patient roster with phase, start date, and status per patient.',
    whenToUse: 'Use this for weekly stand-ups and to check where each patient is in the 24-week arc.',
    href: 'https://docs.google.com/spreadsheets/d/1ZckITCQdjWRRYXnvQmTOAiKxZXInjCpJiNI4VexZNR0',
  },
  {
    id: 'clinic-tool-updated-patient-spreadsheet',
    title: 'Updated Bredesen Patient Spreadsheet',
    kind: 'tracker-file',
    summary: 'The most recent version of the patient tracker — canonical source for reporting.',
    whenToUse: 'Pull from this for end-of-phase reports and funnel visibility.',
    href: 'https://drive.google.com/file/d/1dVC2A0O9AWf2riEEFDJqI2klaG4OVkMU',
  },
  {
    id: 'clinic-tool-additional-tracker-a',
    title: 'Additional Tracker — A',
    kind: 'tracker-file',
    summary: 'Supplemental tracker file referenced by the clinic for patient follow-up.',
    whenToUse: 'Open alongside the main patient sheet when reviewing program completion logic.',
    href: 'https://drive.google.com/file/d/1dFn2mVhdRJMWSQxH6AMJg0CBfk-UR3tr',
  },
  {
    id: 'clinic-tool-additional-tracker-b',
    title: 'Additional Tracker — B',
    kind: 'tracker-file',
    summary: 'Secondary supplemental tracker file.',
    whenToUse: 'Reconcile against Tracker A when patient counts look off.',
    href: 'https://drive.google.com/file/d/1yD1h72T9upylzs1KO-HJtWarcED9EOSh',
  },
]

export const clinicToolLabels: Record<ClinicToolKind, string> = {
  'tracker-folder': 'Folder',
  'tracker-sheet': 'Spreadsheet',
  'tracker-file': 'File',
}
