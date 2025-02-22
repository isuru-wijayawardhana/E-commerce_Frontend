const displayLKRCurrency = (num) => {
    const formatter = new Intl.NumberFormat("si-LK",{
        style : "currency",
        currency : "LKR",
        minimumFractionDigits : 2
    })
    return formatter.format(num)
}
export default displayLKRCurrency