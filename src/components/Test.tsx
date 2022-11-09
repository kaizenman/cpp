import useFetchString from '../hooks/useFetchString'

const url = `https://godbolt.org/api/compilers`

export default function Test() {
    const { data, error } = useFetchString<string>(url)
    if (error) return <input defaultValue='There is an error.'></input>
    if (!data) return <p>Loading...</p>
    return <>
        {data.split('|')
        .filter(line => !line.startsWith('Compiler'))
        .map(line => <p key={line}>{line}</p>)}
    </>
}
