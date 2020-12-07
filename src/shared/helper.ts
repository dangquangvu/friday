import * as mongoose from 'mongoose';
export function getStringEnumValues<E extends Record<keyof E, string>>(
  e: E,
): E[keyof E][] {
  return (Object.keys(e) as (keyof E)[]).map(k => e[k]);
}

export function checkObjectId(id: string): boolean{
  return mongoose.Types.ObjectId.isValid(id);
}