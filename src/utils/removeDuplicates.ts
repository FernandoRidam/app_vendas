export const removeDuplicates = ( values: Array<string>) => {
  return values.filter(( item, index ) => values.indexOf( item ) === index );
};
