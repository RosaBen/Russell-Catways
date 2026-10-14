export default function hasTokenCookie () {
  return document.cookie.split("; ").some((cookie => cookie.startsWith("token=")));
}