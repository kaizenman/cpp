function formatUrl(str: string): string {
  str = str.replace(/[+]/g, '%2B');
  return str;
}

export function execute_only(compilerOptions?: string[]) {
  let result = 'https://godbolt.org/api/compiler/gsnapshot/compile';
  if (compilerOptions) {
    result += `?options=${compilerOptions.map(option => `-${option}&`).join()}`;
  }

  result += 'skipAsm=true&executorRequest=true&filters=execute';
  result = formatUrl(result);
  console.log(result);
  return result;
}