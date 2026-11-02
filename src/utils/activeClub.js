export const ACTIVE_CLUB_TEXT_CLASS = 'font-bold text-[#f5ff00]'

export function isActiveClub(clubName, clubActivo) {
  if (!clubName || !clubActivo) return false
  return clubName.split(', ').includes(clubActivo)
}
