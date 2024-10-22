export default function Header({setCity, city, searchCity}: {setCity: any, city: any, searchCity: any}) {
    return(
    <header className="p-8 w-full flex content-center items-center">
        <h1 className="font-bold text-2xl">Weather</h1>
        <input 
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' ? searchCity() : null}
        value={city} type="text" className="mt-4 p-2 rounded-md w-80 ml-auto bg-transparent border focus:outline-none" placeholder="Procurar uma cidade específica"/>
        <button className="mt-4 p-2 rounded-md bg-blue-500 border-blue-500 border-2 text-white ml-2 hover:bg-transparent" onClick={searchCity}>Buscar</button>
    </header>
    )
}