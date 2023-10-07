export const isEmail = (email: string) : boolean => {
  let reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return reg.test(email);
}