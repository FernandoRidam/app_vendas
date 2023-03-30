export function formatCpfCnpj( value: string ) {
  if( value.length <= 11 )
    return formatCpf( value );
  else
    return formatCnpj( value );
};

function formatCpf( value: string ) {
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
}

function formatCnpj( value: string ) {
  return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
}
