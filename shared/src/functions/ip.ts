export const isIP = (ip: string) : boolean => {
  let octets = ip.split(".");
  if (octets.length !== 4) {
    return false;
  }
  for (let i = 0; i < octets.length; i++) {
    let octet = parseInt(octets[i]);
    if (isNaN(octet) || octet < 0 || octet > 255) {
      return false;
    }
  }
  return true;
}