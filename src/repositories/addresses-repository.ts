const addresses = [{id: 1, value: 'Nezavisimosti 12'}, {id: 2, value: 'Selickaga 11'}]

export const addressesRepository = {
    findAddress(id: number) {
        const address = addresses.find(a => a.id === id)
        if (address) {
           return addresses
    }},
    allAddresses(){
        return addresses
    }
}
